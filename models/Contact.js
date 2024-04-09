"use strict";

const {model , DataTypes} = require("sequelize")

const {sq} = require("../utils/database")

class Contact extends Model{

}
    Contact.init(
        {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
         firstName:{
            type:DataTypes.STRING,
             allowNull:false,
         },

            lastName:{
                type:DataTypes.STRING,
                allowNull:false,
            },

            phoneNumber:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:false,
            },

          createdAt:{
            type:DataTypes.DATE,
              defaultValue:sq.literal('CURRENT_TIMESTAMP'),

          },

            updatedAt:{
            type:DataTypes.DATE,
                defaultValue:sq.literal('CURRENT_TIMESTAMP')
            },
        },

        {
            sequelize:sq,
            modelName:'Contact-app'
        }


        );
     module.exports = Contact;