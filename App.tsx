
import React, { useState, useMemo, useCallback } from 'react';
import { 
  Calculator, 
  Download, 
  RotateCcw, 
  X, 
  Search, 
  CheckCircle2, 
  Info, 
  Package, 
  Calendar, 
  Layers, 
  ShoppingCart 
} from 'lucide-react';
import { ARTICLES_DB, INITIAL_PLANNING } from './mockData';
import { Article, Alternative, MonthlyPlanning, MonthKey, MONTH_NAMES } from './types';

const App: React.FC = () => {
  // State
  const [selectedArticle, setSelectedArticle] = useState<Article>(ARTICLES_DB[0]);
  const [selectedAltId, setSelectedAltId] = useState<string>(ARTICLES_DB[0].alternatives[0].id);
  const [planning, setPlanning] = useState<MonthlyPlanning>(INITIAL_PLANNING);
  const [isCalculated, setIsCalculated] = useState(false);

  // Memoized Data
  const currentAlternative = useMemo(() => {
    return selectedArticle.alternatives.find(alt => alt.id === selectedAltId) || selectedArticle.alternatives[0];
  }, [selectedArticle, selectedAltId]);

  const totalAnnualUnits = useMemo(() => {
    return Object.values(planning).reduce((sum, val) => sum + val, 0);
  }, [planning]);

  const results = useMemo(() => {
    if (!isCalculated) return [];
    
    return currentAlternative.components.map(comp => {
      const monthlyBesoins: Record<string, number> = {};
      let totalAnnuel = 0;

      MONTH_NAMES.forEach(({ key }) => {
        // Calculation: (Grams / 1000) * Units = KG
        const besoin = (comp.quantityPerUnit / 1000) * planning[key];
        monthlyBesoins[key] = Math.round(besoin * 100) / 100;
        totalAnnuel += besoin;
      });

      return {
        ...comp,
        monthly: monthlyBesoins,
        total: Math.round(totalAnnuel * 10) / 10
      };
    });
  }, [isCalculated, currentAlternative, planning]);

  // Handlers
  const handleArticleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const article = ARTICLES_DB.find(a => a.code === e.target.value);
    if (article) {
      setSelectedArticle(article);
      setSelectedAltId(article.alternatives[0].id);
      setIsCalculated(false);
    }
  };

  const handlePlanningChange = (month: MonthKey, value: string) => {
    const num = parseInt(value) || 0;
    setPlanning(prev => ({ ...prev, [month]: num }));
    setIsCalculated(false);
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const handleReset = () => {
    setPlanning(INITIAL_PLANNING);
    setIsCalculated(false);
  };

  const handleExport = () => {
    alert("Exportation vers le module Achats générée avec succès.");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 bg-white shadow-sm border border-slate-200 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-lg shadow-blue-200 shadow-lg">
            <Calculator className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">APPLICATION CALCUL DES BESOINS MATIÈRE</h1>
            <p className="text-slate-500 font-medium">Injection plastique — Condor Electronics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            title="Fermer"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SELECTION & PLANNING */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section 1: Article Identification */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
              <Package size={18} className="text-blue-600" />
              <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">1. Identification de l'article</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Code Article</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    value={selectedArticle.code}
                    onChange={handleArticleChange}
                  >
                    {ARTICLES_DB.map(art => (
                      <option key={art.code} value={art.code}>{art.code}</option>
                    ))}
                  </select>
                  <Search className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Désignation</label>
                <p className="bg-white border border-slate-100 rounded-lg p-2.5 text-sm font-bold text-slate-700">
                  {selectedArticle.designation}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Division</label>
                  <p className="bg-white border border-slate-100 rounded-lg p-2 text-sm font-medium text-slate-600">{selectedArticle.division}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Alternative Technique */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">2. Alternative Technique</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Alternative disponible</label>
                <div className="flex gap-2">
                  {selectedArticle.alternatives.map(alt => (
                    <button
                      key={alt.id}
                      onClick={() => { setSelectedAltId(alt.id); setIsCalculated(false); }}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-bold transition-all ${
                        selectedAltId === alt.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                      }`}
                    >
                      Alt {alt.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-blue-700 leading-relaxed uppercase">
                    {currentAlternative.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-[10px] text-blue-500 font-bold uppercase">Date de validité</span>
                  <span className="text-xs font-bold text-blue-800">{new Date(currentAlternative.validFrom).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Planning Preview Stats */}
          <div className="bg-slate-800 rounded-xl p-6 text-white flex justify-between items-center shadow-lg">
             <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Annuel</p>
                <p className="text-3xl font-black">{totalAnnualUnits.toLocaleString()}</p>
             </div>
             <div className="text-right">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pièces / MOIS (AVG)</p>
                <p className="text-xl font-bold">{Math.round(totalAnnualUnits / 12).toLocaleString()}</p>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PLANNING GRID & TABLES */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 3: Production Planning */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">3. Planning de Production (Mois)</h2>
              </div>
              <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded font-bold text-slate-400 uppercase">Saisie Manuelle</span>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MONTH_NAMES.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">{label}</label>
                  <input
                    type="number"
                    value={planning[key]}
                    onChange={(e) => handlePlanningChange(key, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Components Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">4. Composants de l'alternative (BOM)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code Composant</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Désignation</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Qté Unitaire</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">UQ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentAlternative.components.map(comp => (
                    <tr key={comp.code} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-slate-500">{comp.code}</td>
                      <td className="px-6 py-3 text-sm font-bold text-slate-700">{comp.designation}</td>
                      <td className={`px-6 py-3 text-sm font-bold text-right ${comp.quantityPerUnit < 0 ? 'text-red-500' : 'text-slate-600'}`}>
                        {comp.quantityPerUnit.toLocaleString('fr-FR')}
                      </td>
                      <td className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">{comp.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Calculation Result */}
          <div className={`bg-white rounded-xl shadow-xl border overflow-hidden transition-all duration-500 ${isCalculated ? 'border-blue-500 opacity-100 translate-y-0' : 'border-slate-200 opacity-50 grayscale pointer-events-none'}`}>
            <div className="bg-blue-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart size={18} />
                <h2 className="font-bold uppercase text-sm tracking-widest">5. Résultats : Besoins Matière (ACHATS) — Unité : KG</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                Calcul précis au gramme
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap sticky left-0 bg-slate-50 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Composant</th>
                    {MONTH_NAMES.map(m => (
                      <th key={m.key} className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase text-center">{m.key}</th>
                    ))}
                    <th className="px-4 py-3 text-[10px] font-black text-blue-700 uppercase text-right bg-blue-50">TOTAL ANNUEL (KG)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map(row => (
                    <tr key={row.code} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-4 py-3 text-xs font-bold text-slate-700 whitespace-nowrap sticky left-0 bg-white group-hover:bg-blue-50 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                        {row.designation}
                      </td>
                      {MONTH_NAMES.map(m => (
                        <td key={m.key} className={`px-4 py-3 text-xs text-center ${row.monthly[m.key] < 0 ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                          {row.monthly[m.key].toLocaleString('fr-FR')}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm font-black text-blue-800 text-right bg-blue-50/50 group-hover:bg-blue-100 transition-colors">
                        {row.total.toLocaleString('fr-FR')} KG
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap gap-4 items-center justify-end pt-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              <RotateCcw size={18} />
              Réinitialiser
            </button>
            <button
              onClick={handleCalculate}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
            >
              <CheckCircle2 size={18} />
              Calculer
            </button>
            <button
              onClick={handleExport}
              disabled={!isCalculated}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-md ${
                isCalculated 
                ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-slate-200' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download size={18} />
              Export Achats
            </button>
          </div>

        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 mb-8 text-center text-slate-400 text-xs font-medium">
        &copy; {new Date().getFullYear()} Condor Electronics — Système de Gestion de Production (SGP)
      </footer>
    </div>
  );
};

export default App;
