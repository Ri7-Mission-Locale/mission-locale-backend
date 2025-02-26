import express from 'express';

import {
  getAllWorkshops,
  createWorkshop,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop
} from '../services/workshopService.js';

const workshopRouter = express.Router();

// Liste de tous les workshops
workshopRouter.get('/allworkshop', async (req, res) => {
  try {
    const workshops = await getAllWorkshops();
    res.json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ateliers' });
  }
});

// Créer un workshop
workshopRouter.post('/addworkshop', async (req, res) => {
  try {
    const workshop = await createWorkshop(req.body);
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'atelier' });
  }
});

// Récupérer un workshop par ID
workshopRouter.get('/oneworkshop/:id', async (req, res) => {
  try {
    const workshop = await getWorkshopById(req.params.id);
    if (workshop) {
      res.json(workshop);
    } else {
      res.status(404).json({ error: 'Atelier non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'atelier' });
  }
});

// Mettre à jour un workshop
workshopRouter.post('/workshopupdate/:id', async (req, res) => {
  try {
    const workshop = await updateWorkshop(req.params.id, req.body);
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'atelier' });
  }
});

// Supprimer un workshop
// (Corrigé : /deleteworkshop/:id)
workshopRouter.delete('/deleteworkshop/:id', async (req, res) => {
  try {
    await deleteWorkshop(req.params.id);
    res.json({ message: 'Atelier supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'atelier' });
  }
});

export default workshopRouter;



