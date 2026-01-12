import { db } from "../db.js";

//total number of users, stores and ratings.
export const dashboard = async(req,res)=>{
  const [[u]] = await db.query("SELECT COUNT(*) total FROM users");
  const [[s]] = await db.query("SELECT COUNT(*) total FROM stores");
  const [[r]] = await db.query("SELECT COUNT(*) total FROM ratings");
  res.json({users:u.total,stores:s.total,ratings:r.total});
};

export const addUser = async(req,res)=>{
  const {name,email,address,password,role} = req.body;
  const bcrypt = await import("bcryptjs");
  const hash = await bcrypt.default.hash(password,10);

  await db.query(
    "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?,?)",
    [name,email,address,hash,role]
  );
  res.json({message:"User added"});
};

export const users = async(req,res)=>{
  const {search="", role="", sortBy="name", order="asc"} = req.query;

  const allowed = ["name","email","address","role"];
  const sortField = allowed.includes(sortBy) ? sortBy : "name";
  const sortOrder = order==="desc" ? "DESC" : "ASC";

  let sql = `
    SELECT id,name,email,address,role
    FROM users
    WHERE (name LIKE ? OR email LIKE ? OR address LIKE ?)
  `;
  let params = [`%${search}%`,`%${search}%`,`%${search}%`];

  if(role){
    sql += " AND role=?";
    params.push(role);
  }

  sql += ` ORDER BY ${sortField} ${sortOrder}`;

  const [data] = await db.query(sql,params);
  res.json(data);
};

export const stores = async(req,res)=>{
  const {search="", sortBy="name", order="asc"} = req.query;

  const allowed = ["name","email","address"];
  const sortField = allowed.includes(sortBy) ? sortBy : "name";
  const sortOrder = order==="desc" ? "DESC" : "ASC";

  const [data] = await db.query(`
    SELECT s.id, s.name, s.email, s.address, AVG(r.rating) rating
    FROM stores s
    LEFT JOIN ratings r ON s.id=r.store_id
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
    ORDER BY ${sortField} ${sortOrder}
  `,[`%${search}%`,`%${search}%`]);

  res.json(data);
};

export const userDetails = async(req,res)=>{
  const {id} = req.params;

  const [[user]] = await db.query(
    "SELECT name,email,address,role,id FROM users WHERE id=?",[id]
  );

  if(user.role==="OWNER"){
    const [[rating]] = await db.query(`
      SELECT AVG(r.rating) rating
      FROM stores s
      JOIN ratings r ON s.id=r.store_id
      WHERE s.owner_id=?
    `,[id]);

    user.rating = rating.rating;
  }

  res.json(user);
};

export const addStore = async(req,res)=>{
  try{
    const {name,email,address,owner_id} = req.body;

    if(!name || !email || !address || !owner_id){
      return res.status(400).json({message:"All fields required"});
    }

    const [owner] = await db.query(
      "SELECT id FROM users WHERE id=? AND role='OWNER'",
      [owner_id]
    );

    if(owner.length===0){
      return res.status(400).json({message:"Invalid Store Owner"});
    }

    await db.query(
      "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)",
      [name,email,address,owner_id]
    );

    res.json({message:"Store added"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"DB error"});
  }
};

