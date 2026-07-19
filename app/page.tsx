// app/page.tsx - COMPLETE FRESH VERSION

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
  X
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Upload,
      title: 'Upload FEA Models',
      description: 'Drag & drop ABAQUS .inp files instantly. Supports large models up to 100MB.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Get instant insights about your model: elements, nodes, materials, and more.',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: BarChart3,
      title: 'Model Health Check',
      description: 'Automatic detection of convergence issues, missing materials, and warnings.',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: MessageSquare,
      title: 'Engineering Chat',
      description: 'Ask questions about your model and get expert-level responses in seconds.',
      color: 'from-orange-500 to-yellow-400'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Neelam Soni',
      role: 'PhD Researcher, Bennett University',
      content: 'CAE Copilot saved me hours of debugging. It instantly identified issues in my composite model.',
      avatar: 'NS'
    },
    {
      name: 'Kunal Saurabh',
      role: 'PhD Researcher, Bennett University',
      content: 'The material model validation feature is incredible. It caught errors I would have missed.',
      avatar: 'KS'
    },
    {
      name: 'Prof. R.N. Hota',
      role: 'IIT ISM Dhanbad',
      content: 'A game-changer for computational mechanics research. Highly recommended for FEA engineers.',
      avatar: 'RH'
    }
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for students and hobbyists',
      features: ['5 chats per month', '1 file upload (10MB)', 'Basic model summary', 'Community support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For serious engineers and researchers',
      features: ['Unlimited chats', '100 file uploads (50MB)', 'Full model analysis', 'Priority support', 'Export reports'],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      description: 'For teams and organizations',
      features: ['Everything in Pro', 'Unlimited uploads (500MB)', 'Team collaboration', 'API access', 'Custom deployment'],
      cta: 'Contact Sales',
      popular: false
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

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#testimonials" className="text-sm text-gray-300 hover:text-white transition">Testimonials</a>
              <a href="/app" className="btn-primary text-sm py-2 px-6">
                Launch App
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/5">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
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
            AI-Powered Engineering Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            AI Assistant for
            <span className="gradient-text block"> Computational Mechanics</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Upload FEA files, debug convergence issues, and accelerate your engineering workflow with AI.
            Built for engineers, by engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/app" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Launch CAE Copilot
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#features" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              Learn More
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              ABAQUS .inp Support
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              GPT-4 Powered
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Model Health Check
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Instant Insights
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Engineers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to analyze, debug, and optimize your FEA models in one place.
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Researchers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join hundreds of engineers and researchers using CAE Copilot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">"{testimonial.content}"</p>
                <div className="mt-3 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
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
              Choose the plan that fits your needs. Start free, upgrade when you're ready.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <div 
                key={index}
                className={`glass-card p-6 text-center ${
                  plan.popular ? 'border-blue-500/30 relative' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-400">/mo</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                <ul className="text-left space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Engineering Workflow?</h2>
          <p className="text-gray-400 mb-8">
            Start using CAE Copilot today and transform how you analyze FEA models.
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
              <p className="text-sm text-gray-400">AI for Computational Mechanics</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">Features</a>
                <a href="#" className="block hover:text-white">Pricing</a>
                <a href="#" className="block hover:text-white">Documentation</a>
                <a href="#" className="block hover:text-white">Changelog</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">About</a>
                <a href="#" className="block hover:text-white">Blog</a>
                <a href="#" className="block hover:text-white">Careers</a>
                <a href="#" className="block hover:text-white">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms of Service</a>
                <a href="#" className="block hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 flex flex-wrap justify-between items-center text-sm text-gray-400">
            <span>© 2026 CAE Copilot. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}