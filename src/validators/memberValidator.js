import { boolean, object, string } from "yup";

export const registerMemberSchema = object({
    firstName: string().min(2).max(50).required(),
    lastName: string().min(2).max(50).required(),
    mail: string().email().required(),
    password: string().min(8).max(100).required(),
    repeatPassword: string().min(8).max(100).required(),
});

export const loginMemberSchema = object({
    mail: string().email().required(),
    password: string().required(),
    keepConnected: boolean().default(false)
});

export const editMemberSchema = object({
    firstName: string().min(2).max(50),
    lastName: string().min(2).max(50),
    mail: string().email(),
    password: string().min(8).max(100),
    repeatPassword: string().min(8).max(100)
});