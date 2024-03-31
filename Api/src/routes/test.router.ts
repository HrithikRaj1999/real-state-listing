import express  from 'express';
export const testRouter = express.Router();

testRouter.get('/',(req,res)=>{
    res.status(200).json({status:"Express server is Running Successfully"})
})
