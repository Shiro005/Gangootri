import React from 'react';
import { History, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const TradesTable = ({ trades }) => {
  const recentTrades = trades.slice(-5).reverse();
  const winningTrades = recentTrades.filter(t => (t.pnl || 0) > 0).length;
  const totalPnL = recentTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);

  return (
    <div className="backdrop-blur-xl bg-[#0B0F15]/80 rounded-xl border border-[#2A2E35] p-5 shadow-xl shadow-black/50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <History size={18} className="text-[#FF9800]" />
          <h2 className="text-base font-semibold text-white">Recent Trades</h2>
        </div>
        
        {recentTrades.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1E24] rounded-md border border-[#2A2E35]">
              <span className="text-xs text-[#9AA0A6]">Win rate:</span>
              <span className="text-xs font-medium text-[#00C853]">
                {((winningTrades / recentTrades.length) * 100).toFixed(0)}%
              </span>
            </div>
            <div className={`px-2 py-1 rounded-md ${totalPnL >= 0 ? 'bg-[#00C853]/10' : 'bg-[#FF3B3B]/10'}`}>
              <span className={`text-xs font-medium ${totalPnL >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)}
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
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Time</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Symbol</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Action</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Quantity</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Price</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">P&L</th>
              <th className="text-left py-3 text-xs font-medium text-[#9AA0A6] uppercase tracking-wider">Returns</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-[#1A1E24] rounded-full flex items-center justify-center mb-2">
                      <History size={20} className="text-[#2A2E35]" />
                    </div>
                    <p className="text-sm text-[#9AA0A6]">No trades yet</p>
                    <p className="text-xs text-[#6B7280] mt-1">Your trade history will appear here</p>
                  </div>
                </td>
              </tr>
            ) : (
              recentTrades.map((t, i) => {
                const returns = ((t.pnl || 0) / (t.price * t.quantity) * 100) || 0;
                
                return (
                  <tr 
                    key={i} 
                    className="border-b border-[#2A2E35] hover:bg-[#1A1E24] transition-colors duration-150 group"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#6B7280]" />
                        <span className="text-xs text-[#9AA0A6]">{t.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm font-medium text-white">{t.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border ${
                        t.action === 'BUY' 
                          ? 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/30' 
                          : 'bg-[#FF3B3B]/10 text-[#FF3B3B] border-[#FF3B3B]/30'
                      }`}>
                        {t.action === 'BUY' ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        <span className="text-xs font-medium">{t.action}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-[#9AA0A6]">{t.quantity}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-[#9AA0A6]">
                        ₹{t.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        {(t.pnl || 0) >= 0 ? (
                          <TrendingUp size={14} className="text-[#00C853]" />
                        ) : (
                          <TrendingDown size={14} className="text-[#FF3B3B]" />
                        )}
                        <span className={`text-sm font-medium ${(t.pnl || 0) >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                          {t.pnl ? `₹${Math.abs(t.pnl).toFixed(2)}` : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      {t.pnl && (
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-[#1A1E24] rounded-full overflow-hidden">
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
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with summary */}
      {recentTrades.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2A2E35]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]" />
              <span className="text-xs text-[#9AA0A6]">Wins: {winningTrades}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
              <span className="text-xs text-[#9AA0A6]">Losses: {recentTrades.length - winningTrades}</span>
            </div>
          </div>
          <span className="text-xs text-[#6B7280]">{recentTrades.length} recent trades</span>
        </div>
      )}
    </div>
  );
};

export default TradesTable;