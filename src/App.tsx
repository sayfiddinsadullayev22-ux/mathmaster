import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Loader2, 
  BookOpen, 
  BrainCircuit, 
  Star,
  Settings,
  User,
  Calculator,
  TrendingUp
} from 'lucide-react';
import { topics, Topic } from './data/topics';
import { generateProblem, MathProblem } from './lib/gemini';
import { InlineMath, BlockMath } from 'react-katex';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState<'Hammasi' | 'Algebra' | 'Tenglamalar' | 'Funksiya' | 'Geometriya'>('Hammasi');

  const filteredTopics = category === 'Hammasi' 
    ? topics 
    : topics.filter(t => t.category === category);

  const startQuiz = async (topic: Topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setSelectedAnswer(null);
    setShowExplanation(false);
    try {
      const newProblem = await generateProblem(topic.title);
      setProblem(newProblem);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === problem?.correctAnswer) {
      setScore(prev => prev + 10);
    }
    setShowExplanation(true);
  };

  const nextProblem = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    setSelectedAnswer(null);
    setShowExplanation(false);
    try {
      const newProblem = await generateProblem(selectedTopic.title);
      setProblem(newProblem);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">MathMaster</h1>
            <p className="text-xs text-slate-500">Algebra & Geometriya</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100">
            <Trophy size={16} className="fill-amber-500 text-amber-500" />
            <span className="font-bold text-sm">{score}</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <User size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        {!selectedTopic ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Banner */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Xush kelibsiz!</h2>
                <p className="text-indigo-100 text-sm mb-4 max-w-[200px]">Matematikani o'yin orqali o'rganing va murakkab masalalarni yeching.</p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                  <Play size={16} fill="currentColor" />
                  Boshlash
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                <Calculator size={120} />
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['Hammasi', 'Algebra', 'Tenglamalar', 'Funksiya', 'Geometriya'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    category === cat 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startQuiz(topic)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 text-left flex items-start gap-4 hover:border-indigo-300 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                    <topic.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 truncate">{topic.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{topic.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                        {topic.category}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => (
                          <Star key={i} size={10} className={i <= 2 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quiz Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedTopic(null)}
                className="p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">Orqaga</span>
              </button>
              <div className="text-right">
                <h2 className="font-bold text-slate-900">{selectedTopic.title}</h2>
                <p className="text-xs text-slate-500">Murakkab daraja</p>
              </div>
            </div>

            {/* Problem Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm min-h-[300px] flex flex-col">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
                  <Loader2 className="animate-spin" size={40} />
                  <p className="text-sm font-medium">Savol tayyorlanmoqda...</p>
                </div>
              ) : problem ? (
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">Q</span>
                      <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Masala</span>
                    </div>
                    <div className="text-lg font-medium leading-relaxed text-slate-800">
                      <BlockMath math={problem.question} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {problem.options.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === problem.correctAnswer;
                      const showResult = selectedAnswer !== null;

                      return (
                        <button
                          key={idx}
                          disabled={showResult}
                          onClick={() => handleAnswer(option)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                            isSelected 
                              ? isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50'
                              : showResult && isCorrect 
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                              isSelected
                                ? isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                                : showResult && isCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-white text-slate-400 group-hover:text-indigo-600'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className={`font-medium ${
                              isSelected || (showResult && isCorrect) ? 'text-slate-900' : 'text-slate-600'
                            }`}>
                              <InlineMath math={option} />
                            </span>
                          </div>
                          {showResult && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                          {isSelected && !isCorrect && <XCircle size={20} className="text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-4 border-t border-slate-100"
                      >
                        <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                            <Info size={16} className="text-indigo-500" />
                            Tushuntirish
                          </div>
                          <div className="text-sm text-slate-600 leading-relaxed">
                            <BlockMath math={problem.explanation} />
                          </div>
                        </div>
                        <button 
                          onClick={nextProblem}
                          className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                        >
                          Keyingi masala
                          <Play size={16} fill="currentColor" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-rose-500">
                  <Info size={40} />
                  <p className="text-sm font-medium">Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>
                  <button onClick={() => startQuiz(selectedTopic)} className="text-indigo-600 font-bold underline">Qayta yuklash</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex items-center justify-between z-40 max-w-2xl mx-auto rounded-t-3xl shadow-2xl">
        <button 
          onClick={() => setSelectedTopic(null)}
          className={`flex flex-col items-center gap-1 transition-colors ${!selectedTopic ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <BookOpen size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Mavzular</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <TrendingUp size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Reyting</span>
        </button>
        <div className="relative -top-8">
          <button 
            onClick={() => {
              const randomTopic = topics[Math.floor(Math.random() * topics.length)];
              startQuiz(randomTopic);
            }}
            className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 hover:scale-110 transition-transform"
          >
            <Play size={28} fill="currentColor" />
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Trophy size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Yutuqlar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Settings size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Sozlamalar</span>
        </button>
      </nav>
    </div>
  );
}
