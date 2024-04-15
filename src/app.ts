import express from "express";
import {Request,Response,Application} from "express";
import { remainder } from "./services/notify";
import schedule from "node-schedule";
import moment from "moment";
import dotenv from "dotenv";


import user from "../src/router/router";
import list from "../src/router/router";


import { User } from "./modules/user/userModel";
import { List } from "./modules/list/listModel";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/apis',(req:Request,res:Response)=>{
    res.status(200).send("Everything is ok ")
})

app.use('/apis/users',user);
app.use('/apis/lists',list);

app.listen(port,async ()=>{
    console.log(`Server listening in port ${port}`);
    const today = moment(); 
    const timeToAdd = '18:00:00'; 

const timeComponents = timeToAdd.split(':');
today.set({
    hour: 9, // Set hour to 18 (6 PM)
    minute: 25, // Set minute to 0
    second: 0 // Set second to 0
});
   schedule.scheduleJob(today.toDate(),async ()=>{
        await remainder(today);
    })
})

//associations
User.hasMany(List, {
    foreignKey: 'userId',
});

List.belongsTo(User, {
    foreignKey: 'userId',   
});


