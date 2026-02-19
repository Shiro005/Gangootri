import React from 'react';
import { Zap, Activity, TrendingUp, CircleDot } from 'lucide-react';

const Header = ({ marketStatus, strategyName }) => {
  return (
   <div className="backdrop-blur-sm bg-gray-800/20 border-b-2 border-purple-500 p-4 mb-4 shadow-xl shadow-black/20">
      {/* Top Row - Logo and Market Status */}
      <div className="flex items-center justify-between mb-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-purple-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Gangootri
            </h1>
            <span className="text-sm text-[#9AA0A6]">Live Paper Trading Model - WebReich</span>
          </div>
        </div>

        {/* Market Status Chip */}
        <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg
          ${marketStatus === 'OPEN' 
            ? 'bg-[#00C853]/10 border border-[#00C853]/30' 
            : 'bg-[#1A1E24] border border-[#2A2E35]'
          }
        `}>
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${marketStatus === 'OPEN' ? 'bg-[#00C853]' : 'bg-[#6B7280]'}`} />
            {marketStatus === 'OPEN' && (
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
            )}
          </div>
          <span className={`text-sm font-medium ${marketStatus === 'OPEN' ? 'text-[#00C853]' : 'text-[#9AA0A6]'}`}>
            {marketStatus === 'OPEN' ? 'LIVE' : 'CLOSED'}
          </span>
        </div>
      </div>

      {/* Bottom Row - Strategy */}
      <div className="flex items-center gap-3 text-sm">
        <Activity size={16} className="text-[#FF9800]" />
        <span className="text-[#9AA0A6]">Active Strategy:</span>
        <span className="font-semibold text-white bg-[#1A1E24] px-3 py-1 rounded-lg border border-[#2A2E35]">
          {strategyName}
        </span>
      </div>
    </div>
  );
};

export default Header;