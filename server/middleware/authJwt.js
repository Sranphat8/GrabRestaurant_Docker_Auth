import jwt, { verify } from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.user;

const verifyToken = (req, res, next) => { 
    let token = req.headers["x-access-token"];
    if (!token) {
        // ถ้าไม่มี token จะปฏิเสธการเข้าถึงทันที
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.username = decoded.username;
        next();
    });
};

const isAdmin = (req,res,next) =>{
    User.findBypk(req.username).then(user=>{
        user.getRoles().then((roles)=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            return res.status(401).send({ message: "Unauthorized access, require Admin Role!" });
        });
    });
}

const authJwt = {verifyToken};
export default authJwt;