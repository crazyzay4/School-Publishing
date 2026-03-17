import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Printer, Layers, Maximize, GitMerge, TrendingUp,
  Menu, X, Calculator, ArrowRight, Monitor, Scissors, BookOpen,
  CheckCircle2, Award, PaintBucket, Lightbulb, Play, RefreshCw,
  PieChart, BarChart3, Clock, Zap, Users, HelpCircle, Info, Heart, Terminal
} from 'lucide-react';
import { equipmentData, materialsData, processSteps, pitchData, interiorData, operationsData, teacherBenefits } from './data';

type Tab = 'overview' | 'equipment' | 'interior' | 'process' | 'pitch';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calcCopies, setCalcCopies] = useState(100);
  const [activeEquipmentId, setActiveEquipmentId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  
  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Огляд Проекту', icon: <LayoutDashboard size={20} /> },
    { id: 'equipment', label: 'Технопарк & Бюджет', icon: <Printer size={20} /> },
    { id: 'interior', label: 'Інтер\'єр & 3D', icon: <PaintBucket size={20} /> },
    { id: 'process', label: 'Технологія (Симуляція)', icon: <GitMerge size={20} /> },
    { id: 'pitch', label: 'Бізнес-план', icon: <TrendingUp size={20} /> },
  ];

  const totalEquipment = equipmentData.reduce((acc, curr) => acc + curr.price, 0);
  const totalMaterials = materialsData.reduce((acc, curr) => acc + curr.price, 0);
  const totalBudget = totalEquipment + totalMaterials;
  const budgetLimit = 50000;

  const simLogs = [
    ["[Система]: Ініціалізація...", "[Оператор]: Завантаження макету журналу..."],
    ["[Принтер]: Розігрів термовузла (200°C)...", `[Принтер]: Друк блоку (${operationsData.speed})...`, "[Принтер]: Друк обкладинки..."],
    ["[Склад]: Підготовка матеріалів...", "[Склад]: Вибір пружини 8мм та плівки 100мкм..."],
    ["[Ламінатор]: Нагрів валів...", "[Ламінатор]: Ламінування обкладинки (Soft Touch)..."],
    ["[Гільйотина]: Підрізка блоку (точність 0.1мм)...", "[Біндер]: Перфорація сторінок..."],
    ["[Біндер]: Зшивання на металеву пружину...", "[Система]: Контроль якості...", "[Успіх]: Готово до видачі!"]
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && simStep < processSteps.length) {
      timer = setTimeout(() => {
        setSimStep(prev => prev + 1);
      }, 2500);
    } else if (simStep === processSteps.length) {
      timer = setTimeout(() => {
        setIsSimulating(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, simStep]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simStep, isSimulating]);

  const startSimulation = () => {
    setSimStep(0);
    setIsSimulating(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="text-center max-w-4xl mx-auto mb-12 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight relative z-10">
                School Publishing <span className="text-indigo-400 italic">House</span>
              </motion.h1>
              <p className="text-xl text-slate-400 font-light relative z-10">
                Професійний цикл друку на площі 7 м² з бюджетом 50 000 ₴. Від ідеї до готового журналу.
              </p>
            </div>

            {/* Operational Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 mb-8">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors">
                <Clock className="mx-auto text-indigo-400 mb-3" size={28} />
                <div className="text-sm text-slate-400 mb-1">Графік роботи</div>
                <div className="text-white font-medium">{operationsData.schedule}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors">
                <Zap className="mx-auto text-amber-400 mb-3" size={28} />
                <div className="text-sm text-slate-400 mb-1">Швидкість</div>
                <div className="text-white font-medium">{operationsData.speed}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors">
                <Layers className="mx-auto text-emerald-400 mb-3" size={28} />
                <div className="text-sm text-slate-400 mb-1">Запас паперу</div>
                <div className="text-white font-medium">{operationsData.paperDuration}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors">
                <Users className="mx-auto text-purple-400 mb-3" size={28} />
                <div className="text-sm text-slate-400 mb-1">Команда</div>
                <div className="text-white font-medium">{operationsData.staff}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                  <Maximize size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">7 кв. м</h3>
                <p className="text-slate-400">Оптимізований простір для повноцінної роботи 1-2 учнів.</p>
              </motion.div>
              
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
                  <Calculator size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">{totalBudget.toLocaleString()} ₴</h3>
                <p className="text-slate-400">Точний розподіл бюджету на обладнання та матеріали.</p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/30">
                  <Printer size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Повний Цикл</h3>
                <p className="text-slate-400">Від цифрового макету до зшитого журналу чи блокнота.</p>
              </motion.div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl mt-8 relative z-10">
              <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400" />
                Освоєння Бюджету
              </h3>
              <div className="w-full bg-slate-800/50 rounded-full h-6 mb-4 overflow-hidden border border-white/5 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalBudget / budgetLimit) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]"></div>
                </motion.div>
              </div>
              <div className="flex justify-between text-sm font-mono text-slate-400">
                <span>Використано: <strong className="text-white">{totalBudget.toLocaleString()} ₴</strong></span>
                <span>Ліміт: {budgetLimit.toLocaleString()} ₴</span>
              </div>
            </div>
          </motion.div>
        );

      case 'equipment':
        const eqPercent = (totalEquipment / totalBudget) * 100;
        const matPercent = (totalMaterials / totalBudget) * 100;
        const digitalTotal = equipmentData.filter(e => e.type === 'digital').reduce((a,b)=>a+b.price,0);
        const printTotal = equipmentData.filter(e => e.type === 'print').reduce((a,b)=>a+b.price,0);
        const postTotal = equipmentData.filter(e => e.type === 'post').reduce((a,b)=>a+b.price,0);
        const maxCat = Math.max(digitalTotal, printTotal, postTotal);

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <h2 className="text-4xl font-serif text-white mb-8">Технопарк та Бюджет</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2 w-full">
                  <PieChart className="text-indigo-400" size={24} /> Розподіл Бюджету
                </h3>
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="#6366F1" strokeWidth="16" fill="none" strokeDasharray={`${eqPercent * 2.51} 251`} className="transition-all duration-1000" />
                    <circle cx="50" cy="50" r="40" stroke="#34D399" strokeWidth="16" fill="none" strokeDasharray={`${matPercent * 2.51} 251`} strokeDashoffset={-(eqPercent * 2.51)} className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-serif text-white">{totalBudget.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">ГРН</span>
                  </div>
                </div>
                <div className="flex gap-6 mt-6 w-full justify-center">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-sm text-slate-300">Обладнання ({Math.round(eqPercent)}%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400"></div><span className="text-sm text-slate-300">Матеріали ({Math.round(matPercent)}%)</span></div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
                <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="text-amber-400" size={24} /> Категорії Обладнання
                </h3>
                <div className="flex items-end justify-around h-48 pb-4 border-b border-white/10">
                  <div className="flex flex-col items-center gap-3 w-1/4">
                    <span className="text-xs text-slate-400 font-mono">{digitalTotal.toLocaleString()}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(digitalTotal / maxCat) * 120}px` }} className="w-full bg-blue-500/80 rounded-t-lg relative"><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div></motion.div>
                    <span className="text-sm text-slate-300">Цифрове</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 w-1/4">
                    <span className="text-xs text-slate-400 font-mono">{printTotal.toLocaleString()}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(printTotal / maxCat) * 120}px` }} className="w-full bg-emerald-500/80 rounded-t-lg relative"><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div></motion.div>
                    <span className="text-sm text-slate-300">Друк</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 w-1/4">
                    <span className="text-xs text-slate-400 font-mono">{postTotal.toLocaleString()}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(postTotal / maxCat) * 120}px` }} className="w-full bg-amber-500/80 rounded-t-lg relative"><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div></motion.div>
                    <span className="text-sm text-slate-300">Пост-обробка</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-white mb-4">Деталізація Обладнання</h3>
                <div className="space-y-3">
                  {equipmentData.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors">
                      <div><h4 className="font-medium text-white mb-1">{item.model}</h4><p className="text-xs text-slate-400">{item.function}</p></div>
                      <div className="text-right pl-4"><span className="text-lg font-serif text-indigo-400 whitespace-nowrap">{item.price.toLocaleString()} ₴</span></div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-white mb-4">Розхідні Матеріали (Старт)</h3>
                <div className="space-y-3">
                  {materialsData.map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors">
                      <h4 className="font-medium text-slate-300">{item.item}</h4>
                      <div className="text-right pl-4"><span className="text-lg font-serif text-emerald-400 whitespace-nowrap">{item.price.toLocaleString()} ₴</span></div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex justify-between items-center">
                  <span className="text-lg text-white font-serif">Всього матеріалів:</span>
                  <span className="text-2xl font-serif text-emerald-400">{totalMaterials.toLocaleString()} ₴</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'interior':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <h2 className="text-4xl font-serif text-white mb-8">Інтер'єр та Організація Простору</h2>
            
            <div className="w-full bg-slate-900/50 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden relative min-h-[600px]">
              <h3 className="absolute top-6 left-6 text-xl font-serif text-white flex items-center gap-2 z-20">
                <Maximize size={20} className="text-indigo-400" /> Інтерактивний План (7 м²)
              </h3>
              <p className="absolute top-14 left-6 text-sm text-slate-400 z-20 max-w-xs">
                Наведіть на елементи кімнати, щоб побачити їх призначення.
              </p>
              
              <div className="perspective-[1200px] w-full h-full flex items-center justify-center mt-8">
                <motion.div
                  className="relative w-[280px] sm:w-[320px] h-[350px] sm:h-[400px]"
                  style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}
                  animate={{ rotateZ: activeEquipmentId ? -40 : -45 }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  {/* Floor */}
                  <div className="absolute inset-0 bg-slate-800/90 border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  
                  {/* Entrance Door */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-emerald-500/20 border-2 border-emerald-500/50 origin-top flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateY(16px)' }}>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Вхід</span>
                  </div>

                  {/* Back Wall (Glass) */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 border-2 border-indigo-500/30 origin-top backdrop-blur-sm" style={{ transform: 'rotateX(-90deg)' }} />

                  {/* Left Wall */}
                  <div className="absolute top-0 left-0 w-32 h-full bg-indigo-500/5 border-2 border-indigo-500/30 origin-left backdrop-blur-sm" style={{ transform: 'rotateY(90deg)' }} />

                  <div onMouseEnter={() => setActiveEquipmentId('pc')} onMouseLeave={() => setActiveEquipmentId(null)}>
                    <RoomItem id="pc" x={20} y={20} w={140} h={80} z={20} color="bg-blue-500/30" label="Графічна Станція" activeId={activeEquipmentId} icon={Monitor} />
                  </div>
                  <div onMouseEnter={() => setActiveEquipmentId('printer')} onMouseLeave={() => setActiveEquipmentId(null)}>
                    <RoomItem id="printer" x={200} y={20} w={100} h={80} z={15} color="bg-emerald-500/30" label="Зона Друку" activeId={activeEquipmentId} icon={Printer} />
                  </div>
                  <div onMouseEnter={() => setActiveEquipmentId('post')} onMouseLeave={() => setActiveEquipmentId(null)}>
                    <RoomItem id="post" x={20} y={300} w={200} h={80} z={15} color="bg-amber-500/30" label="Стіл Пост-обробки" activeId={activeEquipmentId} icon={Scissors} />
                  </div>
                  <div onMouseEnter={() => setActiveEquipmentId('materials')} onMouseLeave={() => setActiveEquipmentId(null)}>
                    <RoomItem id="materials" x={240} y={300} w={60} h={80} z={30} color="bg-purple-500/30" label="Стелаж з Матеріалами" activeId={activeEquipmentId} icon={Layers} />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2"><PaintBucket className="text-indigo-400" /> Кольорова Палітра</h3>
                <div className="space-y-4">
                  {interiorData.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl shadow-inner border border-white/10" style={{ backgroundColor: color.hex }}></div>
                      <div><h4 className="text-white font-medium">{color.name}</h4><p className="text-sm text-slate-400">{color.description}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2"><Lightbulb className="text-amber-400" /> Ергономіка та Освітлення</h3>
                <ul className="space-y-4">
                  {interiorData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case 'process':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-4xl font-serif text-white mb-2">Технологія Виробництва</h2>
                <p className="text-slate-400">Натисніть кнопку, щоб побачити повний цикл створення журналу.</p>
              </div>
              <button 
                onClick={isSimulating ? undefined : startSimulation}
                disabled={isSimulating}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isSimulating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.4)]'}`}
              >
                {isSimulating ? <><RefreshCw className="animate-spin" size={20} /> Симуляція...</> : <><Play size={20} /> Запустити Друк</>}
              </button>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-1/2 left-12 right-12 h-1 bg-white/5 -translate-y-1/2 hidden lg:block z-0"></div>
              <div className="absolute top-1/2 left-12 h-1 bg-indigo-500 -translate-y-1/2 hidden lg:block z-0 transition-all duration-1000 ease-linear" style={{ width: isSimulating ? `${Math.min((simStep / (processSteps.length - 1)) * 100, 100)}%` : '0%' }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative z-10">
                {processSteps.map((step, index) => {
                  const isActive = isSimulating && simStep === index;
                  const isPast = isSimulating && simStep > index;
                  const isDone = simStep === processSteps.length;
                  return (
                    <div key={index} className="flex flex-col items-center relative">
                      <motion.div 
                        animate={{ scale: isActive ? 1.2 : 1, borderColor: isActive || isPast || isDone ? '#6366F1' : 'rgba(255,255,255,0.1)', backgroundColor: isActive ? 'rgba(99,102,241,0.2)' : (isPast || isDone ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)') }}
                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 transition-colors duration-500 ${isActive ? 'shadow-[0_0_30px_rgba(99,102,241,0.5)]' : ''}`}
                      >
                        {index === 0 && <Monitor size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                        {index === 1 && <Printer size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                        {index === 2 && <Layers size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                        {index === 3 && <BookOpen size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                        {index === 4 && <Scissors size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                        {index === 5 && <CheckCircle2 size={24} className={isActive || isPast || isDone ? 'text-indigo-400' : 'text-slate-500'} />}
                      </motion.div>
                      <div className="text-center">
                        <h4 className={`font-medium mb-2 transition-colors duration-500 ${isActive ? 'text-white' : (isPast || isDone ? 'text-slate-300' : 'text-slate-500')}`}>{step.title}</h4>
                        <p className={`text-xs transition-colors duration-500 ${isActive ? 'text-indigo-200' : 'text-transparent lg:text-slate-600'}`}>{isActive ? "Виконується..." : (isPast || isDone ? "Завершено" : "Очікування")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {simStep === processSteps.length && (
                  <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-3xl">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50 shadow-[0_0_50px_rgba(52,211,153,0.4)]"><BookOpen size={48} className="text-emerald-400" /></div>
                    <h3 className="text-4xl font-serif text-white mb-2">Журнал Готовий!</h3>
                    <p className="text-emerald-400">Повний цикл виробництва успішно завершено.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Log */}
            <div className="bg-black/90 border border-slate-700 p-6 rounded-2xl font-mono text-sm text-emerald-400 h-64 overflow-y-auto shadow-inner relative">
              <div className="absolute top-4 right-4 text-slate-600"><Terminal size={20} /></div>
              <div className="text-slate-500 mb-4">root@school-pub-house:~# ./start_production.sh</div>
              {isSimulating && simLogs.slice(0, simStep + 1).map((stepLogs, i) => (
                <div key={i} className="mb-3">
                  {stepLogs.map((log, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.5 }}>
                      <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
                    </motion.div>
                  ))}
                </div>
              ))}
              {!isSimulating && simStep === 0 && <div className="text-slate-500 animate-pulse">Очікування команди...</div>}
              <div ref={logEndRef} />
            </div>
          </motion.div>
        );

      case 'pitch':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Чому саме цей проект?</h2>
              <p className="text-xl text-slate-400">School Publishing House — це не витрата 50 000 грн. Це інвестиція, яка окупає себе та створює нові можливості для учнів.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pitchData.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="text-xl font-medium text-slate-300 mb-4 relative z-10">{item.title}</h3>
                  <div className="text-3xl font-serif text-indigo-400 mb-4 relative z-10">{item.value}</div>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Teacher Benefits */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border border-emerald-500/30 p-8 md:p-12 rounded-3xl relative overflow-hidden mt-8">
              <Heart className="absolute -right-10 -top-10 text-emerald-500/10 w-64 h-64" />
              <h3 className="text-3xl font-serif text-white mb-6 relative z-10">Цінність для Вчителів</h3>
              <p className="text-slate-300 mb-8 relative z-10 max-w-2xl">Більше ніяких витрат з власної кишені на друк роздаткових матеріалів. Друкарня забезпечує педагогів усім необхідним для сучасного уроку.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {teacherBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-emerald-400" size={20} />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pt-1">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-[#0B0F19] border border-indigo-500/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                <div className="flex-1 space-y-8">
                  <div><h3 className="text-3xl font-serif text-white mb-2">Калькулятор Окупності</h3><p className="text-slate-400">Порахуйте економію на друку грамот, газет та методичок.</p></div>
                  <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between text-lg text-slate-300"><span>Кількість копій на місяць:</span><span className="text-white font-mono font-bold text-indigo-400">{calcCopies} шт.</span></div>
                    <input type="range" min="50" max="1000" step="50" value={calcCopies} onChange={(e) => setCalcCopies(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                    <div className="flex justify-between text-xs text-slate-500"><span>50</span><span>1000</span></div>
                  </div>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl">
                    <div className="flex justify-between items-end"><span className="text-white font-medium">Чиста економія за рік:</span><span className="text-4xl font-serif text-emerald-400">{(calcCopies * 13 * 12).toLocaleString()} ₴</span></div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-end h-[300px] lg:h-auto border-l border-white/10 pl-0 lg:pl-12 pt-8 lg:pt-0">
                  <div className="flex items-end justify-center gap-8 h-full w-full">
                    <div className="flex flex-col items-center gap-4 w-1/3">
                      <span className="text-2xl text-slate-300 font-mono">{(calcCopies * 15 * 12).toLocaleString()}</span>
                      <motion.div className="w-full bg-red-500/80 rounded-t-xl relative group" animate={{ height: `${Math.max((calcCopies * 15 * 12) / 180000 * 250, 20)}px` }} transition={{ type: "spring", stiffness: 100 }}><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl"></div></motion.div>
                      <span className="text-slate-400 text-sm text-center">Витрати в<br/>типографії</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-1/3">
                      <span className="text-2xl text-emerald-400 font-mono">{(calcCopies * 2 * 12).toLocaleString()}</span>
                      <motion.div className="w-full bg-emerald-500/80 rounded-t-xl relative" animate={{ height: `${Math.max((calcCopies * 2 * 12) / 180000 * 250, 10)}px` }} transition={{ type: "spring", stiffness: 100 }}><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl"></div></motion.div>
                      <span className="text-slate-400 text-sm text-center">Власна<br/>собівартість</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
              <Award size={48} className="mx-auto text-amber-400 mb-6" />
              <h3 className="text-3xl font-serif text-white mb-6">Висновок для Адміністрації</h3>
              <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Шановна адміністраціє! Цей проект — це створення власного медіа-центру, який <strong>окупить себе менш ніж за рік</strong>. 
                Він дасть учням реальну професію, підвищить престиж школи на рівні міста та дозволить створювати преміальні матеріали за копійки. 
                <strong>Особлива цінність для вчителів:</strong> більше жодних зборів на папір чи друк роздаткових матеріалів за власний кошт.
                Ми пропонуємо інвестувати 50 000 грн сьогодні, щоб економити сотні тисяч завтра.
              </p>
              <button onClick={() => setActiveTab('overview')} className="inline-flex items-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                Затвердити проект <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex">
      <button className="md:hidden fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#0B0F19]/95 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col transition-transform duration-300 z-40 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-12 mt-4">
          <h2 className="text-2xl font-serif text-white leading-tight">School<br/><span className="text-indigo-400 italic">Publishing</span></h2>
        </div>
        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-500/15 text-indigo-400 font-medium border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="text-xs text-slate-500 mb-1">Бюджет проекту:</div>
          <div className="text-xl text-white font-serif tracking-wide">{totalBudget.toLocaleString()} ₴</div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 lg:p-20 max-w-7xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
        
        {/* Floating Help Button */}
        <button onClick={() => setShowGuide(true)} className="fixed bottom-8 right-8 bg-indigo-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:bg-indigo-600 transition-colors z-40">
          <HelpCircle size={24} />
        </button>
      </main>
      
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowGuide(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-3"><Info className="text-indigo-400" /> Як користуватися</h3>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex gap-3"><Printer className="text-emerald-400 shrink-0" size={20} /> <span><strong className="text-white">Технопарк:</strong> Наводьте на обладнання, щоб побачити його в 3D-кімнаті.</span></li>
                <li className="flex gap-3"><Play className="text-amber-400 shrink-0" size={20} /> <span><strong className="text-white">Технологія:</strong> Натисніть "Запустити Друк" для живої симуляції та логів.</span></li>
                <li className="flex gap-3"><TrendingUp className="text-indigo-400 shrink-0" size={20} /> <span><strong className="text-white">Бізнес-план:</strong> Рухайте повзунок калькулятора для розрахунку економії.</span></li>
              </ul>
              <button onClick={() => setShowGuide(false)} className="w-full bg-indigo-500 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors">Зрозуміло</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const RoomItem = ({ id, x, y, w, h, z, color, label, activeId, icon: Icon }: any) => {
  const isActive = activeId === id || (Array.isArray(activeId) && activeId.includes(id));
  return (
    <motion.div
      className={`absolute flex items-center justify-center backdrop-blur-md transition-all duration-500 border ${isActive ? 'border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.6)] z-50' : 'border-white/20 z-10'} ${color}`}
      style={{ left: x, top: y, width: w, height: h, transformStyle: 'preserve-3d' }}
      animate={{ translateZ: isActive ? z + 20 : z, scale: isActive ? 1.05 : 1 }}
    >
      <div className="absolute inset-0 bg-black/30" style={{ transform: 'translateZ(-10px)' }} />
      <div className="flex flex-col items-center justify-center gap-2" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
        <Icon size={isActive ? 28 : 20} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`} />
        {isActive && (
          <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-white text-[10px] font-bold whitespace-nowrap bg-black/60 px-2 py-1 rounded-md border border-white/10">
            {label}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default App;
