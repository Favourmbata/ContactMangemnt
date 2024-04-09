const tokenBlackList = new set();
module.exports = {tokenBlackList};

const express = require('express');
const app = express();
const globalExceptionHandler = require('exception/GlobalExceptionHandler')
const cors = require('cors')
const authVerification = require('./middileware/authVerification')
const port = process.env.PORT|| 4000;
const authRouter = require('./routes/Auth')
const contactRouter = require('./routes/contacts')
app.use(express.json());
const corsOption = {
  origin:[''],
  optionsSuccessStatus: 200,
  methods:"GET , POST ,PUT ,DELETE",
}
app.use(cors(corsOption));

app.get('/' ,(req , res)=>{
  res.send('Hello, Express!');
});
app.get('/auth',authRouter);

app.get('/auth/current-user',authVerification,async (req, res , next)=>{
  try {
    const user = req.user;
    console.log(user)
    const  currentUser = {
      id:user.id,
      username:user.username
    }
  }catch (error){
    next(error)
  }
});
app.use('/contacts' ,authVerification,contactRouter)

app.post('logout' ,(req ,res)=>{
  const token = req.headers.authorization;
  if (token){
    tokenBlackList.add(token.substring(7));
    res.status(200).json({message:'Logged out successfully'})
  }else {
    res.status(401).json({message:'Token not found'})
  }

})


app.use(globalExceptionHandler)

app.listen(port, async () => {
  console.log(`Starting Sequelize + Express server on port ${port}...`);
  console.log(`Server is running on port ${port}...`);
});


module.exports = app;
