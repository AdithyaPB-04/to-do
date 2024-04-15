import dbQueries from "../../services/dbQueries";
import { List } from "./listModel";
import { Request,Response } from "express";


const DBQueries = new dbQueries();


export const listCreation = async(req:Request,res:Response)=>{
    try{
       if(!req.body.dos || !req.body.dates)return res.status(400).send("All fields (do's,date) required ") 
       const {dos,dates}=req.body;
       const listCreate = await List.create({
        do:dos,
        date:dates,
        userId:req.body.user.id
       })

       res.status(200).send({"Liid: string, id: numberg, id: numberd":listCreate});
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const listUpdate = async(req:Request,res:Response)=>{
    try{
        if(!req.body.dos ||!req.body.dates)return res.status(400).send("All fields (do's,date) required")
            const id = req.params.id;
            const {dos,dates}=req.body;
            const findList = await DBQueries.findList(id)
            if(!findList)return res.status(400).send("No list with this id");
            const updatelist = await List.update({
                do:dos,date:dates
            },{
                where:{
                    id:id
                }
            })
            res.status(200).send("List updated");
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const listDelete = async(req:Request,res:Response)=>{
    try{
        if(!req.body.dos ||!req.body.dates)return res.status(400).send("All fields (do's,date) required")
            const id = req.params.id;
            const {dos,dates}=req.body;
            const findList = await DBQueries.findList(id)
            if(!findList)return res.status(400).send("No list with this id");
            const deletelist = await List.destroy({
                where:{
                    id:id
                }
            })
            res.status(200).send("List deleted");
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const getAll = async(req:Request,res:Response)=>{
    try{
        const id = req.body.user.id;
        const alllist:List[] = await List.findAll({
            where:{
                userId:id
            },
            attributes:['do','date']
        })
        if(!alllist)return res.status(400).send("No list found")
        res.status(200).send({"Your list":alllist});
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}
