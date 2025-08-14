
import React, { useState } from 'react';

const contactEmail = 'luizakruppacontato@gmail.com';

const reasonsForContact = [
    "Publicidade no Instagram",
    "Publicidade no TikTok",
    "Campanha Integrada (Insta + TikTok)",
    "Permuta",
    "Outro",
];

interface PartnershipFormProps {
    onClose: () => void;
    onShowManualEmail: (formData: any) => void;
}

const InputField: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative rounded-lg p-0.5 bg-gradient-to-r from-pink-500/30 to-purple-500/30 focus-within:from-pink-500 focus-within:to-purple-500 dark:from-cyan-500/30 dark:to-blue-500/30 dark:focus-within:from-cyan-400 dark:focus-within:to-blue-500 transition-all duration-300">
        {children}
    </div>
);

const PartnershipForm: React.FC<PartnershipFormProps> = ({ onClose, onShowManualEmail }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: '',
        reasons: [] as string[],
    });
    const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newReasons = checked 
                ? [...prev.reasons, value]
                : prev.reasons.filter(reason => reason !== value);
            return { ...prev, reasons: newReasons };
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState('submitting');
        setErrorMessage('');

        const dataToSend = {
            ...formData,
            "Motivo do Contato": formData.reasons.join(', '),
            _subject: `Contato para Parceria: ${formData.company || formData.name}`,
        };
        
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            
            const result = await response.json();

            if (response.ok && result.success === "true") {
                setSubmissionState('success');
            } else {
                throw new Error(result.message || 'Ocorreu um erro ao enviar o formulário.');
            }
        } catch (err) {
            setSubmissionState('error');
            setErrorMessage((err as Error).message || 'Ocorreu um erro inesperado.');
        }
    };

    const isFormValid = formData.name && formData.email && formData.reasons.length > 0;
    
    const inputClasses = "w-full p-2 bg-gray-50 dark:bg-gray-900/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-[7px] border-none outline-none transition-colors";

    const submitButtonBaseClasses = "relative group overflow-hidden px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
    const isButtonDisabled = !isFormValid || submissionState === 'submitting';
    const submitButtonClasses = isButtonDisabled
        ? `${submitButtonBaseClasses} bg-gray-400 dark:bg-gray-600 opacity-70 cursor-not-allowed`
        : `${submitButtonBaseClasses} bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:brightness-110 focus:ring-pink-400 dark:focus:ring-cyan-400`;

    if (submissionState === 'success') {
        return (
            <div className="text-center py-8 px-4 flex flex-col items-center">
                <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4">Mensagem Enviada!</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Obrigado! Sua mensagem foi recebida e retornaremos em breve.</p>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full max-w-xs px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-pink-500 dark:bg-cyan-500 hover:bg-pink-600 dark:hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-cyan-400"
                >
                    Fechar
                </button>
            </div>
        );
    }
    
    if (submissionState === 'error') {
       return (
            <div className="text-center py-4 px-2 sm:px-4 flex flex-col items-center">
                <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4">Ops! Algo deu errado.</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-sm">{errorMessage || "Não foi possível enviar sua mensagem no momento."}</p>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
                    Você pode tentar novamente ou enviar os dados manualmente por e-mail.
                </p>

                <div className="w-full flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => setSubmissionState('idle')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Tentar Novamente
                    </button>
                    <button
                        type="button"
                        onClick={() => onShowManualEmail(formData)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-pink-500 dark:bg-cyan-500 hover:bg-pink-600 dark:hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-cyan-400"
                    >
                        Enviar Manualmente
                    </button>
                </div>
            </div>
       );
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-6 text-sm sm:text-base"
        >
            <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                Preencha o formulário e nossa equipe entrará em contato.
            </p>

            <div className="space-y-4">
                <InputField>
                  <input type="text" name="name" placeholder="Seu Nome" value={formData.name} onChange={handleInputChange} className={inputClasses} required />
                </InputField>
                <InputField>
                  <input type="text" name="company" placeholder="Empresa / Marca (Opcional)" value={formData.company} onChange={handleInputChange} className={inputClasses} />
                </InputField>
                <InputField>
                  <input type="email" name="email" placeholder="Seu E-mail para Contato" value={formData.email} onChange={handleInputChange} className={inputClasses} required />
                </InputField>
                
                <div>
                    <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">Motivo do Contato:</label>
                    <div className="flex flex-wrap gap-2">
                        {reasonsForContact.map(reason => (
                            <label key={reason} htmlFor={reason} className="cursor-pointer">
                                <input
                                    id={reason}
                                    type="checkbox"
                                    name="reasons"
                                    value={reason}
                                    checked={formData.reasons.includes(reason)}
                                    onChange={handleCheckboxChange}
                                    className="hidden peer"
                                />
                                <span className="flex items-center space-x-2 py-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-all duration-300 peer-checked:bg-green-600 dark:peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-transparent hover:bg-gray-200/50 dark:hover:bg-gray-700/50">
                                    {reason}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                <InputField>
                  <textarea name="message" placeholder="Mensagem Adicional (Opcional)" rows={3} value={formData.message} onChange={handleInputChange} className={inputClasses}></textarea>
                </InputField>
            </div>

            <div className="flex justify-end space-x-3 sm:space-x-4 pt-2">
                 <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Fechar
                </button>
                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={submitButtonClasses}
                >
                    {isFormValid && !isButtonDisabled && (
                         <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
                    )}
                    {submissionState === 'submitting' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </span>
                    ) : (
                        'Enviar'
                    )}
                </button>
            </div>
        </form>
    );
};

export default PartnershipForm;
