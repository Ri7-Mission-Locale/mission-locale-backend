import { object, string } from "yup";

const registerCounsellorSchema = object({
    prenom: string().min(2,'prenom').max(50).required(),
    nom: string().min(2,'nom').max(50).required(),
    email: string().email().required(),
})

export default registerCounsellorSchema;