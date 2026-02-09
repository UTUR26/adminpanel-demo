import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, X } from 'lucide-react';

export default function PremiumFeatureModal({ isOpen, onClose, featureName = "Esta función" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full max-w-sm bg-zinc-900 border border-indigo-500/30 rounded-lg shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden"
          >
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock size={24} className="text-indigo-400" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Módulo Pro Requerido</h3>
                <p className="text-sm text-zinc-400">
                  <strong>{featureName}</strong> está disponible en la versión completa del sistema.
                </p>
              </div>

              <div className="bg-zinc-950/50 p-3 rounded border border-zinc-800 text-xs text-zinc-500">
                En la versión Full, esto conectaría con tu base de datos real o API de terceros.
              </div>

              <button 
                onClick={onClose}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Entendido, seguir explorando
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}