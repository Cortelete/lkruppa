
import React, { useState, useEffect, useCallback } from 'react';
import { Theme, ModalState } from './types';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Modal from './components/Modal';
import PartnershipForm from './components/PartnershipForm';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT;
  });
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    content: null,
    onConfirm: () => {},
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };
  
  const closeModal = useCallback(() => {
    setModalState(prevState => ({ ...prevState, isOpen: false }));
  }, []);

  const handleNavigation = useCallback((url: string, title: string, content: string, confirmButtonClass?: string) => {
    setModalState({
      isOpen: true,
      title,
      content: (
        <div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{content}</p>
        </div>
      ),
      onConfirm: () => window.open(url, '_blank', 'noopener,noreferrer'),
      confirmButtonClass,
    });
  }, []);

  const handleShowAbout = useCallback(() => {
    setModalState({
        isOpen: true,
        title: "Sobre Mim",
        content: <AboutPage />,
        onConfirm: () => {},
        hideActions: true,
    });
  }, []);

  const handleShowConstructionModal = useCallback(() => {
    setModalState({
        isOpen: true,
        title: "Em Breve!",
        content: <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Esta seção está em construção para uma melhor experiência.</p>,
        onConfirm: closeModal,
        confirmText: "Entendi",
        cancelText: null, // Hides the cancel button
    });
  }, [closeModal]);

  const handleShowPartnershipForm = useCallback(() => {
    setModalState({
        isOpen: true,
        title: "Contato para Parcerias",
        content: <PartnershipForm onClose={closeModal} />,
        onConfirm: () => {},
        hideActions: true,
    });
  }, [closeModal]);

  const handleShowEasterEggModal = useCallback(() => {
    setModalState({
        isOpen: true,
        title: "Opa!",
        content: <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">Ah curioso 👀, já que veio aqui, corre lá no TikTok e veja meu último vídeo!! 💃🕺</p>,
        onConfirm: () => window.open('https://www.tiktok.com/@luizakruppa0', '_blank', 'noopener,noreferrer'),
        confirmText: "Ir para o TikTok",
        cancelText: "Fechar",
        confirmButtonClass: 'bg-red-500 hover:bg-red-600 dark:bg-sky-400 dark:hover:bg-sky-500 focus:ring-red-400 dark:focus:ring-sky-300',
    });
  }, []);
  
  const handleShowVideoModal = useCallback(() => {
    setModalState({
        isOpen: true,
        title: "",
        content: (
            <video
                src="/profile-video.mp4"
                className="w-full h-full object-cover rounded-2xl"
                controls
                autoPlay
                muted
                loop
                playsInline
            >
                Seu navegador não suporta a tag de vídeo.
            </video>
        ),
        onConfirm: () => {},
        hideActions: true,
        size: 'xl',
    });
  }, []);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-500 flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-lg bg-white/20 dark:bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 p-2 sm:p-4 overflow-y-auto max-h-[98vh]">
        <div className="absolute top-4 left-4 z-10">
            <button
                onClick={handleShowEasterEggModal}
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 transform hover:scale-110 hover:text-pink-500 dark:hover:text-cyan-400 focus:outline-none"
                aria-label="Easter egg"
            >
                LK
            </button>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        
        <main className="transition-opacity duration-500">
          <HomePage onNavigate={handleNavigation} onShowAbout={handleShowAbout} onShowConstructionModal={handleShowConstructionModal} onShowPartnershipForm={handleShowPartnershipForm} onShowVideoModal={handleShowVideoModal} />
        </main>
        
        <Footer />
      </div>

      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        onClose={closeModal}
        onConfirm={() => {
          modalState.onConfirm();
          closeModal();
        }}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        hideActions={modalState.hideActions}
        confirmButtonClass={modalState.confirmButtonClass}
        size={modalState.size}
      >
        {modalState.content}
      </Modal>
    </div>
  );
};

export default App;
