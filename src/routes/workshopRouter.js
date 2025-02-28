import express from 'express';
import WorkshopService from '../services/workshopService.js';

const workshopRouter = express.Router();
const workshopService = new WorkshopService();




// All workshops
workshopRouter.get('/workshop', async (req, res) => {
  try {
    const workshops = await workshopService.getAll();
    res.json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ateliers' });
  }
});

// Create workshop
workshopRouter.post('/workshop/create', async (req, res) => {
  try {
    const workshop = await workshopService.create(req.body);
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l atelier' });
  }
});

// Get workshop by id
workshopRouter.get('/workshop/:id', async (req, res) => {
  try {
    const workshop = await workshopService.getById(req.params.id);
    if (workshop) {
      res.json(workshop);
    } else {
      res.status(404).json({ error: 'Atelier non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l atelier' });
  }
});

// Update workshop
workshopRouter.post('/workshop/update/:id', async (req, res) => {
  try {
    const workshop = await workshopService.update(req.params.id, req.body);
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l atelier' });
  }
});

// Delete workshop
workshopRouter.delete('/workshop/delete/:id', async (req, res) => {
  try {
    await workshopService.delete(req.params.id);
    res.json({ message: 'Atelier supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l atelier' });
  }
});

export default workshopRouter;
