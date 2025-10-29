import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Animation variants for individual items
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <motion.div 
    className="relative group bg-gray-100/80 dark:bg-black/30 p-3 rounded-xl backdrop-blur-sm shadow-lg border border-gray-200/80 dark:border-white/10 flex flex-col justify-center items-center h-24 sm:h-28 text-center transition-all duration-300 ease-out transform hover:scale-[1.07]"
    variants={itemVariants}
  >
    {/* Pulsing glow effect on hover */}
    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300 group-hover:animate-pulse pointer-events-none" />
    
    {/* Content needs to be relative to sit above the glow */}
    <div className="relative z-10 flex flex-col items-center justify-center">
        <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            {value}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-tight">{label}</p>
    </div>
  </motion.div>
);

const statsData = [
    { value: "+530 Mil", label: "no TikTok" },
    { value: "+115 Mil", label: "no Instagram" },
    { value: "+20 Milhões", label: "de Views (3 meses)" },
    { value: "+15 milhões", label: "Views no TikTok" },
    { value: "+10 Milhões", label: "Views no Instagram" },
    { value: "+1,5 Milhão", label: "Contas/mês" },
];

const HighlightsPage: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-1"
    >
        <motion.div
            variants={itemVariants}
            className="bg-white/30 dark:bg-black/20 p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-lg space-y-4"
        >
            <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animated-gradient-bg bg-clip-text text-transparent pb-1">
                    Destaques
                </h3>
            </div>

            <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
            >
                {statsData.map((stat, index) => (
                    <StatCard key={index} value={stat.value} label={stat.label} />
                ))}
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default HighlightsPage;