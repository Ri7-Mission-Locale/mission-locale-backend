
import express from 'express';
import { PrismaClient } from '@prisma/client';
import redis from '../utils/redis.js';

// import express from 'express';
// import { PrismaClient } from '@prisma/client';


// const tagRouter = express.Router();
// const prisma = new PrismaClient();



// tagRouter.post('/addtag', async (req, res) => {
//     const { name } = req.body;
//     try {
//         const tag = await prisma.tag.create({
//             data: { name },
//         });
            
        
//         res.json(tag);
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la création du tag' });
//     }
// });


// tagRouter.get('/alltag', async (req, res) => {
//     try {
//         const tags = await prisma.tag.findMany();
//         res.json(tags);
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la récupération des tags' });
//     }
// });

// tagRouter.get('/onetag/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const tag = await prisma.tag.findUnique({
//             where: { id: parseInt(id) },
//         });
//         if (tag) {
//             res.json(tag);
//         } else {
//             res.status(404).json({ error: 'Tag non trouvé' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la récupération du tag' });
//     }
// });

// tagRouter.post('/updatetag/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     try {
//         const tag = await prisma.tag.update({
//             where: { id: parseInt(id) },
//             data: { name },
//         });
//         res.json(tag);
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la mise à jour du tag' });
//     }
// });

// tagRouter.delete('/deletetag/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await prisma.tag.delete({
//             where: { id: parseInt(id) },
//         });
//         res.json({ message: 'Tag supprimé avec succès' });
//     } catch (error) {
//         res.status(500).json({ error: 'Erreur lors de la suppression du tag' });
//     }
// });



// export default tagRouter;
