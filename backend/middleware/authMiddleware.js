import jwt from "jsonwebtoken";

export const protect = (roles=[]) => (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,"secret123");
    if(roles.length && !roles.includes(decoded.role))
      return res.status(403).json({message:"Forbidden"});
    req.user = decoded;
    next();
  }catch{
    res.status(401).json({message:"Invalid token"});
  }
};
