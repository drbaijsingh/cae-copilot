// app/components/ProfessionalDashboard.tsx

'use client';

import { EngineeringModel } from '@/lib/abaqus/types';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle,
  Activity,
  Box,
  Grid,
  Layers,
  Settings as SettingsIcon,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  model: EngineeringModel;
}

export function ProfessionalDashboard({ model }: DashboardProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const metrics = [
    {
      icon: Box,
      label: 'Elements',
      value: model.elements.toLocaleString(),
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      icon: Grid,
      label: 'Nodes',
      value: model.nodes.toLocaleString(),
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: Layers,
      label: 'Materials',
      value: model.materials.length.toString(),
      color: 'bg-green-500/10 text-green-400',
    },
    {
      icon: SettingsIcon,
      label: 'Steps',
      value: model.steps.length.toString(),
      color: 'bg-orange-500/10 text-orange-400',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Welcome Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Model Analysis</h2>
            <p className="text-gray-400 text-sm">
              {model.fileName} • {model.analysisType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              model.healthScore >= 80 ? 'bg-green-500/20 text-green-400' :
              model.healthScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              Health: {model.healthScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className={`metric-icon ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-500">+12%</span>
            </div>
            <div className="mt-3">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Info */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Model Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Analysis Type</span>
              <span className="font-medium">{model.analysisType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Solver</span>
              <span className="font-medium">{model.solver}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-gray-400">Element Types</span>
              <span className="font-medium">
                {model.elementTypes.length > 0 ? model.elementTypes.join(', ') : 'Not detected'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Node Sets</span>
              <span className="font-medium">{model.nodeSets.length}</span>
            </div>
          </div>
        </div>

        {/* Warnings & Health */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Model Health</h3>
          
          {/* Health Ring */}
          <div className="flex items-center justify-center py-4">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className={getHealthColor(model.healthScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                  strokeDasharray={`${model.healthScore * 3.52} 352`}
                  strokeDashoffset="0"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold">{model.healthScore}%</span>
                <span className="text-xs text-gray-400">Health Score</span>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {model.warnings.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-400">Warnings</p>
                  <ul className="mt-1 space-y-1">
                    {model.warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-yellow-300/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-yellow-400/50" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Materials Section */}
      {model.materials.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Materials</h3>
          <div className="flex flex-wrap gap-2">
            {model.materials.map((material, i) => (
              <span key={i} className="tag tag-primary">
                {material.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}