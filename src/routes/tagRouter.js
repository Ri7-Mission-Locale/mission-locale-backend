import { Router } from "express";
import tagRepository from "../repositories/TagRepository.js"; 

const tagRouter = Router();

tagRouter.get("/tags", async (req, res) => {
  try {
    const tags = await tagRepository.findMany();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des tags" });
  }
});

export default tagRouter;
