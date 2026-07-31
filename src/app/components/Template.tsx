'use client'
import { Footer } from "./Footer"
import { Header } from "./Header"


interface TemplateProps{
    children: React.ReactNode
    loading?: boolean
}

export const template: React.FC<TemplateProps> = ({children, loading = true}) =>{
    return(
        <div className="flex flex-col min-h-screen w-full bg-[#FDFBF7] font-sans selection:bg-[#57C5B6]/30">
            <Header/>
                

            <Footer/>

        </div>
    )
}