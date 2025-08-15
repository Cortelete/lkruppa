
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatusView from './StatusView';

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
            <StatusView
                status="success"
                title="Mensagem Enviada!"
                message="Obrigado! Sua mensagem foi recebida e retornaremos em breve."
            >
                 <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="relative group overflow-hidden w-full max-w-xs px-8 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110 focus:ring-green-400"
                >
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
                    Fechar
                </motion.button>
            </StatusView>
        );
    }
    
    if (submissionState === 'error') {
       return (
            <StatusView
                status="error"
                title="Ops! Algo deu errado."
                message={errorMessage || "Não foi possível enviar sua mensagem no momento."}
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmissionState('idle')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Tentar Novamente
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onShowManualEmail(formData)}
                    className="relative group overflow-hidden w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-pink-500 dark:bg-cyan-500 hover:bg-pink-600 dark:hover:bg-cyan-600 focus:ring-pink-400 dark:focus:ring-cyan-400"
                >
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
                    Enviar Manualmente
                </motion.button>
            </StatusView>
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
