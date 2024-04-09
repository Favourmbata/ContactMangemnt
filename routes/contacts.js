const Router = require("express")
const Yup = require("yup")
const {createNewContact, findAllContacts, retrieveASingleContact, deleteContactById, updateAContact} = require("../services/");

const  UnauthorizedException = require('../exception/UnauthorizedException')

const e = require("express");

const contactRouter = Router();
const createContactRequest = Yup.object().shape({
    firstName:Yup.string().required('please enter your first name').min(2,'please enter a valid first name'),
    lastName:Yup.string().required('please enter your last name').min(2,'please enter a valid last name'),
    phoneNumber: yup.string().required()
        .matches(/^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/,
            'Phone number must be a valid Nigerian phone number.'),
});

contactRouter.post('/create',async (req,res,next)=>{
    try {
        let requestBody = req.body;
        await createContactRequest.validate(requestBody)
        requestBody['userId'] = req.user.id;
        const createdContact = await createNewContact(requestBody)
        const createContactResponse = {
            id:createdContact.id,
            firstName:createdContact.firstName,
            lastName:createdContact.lastName,
            phoneNumber:createdContact.phoneNumber
        }
        res.status(201).json(createContactResponse)
    }catch (error){
      next(error)
    }
});
contactRouter.get('/all',async (req , res , next)=>{
    try {
        const foundContacts = await findAllContacts(req.user.id);
        res.status(200).json(foundContacts)

    }catch (error){
        next(error)
    }
})

contactRouter.get('/:id',async (req ,res ,next)=>{
    try {
        const id = req.params.id;
        if (!id){
         throw new UnauthorizedException('please provide a valid id')
        }
        const foundContacts = await retrieveASingleContact(id ,req.user.id)
        const  findContactResponse = {
            id:foundContacts.id,
           firstName: foundContacts.firstName,
           lastName: foundContacts.lastName,
           phoneNumber: foundContacts.phoneNumber
        }
        res.status(200).json(findContactResponse)
    }catch (error){
        next(error)
    }
});
contactRouter.put('/:id',async (req,res)=>{
    try {
        let requestBody = req.body;
        await createContactRequest.validate(requestBody);
        const id = req.params.id
        if (!id) {
            throw new UnauthorizedException('Please provide an id');
        }
        requestBody['id'] = id;
        const result = await updateAContact(requestBody, req.user.id);
        const findContactResponse = {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            phoneNumber: result.phoneNumber
        }
        res.status(200).json(findContactResponse);
    } catch (error) {
        next(error);
    }
});
contactRouter.delete('/:id',async (req , res,next)=>{
    try {
        const id = req.params.id;
        if (!id){
            throw new UnauthorizedException('please enter a valid id')
        }
         const result = await deleteContactById(id , req.user.id);
        res.status(200).json({message: result})
    }catch (error){
        next(error)
    }
})