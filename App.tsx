
import React, { useState, useEffect, useCallback } from 'react';
import { Theme, ModalState } from './types';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Modal from './components/Modal';
import PartnershipForm from './components/PartnershipForm';

const contactEmail = 'luizakruppacontato@gmail.com';

// Componente para o conteúdo do modal de envio manual
const ManualEmailContent: React.FC<{ formData: any, onClose: () => void }> = ({ formData, onClose }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copiar');
    const [emailCopyButtonText, setEmailCopyButtonText] = useState('Copiar');
    const [ariaLiveMessage, setAriaLiveMessage] = useState('');

    const dataToCopy = `
Olá!

Tentei enviar uma mensagem pelo formulário do site, mas ocorreu um erro. Seguem os dados que preenchi:

- Nome: ${formData.name}
- Empresa/Marca: ${formData.company || 'Não informado'}
- E-mail para contato: ${formData.email}
- Motivo do Contato: ${formData.reasons.join(', ')}
- Mensagem Adicional: ${formData.message || 'Nenhuma'}

Obrigado(a)!
    `.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(dataToCopy).then(() => {
            setCopyButtonText('Copiado!');
            setAriaLiveMessage('Conteúdo copiado para a área de transferência.');
            setTimeout(() => setCopyButtonText('Copiar'), 2000);
        }).catch(err => {
            console.error('Falha ao copiar:', err);
            setCopyButtonText('Erro!');
            setAriaLiveMessage('Erro ao copiar o conteúdo.');
            setTimeout(() => setCopyButtonText('Copiar'), 2000);
        });
    };
    
    const handleCopyEmail = () => {
        navigator.clipboard.writeText(contactEmail).then(() => {
            setEmailCopyButtonText('Copiado!');
            setAriaLiveMessage('E-mail copiado para a área de transferência.');
            setTimeout(() => setEmailCopyButtonText('Copiar'), 2000);
        }).catch(err => {
            console.error('Falha ao copiar e-mail:', err);
            setEmailCopyButtonText('Erro!');
            setAriaLiveMessage('Erro ao copiar o e-mail.');
            setTimeout(() => setEmailCopyButtonText('Copiar'), 2000);
        });
    };
    
    return (
      <div className="space-y-4">
        {/* Visually hidden assertive live region for accessibility */}
        <span className="sr-only" role="status" aria-live="assertive">{ariaLiveMessage}</span>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Como alternativa, copie as informações abaixo e envie para nosso e-mail de contato.
        </p>
        
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">E-mail para contato:</p>
            <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-base font-semibold text-pink-600 dark:text-cyan-400 break-all select-all">{contactEmail}</p>
                <button
                    onClick={handleCopyEmail}
                    className="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Copiar e-mail"
                >
                    {emailCopyButtonText}
                </button>
            </div>
        </div>
        
        <div className="relative bg-white dark:bg-gray-800 p-3 pr-20 rounded-lg text-left shadow-inner border border-gray-200 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Conteúdo para copiar:</p>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono break-words">
                <code>{dataToCopy}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-1/2 right-2 -translate-y-1/2 px-4 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
                {copyButtonText}
            </button>
        </div>
        
        <div className="flex justify-end pt-2">
           <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Fechar
            </button>
        </div>
      </div>
    );
};

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
  
  const handleShowManualEmail = useCallback((formData: any) => {
    setModalState({
        isOpen: true,
        title: "Envio Manual por E-mail",
        content: <ManualEmailContent formData={formData} onClose={closeModal} />,
        onConfirm: () => {},
        hideActions: true,
    });
  }, [closeModal]);

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
        content: <PartnershipForm onClose={closeModal} onShowManualEmail={handleShowManualEmail} />,
        onConfirm: () => {},
        hideActions: true,
    });
  }, [closeModal, handleShowManualEmail]);

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
      <div className="relative w-full max-w-lg bg-white/20 dark:bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden max-h-[98vh]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat opacity-10 dark:opacity-20 bg-center"
          style={{ backgroundImage: "url('/fotofundo.png')" }}
          aria-hidden="true"
        />
        <div className="relative p-2 sm:p-4 overflow-y-auto">
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
