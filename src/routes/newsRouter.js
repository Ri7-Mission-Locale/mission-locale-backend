import express from "express";
import NewsRepository from "../repositories/NewsRepository.js";
import authguard from "../middlewares/authguard.js";
import parseFile from "../middlewares/parseFile.js"
import { log } from "console";

const newsRepository = NewsRepository;
const newsRouter = express.Router()

  .get("/news", async (req, res) => {
    try {
      const news = await newsRepository.findMany(req.query);
      res.json(news);
    } catch (err) {
      res.status(400).json(err);
     
      
    }
  })

  .post("/news",authguard,parseFile, async (req, res) => {
    try {
      console.log("reqqsdqsdq");
      
      const news = await newsRepository.create(req.body, req.user.user_id);
      res.json(news);
    } catch (err) {
       console.log(err);
      res.status(400).json(err);
    }
  })

  .get("/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const news = await newsRepository.find(id);
      if (!news) throw "Actualité non trouvé";
      res.json(news);
    } catch (err) {
      res.status(400).json(err);
    }
  })

  .patch("/news/:id", authguard, async (req, res) => {
    try {
      // const data = await updateValidator.validate(req.body, { abortEarly: false });
      const id = parseInt(req.params.id);
      const news = await newsRepository.update(id, req.body);
      res.json(news);
    } catch (err) {
      res.status(400).json(err);
    }
  })

  .delete("/news/:id", authguard, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const news = await newsRepository.delete(id);
      res.json(news);
    } catch (err) {
      res.status(400).json(err);
    }
  });

export default newsRouter;
