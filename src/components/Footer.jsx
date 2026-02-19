import React from 'react';
import { Github, Twitter, Instagram, Heart, ExternalLink, Zap, Code, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="backdrop-blur-sm bg-gray-800/20 border-t-2 border-purple-500 p-6 mt-6 shadow-xl shadow-black/50">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-purple-500" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Gangootri
            </span>
          </div>
          <p className="text-sm text-[#9AA0A6] mb-3">
            Gangotrio is a smart algo trading platform to test and optimize automated trading strategies in live market conditions without financial risk
          </p>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span>Version 2.0.0</span>
            <span className="w-1 h-1 rounded-full bg-[#2A2E35]" />
            <span>Beta</span>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
          <ul className="space-y-2">
            {['Features', 'Pricing', 'Documentation', 'API'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[#9AA0A6] hover:text-[#FF9800] transition-colors duration-200 flex items-center gap-1 group">
                  {item}
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2">
            {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[#9AA0A6] hover:text-[#FF9800] transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Info */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Development</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Code size={14} className="text-[#FF9800] mt-0.5" />
              <div>
                <p className="text-xs text-[#9AA0A6]">Built by</p>
                <p className="text-sm font-medium text-white">Webreich</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Heart size={14} className="text-[#FF3B3B] mt-0.5" />
              <div>
                <p className="text-xs text-[#9AA0A6]">Lead Developer</p>
                <p className="text-sm font-medium text-white">Shriyash Rulhe</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={14} className="text-[#00C853] mt-0.5" />
              <div>
                <p className="text-xs text-[#9AA0A6]">Contact</p>
                <a href="mailto:dev@webreich.com" className="text-sm text-white hover:text-[#FF9800] transition-colors">
                  shriyashrulhe145@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Status Banner */}
      <div className="relative mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C853]/10 via-[#FF9800]/10 to-[#FF3B3B]/10 rounded-lg" />
        <div className="relative bg-[#1A1E24] rounded-lg border border-[#2A2E35] p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
              </div>
              <span className="text-sm text-[#9AA0A6]">Currently in active development</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Launching soon</span> 
              <span className='text-gray-300 font-semibold'>|</span>
              <span className="text-xs text-gray-500 font-semibold">Stay tuned for updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#FF9800]" />
              <span className="text-xs text-white">shriyashwebreich.site/gangotri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Social Links and Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2A2E35]">
        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="w-9 h-9 bg-[#1A1E24] rounded-lg border border-[#2A2E35] flex items-center justify-center hover:border-[#FF9800] hover:bg-[#FF9800]/5 transition-all duration-300 group"
            aria-label="GitHub"
          >
            <Github size={18} className="text-[#9AA0A6] group-hover:text-[#FF9800] group-hover:scale-110 transition-all duration-300" />
          </a>
          <a 
            href="#" 
            className="w-9 h-9 bg-[#1A1E24] rounded-lg border border-[#2A2E35] flex items-center justify-center hover:border-[#FF9800] hover:bg-[#FF9800]/5 transition-all duration-300 group"
            aria-label="X (Twitter)"
          >
            <Twitter size={18} className="text-[#9AA0A6] group-hover:text-[#FF9800] group-hover:scale-110 transition-all duration-300" />
          </a>
          <a 
            href="#" 
            className="w-9 h-9 bg-[#1A1E24] rounded-lg border border-[#2A2E35] flex items-center justify-center hover:border-[#FF9800] hover:bg-[#FF9800]/5 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram size={18} className="text-[#9AA0A6] group-hover:text-[#FF9800] group-hover:scale-110 transition-all duration-300" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-left">
          <p className="text-xs text-[#6B7280]">
            © {currentYear} Gangotri Bot by Webreich. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280] mt-1">
            Built with <Heart size={10} className="inline text-[#FF3B3B] mx-0.5" /> by Shriyash Rulhe
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex items-center gap-3">
          <a href="#" className="text-xs text-[#6B7280] hover:text-[#FF9800] transition-colors">Privacy</a>
          <span className="text-xs text-[#2A2E35]">•</span>
          <a href="#" className="text-xs text-[#6B7280] hover:text-[#FF9800] transition-colors">Terms</a>
          <span className="text-xs text-[#2A2E35]">•</span>
          <a href="#" className="text-xs text-[#6B7280] hover:text-[#FF9800] transition-colors">Cookies</a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/30 to-transparent" />
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FF9800]/20 to-transparent" />
    </footer>
  );
};

export default Footer;