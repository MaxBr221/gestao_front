'use client'
import { Footer } from "./Footer"
import { Header } from "./Header"
import ToastApp from "./notification/ToastApp"


interface TemplateProps{
    children: React.ReactNode
    loading?: boolean
}

export const Template: React.FC<TemplateProps> = ({children, loading = true}) =>{
    return(
        <div className="flex min-h-screen w-full bg-[#FDFBF7] font-sans">

            <div className="flex flex-col flex-1 min-w-0">
                
                <Header />

               <main className="flex-1 w-full">
                    {children}
                </main>

                <Footer />

            </div>

            <ToastApp />

        </div>
    )
}
interface RenderIfProps{
    condition?: boolean;
    children: React.ReactNode;

}
export const RendeIf: React.FC<RenderIfProps> = ({condition = true, children}) =>{
    if(condition){
        return children;
    }
    return false;
}