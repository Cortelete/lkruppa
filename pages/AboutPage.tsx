import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
    ContentCreationIcon,
    DanceIcon,
    CommunicationIcon,
    PhysiotherapyIcon
} from '../components/icons';

// Animation variants for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const SkillCard: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -5 }}
        className="flex flex-col items-center justify-center text-center p-3 space-y-2 bg-gray-200/50 dark:bg-white/10 rounded-lg transition-colors duration-300 hover:bg-gray-200/80 dark:hover:bg-white/20 border border-transparent hover:border-white/20"
    >
        <div className="text-pink-500 dark:text-cyan-400">{icon}</div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{text}</span>
    </motion.div>
);

const skills = [
    { text: "Criação de Conteúdo", icon: <ContentCreationIcon className="w-6 h-6" /> },
    { text: "Dança & Performance", icon: <DanceIcon className="w-6 h-6" /> },
    { text: "Comunicação", icon: <CommunicationIcon className="w-6 h-6" /> },
    { text: "Fisioterapia", icon: <PhysiotherapyIcon className="w-6 h-6" /> }
];


const AboutPage: React.FC = () => {
    const animatedGradientText = "bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 dark:from-cyan-400 dark:to-blue-500 dark:to-cyan-400 animated-gradient-bg bg-clip-text text-transparent";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-1"
    >
        <motion.div
            variants={itemVariants}
            className="bg-white/30 dark:bg-black/20 p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-lg"
        >
            <motion.div
                variants={containerVariants}
                className="space-y-6"
            >
                {/* Header with Name and Class */}
                <motion.div variants={itemVariants} className="text-center space-y-1">
                    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${animatedGradientText}`}>
                        Luiza Kruppa
                    </h2>
                    <p className={`text-base font-medium ${animatedGradientText}`}>
                        Digital Influencer & Fisioterapeuta
                    </p>
                </motion.div>

                {/* "Quem sou eu" Section */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <h3 className={`text-lg font-bold tracking-wide ${animatedGradientText}`}>
                        Quem sou eu
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                        Atualmente finalizando minha graduação em <strong>Fisioterapia</strong>, divido minha paixão entre a ciência do movimento e a arte da comunicação digital. Como <strong>Influenciadora</strong>, busco criar conteúdo autêntico que inspira, diverte e conecta.
                    </p>
                </motion.div>

                {/* Skills Section */}
                <motion.div variants={itemVariants} className="space-y-3">
                     <h3 className={`text-lg font-bold tracking-wide ${animatedGradientText}`}>
                        Habilidades
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 gap-3"
                    >
                        {skills.map((skill) => (
                           <SkillCard key={skill.text} icon={skill.icon} text={skill.text} />
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default AboutPage;