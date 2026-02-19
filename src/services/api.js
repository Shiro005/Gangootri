import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const socket = io(API_URL);

export const fetchMarketData = () => api.get('/api/market-data');
export const fetchPortfolio = () => api.get('/api/portfolio');
export const fetchTrades = () => api.get('/api/trades');
export const fetchDailyPNL = () => api.get('/api/daily-pnl');
export const fetchStrategyStats = () => api.get('/api/strategy-stats');