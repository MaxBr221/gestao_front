'use client'
import {propAuth} from "@/app/resources/proprietario/proprietario.auth"
import { Template } from "@/app/components/Template";
import { InputText } from "@/app/components/InputText";
import { LoginForm, validationScheme } from "@/app/resources/axios.ts/formScheme";
import { userAuth } from "@/app/hooks/userAuth";
import { useState } from "react";

export default function LoginPage() {
    const auth = userAuth();
    const {values, handleChange, handleSubmit, errors, resetForm} = useFormik< LoginForm >({
        initialValues:{
            login: '',
            senha: ''
        },
        validationSchema: validationScheme,
        onSubmit: onSubmit
    })



    async function onSubmit(form: LoginForm) {
         try {

            const credencial = await auth.login(form.login, form.senha);

        } catch (error) {
            console.error(error);
        }        
    }




    return(
        <Template>
            <div>
                <div  className ="py-3">
                    <h2  className ="font-bold text-xl text-[#1A5F7A]">
                        Faça Login com sua Conta
                    </h2>
                </div>
                <div>
                    <form>
                        <label>Login</label>
                        <div>
                             <InputText
                                id="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="Digite seu Login"
                                />
                        </div>
                    </form>
                </div>
            </div>

        </Template>
    )
    

}


function useFormik<T>(arg0: { initialValues: { login: string; senha: string; }; validationSchema: any; onSubmit: (form: LoginForm) => Promise<void>; }): { values: any; handleChange: any; handleSubmit: any; errors: any; resetForm: any; } {
    throw new Error("Function not implemented.");
}

