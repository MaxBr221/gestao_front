import { Sidebar } from "../components/Sidebar";

export default function PainelLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">

            <Sidebar />

            <main className="flex-1">
                {children}
            </main>

        </div>
    );
}