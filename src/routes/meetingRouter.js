import express from 'express';
import { PrismaClient } from '@prisma/client';

const meetingRouter = express.Router();
const prisma = new PrismaClient();

meetingRouter.post('/meeting/create', async (req, res) => {
    const { title, content, startDate, endDate, urgent } = req.body;
    try {
        const meeting = await prisma.meeting.create({
            data: {
                title,
                content,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : undefined,
                urgent,
                
            },
        });
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
    }
});



meetingRouter.get('/meeting/get', async (req, res) => {
    try {
        const meetings = await prisma.meeting.findMany();
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
    }
});



meetingRouter.get('/meeting/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const meeting = await prisma.meeting.findUnique({
            where: { id: parseInt(id) },
        });
        if (meeting) {
            res.json(meeting);
        } else {
            res.status(404).json({ error: 'rendez-vous non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération rendez-vous' });
    }
});



meetingRouter.patch('/meeting/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, startDate, endDate, urgent } = req.body;
    try {
        const meeting = await prisma.meeting.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                urgent,
            
            },
        });
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du rendez-vous' });
    }
});



meetingRouter.delete('/meeting/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.meeting.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'rendez-vous supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du rendez vous' });
    }
});



export default meetingRouter;
