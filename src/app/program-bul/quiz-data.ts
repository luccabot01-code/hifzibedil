// ─── Program definitions ────────────────────────────────────────────
export type ProgramInfo = {
  year: string;
  label: string;
  hex: string;
  slug: string;
};

export const PROGRAMS: Record<string, ProgramInfo> = {
  "6": { year: "6", label: "6 Yıllık Program", hex: "#CDCBB7", slug: "6yil" },
  "4": { year: "4", label: "4 Yıllık Program", hex: "#D9BCB4", slug: "4yil" },
  "2": { year: "2", label: "2 Yıllık Program", hex: "#C1D2D2", slug: "2yil" },
  "1": {
    year: "1",
    label: "1 Yıllık Has Programı",
    hex: "#E8CCB2",
    slug: "1yil",
  },
};

// ─── Step / option types ────────────────────────────────────────────
export type QuizOption = {
  label: string;
  value: string;
  nextStep: string; // step id or "result" or "no-program"
};

export type QuizStep = {
  id: string;
  question: string;
  options: QuizOption[];
};

// ─── Result types ───────────────────────────────────────────────────
export type QuizResult = {
  primary: ProgramInfo;
  alternative?: ProgramInfo;
  advanced?: ProgramInfo;
  body?: string;
};

// ─── All steps ──────────────────────────────────────────────────────
export const STEPS: Record<string, QuizStep> = {
  level: {
    id: "level",
    question: "Hâlihazırdaki Kur'ân-ı Kerîm eğitim seviyeniz nedir?",
    options: [
      {
        label: "İlk defa hafızlık yapacağım",
        value: "ilk-defa",
        nextStep: "kuran-bilgisi",
      },
      {
        label: "Hafızlığım yarıda kaldı",
        value: "yarida-kaldi",
        nextStep: "ezber-durumu-yarida",
      },
      { label: "Hafızım", value: "hafizim", nextStep: "hafizlik-zamani" },
    ],
  },

  // ── İlk defa hafızlık branch ──────────────────────────────────────
  "kuran-bilgisi": {
    id: "kuran-bilgisi",
    question: "Kur'ân-ı Kerîm bilginiz nasıl?",
    options: [
      {
        label:
          "Temel Kur'ân-ı Kerîm bilgisi ve tecvîd ahkâmına sahibim. Hatasız bir okuyuşum var.",
        value: "kuvvetli",
        nextStep: "ezber-kabiliyeti",
      },
      {
        label:
          "Temel Kur'ân-ı Kerîm bilgisi ve tecvîd ahkâmım zayıf veya hiç yok. Hatasız okuduğumu söyleyemem, yeni başlıyorum.",
        value: "zayif",
        nextStep: "no-program",
      },
    ],
  },

  "ezber-kabiliyeti": {
    id: "ezber-kabiliyeti",
    question: "Ezber kabiliyetiniz hangi seviyededir?",
    options: [
      {
        label: "Hızlı ezberlerim ve ezberimi unutmam",
        value: "hizli-unutmam",
        nextStep: "tempo-ilk",
      },
      {
        label: "Hızlı ezberlerim ancak çabuk unuturum",
        value: "hizli-unuturum",
        nextStep: "tempo-ilk",
      },
      {
        label: "Yavaş ezberlerim ancak ezberimi unutmam",
        value: "yavas-unutmam",
        nextStep: "tempo-ilk",
      },
      {
        label: "Yavaş ezberlerim ve çabuk unuturum",
        value: "yavas-unuturum",
        nextStep: "tempo-ilk",
      },
    ],
  },

  "tempo-ilk": {
    id: "tempo-ilk",
    question:
      "Hayat temponuz ve günlük yoğunluğunuzu nasıl değerlendirirsiniz?",
    options: [
      {
        label: "Çok yoğunum ama 1-2 saat ayırabilirim.",
        value: "1-2",
        nextStep: "result",
      },
      {
        label:
          "Orta yoğunlukta bir tempom var. Biraz daha fazla vakit ayırabilirim. 2-3 saat.",
        value: "2-3",
        nextStep: "result",
      },
      {
        label:
          "Pek yoğun değilim. Hafızlığa iyi bir zaman ayırabilirim. En az 4 saat.",
        value: "4+",
        nextStep: "result",
      },
    ],
  },

  // ── Hafızlığım yarıda kaldı branch ───────────────────────────────
  "ezber-durumu-yarida": {
    id: "ezber-durumu-yarida",
    question: "Hâlen ezberinizde olan kısımlar var mıdır?",
    options: [
      {
        label: "Evet, ezberlediğim bölümler hafızamda",
        value: "hafizada",
        nextStep: "tempo-yarida",
      },
      {
        label: "Maalesef çoğunu unuttum",
        value: "unuttum",
        nextStep: "tempo-yarida",
      },
    ],
  },

  "tempo-yarida": {
    id: "tempo-yarida",
    question:
      "Hayat temponuz ve günlük yoğunluğunuzu nasıl değerlendirirsiniz?",
    options: [
      {
        label: "Çok yoğunum ama 1-2 saat ayırabilirim.",
        value: "1-2",
        nextStep: "result",
      },
      {
        label:
          "Orta yoğunlukta bir tempom var. Biraz daha fazla vakit ayırabilirim. 2-3 saat.",
        value: "2-3",
        nextStep: "result",
      },
      {
        label:
          "Pek yoğun değilim. Hafızlığa iyi bir zaman ayırabilirim. En az 4 saat.",
        value: "4+",
        nextStep: "result",
      },
    ],
  },

  // ── Hafızım branch ────────────────────────────────────────────────
  "hafizlik-zamani": {
    id: "hafizlik-zamani",
    question: "Hafızlığınızı ne zaman tamamladınız?",
    options: [
      {
        label: "Hafızlığımı uzun süre önce yaptım",
        value: "uzun-sure-once",
        nextStep: "ezber-durumu-eski",
      },
      {
        label: "Hafızlığımı yeni bitirdim",
        value: "yeni-bitirdim",
        nextStep: "hafizlik-kuvveti",
      },
    ],
  },

  "ezber-durumu-eski": {
    id: "ezber-durumu-eski",
    question: "Hâlen ezberinizde olan kısımlar var mı?",
    options: [
      {
        label: "Evet, hafızlığım kuvvetli",
        value: "kuvvetli",
        nextStep: "tempo-eski",
      },
      {
        label: "Ezberimde olan kısımlar var",
        value: "kisimlar-var",
        nextStep: "tempo-eski",
      },
      {
        label: "Çoğunu unuttum",
        value: "unuttum",
        nextStep: "tempo-eski",
      },
    ],
  },

  "tempo-eski": {
    id: "tempo-eski",
    question:
      "Hayat temponuz ve günlük yoğunluğunuzu nasıl değerlendirirsiniz?",
    options: [
      {
        label: "Çok yoğunum. Günlük az vakit ayırabilirim. 1-2 saat.",
        value: "1-2",
        nextStep: "result",
      },
      {
        label:
          "Orta yoğunlukta bir tempom var. Biraz daha fazla vakit ayırabilirim. 2-3 saat.",
        value: "2-3",
        nextStep: "result",
      },
      {
        label:
          "Pek yoğun değilim. Hafızlık tekrarına iyi bir zaman ayırabilirim. 3-4 saat.",
        value: "3-4",
        nextStep: "result",
      },
    ],
  },

  "hafizlik-kuvveti": {
    id: "hafizlik-kuvveti",
    question: "Hafızlığınızın kuvvetini nasıl değerlendirirsiniz?",
    options: [
      {
        label: "Sağlam bir hafızlığım var",
        value: "saglam",
        nextStep: "tempo-yeni",
      },
      {
        label: "Zayıf olan kısımlar var",
        value: "zayif",
        nextStep: "tempo-yeni",
      },
      {
        label: "Maalesef hiç tekrar yapmadım",
        value: "tekrar-yok",
        nextStep: "tempo-yeni",
      },
    ],
  },

  "tempo-yeni": {
    id: "tempo-yeni",
    question:
      "Hayat temponuz ve günlük yoğunluğunuzu nasıl değerlendirirsiniz?",
    options: [
      {
        label: "Çok yoğunum. Günlük az vakit ayırabilirim. 1-2 saat.",
        value: "1-2",
        nextStep: "result",
      },
      {
        label:
          "Orta yoğunlukta bir tempom var. Biraz daha fazla vakit ayırabilirim. 2-3 saat.",
        value: "2-3",
        nextStep: "result",
      },
      {
        label:
          "Pek yoğun değilim. Hafızlık tekrarına iyi bir zaman ayırabilirim. 3-4 saat.",
        value: "3-4",
        nextStep: "result",
      },
    ],
  },
};

