/**
 * Middleware to check user's authentication.
 * @param {Request} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request 
 */

async function adminguard(req, res, next) {
    try {
        if (!req.user.role !== "ADMIN") throw "Unauthorized";
    
    } catch (err) {
        return res.status(401).json({ message: err });
    }
}
export default adminguard;