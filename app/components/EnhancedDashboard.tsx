// app/components/EnhancedDashboard.tsx

'use client';

import { EngineeringModel } from '@/lib/abaqus/types';

interface DashboardProps {
  model: EngineeringModel;
}

export function EnhancedDashboard({ model }: DashboardProps) {
  const getHealthStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-400', bar: 'excellent' };
    if (score >= 60) return { label: 'Good', color: 'text-yellow-400', bar: 'good' };
    return { label: 'Needs Attention', color: 'text-red-400', bar: 'poor' };
  };

  const status = getHealthStatus(model.healthScore);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Health Card */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Model Health</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-3xl font-bold ${status.color}`}>
                {model.healthScore}%
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                model.healthScore >= 80 ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                model.healthScore >= 60 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {status.label}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Last analyzed</div>
            <div className="text-sm text-gray-300">Just now</div>
          </div>
        </div>
        <div className="health-bar">
          <div
            className={`health-bar-fill ${status.bar}`}
            style={{ width: `${model.healthScore}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <div className="icon bg-blue-500/10 text-blue-400">📐</div>
          <div className="value">{model.nodes.toLocaleString()}</div>
          <div className="label">Nodes</div>
        </div>
        <div className="stat-card">
          <div className="icon bg-green-500/10 text-green-400">📊</div>
          <div className="value">{model.elements.toLocaleString()}</div>
          <div className="label">Elements</div>
        </div>
        <div className="stat-card">
          <div className="icon bg-purple-500/10 text-purple-400">🧪</div>
          <div className="value">{model.materials.length}</div>
          <div className="label">Materials</div>
        </div>
        <div className="stat-card">
          <div className="icon bg-orange-500/10 text-orange-400">⚙️</div>
          <div className="value">{model.steps.length}</div>
          <div className="label">Steps</div>
        </div>
      </div>

      {/* Model Info */}
      <div className="glass rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400">Analysis:</span>
          <span className="tag tag-primary">{model.analysisType}</span>
          <span className="text-gray-400">Elements:</span>
          {model.elementTypes.map((type, i) => (
            <span key={i} className="tag tag-success">{type}</span>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {model.warnings.length > 0 && (
        <div className="glass rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-start gap-3">
            <span className="text-yellow-400 text-lg">⚠️</span>
            <div>
              <div className="text-sm font-medium text-yellow-400">Warnings</div>
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

      {/* Materials */}
      {model.materials.length > 0 && (
        <div className="glass rounded-xl p-4 border border-white/5">
          <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Materials</h4>
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