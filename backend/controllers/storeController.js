import { db } from "../db.js";

export const listStores = async (req, res) => {
  const userId = req.user.id;
  const { search="", sortBy="name", order="asc" } = req.query;

  const allowed = ["name","address"];
  const sortField = allowed.includes(sortBy) ? sortBy : "name";
  const sortOrder = order==="desc" ? "DESC" : "ASC";

  const [stores] = await db.query(`
    SELECT 
      s.id,
      s.name,
      s.address,
      AVG(r.rating) AS overallRating,
      ur.rating AS userRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    LEFT JOIN ratings ur 
      ON s.id = ur.store_id AND ur.user_id = ?
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
    ORDER BY ${sortField} ${sortOrder}
  `, [userId, `%${search}%`, `%${search}%`]);

  res.json(stores);
};



export const ownerDashboard = async (req,res)=>{
  const [store] = await db.query(
    "SELECT id FROM stores WHERE owner_id=?",
    [req.user.id]
  )

  if(!store.length) return res.json({ratings:[],avg:0})

  const storeId = store[0].id

  const [ratings] = await db.query(`
    SELECT u.name, u.email, r.rating
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id = ?
  `,[storeId])

  const [[avg]] = await db.query(
    "SELECT AVG(rating) avg FROM ratings WHERE store_id=?",
    [storeId]
  )

  res.json({ratings, avg: avg.avg})
}

