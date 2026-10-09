'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import { InputText } from "../components/InputText";
import { FieldError } from "../components/FieldError";

import { LoginForm } from "../resources/axios.ts/formScheme";
import { userAuth } from "../hooks/userAuth";
import { notification } from "../components/notification";
import ToastApp from "../components/notification/ToastApp";
import Link from "next/link";

export default function LoginPage() {

    const auth = userAuth();
    const router = useRouter();
    const { notify } = notification();

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
        isSubmitting
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
                    notify("Acesso negado! Verifique suas credenciais.", "error");
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
        <div className="min-h-screen flex w-full bg-white font-sans selection:bg-[#50C4B5] selection:text-white">
            <ToastApp />

            {/* Left Side - Visual/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0B3A4F] via-[#1A5F7A] to-[#2B7A9F] relative overflow-hidden items-center justify-center p-12">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#50C4B5]/20 blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 w-full max-w-lg text-white">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
                        <span className="text-4xl">✂️</span>
                    </div>
                    <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
                        Gestão<br />
                        <span className="text-[#50C4B5]">Inteligente</span>
                    </h1>
                    <p className="text-lg text-blue-100/80 mb-10 max-w-md font-medium leading-relaxed">
                        O sistema definitivo para modernizar o controle da sua barbearia. Gerencie clientes, finanças e serviços em um só lugar.
                    </p>
                    

                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-8 sm:p-10 transform transition-all hover:shadow-[0_8px_50px_rgb(0,0,0,0.08)]">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-[#1A5F7A] to-[#2B7A9F] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg shadow-blue-900/20">
                        <span className="text-2xl text-white font-black">✂️</span>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight mb-2">
                            Bem-vindo de volta
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Por favor, insira seus dados para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label htmlFor="login" className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Usuário
                            </label>
                            <InputText
                                id="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="ex: admin"
                            />
                            <div className="h-4">
                                <FieldError error={errors.login} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="senha" className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Senha
                            </label>
                            <InputText
                                id="senha"
                                name="senha"
                                type="password"
                                value={values.senha}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <div className="h-4 flex justify-between items-start">
                                <FieldError error={errors.senha} />

                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                label={isSubmitting ? "Entrando..." : "Acessar Sistema"}
                                style={`w-full bg-[#1A5F7A] hover:bg-[#134960] text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#1A5F7A]/30 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}
                            />
                        </div>
                    </form>
                    

                </div>
            </div>
        </div>
    );
}