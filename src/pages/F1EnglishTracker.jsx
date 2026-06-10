import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Radio,
  Brain,
  Flag,
  Trophy,
  Flame,
  CircleCheck,
  CircleX,
  Volume2
} from 'lucide-react';
import { pitRadioItems, translations, gridWalkItems } from '../data/f1EnglishData';
import {
  getProgress,
  saveProgress,
  appendHistory,
  getSrs,
  updateSrsReview,
  getDueTranslationIds,
  applyProgressAfterAnswer
} from '../services/f1Storage';

const MODES = {
  PIT: 'pit_radio',
  DRS: 'flashcard',
  GRID: 'grid_walk'
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const F1EnglishTracker = ({ onBack }) => {
  const [activeMode, setActiveMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ xp_total: 0, streak_atual: 0, ultima_data_estudo: null });
  const [srsRows, setSrsRows] = useState([]);

  const [shuffledPitItems] = useState(() => shuffle(pitRadioItems));
  const [shuffledGridItems] = useState(() => shuffle(gridWalkItems));
  const [shuffledTranslations] = useState(() => shuffle(translations));

  const [pitIndex, setPitIndex] = useState(0);
  const [pitChoice, setPitChoice] = useState(null);
  const [pitResult, setPitResult] = useState(null);

  const [drsIndex, setDrsIndex] = useState(0);
  const [drsReveal, setDrsReveal] = useState(false);
  const [drsHintsUnlocked, setDrsHintsUnlocked] = useState(0);

  const [gridIndex, setGridIndex] = useState(0);
  const [gridChoice, setGridChoice] = useState(null);
  const [gridResult, setGridResult] = useState(null);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const [savedProgress, savedSrs] = await Promise.all([getProgress(), getSrs()]);
      if (!mounted) {
        return;
      }

      setProgress(savedProgress);
      setSrsRows(savedSrs);
      setLoading(false);
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  const dueCards = useMemo(() => {
    const dueIds = new Set(getDueTranslationIds(srsRows));
    const due = shuffledTranslations.filter((item) => dueIds.has(item.id));
    return due.length > 0 ? due : shuffledTranslations;
  }, [srsRows, shuffledTranslations]);

  const currentPit = shuffledPitItems[pitIndex];
  const currentGrid = shuffledGridItems[gridIndex];
  const currentDrs = dueCards[drsIndex % dueCards.length];

  const enterMode = (mode) => {
    setActiveMode(mode);
  };

  const backToTrackerHome = () => {
    setActiveMode(null);
  };

  const registerAnswer = async ({ mode, referenceId, acertou }) => {
    const updatedProgress = applyProgressAfterAnswer(progress, acertou);
    setProgress(updatedProgress);
    await saveProgress(updatedProgress);

    await appendHistory({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      tipo_modo: mode,
      id_referencia: referenceId,
      acertou,
      data_resposta: new Date().toISOString()
    });
  };

  const speakPitText = () => {
    if (!currentPit) {
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPit.textEn);
      utterance.lang = 'en-US';
      utterance.rate = 0.70;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const submitPit = async () => {
    if (pitChoice === null) {
      return;
    }

    const acertou = pitChoice === currentPit.correctIndex;
    setPitResult(acertou);
    await registerAnswer({ mode: MODES.PIT, referenceId: currentPit.id, acertou });
  };

  const nextPit = () => {
    setPitChoice(null);
    setPitResult(null);
    setPitIndex((prev) => (prev + 1) % shuffledPitItems.length);
  };

  const prevPit = () => {
    setPitChoice(null);
    setPitResult(null);
    setPitIndex((prev) => (prev - 1 + shuffledPitItems.length) % shuffledPitItems.length);
  };

  const submitGrid = async () => {
    if (!gridChoice) {
      return;
    }

    const acertou = gridChoice === currentGrid.correct;
    setGridResult(acertou);
    await registerAnswer({ mode: MODES.GRID, referenceId: currentGrid.id, acertou });
  };

  const nextGrid = () => {
    setGridChoice(null);
    setGridResult(null);
    setGridIndex((prev) => (prev + 1) % shuffledGridItems.length);
  };

  const prevGrid = () => {
    setGridChoice(null);
    setGridResult(null);
    setGridIndex((prev) => (prev - 1 + shuffledGridItems.length) % shuffledGridItems.length);
  };

  const rateDrs = async (acertou) => {
    if (!currentDrs) {
      return;
    }

    const nextSrs = await updateSrsReview(currentDrs.id, acertou);
    setSrsRows(nextSrs);
    await registerAnswer({ mode: MODES.DRS, referenceId: currentDrs.id, acertou });

    setDrsReveal(false);
    setDrsHintsUnlocked(0);
  };

  const nextDrs = () => {
    setDrsReveal(false);
    setDrsHintsUnlocked(0);
    setDrsIndex((prev) => (prev + 1) % dueCards.length);
  };

  const prevDrs = () => {
    setDrsReveal(false);
    setDrsHintsUnlocked(0);
    setDrsIndex((prev) => (prev - 1 + dueCards.length) % dueCards.length);
  };

  const unlockDrsHint = () => {
    const hintsCount = currentDrs?.hintsPt?.length || 0;
    setDrsHintsUnlocked((prev) => Math.min(prev + 1, hintsCount));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0b1220] text-white p-6">Carregando F1 English Tracker...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05070d] via-[#0b1220] to-[#10192b] text-slate-100">
      <header className="border-b border-slate-800/90 backdrop-blur bg-[#05070d]/80 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-slate-700 hover:bg-slate-800"
          >
            <ArrowLeft size={16} /> Voltar ao Portfolio
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">F1 English Tracker</h1>
            <p className="text-xs text-slate-400">Treino diario de listening, vocabulario e contexto.</p>
          </div>

          <div className="flex gap-3">
            <div className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-sm flex items-center gap-2">
              <Trophy size={16} className="text-amber-400" /> XP {progress.xp_total}
            </div>
            <div className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-sm flex items-center gap-2">
              <Flame size={16} className="text-orange-400" /> Streak {progress.streak_atual}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!activeMode && (
          <section className="space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">F1 English Tracker</h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                Aplicativo de estudo de ingles com foco em Formula 1, pensado para treinar vocabulario tecnico,
                compreensao auditiva e contexto real de corrida.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                A proposta combina treino diario rapido, revisao inteligente com repeticao espacada (SRS) e
                feedback por XP e streak para criar consistencia de aprendizado.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => enterMode(MODES.PIT)}
                className="text-left rounded-2xl border border-sky-700/50 bg-[#13203a]/80 p-5 hover:border-sky-500 transition"
              >
                <div className="flex items-center gap-2 mb-2"><Radio size={18} className="text-sky-300" /> Pit Radio</div>
                <p className="text-sm text-slate-200 mb-2">Listening e quiz de radio de equipe.</p>
                <p className="text-xs text-slate-400">Treina ouvido para instrucoes e linguagem de corrida.</p>
              </button>

              <button
                onClick={() => enterMode(MODES.DRS)}
                className="text-left rounded-2xl border border-amber-700/50 bg-[#2a1600]/70 p-5 hover:border-amber-500 transition"
              >
                <div className="flex items-center gap-2 mb-2"><Brain size={18} className="text-amber-300" /> DRS Zone</div>
                <p className="text-sm text-slate-200 mb-2">Flashcards com dicas e SRS.</p>
                <p className="text-xs text-slate-400">Memorizacao progressiva de vocabulario tecnico e cotidiano.</p>
              </button>

              <button
                onClick={() => enterMode(MODES.GRID)}
                className="text-left rounded-2xl border border-emerald-700/50 bg-[#102616]/70 p-5 hover:border-emerald-500 transition"
              >
                <div className="flex items-center gap-2 mb-2"><Flag size={18} className="text-emerald-300" /> Grid Walk</div>
                <p className="text-sm text-slate-200 mb-2">Complete a frase com apoio bilingue.</p>
                <p className="text-xs text-slate-400">Fixacao de contexto, estrutura de frase e escolha de palavra.</p>
              </button>
            </div>
          </section>
        )}

        {activeMode && (
          <section className="grid sm:grid-cols-3 gap-3 mb-8">
          <button
            className={`p-4 rounded-xl border text-left transition ${activeMode === MODES.PIT ? 'bg-[#13203a] border-sky-500' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
            onClick={() => setActiveMode(MODES.PIT)}
          >
            <div className="flex items-center gap-2 mb-1"><Radio size={16} className="text-sky-400" /> Pit Radio</div>
            <p className="text-xs text-slate-400">Listening com quiz em contexto de corrida.</p>
          </button>

          <button
            className={`p-4 rounded-xl border text-left transition ${activeMode === MODES.DRS ? 'bg-[#2a1600] border-amber-500' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
            onClick={() => setActiveMode(MODES.DRS)}
          >
            <div className="flex items-center gap-2 mb-1"><Brain size={16} className="text-amber-400" /> DRS Zone</div>
            <p className="text-xs text-slate-400">Flashcards com repeticao espacada (SRS).</p>
          </button>

          <button
            className={`p-4 rounded-xl border text-left transition ${activeMode === MODES.GRID ? 'bg-[#102616] border-emerald-500' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
            onClick={() => setActiveMode(MODES.GRID)}
          >
            <div className="flex items-center gap-2 mb-1"><Flag size={16} className="text-emerald-400" /> Grid Walk</div>
            <p className="text-xs text-slate-400">Complete a frase para fixar contexto e gramatica.</p>
          </button>
          </section>
        )}

        {activeMode && (
          <div className="mb-6">
            <button
              onClick={backToTrackerHome}
              className="px-3 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800"
            >
              Voltar para home do tracker
            </button>
          </div>
        )}

        {activeMode === MODES.PIT && currentPit && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pit Radio</h2>
              <button
                className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-sm flex items-center gap-2"
                onClick={speakPitText}
              >
                <Volume2 size={16} /> Ouvir audio
              </button>
            </div>

            <p className="text-slate-300 mb-4">{currentPit.question}</p>

            <div className="grid gap-2">
              {currentPit.alternatives.map((alt, idx) => (
                <button
                  key={alt}
                  onClick={() => setPitChoice(idx)}
                  className={`text-left rounded-md border p-3 transition ${pitChoice === idx ? 'border-sky-500 bg-[#13203a]' : 'border-slate-700 hover:border-slate-500 bg-slate-900'}`}
                >
                  {alt}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={prevPit} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Voltar</button>
              <button onClick={submitPit} className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium">Confirmar</button>
              <button onClick={nextPit} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Proximo</button>
              {pitResult !== null && (
                <span className="text-sm flex items-center gap-1">
                  {pitResult ? <CircleCheck size={16} className="text-emerald-400" /> : <CircleX size={16} className="text-rose-400" />}
                  {pitResult ? 'Correto, bom ouvido.' : 'Nao foi dessa vez, continue treinando.'}
                </span>
              )}
            </div>
          </section>
        )}

        {activeMode === MODES.DRS && currentDrs && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold mb-4">DRS Zone</h2>

            <div className="rounded-xl border border-amber-600/40 bg-[#2a1600]/40 p-6 mb-4">
              <p className="text-xs uppercase tracking-wider text-amber-300 mb-2">English</p>
              <p className="text-3xl font-bold mb-4">{currentDrs.textEn}</p>

              <div className="mb-4 rounded-md border border-amber-800/60 bg-[#1b1205]/60 p-3">
                <p className="text-xs uppercase tracking-wider text-amber-300 mb-2">Dicas (PT-BR)</p>
                {(currentDrs.hintsPt || []).slice(0, drsHintsUnlocked).map((hint) => (
                  <p key={hint} className="text-sm text-amber-100">- {hint}</p>
                ))}

                {drsHintsUnlocked === 0 && (
                  <p className="text-sm text-amber-100/70">Nenhuma dica desbloqueada ainda.</p>
                )}

                {drsHintsUnlocked < (currentDrs.hintsPt || []).length && (
                  <button
                    onClick={unlockDrsHint}
                    className="mt-3 px-3 py-2 rounded-md border border-amber-500 text-amber-200 text-sm hover:bg-amber-500/10"
                  >
                    Desbloquear dica ({drsHintsUnlocked}/{(currentDrs.hintsPt || []).length})
                  </button>
                )}
              </div>

              {drsReveal ? (
                <>
                  <p className="text-xs uppercase tracking-wider text-amber-300 mb-2">Traducao</p>
                  <p className="text-xl">{currentDrs.textPt}</p>
                </>
              ) : (
                <button
                  onClick={() => setDrsReveal(true)}
                  className="px-3 py-2 rounded-md bg-amber-500 text-black text-sm font-semibold"
                >
                  Virar card
                </button>
              )}
            </div>

            {drsReveal && (
              <div className="flex flex-wrap gap-3">
                <button onClick={() => rateDrs(false)} className="px-4 py-2 rounded-md border border-rose-500 text-rose-300 hover:bg-rose-500/10">Errei</button>
                <button onClick={() => rateDrs(true)} className="px-4 py-2 rounded-md border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10">Acertei</button>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4">
              <button onClick={prevDrs} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Voltar</button>
              <button onClick={nextDrs} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Proximo</button>
            </div>
          </section>
        )}

        {activeMode === MODES.GRID && currentGrid && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold mb-4">Grid Walk</h2>
            <p className="text-slate-200 text-lg mb-4">{currentGrid.sentence}</p>
            <p className="text-slate-400 text-sm mb-4">{currentGrid.sentencePt}</p>

            <div className="grid sm:grid-cols-2 gap-2">
              {currentGrid.options.map((opt) => (
                <button
                  key={opt.en}
                  onClick={() => setGridChoice(opt.en)}
                  className={`text-left rounded-md border p-3 transition ${gridChoice === opt.en ? 'border-emerald-500 bg-[#102616]' : 'border-slate-700 hover:border-slate-500 bg-slate-900'}`}
                >
                  <p className="font-semibold text-slate-100">{opt.en}</p>
                  <p className="text-xs text-slate-400">{opt.pt}</p>
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={prevGrid} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Voltar</button>
              <button onClick={submitGrid} className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium">Confirmar</button>
              <button onClick={nextGrid} className="px-4 py-2 rounded-md border border-slate-700 text-sm hover:bg-slate-800">Proximo</button>
              {gridResult !== null && (
                <span className="text-sm flex items-center gap-1">
                  {gridResult ? <CircleCheck size={16} className="text-emerald-400" /> : <CircleX size={16} className="text-rose-400" />}
                  {gridResult ? 'Resposta correta.' : `Resposta correta: ${currentGrid.correct}`}
                </span>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default F1EnglishTracker;
