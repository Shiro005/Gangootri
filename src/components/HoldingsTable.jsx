import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const HoldingsTable = ({ holdings }) => {
  const totalPnL = holdings.reduce((sum, h) => sum + (h.pnl || 0), 0);
  const winningTrades = holdings.filter(h => (h.pnl || 0) > 0).length;

  return (
    <div className="backdrop-blur-xl bg-gray-900/80 rounded-xl border border-[#2A2E35] p-5 mb-6 shadow-xl shadow-black/50">
      {/* Header with stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[#FF9800]" />
          <h2 className="text-base font-semibold text-white">Active Positions</h2>
        </div>
        
        {holdings.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1E24] rounded-md border border-[#2A2E35]">
              <span className="text-xs text-[#9AA0A6]">Winning:</span>
              <span className="text-xs font-medium text-[#00C853]">{winningTrades}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1E24] rounded-md border border-[#2A2E35]">
              <span className="text-xs text-[#9AA0A6]">Total P&L:</span>
              <span className={`text-xs font-medium ${totalPnL >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                ₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#2A2E35]">
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Symbol</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Quantity</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Buy Price</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Current</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">P&L</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Returns</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-[#1A1E24] rounded-full flex items-center justify-center mb-2">
                      <Activity size={20} className="text-[#2A2E35]" />
                    </div>
                    <p className="text-sm text-[#9AA0A6]">No active positions</p>
                    <p className="text-xs text-[#6B7280] mt-1">Your holdings will appear here</p>
                  </div>
                </td>
              </tr>
            ) : (
              holdings.map((h, i) => {
                const pnl = h.pnl || 0;
                const returns = ((h.current_price - h.buy_price) / h.buy_price * 100) || 0;
                
                return (
                  <tr 
                    key={i} 
                    className="border-b border-[#2A2E35] hover:bg-[#1A1E24] transition-colors duration-150 group"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm font-medium text-white">{h.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-[#9AA0A6]">{h.quantity}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-[#9AA0A6]">
                        ₹{h.buy_price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium text-white">
                        ₹{h.current_price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        {pnl >= 0 ? (
                          <TrendingUp size={14} className="text-[#00C853]" />
                        ) : (
                          <TrendingDown size={14} className="text-[#FF3B3B]" />
                        )}
                        <span className={`text-sm font-medium ${pnl >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                          ₹{Math.abs(pnl).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#1A1E24] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              returns >= 0 ? 'bg-[#00C853]' : 'bg-[#FF3B3B]'
                            }`}
                            style={{ width: `${Math.min(Math.abs(returns), 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${returns >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                          {returns >= 0 ? '+' : ''}{returns.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with summary */}
      {holdings.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2A2E35]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]" />
              <span className="text-xs text-[#9AA0A6]">Profitable: {winningTrades}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
              <span className="text-xs text-[#9AA0A6]">Loss: {holdings.length - winningTrades}</span>
            </div>
          </div>
          <span className="text-xs text-[#6B7280]">{holdings.length} active positions</span>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;