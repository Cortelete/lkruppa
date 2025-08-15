
import React from 'react';
import { motion } from 'framer-motion';
import { SuccessIcon, ErrorIcon } from './icons';

interface StatusViewProps {
  status: 'success' | 'error';
  title: string;
  message: string;
  children: React.ReactNode;
}

const StatusView: React.FC<StatusViewProps> = ({ status, title, message, children }) => {
  const isSuccess = status === 'success';
  const Icon = isSuccess ? SuccessIcon : ErrorIcon;
  const colorClasses = isSuccess
    ? 'text-green-500 from-green-400 via-emerald-500 to-green-400'
    : 'text-red-500 from-red-500 via-rose-600 to-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center p-4 flex flex-col items-center space-y-6"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse bg-gradient-to-br ${colorClasses}`} />
        <div className="relative w-16 h-16 bg-white/20 dark:bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20">
          <Icon className={`w-10 h-10 ${isSuccess ? 'text-green-400' : 'text-red-400'} drop-shadow-lg`} />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
        {title}
      </h2>
      
      <p className="text-base text-gray-600 dark:text-gray-300 max-w-sm">
        {message}
      </p>
      
      <div className="w-full flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
          {children}
      </div>
    </motion.div>
  );
};

export default StatusView;
