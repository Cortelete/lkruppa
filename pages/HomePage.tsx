
import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, wrap, useMotionValueEvent } from 'framer-motion';
import LinkButton from '../components/LinkButton';
import { InstagramIcon, TiktokIcon, EmailIcon, LinkedinIcon, YoutubeIcon } from '../components/icons';

interface HomePageProps {
  onNavigate: (url: string, title: string, content: string, confirmButtonClass?: string) => void;
  onShowAbout: () => void;
  onShowConstructionModal: () => void;
  onShowPartnershipForm: () => void;
  onShowVideoModal: () => void;
}

interface LinkData {
  text: string;
  icon: React.ReactNode;
  action: () => void;
  styling: {
    textColor: string;
    hoverTextColor: string;
    borderColor: string;
    effectClass?: string;
    gradientClass?: string;
  };
  isInactive?: boolean;
  hasShineEffect?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShowAbout, onShowConstructionModal, onShowPartnershipForm, onShowVideoModal }) => {
  const links: LinkData[] = [
    {
      text: 'Insta',
      icon: <InstagramIcon />,
      action: () => onNavigate('https://www.instagram.com/luizaalk_/', 'Abrir Instagram', 'Você será redirecionado para o perfil da Luiza no Instagram.', 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500'),
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'insta-border',
      },
    },
    {
      text: 'TikTok +300K',
      icon: <TiktokIcon className="filter-3d-effect" />,
      action: () => onNavigate('https://www.tiktok.com/@luizakruppa0', 'Abrir TikTok', 'Você será redirecionado para o perfil da Luiza no TikTok.', 'bg-red-500 hover:bg-red-600 dark:bg-sky-400 dark:hover:bg-sky-500 focus:ring-red-400 dark:focus:ring-sky-300'),
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'tiktok-border',
        effectClass: 'text-3d-effect',
      },
    },
    {
      text: 'Parcerias',
      icon: <EmailIcon />,
      action: onShowPartnershipForm,
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'partnership-border',
        gradientClass: 'bg-gradient-to-br from-teal-400 via-indigo-600 to-teal-400 animated-gradient-bg'
      },
      hasShineEffect: true,
    },
    {
      text: 'Sobre Mim',
      icon: <span className="text-2xl">✨</span>,
      action: onShowAbout,
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'about-border',
        gradientClass: 'bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 animated-gradient-bg'
      },
      hasShineEffect: true,
    },
    {
      text: 'LinkedIn',
      icon: <LinkedinIcon />,
      action: onShowConstructionModal,
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'linkedin-border',
        gradientClass: 'bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-700 animated-gradient-bg'
      },
      hasShineEffect: true,
    },
    {
      text: 'Youtube',
      icon: <YoutubeIcon />,
      action: onShowConstructionModal,
      styling: {
        textColor: 'text-white',
        hoverTextColor: 'group-hover:text-white',
        borderColor: 'youtube-border',
        gradientClass: 'bg-gradient-to-br from-red-600 via-rose-400 to-red-600 animated-gradient-bg'
      },
      hasShineEffect: true,
    },
  ];

  // Duplicating links for the infinite effect
  const duplicatedLinks = [...links, ...links];
  
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  
  // The scroll velocity in pixels per second
  const scrollVelocity = -25;
  const x = useMotionValue(0);
  
  // Width of one set of links. 6 cards * (176px width + 16px gap) = 1152
  const singleSetWidth = 1152;
  
  useAnimationFrame((time, delta) => {
      // Pause animation if user is interacting
      if (isHovering.current || isDragging.current) return;
      
      let moveBy = scrollVelocity * (delta / 1000);
      x.set(x.get() + moveBy);
  });

  // This hook listens for changes to the x motion value and wraps it
  // when it goes outside the bounds of a single set. This works for
  // both the auto-scroll and manual drag, creating a true infinite loop.
  useMotionValueEvent(x, "change", (latest) => {
    const wrapped = wrap(-singleSetWidth, 0, latest);
    if (latest !== wrapped) {
      x.set(wrapped);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-4 animate-fade-in">
      <div className="relative w-44 h-44 md:w-56 md:h-56">
        {/* Animated Border */}
        <div className="absolute -inset-0.5 rounded-full bg-pink-400 dark:bg-cyan-400 [animation:border-pulse_4s_ease-in-out_infinite]" />
        
        {/* Inner spacing to make the outer div look like a border */}
        <div 
          onClick={onShowVideoModal}
          className="relative group w-full h-full rounded-full overflow-hidden p-1 bg-white/30 dark:bg-black/30 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            <img src="/profile.png" alt="Luiza Kruppa" className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:brightness-75" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
            </div>
        </div>
      </div>
      <h1 className="
          relative group
          text-3xl md:text-4xl font-bold mt-2 tracking-tight
          bg-gradient-to-r 
          from-pink-500 to-purple-600
          dark:from-cyan-400 dark:to-blue-500
          hover:from-cyan-400 hover:to-blue-500
          dark:hover:from-pink-500 dark:hover:to-purple-600
          bg-clip-text text-transparent
          cursor-default
          transition-all duration-500 ease-in-out
          transform hover:scale-105
        ">
        LK
      </h1>
      <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
        Luiza Kruppa
      </p>
      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 mt-0.5">
        Fisioterapeuta em formação & Digital Influencer
      </p>
       <p className="text-xs text-gray-700 dark:text-gray-200 mt-1 italic px-4 text-center">
        "Transformando movimento em arte e inspiração no digital."
      </p>

      <div className="w-full mt-6 overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
            className="flex gap-4"
            style={{ x }}
            drag="x"
            onHoverStart={() => (isHovering.current = true)}
            onHoverEnd={() => (isHovering.current = false)}
            onDragStart={() => (isDragging.current = true)}
            onDragEnd={() => (isDragging.current = false)}
        >
            {duplicatedLinks.map((link, index) => (
              <LinkButton
                key={`${link.text}-${index}`}
                text={link.text}
                icon={link.icon}
                onClick={link.action}
                styling={link.styling}
                isInactive={link.isInactive}
                hasShineEffect={link.hasShineEffect}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
