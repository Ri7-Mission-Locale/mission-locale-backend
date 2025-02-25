import { PrismaClient } from '@prisma/client';
import express from 'express'

const counsellorRouter = express.Router();
const prisma = new PrismaClient()


/// Counsellor acount creation
counsellorRouter.post("/counsellor/register", async (req, res) => {
      try {
        const { nom, prenom, email } = req.body;

        if (!nom || !prenom || !email) {
            return res.status(400).json({ message: 'Nom, prénom et email sont requis' });
        }

        const newEmployee = await  prisma.employee.create({
            data: {
                nom,
                prenom,
                email,
            }
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Email ou combinaison nom/prénom déjà utilisé' });
        }
        res.status(500).json({ message: `Erreur lors de la création de l'employé, error:  ` + error.message });
    }
});



/// Counsellor account update
counsellorRouter.post("/counsellor/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email } = req.body;

        const updatedEmployee = await prisma.employee.update({
            where: { id_employee: parseInt(id) },
            data: {
                nom,
                prenom,
                email,
            }
        });

        res.status(200).json(updatedEmployee);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé', error: error.message });
    }

   
})



/// Counsellor account suppression
counsellorRouter.post("/counsellor/delete/:id", async (req, res) => {
   
        try {
            const { id } = req.params;
            const employee = await prisma.employee.delete({
                where: { id_employee: parseInt(id) }
            });
            res.status(200).json({ message: 'Conseiller supprimé avec succès', employee });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Conseiller non trouvé' });
            }
            res.status(500).json({ message: 'Erreur lors de la suppression du conseiller', error: error.message });
        }
    });



/// Get all Counsellor account 
counsellorRouter.get("/counsellor/get", async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des employés', error: error.message });
    }
})



export default counsellorRouter;