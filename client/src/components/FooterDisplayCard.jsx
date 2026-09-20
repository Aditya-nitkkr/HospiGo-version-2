export const FooterDisplayCard = ({ title, content1, content2, content3, content4 }) => {
    return (
        <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {title}
            </h3>
            <ul className="space-y-3">
                <li className="text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    {content1}
                </li>
                <li className="text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    {content2}
                </li>
                <li className="text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    {content3}
                </li>
                <li className="text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    {content4}
                </li>
            </ul>
        </div>
    );
};