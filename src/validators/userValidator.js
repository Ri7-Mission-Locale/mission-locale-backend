import * as yup from 'yup';

export const registerValidator = yup.object({
    first_name: yup.string().required("Prénom requis"),
    last_name: yup.string().required("Nom requis"),
    email: yup.string().email("Email invalide").required("Email requis"),
    phone: yup
        .string()
        .matches(/^\d{8}$/, "Le numéro de téléphone doit contenir 8 chiffres")
        .required("Téléphone requis"),
    birth_date: yup
        .date()
        .max(new Date(), "La date de naissance ne peut pas être dans le futur")
        .required("Date de naissance requise"),
    password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[a-z]/, "Le mot de passe doit contenir une lettre minuscule")
        .matches(/[A-Z]/, "Le mot de passe doit contenir une lettre majuscule")
        .matches(/[0-9]/, "Le mot de passe doit contenir un chiffre")
        .required("Mot de passe requis"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas")
        .required("Confirmation du mot de passe requise"),
});

export const loginValidator = yup.object({
    email: yup.string().email("Email invalide").required("Email requis"),
    password: yup.string().required("Mot de passe requis"),
    keep_connected: yup.boolean().default(false)
});

export const userFiltersValidator = yup.object({
    limit: yup.number().min(5).max(50).default(10),
    page: yup.number().min(1).default(1),
    name: yup.string().trim(), 
    role: yup.mixed().oneOf(["ADMIN", "ADVISOR", "USER"]).optional(),
    order: yup.string().oneOf(["asc", "desc"]).default("asc"),
});