import * as Yup from 'yup'

export interface LoginForm{
    nome?: string;
    login: string;
    telefone?: string;
    senha: string;
    confirmarSenha?: string;
}

export const validationScheme = Yup.object().shape({
    login: Yup.string().trim().required("É preciso digitar o login").email("Login inválido"),
    senha: Yup.string().required("É preciso digitar a senha")
        .notRequired()
        
})

export const formScheme: LoginForm = {login: '', senha: ''}