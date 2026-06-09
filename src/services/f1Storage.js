import localforage from 'localforage';
import { translations } from '../data/f1EnglishData';

const STORAGE_KEYS = {
  progress: 'f1_usuario_progresso',
  history: 'f1_historico_respostas',
  srs: 'f1_repeticao_espacada'
};

const SRS_INTERVAL_DAYS = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 14
};

const isoToday = () => new Date().toISOString().slice(0, 10);

const addDays = (isoDate, days) => {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const defaultProgress = () => ({
  xp_total: 0,
  streak_atual: 0,
  ultima_data_estudo: null
});

const buildInitialSrs = () => {
  const today = isoToday();
  return translations.map((item) => ({
    id_traducao: item.id,
    caixa: 1,
    proxima_revisao: today
  }));
};

export async function getProgress() {
  const saved = await localforage.getItem(STORAGE_KEYS.progress);
  return saved || defaultProgress();
}

export async function saveProgress(progress) {
  await localforage.setItem(STORAGE_KEYS.progress, progress);
}

export async function getHistory() {
  const saved = await localforage.getItem(STORAGE_KEYS.history);
  return saved || [];
}

export async function appendHistory(entry) {
  const current = await getHistory();
  const next = [entry, ...current].slice(0, 300);
  await localforage.setItem(STORAGE_KEYS.history, next);
  return next;
}

export async function getSrs() {
  const saved = await localforage.getItem(STORAGE_KEYS.srs);
  if (saved && saved.length > 0) {
    return saved;
  }

  const initial = buildInitialSrs();
  await localforage.setItem(STORAGE_KEYS.srs, initial);
  return initial;
}

export async function updateSrsReview(idTraducao, acertou) {
  const srs = await getSrs();
  const today = isoToday();

  const nextSrs = srs.map((item) => {
    if (item.id_traducao !== idTraducao) {
      return item;
    }

    const newBox = acertou ? Math.min(5, item.caixa + 1) : 1;
    return {
      ...item,
      caixa: newBox,
      proxima_revisao: addDays(today, SRS_INTERVAL_DAYS[newBox])
    };
  });

  await localforage.setItem(STORAGE_KEYS.srs, nextSrs);
  return nextSrs;
}

export function getDueTranslationIds(srsRows, referenceDate = isoToday()) {
  return srsRows
    .filter((row) => row.proxima_revisao <= referenceDate)
    .map((row) => row.id_traducao);
}

export function applyProgressAfterAnswer(progress, acertou) {
  const today = isoToday();
  const yesterday = addDays(today, -1);

  let streak = progress.streak_atual || 0;
  if (progress.ultima_data_estudo === today) {
    streak = progress.streak_atual || 1;
  } else if (progress.ultima_data_estudo === yesterday) {
    streak = (progress.streak_atual || 0) + 1;
  } else {
    streak = 1;
  }

  return {
    xp_total: (progress.xp_total || 0) + (acertou ? 10 : 3),
    streak_atual: streak,
    ultima_data_estudo: today
  };
}
