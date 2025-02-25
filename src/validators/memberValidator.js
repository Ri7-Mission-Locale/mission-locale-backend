import { object, string } from "yup";

const registerMemberSchema = object({
    firstName: string().min(2).max(50).required(),
    lastName: string().min(2).max(50).required(),
    mail: string().email().required(),
    password: string().min(8).max(100).required(),
    repeatPassword: string().min(8).max(100).required(),
})

export default registerMemberSchema;