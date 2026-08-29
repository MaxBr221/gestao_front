'use client'

import { Template } from "../components/Template";
import { Button } from "../components/Button";
import { InputText } from "../components/InputText";
import { FieldError } from "../components/FieldError";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EsqueciSenhaForm {
    login: string;
}

export default function EsqueciSenhaPage() {

    const router = useRouter();

    const [mensagem, setMensagem] = useState("");

    const {
        values,
        handleChange,
        handleSubmit,
        errors
    } = useFormik<EsqueciSenhaForm>({
        initialValues: {
            login: ""
        },

        validate: (values) => {
            const errors: Partial<EsqueciSenhaForm> = {};

            if (!values.login) {
                errors.login = "Informe seu login";
            }

            return errors;
        },

        onSubmit: async (form) => {
            try {

                console.log("Solicitação de recuperação:", form);

                // Aqui posteriormente você vai chamar seu backend
                // await propAuth().esqueciSenha(form.login);

                setMensagem(
                    "Se o login estiver cadastrado, enviaremos as instruções para recuperação da senha."
                );

            } catch (error) {

                console.error(error);

            }
        }
    });

    return (
        <Template>

            <div className="w-full max-w-md mx-auto px-5 py-6 text-gray-800">

                <div className="flex justify-center">
                    <h2 className="font-bold text-xl text-[#1A5F7A] py-4">
                        Recuperar Senha
                    </h2>
                </div>

                <div className="text-center text-sm text-gray-600 mb-6">
                    <p>
                        Informe seu login para recuperar o acesso à sua conta.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center w-full px-17"
                >

                    <label
                        htmlFor="login"
                        className="self-start"
                    >
                        Login
                    </label>

                    <div className="py-3 w-full">

                        <InputText
                            id="login"
                            name="login"
                            value={values.login}
                            onChange={handleChange}
                            placeholder="Digite seu Login"
                        />

                        <FieldError error={errors.login} />

                    </div>

                    <div className="mt-3">

                        <Button
                            type="submit"
                            style="bg-[#C05C32] hover:bg-[#A84A24] text-white px-10 mx-auto block"
                            label="Continuar"
                        />

                    </div>

                </form>

                {mensagem && (
                    <div className="mt-6 text-center text-sm text-green-600">
                        {mensagem}
                    </div>
                )}

                <div className="flex justify-center mt-6">

                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-sm text-[#1A5F7A] hover:underline"
                    >
                        Voltar para o login
                    </button>

                </div>

            </div>

        </Template>
    );
}