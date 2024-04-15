import { List } from "../modules/list/listModel";
import { User } from "../modules/user/userModel";
import { sendmail } from "./emailsending";
import { Op } from "sequelize";


export async function remainder(today:any){
    try{
        let emails;
        let dos;
        // const today = new Date();
        const toStringToday = today.toISOString().split("T")[0];
        const findTodayList:List[] = await List.findAll({
            where:{
                date: {
                    [Op.gte]: toStringToday + 'T00:00:00.000Z', 
                    [Op.lt]: toStringToday + 'T23:59:59.999Z'
                }
            },
            include:[{model:User}],
            raw:true
        },
    ) 
        console.log(today,toStringToday)
        console.log(findTodayList)
        if(findTodayList){
            findTodayList.forEach(async (element:any)=>{
                console.log(element['User.email'])
                emails=element['User.email']
                console.log(element.do)
                dos = element.do;
                console.log("this : ",emails)
                let subject = "Remainder for your task"
                let text=`Hello ${element['User.username']},\n You have a gentle remainder don't miss ${dos}`
                await sendmail(emails,subject,text)
            })

        }
        return;
    }
    catch(error){
        console.log(error)
    }
    
}