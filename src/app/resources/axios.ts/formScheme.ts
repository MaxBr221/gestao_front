import * as Yup from 'yup'

export interface LoginForm{
    login: string;
    senha: string;
}

export const validationScheme = Yup.object({
    login: Yup.string()
        .trim()
        .required("É preciso digitar o login")
        .email("Login inválido"),

    senha: Yup.string()
        .required("É preciso digitar a senha")
        .min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

export const formScheme: LoginForm = {login: '', senha: ''}