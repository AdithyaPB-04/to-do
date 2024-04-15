import jwt from "jsonwebtoken";
import { Response,NextFunction } from "express";

export function userValidation(req:any,res:Response,next:NextFunction){
    try{
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token)return res.status(400).send("Token is missing");
        jwt.verify(token,'process.env.ACCESS_TOKEN',(error:any,decoded:any)=>{
            if(error)return req.status(500).send("Token authentication failed");
            req.body.user = decoded;
            next();
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}


// export function adminCheck(req:Request,res:Response,next:NextFunction){
//     try{
//         if(!req.body.user)return res.status(400).send("User is not valid")
//         if(!req.body.user.isadmin===true)return res.status(500).send("You are not admin");
//         next();
//     }
//     catch(error){
//         console.log(error)
//         return res.status(500).send("Internal Server Error")
//     }
// }