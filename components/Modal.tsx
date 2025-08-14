
import React from 'react';
import { CloseIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string | null;
  hideActions?: boolean;
  confirmButtonClass?: string;
  size?: 'md' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onConfirm, children, confirmText, cancelText, hideActions = false, confirmButtonClass, size = 'md' }) => {
  if (!isOpen) return null;

  const containerClasses = `
    relative w-full
    ${size === 'xl' ? 'max-w-3xl aspect-video' : 'max-w-md'}
    ${size === 'xl' ? 'p-0 bg-black' : 'p-6 bg-white dark:bg-gray-800'}
    rounded-2xl shadow-2xl
    ${size === 'xl' ? 'border-none' : 'border border-gray-200 dark:border-gray-700'}
    transform transition-all duration-300 ease-out scale-95 animate-modal-in
  `;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={containerClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <button
            onClick={onClose}
            className={`absolute top-3 right-3 text-gray-400 transition-colors p-2 rounded-full z-10 ${size === 'xl' ? 'hover:text-white bg-black/50' : 'hover:text-gray-600 dark:hover:text-white'}`}
            aria-label="Fechar modal"
        >
            <CloseIcon className="w-5 h-5" />
        </button>
        
        {title && <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-8">{title}</h3>}
        
        <div className={!hideActions && title ? 'mb-6' : ''}>
          {children}
        </div>

        {!hideActions && (
            <div className="flex justify-end space-x-3 sm:space-x-4">
            {cancelText !== null && (
                <button
                    onClick={onClose}
                    className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    {cancelText || 'Cancelar'}
                </button>
            )}
            <button
                onClick={onConfirm}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 ${
                    confirmButtonClass
                        ? confirmButtonClass
                        : 'bg-pink-500 dark:bg-cyan-500 hover:bg-pink-600 dark:hover:bg-cyan-600 focus:ring-pink-400 dark:focus:ring-cyan-400'
                }`}
            >
                {confirmText || 'Confirmar'}
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
