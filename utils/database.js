const {sequelize} = require('sequelize')
const dotenv = require('dotenv')
dotenv.config();

const sequelize = new sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,


{
    host:process.env.DB_HOST,
    dialect:'postgres',
    port:process.env.DB_PORT
}
);

const  testDBConnection = async ()=>{
    try {
        await sequelize.sync({force:true});
        console.log("connection to DB has been established successfully.");
    }catch (error){
        console.error("unable to connect to the database:" ,error)
    }
};
module.exports = {sq:sequelize,testDBConnection}