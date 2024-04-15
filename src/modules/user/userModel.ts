import { DataTypes, Model } from "sequelize";
import sequelize from "../..";
import { List } from "../list/listModel";

export class User extends Model{
    public id!:number;
    public username!:string;
    public password!:string;
    public email!:string;
    public isadmin!:boolean;
    static email: any;
}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
        
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isadmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},
{
    sequelize,
    tableName:'user',
    createdAt:'Date of registration'
})