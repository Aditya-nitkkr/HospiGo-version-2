export const Step = ({ StepNumber, StepTitle, StepDescription }) => {
    return (
        <li className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group">
            
             <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 font-extrabold text-xl mb-6 ring-4 ring-indigo-50/50 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {StepNumber}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {StepTitle}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
                {StepDescription}
            </p>
            
        </li>
    );
};