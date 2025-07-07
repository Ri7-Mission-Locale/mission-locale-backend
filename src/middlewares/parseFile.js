import { log } from 'console';
import formidable from 'formidable';

/**
 * Middleware to parse file into request
 * @param {import('express').Request} req - Request HTTP
 * @param {import('express').Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request 
 */
export default async function parseFile(req, res, next) {
    const form = formidable();

    try {
        form.parse(req, (error, fields, files) => {
            if (error) {
                console.error('Error parsing form-data request:', error);
                return res.status(500).json({ error: 'Error parsing form-data request', details: error.message });
            }

            req.body = JSON.parse(fields.data);

            req.files = files;
            return next();
        });

    } catch (error) {
        console.error('Error parsing form-data request:', error);
        return res.status(500).json({ error: 'Error parsing form-data request', details: error.message });
    }
}