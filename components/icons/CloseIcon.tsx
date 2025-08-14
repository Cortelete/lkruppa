
import React from 'react';

const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default CloseIcon;