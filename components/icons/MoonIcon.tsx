
import React from 'react';

const MoonIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* Star 1 */}
        <path strokeWidth="1" d="M16 3.5L16.2929 4.20711L17 4.5L16.2929 4.79289L16 5.5L15.7071 4.79289L15 4.5L15.7071 4.20711L16 3.5Z" fill="currentColor"></path>
        {/* Star 2 */}
        <path strokeWidth="0.8" d="M18.5 7.5L18.7123 7.91231L19.125 8L18.7123 8.08769L18.5 8.5L18.2877 8.08769L17.875 8L18.2877 7.91231L18.5 7.5Z" fill="currentColor"></path>
        {/* Main Moon */}
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

export default MoonIcon;