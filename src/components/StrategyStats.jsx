import React from 'react';
import { TrendingUp, Target, DollarSign, BarChart3, IndianRupee } from 'lucide-react';

const statsConfig = [
  { 
    key: 'win_rate', 
    icon: TrendingUp, 
    label: 'Win Rate', 
    suffix: '%',
    gradient: 'from-[#00C853] to-[#00E676]'
  },
  { 
    key: 'profit_factor', 
    icon: Target, 
    label: 'Profit Factor', 
    suffix: '',
    gradient: 'from-[#FF9800] to-[#FFB74D]'
  },
  { 
    key: 'avg_win', 
    icon: IndianRupee, 
    label: 'Avg Win', 
    prefix: '₹',
    gradient: 'from-[#00C853] to-[#00E676]'
  },
  { 
    key: 'avg_loss', 
    icon: BarChart3, 
    label: 'Avg Loss', 
    prefix: '₹',
    gradient: 'from-[#FF3B3B] to-[#FF6B6B]'
  },
];

const StrategyStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {statsConfig.map(({ key, icon: Icon, label, prefix = '', suffix = '', gradient }) => (
        <div
          key={key}
          className="relative backdrop-blur-sm bg-gray-800/20 border-b-2 border-purple-500 p-4 overflow-hidden group hover:border-[#3A3E45] transition-all duration-300"
        >
          {/* Background gradient effect on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative">
            {/* Top section with icon */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${gradient} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-100 uppercase tracking-wider">
                  {label}
                </span>
              </div>
              
              {/* Mini chart indicator */}
              <div className="flex gap-0.5">
                <div className={`w-1 h-4 ${key.includes('win') || key.includes('profit') ? 'bg-[#00C853]' : 'bg-[#FF3B3B]'} rounded-full opacity-30`} />
                <div className={`w-1 h-6 ${key.includes('win') || key.includes('profit') ? 'bg-[#00C853]' : 'bg-[#FF3B3B]'} rounded-full opacity-60`} />
                <div className={`w-1 h-3 ${key.includes('win') || key.includes('profit') ? 'bg-[#00C853]' : 'bg-[#FF3B3B]'} rounded-full opacity-30`} />
              </div>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">
                {prefix}{typeof stats[key] === 'number' ? stats[key].toFixed(2) : stats[key] || 0}{suffix}
              </span>
            </div>

            {/* Performance indicator */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-1 flex-1 bg-[#1A1E24] rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
                  style={{ 
                    width: `${Math.min(Math.abs((stats[key] || 0) / 2), 100)}%` 
                  }}
                />
              </div>
              <span className="text-xs text-[#6B7280]">50 trades</span>
            </div>
          </div>

          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full`} />
        </div>
      ))}
    </div>
  );
};

export default StrategyStats;