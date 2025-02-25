import express from 'express';
import { PrismaClient } from '@prisma/client';

const workshopRouter = express.Router();
const prisma = new PrismaClient();




workshopRouter.get('/allworkshop', async (req, res) => {
    try {
        const workshops = await prisma.workshop.findMany({
            include: { tags: true },
        });
        res.json(workshops);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des ateliers' });
    }
});


workshopRouter.post('/addworkshop', async (req, res) => {
    const { title, content, startDate, endDate, tags } = req.body;
    try {
        const workshop = await prisma.workshop.create({
            data: {
                title,
                content,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                tags: {
                    connectOrCreate: tags.map(tagName => ({
                        where: { name: tagName },
                        create: { name: tagName },
                    })),
                },
            },
        });
        res.json(workshop);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'atelier' });
    }
});


workshopRouter.get('/oneworkshop/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const workshop = await prisma.workshop.findUnique({
            where: { id: parseInt(id) },
            include: { tags: true },
        });
        if (workshop) {
            res.json(workshop);
        } else {
            res.status(404).json({ error: 'Atelier non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l atelier' });
    }
});



workshopRouter.post('/workshopupdate/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, startDate, endDate, tags } = req.body;
    try {
        const workshop = await prisma.workshop.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                tags: {
                    // 1) On "reset" tous les tags actuels de l'atelier
                    set: [],
                    // 2) On connecte ou on crée les nouveaux tags
                    connectOrCreate: tags.map(tagName => ({
                      where: { name: tagName },
                      create: { name: tagName },
                    })),
                  },
                },
                include: { tags: true }, // Pour renvoyer la liste des tags mis à jour dans la réponse
              });
        res.json(workshop);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'atelier' });
    }
});


workshopRouter.delete('/deleteworkshop:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.workshop.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Atelier supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'atelier' });
    }
});




export default workshopRouter;
