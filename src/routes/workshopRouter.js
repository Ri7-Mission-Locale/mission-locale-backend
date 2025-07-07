
import express from "express";
import WorkshopRepository from "../repositories/WorkshopRepository.js";
import { log } from "node:console";

const workshopRepository = WorkshopRepository;
const workshopRouter = express.Router()
    .get("/workshops", async (req, res) => {
        try {
            const workshops = await workshopRepository.findMany(req.query);
               console.log(workshops);
               
            const parsedWorkshops = workshops.map(workshop => {
                return {
                    id : workshop.event_id,
                    title: workshop.workshop.title,
                    start: workshop.date ? new Date(workshop.date).toISOString() : null,
                    duration : '08:00'
                };
            });
         
            console.log(parsedWorkshops);
            res.json(parsedWorkshops);
        } catch (err) {
            res.status(400).json({error: err});
        }
    })

    
    .post("/workshops", async (req, res) => {
        try {
            const workshop = await workshopRepository.create(req.body);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({error: err});
        }
    })
    .get("/workshops/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.find(id);
            if (!workshop) throw "Atelier non trouvé";
            res.json(workshop);
        } catch (err) {
            res.status(400).json({error: err});
        }
    })
    .patch("/workshops/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.update(id, req.body);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({error: err});
        }
    })
    .delete("/workshops/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.delete(id);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({error: err});
        }
    });

export default workshopRouter;