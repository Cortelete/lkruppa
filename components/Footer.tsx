
import React from 'react';
import { InstagramIcon, WhatsappIcon } from './icons';

const Footer: React.FC = () => {
    const whatsappMessage = encodeURIComponent("quer um site link assim só seu? Envie uma mensagem para a InteligenciArte.IA");
    const whatsappUrl = `https://wa.me/5541988710303?text=${whatsappMessage}`;

    return (
        <footer className="text-center py-8 mt-8 text-xs text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center space-x-2">
                    <span>Desenvolvido por @InteligenciArte.IA</span>
                    <a href="https://www.instagram.com/InteligenciArte.IA" target="_blank" rel="noopener noreferrer" aria-label="Instagram da InteligenciArte.IA" className="hover:text-pink-500 dark:hover:text-cyan-400 transition-colors">
                        <InstagramIcon className="w-4 h-4" />
                    </a>
                </div>
                <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 text-xs py-2 px-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/70 transition-all duration-300 transform hover:scale-105"
                >
                    <WhatsappIcon className="w-4 h-4" />
                    <span>Quer um site como este?</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;