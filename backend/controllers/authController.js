import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

export const register = async (req, res) => {
  const { name, email, address, password } = req.body;

  if(name.length < 20 || name.length > 60)
    return res.status(400).json({message:"Name must be 20–60 characters"});

  if(address.length > 400)
    return res.status(400).json({message:"Address max 400 characters"});

  if(!emailRegex.test(email))
    return res.status(400).json({message:"Invalid email format"});

  if(!passwordRegex.test(password))
    return res.status(400).json({
      message:"Password must be 8–16 chars, 1 uppercase, 1 special char"
    });

  const hash = await bcrypt.hash(password,10);
  await db.query(
    "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?, 'USER')",
    [name,email,address,hash]
  );

  res.json({message:"Registered"});
};

export const login = async(req,res)=>{
  const {email,password}=req.body;
  const [rows]=await db.query("SELECT * FROM users WHERE email=?", [email]);
  if(!rows.length) return res.status(404).json({message:"Not found"});
  const valid=await bcrypt.compare(password, rows[0].password);
  if(!valid) return res.status(400).json({message:"Wrong"});
  const token=jwt.sign({id:rows[0].id,role:rows[0].role},"secret123");
  res.json({token,role:rows[0].role});
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;

  if(!passwordRegex.test(password))
    return res.status(400).json({
      message:"Password must be 8–16 chars, 1 uppercase, 1 special char"
    });

  const hash = await bcrypt.hash(password,10);
  await db.query(
    "UPDATE users SET password=? WHERE id=?",
    [hash, req.user.id]
  );

  res.json({message:"Password updated"});
};