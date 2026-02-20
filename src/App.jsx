import React, { useState, useEffect } from 'react';
import {
  fetchMarketData,
  fetchPortfolio,
  fetchStrategyStats,
  fetchDailyPNL,
  socket
} from './services/api';
import Header from './components/Header';
import StrategyStats from './components/StrategyStats';
import PortfolioCards from './components/PortfolioCards';
import MarketTable from './components/MarketTable';
import HoldingsTable from './components/HoldingsTable';
import PnLChart from './components/PnLChart';
import TradesTable from './components/TradesTable';
import Footer from './components/Footer';


function App() {
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState({});
  const [portfolio, setPortfolio] = useState({ holdings: [], trades: [] });
  const [strategyStats, setStrategyStats] = useState({});
  const [marketStatus, setMarketStatus] = useState('CLOSED');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [dailyPNL, setDailyPNL] = useState([]);

  useEffect(() => {
    loadInitialData();

    socket.on('market_update', (data) => {
      setMarketData(data.market_data || {});
      setPortfolio(data.portfolio || {});
      setMarketStatus(data.market_status);
      setLastUpdate(data.last_update);
    });

    return () => socket.off('market_update');
  }, []);

  const loadInitialData = async () => {
    try {
      const [marketRes, portfolioRes, statsRes] = await Promise.all([
        fetchMarketData(),
        fetchPortfolio(),
        fetchStrategyStats(),
      ]);

      setMarketData(marketRes.data.stocks || {});
      setPortfolio(portfolioRes.data.portfolio || {});
      setStrategyStats(statsRes.data || {});
      setMarketStatus(marketRes.data.market_status);
      setLastUpdate(marketRes.data.last_update);

      // Load daily PNL
      const pnlRes = await fetchDailyPNL();
      setDailyPNL(pnlRes.data.daily_pnl || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      const marketRes = await fetchMarketData();
      setMarketData(marketRes.data.stocks || {});
      setMarketStatus(marketRes.data.market_status);
      setLastUpdate(marketRes.data.last_update);
    } catch (error) {
      console.error('Error refreshing:', error);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: `url(https://wallpaperbat.com/img/965903-avengers-electric-electric-blue-magenta-dark-theme-night-dark-mode-marvel-hd-phone-wallpaper-marvel-wallpaper-hd-hd-dark-wallpaper-dark-black-wallpaper.jpg)`,
        }}
      >
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#FF9800] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-2xl font-bold bg-gradient-to-r from-[#FF9800] to-[#00C853] bg-clip-text text-transparent animate-pulse">
            Loading Gangotri Bot...
          </div>
          <div className="text-sm text-[#9AA0A6] mt-2">AI Trading Terminal</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-black bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url()`,
      }}
    >
      {/* Optional overlay pattern for added texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <Header
          marketStatus={marketStatus}
          strategyName="Bollinger EMA Momentum"
        />

        <StrategyStats stats={strategyStats} />
        <PortfolioCards portfolio={portfolio} />
        <MarketTable
          data={marketData}
          onRefresh={handleRefresh}
          lastUpdate={lastUpdate}
        />
        
        {/* Two column layout for mid section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <HoldingsTable holdings={portfolio.holdings || []} />
          </div>
          <div className="lg:col-span-1">
            <PnLChart data={dailyPNL} />
          </div>
        </div>
        
        <TradesTable trades={portfolio.trades || []} />
        <Footer />
      </div>
    </div>
  );
}

export default App;