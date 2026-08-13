'use client'
import { propAuth } from "../resources/proprietario/proprietarioService";
import { Template } from "../components/Template";
import { Button } from "../components/Button";
import { InputText } from "../components/InputText";
import { LoginForm, validationScheme } from "../resources/axios.ts/formScheme";
import { userAuth } from "../hooks/userAuth";
import { ProprietarioSessaoToken } from "../resources/proprietario/proprietario.resources";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const auth = userAuth();
    const propAuthentication = propAuth();
    const router = useRouter();
    const {values, handleChange, handleSubmit, errors, resetForm} = useFormik< LoginForm >({
        initialValues:{
            login: '',
            senha: ''
        },
        onSubmit: onSubmit
    });



    async function onSubmit(form: LoginForm) {
        console.log("1. onSubmit executado");
        console.log("Dados:", form);
         try {
          const acesso: ProprietarioSessaoToken = await auth.login(form.login, form.senha)
          if(!acesso){
            throw new Error("Acesso não permitido!");
          }
          propAuthentication.setUserSession(acesso)
          router.push("/painel");
          console.log("Chegando na page painel!");

        } catch (error) {
            console.error(error);
        }        
    }




    return(
        <Template>
            <div className="w-full max-w-md mx-auto px-5 py-6 text-gray-800">
                <div className ="flex justify-center">
                    <h2  className ="font-bold text-xl text-[#1A5F7A] py-4">
                        Faça Login com sua Conta
                    </h2>
                </div>
                <div className="py-8">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full">
                        <label>Login</label>
                        <div className="py-3">
                             <InputText
                                id="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="Digite seu Login"
                                />
                        </div>
                        <label>Senha</label>
                        <div className="py-3">
                            <InputText
                                id="senha"
                                name="senha"
                                type="password"
                                value={values.senha}
                                onChange={handleChange}
                                placeholder="Digite sua Senha"/>
                        </div>
                        <div> 
                            <Button 
                                type="submit" 
                                style="bg-[#C05C32] hover:bg-[#A84A24] text-white mt-3 px-10 mx-auto block" 
                                label="Login"
                            /> 
                        </div>
                    </form>
                </div>
            </div>

        </Template>
    )

}

