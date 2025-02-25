import express from 'express'
import MemberService from '../services/MemberService.js';


const authenticationRouter = express.Router();
// const memberService = new MemberService();
const memberRouter = express.Router();
const memberService = new MemberService();

/* User's account creation */
memberRouter.put("/member/register", (req, res) => {
    try {

    } catch (err) {

    }
})

/* Update user's mail before validation */
memberRouter.patch("/member/changemail/:token", (req, res) => {
    try {

    } catch (err) {

    }
})

/* User's mail validation */
memberRouter.patch("/member/validate/:token", (req, res) => {
    try {

    } catch (err) {

    }
})

/* Handle user's connexion and store session */
memberRouter.post("/member/login", (req, res) => {
    try {

    } catch (err) {

    }
})

/* Refresh user session  */
memberRouter.get("/member/refresh", (req, res) => {
    try {

    } catch (err) {
    
    }
})

export default memberRouter;