import React from 'react';
import { motion } from 'framer-motion';
import { EmailIcon } from './icons';

interface PartnershipIntroProps {
  onContinue: () => void;
}

const PartnershipIntro: React.FC<PartnershipIntroProps> = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center p-4 flex flex-col items-center space-y-6"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Pulsing background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-indigo-600 to-teal-400 rounded-full blur-xl opacity-70 animate-pulse" />
        <div className="relative w-16 h-16 bg-white/20 dark:bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20">
          <EmailIcon className="w-8 h-8 text-teal-300 drop-shadow-lg" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
        Quer fazer uma parceria comigo?
      </h2>
      
      <p className="text-base text-gray-600 dark:text-gray-300 max-w-sm">
        Então clique no botão abaixo agora e vamos fazer essa ideia acontecer!
      </p>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="relative group overflow-hidden px-8 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:brightness-110 focus:ring-pink-400 dark:focus:ring-cyan-400 shadow-lg"
      >
        {/* Shine effect */}
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
        Vamos Conversar!
      </motion.button>
    </motion.div>
  );
};

export default PartnershipIntro;
