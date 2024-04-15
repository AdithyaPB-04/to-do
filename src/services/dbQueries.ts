import { User } from "../modules/user/userModel";
import { List } from "../modules/list/listModel";

export default class dbQueries{
    async findUser(email:string){
        try{
            const exist = await User.findOne({
                where:{
                    email:email
                },
                raw:true
            })
            if(exist)return exist;
            return false;
        }
        catch(error){
            console.log(error);
        }
    }
    async findList(id:any){
        try{
            const exist = await List.findOne({
                where:{
                    id:id
                },raw:true
            })
            if(exist)return exist;
            return false;
        }
        catch(error){
            console.log(error);
        }
    }
}