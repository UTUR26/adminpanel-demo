import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/dashboard';
import { motion, AnimatePresence } from 'framer-motion';

import WelcomeModal from "./components/WelcomeModal";
import PremiumFeatureModal from "./components/PremiumFeatureModal";

import { 
  Server, GitCommit, AlertCircle, 
  Database, Globe, Cpu, Download, FileText, CheckCircle2 
} from 'lucide-react';



export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExporting, setIsExporting] = useState(false);


  const [showWelcome, setShowWelcome] = useState(false);
  const [showPremium, setShowPremium] = useState({ isOpen: false, feature: '' });

  useEffect(() => {
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 500);

    return () => {
      clearTimeout(welcomeTimer);
      
    };
  }, []);


  const handleProFeature = (featureName) => {
    setShowPremium({ isOpen: true, feature: featureName });
  };

  // Función para simular la descarga de un reporte real
  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Truco simple para descargar un CSV generado al vuelo
      const csvContent = "data:text/csv;charset=utf-8,Project,Status,Latency\nGeoSmart,Active,45ms\nDental,Building,0ms\nBurger,Active,120ms";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "system_report_v2.csv");
      document.body.appendChild(link);
      link.click();
      alert("Reporte descargado correctamente. (Simulación)");
    }, 2000);
  };

  return (
    <>
      <DashboardLayout 
        onExport={handleExportReport} 
        isExporting={isExporting} 
        onFeatureClick={handleProFeature} // Conectamos el click del menú al modal
      >
        
        {/* 1. Métrica Global */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="Active Projects" value="6" icon={<Globe size={16} />} trend="+1" />
          <MetricCard title="Total Deploys" value="142" icon={<GitCommit size={16} />} trend="+12 this week" />
          <MetricCard title="System Uptime" value="99.9%" icon={<Server size={16} />} good />
          <MetricCard title="Pending Tickets" value="3" icon={<AlertCircle size={16} />} bad />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          
          {/* 2. Project Status Board */}
          <section className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                <Database size={14} className="text-indigo-500" /> 
                Active Deployments
              </h2>
              {selectedProject && (
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard 
                name="GeoSmart Systems" env="Production" version="v2.4.0" status="active" latency="45ms"
                onClick={() => setSelectedProject('GeoSmart')} isSelected={selectedProject === 'GeoSmart'}
              />
              <ProjectCard 
                name="Dental Studio" env="Staging" version="v1.1.2" status="building" latency="..."
                onClick={() => setSelectedProject('Dental')} isSelected={selectedProject === 'Dental'}
              />
              <ProjectCard 
                name="Prime Burger App" env="Production" version="v3.0.5" status="active" latency="120ms"
                onClick={() => setSelectedProject('Burger')} isSelected={selectedProject === 'Burger'}
              />
              <ProjectCard 
                name="UTUR26 Internal" env="Dev" version="v0.9.0-alpha" status="error" latency="ERR"
                onClick={() => setSelectedProject('Internal')} isSelected={selectedProject === 'Internal'}
              />
            </div>
          </section>

          {/* 3. Activity Log Stream */}
          <section className="flex flex-col gap-4 h-full">
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={14} className="text-indigo-500" /> 
              System Events {selectedProject && `(${selectedProject})`}
            </h2>
            
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-zinc-950/50 pointer-events-none z-10" 
                   style={{ background: 'linear-gradient(to bottom, transparent 80%, #09090b 100%)' }}></div>
              <LogStream filter={selectedProject} />
            </div>
          </section>
        </div>

      </DashboardLayout>

      {/* === MODALES === */}
      {/* Verifica que estos componentes existan en src/components/modals/ */}
      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      
      <PremiumFeatureModal 
        isOpen={showPremium.isOpen} 
        featureName={showPremium.feature}
        onClose={() => setShowPremium({ ...showPremium, isOpen: false })} 
      />
    </>

  );
}

// --- ACTUALIZACIÓN DE COMPONENTES ---

function MetricCard({ title, value, icon, trend, good, bad }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">{title}</span>
        <div className={`p-1.5 rounded-md ${good ? 'text-emerald-500 bg-emerald-500/10' : bad ? 'text-rose-500 bg-rose-500/10' : 'text-indigo-500 bg-indigo-500/10'}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-zinc-100 font-mono tracking-tight">{value}</div>
      {trend && <div className="text-[10px] text-zinc-500 mt-1 font-mono">{trend}</div>}
    </div>
  )
}

function ProjectCard({ name, env, version, status, latency, onClick, isSelected }) {
  const statusColors = {
    active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    building: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  return (
    <div 
        onClick={onClick}
        className={`group relative p-5 rounded-lg border transition-all cursor-pointer
        ${isSelected 
            ? 'bg-zinc-800/80 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
            : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/40'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-zinc-100 group-hover:text-indigo-400'}`}>
            {name}
          </h3>
          <p className="text-xs text-zinc-500 font-mono mt-1">{env}</p>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold font-mono uppercase border ${statusColors[status]}`}>
          {status === 'active' ? 'HEALTHY' : status.toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs border-t border-zinc-800/50 pt-3">
           <span className="text-zinc-500">Latency</span>
           <span className={`font-mono ${status === 'error' ? 'text-rose-500' : 'text-emerald-500'}`}>{latency}</span>
        </div>
      </div>
    </div>
  )
}

function LogStream({ filter }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Generador de logs más inteligente
    const projects = ['GeoSmart', 'Dental', 'Burger', 'Internal'];
    const types = ['info', 'success', 'warning', 'error'];
    const messages = {
        info: ['Cache purged', 'User login', 'Data sync started'],
        success: ['Build completed', 'Deploy successful', 'Tests passed'],
        warning: ['High latency', 'CPU usage > 80%', 'Memory spike'],
        error: ['API Limit Reached', 'Connection timeout', 'Database locked']
    };

    const interval = setInterval(() => {
      const type = types[Math.floor(Math.random() * types.length)];
      const project = projects[Math.floor(Math.random() * projects.length)];
      
      // Si hay filtro activo, forzamos que el log sea de ese proyecto el 80% de las veces
      if (filter && Math.random() > 0.2 && project !== filter) return; 

      const msg = messages[type][Math.floor(Math.random() * messages[type].length)];

      const newLog = { 
        id: Date.now(), 
        time: new Date().toLocaleTimeString('es-PE', { hour12: false }), 
        type,
        msg: `${project}: ${msg}`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 15));
    }, 2000);
    return () => clearInterval(interval);
  }, [filter]);

  return (
    <ul className="space-y-3 font-mono text-xs">
      <AnimatePresence initial={false}>
        {logs.map((log) => (
            <motion.li 
            key={log.id} 
            initial={{ opacity: 0, x: -10, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="flex gap-3"
            >
            <span className="text-zinc-600 shrink-0">[{log.time}]</span>
            <span className={`${
                log.type === 'error' ? 'text-rose-500' : 
                log.type === 'success' ? 'text-emerald-500' : 
                log.type === 'warning' ? 'text-amber-500' : 
                'text-indigo-400'
            }`}>
                {log.type === 'info' ? 'ℹ' : log.type === 'error' ? '✖' : '✔'}
            </span>
            <span className="text-zinc-400 truncate">{log.msg}</span>
            </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}