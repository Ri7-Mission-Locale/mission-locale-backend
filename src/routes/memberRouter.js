import express from 'express'
import MemberService from '../services/MemberService';

const authenticationRouter = express.Router();
const memberService = new MemberService();

/* User's account creation */
authenticationRouter.put("/auth/register", (req, res) => {
    


    const user = memberService.create(req.body);
})

/* Update user's mail before validation */
authenticationRouter.patch("/auth/changemail/:token", (req, res) => {

})

/* User's mail validation */
authenticationRouter.patch("/auth/validate/:token", (req, res) => {

})

/* Handle user's connexion and store session */
authenticationRouter.post("/auth/login", (req, res) => {

})

/* Refresh user session  */
authenticationRouter.get("/auth/refresh", (req, res) => {

})

export default authenticationRouter;