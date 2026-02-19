import React from 'react';
import { Wallet, TrendingUp, Briefcase, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PortfolioCards = ({ portfolio }) => {
  const getCardStyle = (title, value) => {
    if (title === "Today's P&L") {
      return {
        gradient: value >= 0 ? 'from-[#00C853] to-[#00E676]' : 'from-[#FF3B3B] to-[#FF6B6B]',
        bgColor: value >= 0 ? 'bg-[#00C853]' : 'bg-[#FF3B3B]',
        textColor: value >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'
      };
    }
    if (title === 'Total Capital') {
      return {
        gradient: 'from-[#00C853] to-[#00E676]',
        bgColor: 'bg-[#00C853]',
        textColor: 'text-[#00C853]'
      };
    }
    return {
      gradient: 'from-[#FF9800] to-[#FFB74D]',
      bgColor: 'bg-[#FF9800]',
      textColor: 'text-[#FF9800]'
    };
  };

  const cards = [
    {
      icon: Wallet,
      title: 'Total Capital',
      value: portfolio.total_value || 0,
      change: portfolio.returns || 0,
      subtext: 'Overall Returns'
    },
    {
      icon: TrendingUp,
      title: "Today's P&L",
      value: portfolio.current_day_pnl || 0,
      change: ((portfolio.current_day_pnl || 0) / (portfolio.initial_capital || 1)) * 100,
      subtext: 'Daily Change'
    },
    {
      icon: Briefcase,
      title: 'Portfolio',
      value: portfolio.positions || 0,
      change: portfolio.trades_count || 0,
      subtext: 'Active Positions'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      {cards.map((card, i) => {
        const style = getCardStyle(card.title, card.value);
        const isPositive = card.value >= 0 || card.title === 'Portfolio';
        const formattedValue = card.title === 'Portfolio' 
          ? card.value 
          : `₹${card.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        return (
          <div
            key={i}
            className="relative backdrop-blur-sm bg-gray-800/20 rounded-xl border border-gray-100 p-4 group hover:border-[#3A3E45] transition-all duration-300"
          >
            {/* Background accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${style.gradient} opacity-5 rounded-bl-full`} />

            <div className="relative">
              {/* Top row with icon and trend */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${style.bgColor}/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={18} className={style.textColor} />
                </div>
                
                {card.title !== 'Portfolio' && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${style.bgColor}/10`}>
                    {isPositive ? (
                      <ArrowUpRight size={12} className={style.textColor} />
                    ) : (
                      <ArrowDownRight size={12} className={style.textColor} />
                    )}
                    <span className={`text-xs font-medium ${style.textColor}`}>
                      {isPositive ? '+' : ''}{card.change.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Value and label */}
              <div className="space-y-1">
                <span className="text-xs text-gray-100">{card.title}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">
                    {formattedValue}
                  </span>
                  {card.title === 'Portfolio' && (
                    <span className="text-xs text-[#6B7280]">positions</span>
                  )}
                </div>
              </div>

              {/* Footer with additional info */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-700">
                <span className="text-xs text-gray-100">{card.subtext}</span>
                <div className={`w-1 h-1 rounded-full ${style.bgColor} opacity-50 group-hover:opacity-100 transition-opacity`} />
              </div>
            </div>

            {/* Hover effect line */}
            <div className={`absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[${style.bgColor}]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioCards;