
import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmationViewProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string | null;
  confirmButtonClass?: string;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  icon,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmButtonClass = 'bg-pink-500 dark:bg-cyan-500 hover:bg-pink-600 dark:hover:bg-cyan-600 focus:ring-pink-400 dark:focus:ring-cyan-400',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center p-4 flex flex-col items-center space-y-6"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Pulsing background glow */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse ${confirmButtonClass}`} />
        <div className="relative w-16 h-16 bg-white/20 dark:bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20">
          {icon}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
        {title}
      </h2>
      
      <p className="text-base text-gray-600 dark:text-gray-300 max-w-sm">
        {message}
      </p>

      <div className="w-full flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
        {cancelText !== null && (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {cancelText}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className={`relative group overflow-hidden w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${confirmButtonClass}`}
        >
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
          {confirmText}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConfirmationView;
