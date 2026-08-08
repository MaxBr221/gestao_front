interface DashboardCardProps {
    title: string;
    value: string;
    description: string;
    icon: string;
    iconBackground: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    description,
    icon,
    iconBackground
}) => {

    return (

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-2xl font-bold text-[#241B35] mt-2">
                        {value}
                    </h2>

                    <p className="text-xs text-green-600 font-medium mt-2">
                        {description}
                    </p>

                </div>

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${iconBackground}`}
                >
                    {icon}
                </div>

            </div>

        </div>

    );
};