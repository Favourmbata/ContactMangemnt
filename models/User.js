'use strict';

const {model ,DataTypes} = require("sequelize")
const {sq} = require("../utils/database")
const Contact = require("./Contact")

class User extends Model{
}
User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:false,
        },
        isVerified:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:false,
        },
        createdAt:{
            type:DataTypes.DATE,
            defaultValue:false,
        },

      updatedAt:{
            type:DataTypes.DATE,
          defaultValue:sq.literal("CURRENT_TIMESTAMP"),

      },
},
    {
        sequelize:sq,
        modelName:"User",
        paranoid:true
    }
);
User.hasMany(Contact,{onDelete:"cascade", foreignKey:"userId"});
Contact.belongsTo(User,{as:"user"})
module.exports = User;