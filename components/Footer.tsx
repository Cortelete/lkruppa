
import React from 'react';
import { InstagramIcon, WhatsappIcon } from './icons';

const Footer: React.FC = () => {
    const whatsappMessage = encodeURIComponent("quer um site link assim só seu? Envie uma mensagem para a InteligenciArte.IA");
    const whatsappUrl = `https://wa.me/5541988710303?text=${whatsappMessage}`;

    return (
        <footer className="text-center pt-8 pb-4 text-xs text-gray-700 dark:text-gray-300">
            <div className="inline-block bg-white/20 dark:bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/30 dark:border-white/10 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="opacity-80">Desenvolvido por</span>
                        <a 
                            href="https://www.instagram.com/InteligenciArte.IA" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Instagram da InteligenciArte.IA" 
                            className="font-semibold bg-gradient-to-r from-pink-500 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent hover:brightness-110 transition-all duration-300 flex items-center space-x-1.5"
                        >
                            <span>@InteligenciArte.IA</span>
                            <InstagramIcon className="w-4 h-4 text-pink-500 dark:text-cyan-400" />
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
            </div>
        </footer>
    );
}

export default Footer;
