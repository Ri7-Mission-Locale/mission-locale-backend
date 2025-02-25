import express from 'express'

const authenticationRouter = express.Router();

/* User's account creation */
authenticationRouter.put("/auth/register", (req, res) => {
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