
import React from 'react';

const ConstructionIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2l4 4"></path>
    <path d="M12 20v-4"></path>
    <path d="M4 14a2 2 0 012-2h7a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"></path>
    <path d="M18 10l4 4"></path>
    <path d="M16 18l-4-4"></path>
    <path d="M6 10l-4 4"></path>
    <path d="M8 18l4-4"></path>
  </svg>
);

export default ConstructionIcon;
