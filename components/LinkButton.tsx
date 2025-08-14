import React from 'react';

interface StylingProps {
  textColor: string;
  hoverTextColor: string;
  borderColor: string;
  effectClass?: string;
  gradientClass?: string;
}

interface LinkButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  styling: StylingProps;
  isInactive?: boolean;
  hasShineEffect?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, icon, onClick, styling, isInactive = false, hasShineEffect = false }) => {
  const containerClasses = `
    relative group w-44 h-56 flex-shrink-0
  `;
  
  const buttonClasses = `
    relative w-full h-full rounded-xl overflow-hidden
    p-2 flex flex-col items-center justify-center
    ${styling.gradientClass
      ? styling.gradientClass
      : 'bg-gray-900/40 dark:bg-black/30 backdrop-blur-sm'
    }
    border border-white/10
    transition-all duration-300
    focus:outline-none
    ${isInactive 
      ? 'opacity-60 grayscale cursor-not-allowed' 
      : `hover:scale-105 ${styling.gradientClass ? 'hover:brightness-110' : 'hover:bg-gray-900/60 dark:hover:bg-black/50'} focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-white/50`
    }
  `;

  const animatedBorderClasses = `
    absolute -inset-0.5
    rounded-xl
    ${styling.borderColor}
    opacity-70 group-hover:opacity-100
    transition-opacity duration-300
    [animation:border-pulse_4s_ease-in-out_infinite]
    pointer-events-none
  `;

  const contentContainerClasses = `
    relative z-10 flex flex-col items-center justify-center
    transition-all duration-300
    group-hover:-translate-y-2
    ${styling.textColor} ${styling.hoverTextColor}
  `;
  
  const iconClasses = `
    w-10 h-10 mb-3 flex items-center justify-center
    transition-colors duration-300
  `;

  const textClasses = `
    text-center text-sm font-semibold
    transition-colors duration-300
    ${styling.effectClass || ''}
  `;

  return (
    <div
      className={containerClasses}
    >
      <button onClick={onClick} className={buttonClasses} disabled={isInactive}>
        {/* Glow effect on hover */}
        <div className={`absolute -inset-1.5 rounded-xl ${styling.borderColor} blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`} />

        {/* Animated border */}
        <div className={animatedBorderClasses} />

        {/* Shine/Reflection effect */}
        {hasShineEffect && (
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 group-hover:left-full transition-all duration-700 ease-in-out" />
        )}
        
        <div className={contentContainerClasses}>
          <div className={iconClasses}>
            {icon}
          </div>
          <span className={textClasses}>
            {text}
          </span>
        </div>
      </button>
    </div>
  );
};

export default LinkButton;