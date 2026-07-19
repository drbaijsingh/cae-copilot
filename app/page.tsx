// app/page.tsx - COMPLETE UPDATE

'use client';

import { useState } from 'react';
import { 
  ArrowRight, 
  Upload, 
  MessageSquare, 
  BarChart3, 
  Zap,
  CheckCircle,
  Star,
  Users,
  FileText,
  Bot,
  Menu,
  X,
  Shield,
  Code,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: AlertTriangle,
      title: 'Convergence & Divergence',
      description: 'Diagnose why your model won\'t converge. Get step-by-step fixes for contact, material, and solver issues.',
      color: 'from-red-500 to-orange-400'
    },
    {
      icon: Code,
      title: 'UMAT / VUMAT / USDFLD',
      description: 'Debug custom material subroutines. Validate Jacobian matrices, check state variables, and fix compilation errors.',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: RefreshCw,
      title: 'Contact Problem Solver',
      description: 'Fix overclosure, penetration, and friction issues. Optimize contact definitions for stable convergence.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Shield,
      title: 'UEL / DLOAD Support',
      description: 'Debug custom elements and distributed loads. Validate element formulations and load applications.',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const problems = [
    {
      title: 'Contact Non-Convergence',
      description: 'Contact not converging? We\'ll identify overclosure, penetration, and friction issues.',
      fix: 'Adjust contact stiffness, refine slave mesh, add damping'
    },
    {
      title: 'UMAT Compilation Errors',
      description: 'UMAT not compiling? We\'ll check syntax, missing subroutines, and material parameters.',
      fix: 'Fix ddsdde matrix, add viscous regularization'
    },
    {
      title: 'Step Divergence Issues',
      description: 'Simulation diverging at specific steps? We\'ll analyze increment settings.',
      fix: 'Adjust INC, initial increment, and time stepping'
    },
    {
      title: 'USDFLD State Variables',
      description: 'Field variables not updating? We\'ll debug state variable tracking.',
      fix: 'Check field definitions, verify state dependencies'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg">
                C
              </div>
              <span className="text-xl font-bold gradient-text">CAE Copilot</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition">Features</a>
              <a href="#problems" className="text-sm text-gray-300 hover:text-white transition">Problems We Solve</a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition">Pricing</a>
              <a href="/app" className="btn-primary text-sm py-2 px-6">
                Launch App
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/5">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                <a href="#problems" className="text-gray-300 hover:text-white transition">Problems We Solve</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                <a href="/app" className="btn-primary text-sm py-2 px-6 text-center">
                  Launch App
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4" />
            Phase 1: ABAQUS Complete Solution
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your CAE Expert for
            <span className="gradient-text block">Every Simulation Problem</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            From convergence issues to UMAT debugging, contact problems to material modeling — 
            CAE Copilot solves it all. Launching with full ABAQUS support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/app" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Solve Your Problem Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#problems" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              See What We Solve
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              ABAQUS .inp Support
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              UMAT / VUMAT / USDFLD
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Convergence Debugging
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Contact Problem Solver
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              UEL / DLOAD Support
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need for ABAQUS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From convergence to custom subroutines — we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 group cursor-pointer hover:border-blue-500/30"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section id="problems" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Problems We Solve</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specific ABAQUS issues that CAE Copilot can diagnose and fix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="glass-card p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{problem.description}</p>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <p className="text-sm text-blue-400">
                    💡 <span className="font-medium">Fix:</span> {problem.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start free, upgrade when you need more.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-2">$0<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-400 mb-6">Perfect for students</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />5 chats per month
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Basic convergence help
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />ABAQUS .inp support
                </li>
              </ul>
              <button className="w-full btn-secondary py-3 rounded-lg">Get Started</button>
            </div>

            <div className="glass-card p-6 text-center border-blue-500/30 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-2">$49<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-400 mb-6">For engineers & researchers</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Unlimited chats
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />UMAT/VUMAT debugging
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Contact problem solver
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Step optimization
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />USDFLD support
                </li>
              </ul>
              <button className="w-full btn-primary py-3 rounded-lg">Start Free Trial</button>
            </div>

            <div className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-2">$199<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-400 mb-6">For teams & organizations</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />UEL support
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />DLOAD support
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Team collaboration
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />Priority support
                </li>
              </ul>
              <button className="w-full btn-secondary py-3 rounded-lg">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Solve Your FEA Problems?</h2>
          <p className="text-gray-400 mb-8">
            Upload your .inp file and get instant insights. From convergence to UMAT — we've got you covered.
          </p>
          <a href="/app" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
                <span className="font-bold">CAE Copilot</span>
              </div>
              <p className="text-sm text-gray-400">Your CAE Expert for Every Simulation Problem</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Software Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">ABAQUS</a>
                <a href="#" className="block hover:text-white transition">ANSYS</a>
                <a href="#" className="block hover:text-white transition">LS-DYNA</a>
                <a href="#" className="block hover:text-white transition">HyperWorks</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">About</a>
                <a href="#" className="block hover:text-white transition">Blog</a>
                <a href="#" className="block hover:text-white transition">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 flex flex-wrap justify-between items-center text-sm text-gray-400">
            <span>© 2026 CAE Copilot. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}