'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
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
                notify(
                    "Não foi possível realizar o login.",
                    "error"
                );
            }
        }
    });

    return (
        <AuthTemplate>
            <div className="w-full flex-1 flex items-center justify-center px-4 py-8 bg-gray-50/50">
               <div className="w-full max-w-md mx-auto px-8 py-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transform transition-all">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#1A5F7A] to-[#2B7A9F] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
                            <span className="text-2xl text-white font-black">✂️</span>
                        </div>
                        <h2 className="text-2xl font-black text-[#1A5F7A] tracking-tight">
                            Bem-vindo de volta!
                        </h2>
                        <p className="text-sm text-gray-400 mt-2 font-medium">
                            Entre com suas credenciais para acessar o sistema
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="w-full">
                            <label htmlFor="login" className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                                Login
                            </label>
                            <InputText
                                id="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="Seu login de acesso"
                            />
                            <FieldError error={errors.login} />
                        </div>

                        <div className="w-full">
                            <label htmlFor="senha" className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                                Senha
                            </label>
                            <InputText
                                id="senha"
                                name="senha"
                                type="password"
                                value={values.senha}
                                onChange={handleChange}
                                placeholder="Sua senha secreta"
                            />
                            <FieldError error={errors.senha} />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                label="Entrar no Sistema"
                                style="w-full bg-[#50C4B5] hover:bg-[#43B3A5] text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#50C4B5]/30"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AuthTemplate>
    );
}