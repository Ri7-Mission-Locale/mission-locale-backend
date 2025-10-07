
import { Router } from "express";
import WorkshopRepository from "../repositories/WorkshopRepository.js";
import { log } from "node:console";
import { uploadWorkshopImage } from "../middlewares/multer.js";

const workshopRepository = WorkshopRepository;
const workshopRouter = Router()
    .get("/workshops", async (req, res) => {
        try {
            const workshops = await workshopRepository.findMany(req.query);

            const parsedWorkshops = workshops.map(workshop => {
                return {
                    id: workshop.event_id,
                    title: workshop.workshop.title,
                    start: workshop.date ? new Date(workshop.date).toISOString() : null,
                    duration: workshop.duration,
                    description: workshop.workshop.description,
                    imagePath: workshop.workshop.imagePath
                };
            });

            res.json(parsedWorkshops);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    })


    .post("/workshops", uploadWorkshopImage, async (req, res) => {
        try {

            const workshopData = {
                title: req.body.title,
                description: req.body.description,
            }
            const eventData = {
                date: new Date(req.body.date),
                content: req.body.description,
                size: parseInt(req.body.size),
                duration: req.body.duration,
            }

            if (req.file) {
                workshopData.imagePath = req.file.path;
            }

            const workshop = await workshopRepository.createWithEvent(workshopData, eventData);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    })

    .get("/workshops/detail/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.find(id);
            if (!workshop) throw "Atelier non trouvé";

            res.json(workshop);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    })
    .patch("/workshops/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.update(id, req.body);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    })
    .delete("/workshops/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const workshop = await workshopRepository.delete(id);
            res.json(workshop);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    });

export default workshopRouter;