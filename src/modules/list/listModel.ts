import { Model,DataTypes } from "sequelize";
import sequelize from "../..";
import { User } from "../user/userModel";

export class List extends Model{
    public id!:number;
    public userId!:number;
    public do!:string;
    public date!:Date;
}

List.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    do:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize,
    tableName:'list',
})

