import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, X } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-900/50 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-indigo-400">
                <Terminal size={18} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">System Initialize</span>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Bienvenido a UTUR26.ops</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Estás accediendo a una <strong>Demo Interactiva</strong> del panel de control operativo. 
                  Este sistema centraliza el monitoreo de proyectos, despliegues y métricas en tiempo real.
                </p>
              </div>

              <div className="space-y-3">
                <FeatureItem text="Monitoreo de estado de servidores en tiempo real." />
                <FeatureItem text="Simulación de logs de sistema y alertas." />
                <FeatureItem text="Interfaz optimizada para Alta Gerencia y DevOps." />
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Ingresar al Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded bg-zinc-900/50 border border-zinc-800/50">
      <ShieldCheck size={16} className="text-emerald-500 mt-0.5 shrink-0" />
      <span className="text-xs text-zinc-300">{text}</span>
    </div>
  )
}