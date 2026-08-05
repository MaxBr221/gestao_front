'use client'
import { propAuth } from "../resources/proprietario/proprietario.auth";
import { Template } from "../components/Template";
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
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });



    async function onSubmit(form: LoginForm) {
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
            <div>
                <div className ="py-3">
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
                        <label>Senha</label>
                        <div>
                            <InputText
                                id="senha"
                                name="senha"
                                value={values.senha}
                                onChange={handleChange}
                                placeholder="Digite sua Senha"/>
                        </div>
                    
                    </form>
                </div>
            </div>

        </Template>
    )
    

}

