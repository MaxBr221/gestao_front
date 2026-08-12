interface RelatorioCardProps {
    titulo: string;
    valor: string;
    icone: string;
}

export function RelatorioCard({
    titulo,
    valor,
    icone
}: RelatorioCardProps) {

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                        {titulo}
                    </p>

                    <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                        {valor}
                    </h2>

                </div>

                <div className="text-4xl">
                    {icone}
                </div>

            </div>

        </div>
    );
}