// ─── Step order per branch (for progress bar) ───────────────────────
const BRANCH_PATHS: Record<string, string[]> = {
  "ilk-defa-kuvvetli": [
    "level",
    "kuran-bilgisi",
    "ezber-kabiliyeti",
    "tempo-ilk",
  ],
  "ilk-defa-zayif": ["level", "kuran-bilgisi"],
  "yarida-kaldi": ["level", "ezber-durumu-yarida", "tempo-yarida"],
  "hafizim-eski": [
    "level",
    "hafizlik-zamani",
    "ezber-durumu-eski",
    "tempo-eski",
  ],
  "hafizim-yeni": [
    "level",
    "hafizlik-zamani",
    "hafizlik-kuvveti",
    "tempo-yeni",
  ],
};

export function getProgress(
  currentStep: string,
  answers: Record<string, string>
): number {
  // Determine which branch we're on
  const level = answers.level;
  const kuranBilgisi = answers["kuran-bilgisi"];
  const hafizlikZamani = answers["hafizlik-zamani"];

  let branchKey = "ilk-defa-kuvvetli"; // default
  if (level === "ilk-defa") {
    branchKey =
      kuranBilgisi === "zayif" ? "ilk-defa-zayif" : "ilk-defa-kuvvetli";
  } else if (level === "yarida-kaldi") {
    branchKey = "yarida-kaldi";
  } else if (level === "hafizim") {
    branchKey =
      hafizlikZamani === "yeni-bitirdim" ? "hafizim-yeni" : "hafizim-eski";
  }

  const path = BRANCH_PATHS[branchKey] ?? BRANCH_PATHS["ilk-defa-kuvvetli"];
  const currentIndex = path.indexOf(currentStep);

  if (currentStep === "result" || currentStep === "no-program") return 1;
  if (currentIndex === -1) return 0;

  return (currentIndex + 1) / (path.length + 1); // +1 for result screen
}

