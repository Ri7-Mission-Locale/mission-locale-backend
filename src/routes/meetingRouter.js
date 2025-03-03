import express from 'express';
import MeetingService from '../services/meetingService.js';

const meetingRouter = express.Router();
const meetingService = new MeetingService();


//ALL meeting

meetingRouter.get('/meeting', async (req, res)=>{
    try {
        const meeting = await meetingService.getAll()
        res.json(meeting)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
    }
})

// Create meeting

meetingRouter.post('/meeting/create', async (req, res)=>{
    try {
        const meeting = await meetingService.create(req.body)
        res.json(meeting)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création des rendez-vous' });
    }
})

// get one meeting by id

meetingRouter.post('/meeting/:id', async (req,res)=>{
    try {
        const meeting = await meetingService.getById(req.params.id)
        if (meeting) {
            res.json(meeting)
        } else {
            res.status(404).json({ error: 'Rendez vous non trouvé' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez vous' });
    }
})

// update meeting 

meetingRouter.post('/meeting/update/:id', async (req, res)=>{
    try {
        const meeting = await meetingService.update(req.params.id, req.body)
    res.json(meeting)
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des rendez vous' });
    }
})

// delete meeting 

meetingRouter.delete('/meeting/delete/:id', async (req,res)=>{
    try {
        const meeting = await meetingService.delete(req.params.id)
        res.json({message: 'rendez vous supprimer avec succès'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression des rendez vous' });
    }
})

export default meetingRouter