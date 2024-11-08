import { FormSchemaFields } from "../../../domain/interfaces/FormSchemaFields";

export const formJoin: FormSchemaFields = {
    username: { label: "Email", name: "email", type: "text", required: true },
    password: { label: "Password", name: "password", type: "password", required: true }
};

export const formCreate: FormSchemaFields = {
    name: { label: "Nombres", name: "name", type: "text", required: true },
    lastname: { label: "Apellido", name: "lastname", type: "text", required: true },
    email: { label: "Email", name: "email", type: "text", required: true },
    ci: { label: "CI", name: "ci", type: "text", required: true },  

    // code: { label: "Code", name: "Code", type: "text", required: true },
    // user: { label: "Email", name: "username", type: "text", required: true },
    password: { label: "Password", name: "password", type: "password", required: true },
};