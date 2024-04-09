const {createNewUser, loginUser  ,verifyUser} = require("../services/authService")

const Router = require("express")
const Yup = require("yup")
const InvalidOtpException = require("../exception/InvalidOtpException")

const authRouter = Router();

const createUserRequest = Yup.object().shape({
      userName:Yup.string().required('please enter a userName').min(2,'please a valid userName'),
      email:Yup.string().required('enter an email').min(2,'please enter a valid email'),
     password:Yup.string().required('please enter a password').min(8,'password must be a minimum of 8 characters')
});
 const loginRequest = Yup.object().shape({
     email:Yup.string().required('please enter an email').min(2,'please enter a valid email'),
     password:Yup.string().required('please enter a password').min(8,'password must be a minimum of eight character')

 });

 authRouter.post('/signUp',async (req , res , next)=>{
      try {
          const  requestBody = req.body;
          await  createUserRequest.validate(requestBody)
          const createdUser = await createNewUser(requestBody)
          const createUserResponse = {
              id: createdUser.id,
              username: createdUser.username,
              createdAt: createdUser.createdAt,
              isVerified: createdUser.isVerified,
              token: createdUser.token
          }
          res.status(201).json({ message: 'User registered successfully', createdUser: createUserResponse });
      } catch (error) {
          next(error);
      }
 })

authRouter.post('/login', async (req, res, next) => {
    try {
        const loginDto = req.body;
        await loginRequest.validate(loginDto);
        const token = await loginUser(loginDto);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
})
authRouter.get('/verify/:otp',async (req , res , next)=>{
    try{
        const otp = req.params.otp;
        if(!otp){
           throw new InvalidOtpException('please provide an otp')
        }
        await verifyUser(otp);
        res.status(200).json({message:'user verified successfully'})
    }catch (error){
        next(error)
    }
});

 module.exports = authRouter;