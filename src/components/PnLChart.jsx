import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { TrendingUp, Calendar } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const PnLChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'P&L',
      data: data.slice(-7).map(d => d.pnl || 0),
      borderColor: '#FF9800',
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#FF9800',
      pointBorderColor: '#0B0F15',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#FF9800',
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A1E24',
        titleColor: '#fff',
        bodyColor: '#9AA0A6',
        borderColor: '#2A2E35',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `P&L: ₹${context.raw.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
        }
      }
    },
    scales: {
      y: { 
        grid: { 
          color: 'rgba(42, 46, 53, 0.5)',
          drawBorder: false,
        },
        ticks: { 
          color: '#9AA0A6',
          callback: (value) => `₹${value}`
        }
      },
      x: { 
        grid: { display: false },
        ticks: { color: '#9AA0A6' }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const totalPnL = data.slice(-7).reduce((sum, d) => sum + (d.pnl || 0), 0);
  const avgPnL = totalPnL / 7;

  return (
    <div className="backdrop-blur-xl bg-[#0B0F15]/80 rounded-xl border border-[#2A2E35] p-5 mb-6 shadow-xl shadow-black/50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-[#FF9800]" />
          <h2 className="text-base font-semibold text-white">P&L Performance</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1E24] rounded-md border border-[#2A2E35]">
            <Calendar size={12} className="text-[#9AA0A6]" />
            <span className="text-xs text-[#9AA0A6]">Last 7 days</span>
          </div>
          <div className={`px-2 py-1 rounded-md ${totalPnL >= 0 ? 'bg-[#00C853]/10' : 'bg-[#FF3B3B]/10'}`}>
            <span className={`text-xs font-medium ${totalPnL >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)} total
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] relative">
        <Line data={chartData} options={options} />
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2A2E35]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9AA0A6]">Weekly avg:</span>
          <span className={`text-xs font-medium ${avgPnL >= 0 ? 'text-[#00C853]' : 'text-[#FF3B3B]'}`}>
            ₹{avgPnL.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9AA0A6]">Best day:</span>
          <span className="text-xs font-medium text-[#00C853]">
            ₹{Math.max(...data.slice(-7).map(d => d.pnl || 0)).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9AA0A6]">Worst day:</span>
          <span className="text-xs font-medium text-[#FF3B3B]">
            ₹{Math.min(...data.slice(-7).map(d => d.pnl || 0)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PnLChart;