
import React from 'react';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-gray-100 dark:bg-black/20 p-3 rounded-xl text-center backdrop-blur-sm shadow-lg transition-transform hover:scale-105 border border-gray-200 dark:border-gray-700">
    <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-500 dark:text-pink-400">{value}</p>
    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{label}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <>
        <div className="text-center text-sm space-y-3 text-gray-600 dark:text-gray-300 mb-6">
            <p>Influenciadora digital e futura fisioterapeuta pela Unicesumar, apaixonada por criar conteúdo que inspira e conecta.</p>
            <p>Com uma presença consolidada no TikTok e Instagram, busco sempre inovar e trazer autenticidade para minha audiência.</p>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-center mb-4 text-pink-500 dark:text-pink-400">Destaques</h3>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            <StatCard value="+300 Mil" label="Seguidores no TikTok" />
            <StatCard value="+100 Mil" label="Seguidores no Instagram" />
            <StatCard value="+10 Milhões" label="Views nos últimos 3 meses" />
            <StatCard value="+6 Milhões" label="Views Totais no TikTok" />
            <StatCard value="+4.5 Milhões" label="Views Totais no Instagram" />
            <StatCard value="+1 Milhão" label="Contas alcançadas/mês" />
        </div>
    </>
  );
};

export default AboutPage;