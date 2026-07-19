// app/components/ProfessionalLayout.tsx

'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  MessageSquare, 
  Settings, 
  Users,
  BarChart3,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function ProfessionalLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Upload, label: 'Upload Model' },
    { icon: MessageSquare, label: 'Chat' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: FileText, label: 'Reports' },
    { icon: Users, label: 'Team' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1a1a2e] border-r border-white/5 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg">
            C
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold">CAE Copilot</h1>
              <p className="text-xs text-gray-400">v1.0</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                item.active 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            BS
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium">Dr. Baij Singh</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
          <LogOut className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-[#1a1a2e] border-b border-white/5 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Models</span>
              <span className="text-gray-600">/</span>
              <span className="text-white">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}