// ─── Result engine ──────────────────────────────────────────────────
const P6 = PROGRAMS["6"];
const P4 = PROGRAMS["4"];
const P2 = PROGRAMS["2"];
const P1 = PROGRAMS["1"];

type ResultEntry = {
  primary: ProgramInfo;
  alternative?: ProgramInfo;
  advanced?: ProgramInfo;
};

function r(
  primary: ProgramInfo,
  alternative?: ProgramInfo,
  advanced?: ProgramInfo
): ResultEntry {
  return { primary, alternative, advanced };
}

// Result lookup tables
const ILK_DEFA_RESULTS: Record<string, Record<string, ResultEntry>> = {
  "hizli-unutmam": {
    "1-2": r(P6),
    "2-3": r(P4, P6),
    "4+": r(P2, P4, P1),
  },
  "hizli-unuturum": {
    "1-2": r(P6),
    "2-3": r(P6),
    "4+": r(P4, P6),
  },
  "yavas-unutmam": {
    "1-2": r(P6),
    "2-3": r(P6),
    "4+": r(P4, P6),
  },
  "yavas-unuturum": {
    "1-2": r(P6),
    "2-3": r(P6),
    "4+": r(P6),
  },
};

const YARIDA_KALDI_RESULTS: Record<string, Record<string, ResultEntry>> = {
  hafizada: {
    "1-2": r(P6, P4),
    "2-3": r(P4, P6),
    "4+": r(P2, P4, P1),
  },
  unuttum: {
    "1-2": r(P6),
    "2-3": r(P6, P4),
    "4+": r(P4, P6),
  },
};

const ESKI_HAFIZ_RESULTS: Record<string, Record<string, ResultEntry>> = {
  kuvvetli: {
    "1-2": r(P2, P1),
    "2-3": r(P2, P1),
    "3-4": r(P1, P2),
  },
  "kisimlar-var": {
    "1-2": r(P4, P2),
    "2-3": r(P4, P2),
    "3-4": r(P2, P4),
  },
  unuttum: {
    "1-2": r(P6, P4),
    "2-3": r(P4, P6),
    "3-4": r(P4, P2),
  },
};

const YENI_HAFIZ_RESULTS: Record<string, Record<string, ResultEntry>> = {
  saglam: {
    "1-2": r(P2, P1),
    "2-3": r(P2, P1),
    "3-4": r(P1),
  },
  zayif: {
    "1-2": r(P4, P2),
    "2-3": r(P4, P2),
    "3-4": r(P2),
  },
  "tekrar-yok": {
    "1-2": r(P6, P4),
    "2-3": r(P4, P6),
    "3-4": r(P4, P2),
  },
};

export function getResult(
  answers: Record<string, string>
): QuizResult | "no-program" {
  const level = answers.level;

  if (level === "ilk-defa") {
    if (answers["kuran-bilgisi"] === "zayif") return "no-program";
    const ezber = answers["ezber-kabiliyeti"];
    const tempo = answers["tempo-ilk"];
    return ILK_DEFA_RESULTS[ezber]?.[tempo] ?? r(P6);
  }

  if (level === "yarida-kaldi") {
    const durumu = answers["ezber-durumu-yarida"];
    const tempo = answers["tempo-yarida"];
    return YARIDA_KALDI_RESULTS[durumu]?.[tempo] ?? r(P6);
  }

  if (level === "hafizim") {
    const zaman = answers["hafizlik-zamani"];

    if (zaman === "uzun-sure-once") {
      const durumu = answers["ezber-durumu-eski"];
      const tempo = answers["tempo-eski"];
      return ESKI_HAFIZ_RESULTS[durumu]?.[tempo] ?? r(P4);
    }

    if (zaman === "yeni-bitirdim") {
      const kuvvet = answers["hafizlik-kuvveti"];
      const tempo = answers["tempo-yeni"];
      return YENI_HAFIZ_RESULTS[kuvvet]?.[tempo] ?? r(P4);
    }
  }

  return r(P6);
}
