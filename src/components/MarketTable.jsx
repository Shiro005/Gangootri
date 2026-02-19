import React from 'react';
import { RefreshCw, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

const MarketTable = ({ data, onRefresh, lastUpdate }) => {
  const getSignalClass = (signal) => {
    const classes = {
      BUY: 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/30',
      SELL: 'bg-[#FF3B3B]/10 text-[#FF3B3B] border-[#FF3B3B]/30',
      HOLD: 'bg-[#FF9800]/10 text-[#FF9800] border-[#FF9800]/30',
      NEUTRAL: 'bg-[#6B7280]/10 text-[#9AA0A6] border-[#2A2E35]',
    };
    return classes[signal] || classes.NEUTRAL;
  };

  const getSignalIcon = (signal) => {
    switch(signal) {
      case 'BUY':
        return <TrendingUp size={12} className="ml-1" />;
      case 'SELL':
        return <TrendingDown size={12} className="ml-1" />;
      case 'HOLD':
        return <Minus size={12} className="ml-1" />;
      default:
        return null;
    }
  };

  const getRSIClass = (rsi) => {
    if (rsi >= 70) return 'text-[#FF3B3B]'; // Overbought
    if (rsi <= 30) return 'text-[#00C853]'; // Oversold
    return 'text-[#9AA0A6]'; // Neutral
  };

  return (
    <div className="backdrop-blur-sm bg-gray-800/20 rounded-xl border-t-2 border-purple-500 p-5 mb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-white">Market Scanner</h2>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1E24] rounded-md border border-[#2A2E35]">
            <Clock size={12} className="text-gray-100" />
            <span className="text-xs text-gray-100">{lastUpdate || '--:--:--'}</span>
          </div>
        </div>
        
        <button 
          onClick={onRefresh} 
          className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1E24] text-green-600 rounded-lg border border-[#2A2E35] hover:border-[#00C853]/50 hover:bg-[#00C853]/5 transition-all duration-300 group"
        >
          <RefreshCw size={14} className="text-gray-100 group-hover:text-[#00C853] group-hover:rotate-180 transition-all duration-500" />
          <span className="text-xs font-medium text-gray-100 group-hover:text-[#00C853]">Refresh</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#2A2E35]">
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">Symbol</th>
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">Price (₹)</th>
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">24h Change</th>
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">RSI</th>
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">Signal</th>
              <th className="text-left py-3 text-xs font-medium text-gray-100 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([symbol, stock], index) => (
              <tr 
                key={symbol} 
                className="border-b border-purple-500 hover:bg-[#1A1E24] transition-colors duration-150 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium text-white">{symbol}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-sm font-semibold text-white">
                    {stock.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    {stock.change >= 0 ? (
                      <TrendingUp size={14} className="text-[#00C853]" />
                    ) : (
                      <TrendingDown size={14} className="text-[#FF3B3B]" />
                    )}
                    <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change?.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-[#1A1E24] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          stock.rsi >= 70 ? 'bg-[#FF3B3B]' : 
                          stock.rsi <= 30 ? 'bg-[#00C853]' : 
                          'bg-[#FF9800]'
                        }`}
                        style={{ width: `${(stock.rsi / 100) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getRSIClass(stock.rsi)}`}>
                      {stock.rsi?.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border ${getSignalClass(stock.signal)}`}>
                    <span className="text-xs font-medium">
                      {stock.signal || 'NEUTRAL'}
                    </span>
                    {getSignalIcon(stock.signal)}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="relative">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        stock.signal === 'BUY' ? 'bg-[#00C853]' :
                        stock.signal === 'SELL' ? 'bg-[#FF3B3B]' :
                        'bg-[#FF9800]'
                      }`} />
                      {stock.signal === 'BUY' && (
                        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-[#00C853] animate-ping" />
                      )}
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      {stock.signal === 'BUY' ? 'Active' : 
                       stock.signal === 'SELL' ? 'Active' : 'Idle'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with summary */}
      {Object.keys(data).length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2A2E35]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]" />
              <span className="text-xs text-[#9AA0A6]">Buy: {Object.values(data).filter(s => s.signal === 'BUY').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
              <span className="text-xs text-[#9AA0A6]">Sell: {Object.values(data).filter(s => s.signal === 'SELL').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9800]" />
              <span className="text-xs text-[#9AA0A6]">Hold: {Object.values(data).filter(s => s.signal === 'HOLD' || s.signal === 'NEUTRAL').length}</span>
            </div>
          </div>
          <span className="text-xs text-[#6B7280]">{Object.keys(data).length} stocks tracked</span>
        </div>
      )}

      {/* Empty state */}
      {Object.keys(data).length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-[#1A1E24] rounded-full flex items-center justify-center mb-3">
            <TrendingUp size={24} className="text-purple-500" />
          </div>
          <p className="text-sm text-[#9AA0A6]">No market data available</p>
          <button 
            onClick={onRefresh}
            className="mt-3 px-4 py-2 bg-[#1A1E24] rounded-lg border border-purple-500 text-xs text-purple-600 font-semibold hover:text-[#490066] hover:border-purple-500 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketTable;