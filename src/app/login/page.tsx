'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthTemplate } from "../components/Template";
import { Button } from "../components/Button";
import { InputText } from "../components/InputText";
import { FieldError } from "../components/FieldError";

import { LoginForm } from "../resources/axios.ts/formScheme";
import { userAuth } from "../hooks/userAuth";
import { notification } from "../components/notification";

export default function LoginPage() {

    const auth = userAuth();
    const router = useRouter();
    const { notify } = notification();

    const {
        values,
        handleChange,
        handleSubmit,
        errors
    } = useFormik<LoginForm>({

        initialValues: {
            login: "",
            senha: ""
        },

        validate: (values) => {

            const errors: Partial<LoginForm> = {};

            if (!values.login) {
                errors.login = "Informe seu login";
            }

            if (!values.senha) {
                errors.senha = "Informe sua senha";
            }

            return errors;
        },

        onSubmit: async (form) => {

            try {

                const acesso = await auth.login(
                    form.login,
                    form.senha
                );

                if (!acesso) {
                    notify("Acesso negado!", "error");
                    return;
                }

                router.push("/painel");

            } catch (error) {

                console.error("Erro ao realizar login:", error);

                notify(
                    "Não foi possível realizar o login.",
                    "error"
                );
            }
        }
    });

    return (
        <AuthTemplate>

            <div className="w-full flex-1 flex items-center justify-center px-4 py-8">

               <div className="w-full max-w-md mx-auto px-5 py-10">


                    <div className="text-center mb-8">

                        <h2 className="text-xl sm:text-2xl font-bold text-[#1A5F7A]">
                            Faça Login com sua Conta
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Entre para acessar o sistema
                        </p>

                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full space-y-5"
                    >
                        <div className="w-full">

                            <label
                                htmlFor="login"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Login
                            </label>

                            <InputText
                                id="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="Digite seu login"
                            />

                            <FieldError error={errors.login} />

                        </div>

                        <div className="w-full">

                            <label
                                htmlFor="senha"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Senha
                            </label>

                            <InputText
                                id="senha"
                                name="senha"
                                type="password"
                                value={values.senha}
                                onChange={handleChange}
                                placeholder="Digite sua senha"
                            />

                            <FieldError error={errors.senha} />

                        </div>
                        <div className="pt-2">

                            <Button
                                type="submit"
                                label="Entrar"
                                style="
                                    w-full
                                    bg-[#C05C32]
                                    hover:bg-[#A84A24]
                                    text-white
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition-colors
                                "
                            />

                        </div>

                    </form>

                </div>

            </div>

        </AuthTemplate>
    );
}