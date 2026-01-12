import { db } from "../db.js";

export const rateStore = async(req,res)=>{
  const {store_id,rating}=req.body;
  await db.query(
    "INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?) ON DUPLICATE KEY UPDATE rating=?",
    [req.user.id,store_id,rating,rating]
  );
  res.json({message:"Rating saved"});
};
