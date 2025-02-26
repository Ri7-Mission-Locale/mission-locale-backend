import { PrismaClient } from "@prisma/client";
import express from "express";
import CounsellorService from "../services/CounsellorService.js";
import registerCounsellorSchema from "../validators/counsellorValidator.js";

const counsellorRouter = express.Router();
const counsellorService = new CounsellorService();
const prisma = new PrismaClient();




/// Counsellor acount register
counsellorRouter.post("/counsellor/register", async (req, res) => {
  try {

    const validatedCounsellor = await registerCounsellorSchema.validate(
      req.body,
      { abortEarly: false }
    );   
    const savedCounsellor = await counsellorService.create(validatedCounsellor);

    res.status(201).json(validatedCounsellor);
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Email ou combinaison nom/prénom déjà utilisé" });
    }
    res
      .status(500)
      .json({
        message:
          `Erreur lors de la création de l'employé, error:  ` + error.message,
      });
  }   
});
   
/// Counsellor account update
counsellorRouter.post("/counsellor/update/:id", async (req, res) => {
  try {
    const  id  = parseInt (req.params.id);
    const validatedCounsellor = await registerCounsellorSchema.validate(
        req.body,
        { abortEarly: false }
      );
    const savedCounsellor = await counsellorService.update(id,validatedCounsellor);



    res.status(200).json(savedCounsellor);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de l'employé",
        error: error.message,
      });
  }
});

/// Counsellor account suppression
counsellorRouter.post("/counsellor/delete/:id", async (req, res) => {
  try {
    const id  =  parseInt(req.params.id);
    const deleteCounsellor = await counsellorService.delete(id);
    res
      .status(200)
      .json({ message: "Conseiller supprimé avec succès", deleteCounsellor });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Conseiller non trouvé" });
    }
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression du conseiller",
        error: error.message,
      });
  }
});

/// Get all Counsellor account
counsellorRouter.get("/counsellor/getAll", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      take: 2,
    });
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des employés",
        error: error.message,
      });
  }
});

export default counsellorRouter;
