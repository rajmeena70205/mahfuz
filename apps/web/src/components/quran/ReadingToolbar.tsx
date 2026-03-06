import { useState, useRef, useEffect, useCallback } from "react";
import { usePreferencesStore, getArabicFontSizeForMode, getTranslationFontSizeForMode, COLOR_PALETTES } from "~/stores/usePreferencesStore";
import type { Theme, ViewMode, ColorPaletteId } from "~/stores/usePreferencesStore";

const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  normal: "Normal",
  wordByWord: "Kelime",
  mushaf: "Mushaf",
};

const THEMES: { value: Theme; label: string; color: string; border: string }[] = [
  { value: "light", label: "Açık", color: "#ffffff", border: "#d2d2d7" },
  { value: "sepia", label: "Sepia", color: "#f5ead6", border: "#d4b882" },
  { value: "dark", label: "Koyu", color: "#1a1a1a", border: "#444" },
];

function SizeSlider({
  label,
  value,
  onChange,
  smallIcon,
  largeIcon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  smallIcon: React.ReactNode;
  largeIcon: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-medium text-[var(--theme-text-tertiary)]">
          {label}
        </span>
        <span className="text-[11px] tabular-nums text-[var(--theme-text-quaternary)]">
          %{Math.round(value * 100)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex w-5 shrink-0 items-center justify-center">{smallIcon}</span>
        <input
          type="range"
          min="0.6"
          max="2.0"
          step="0.05"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--theme-border)] accent-primary-600"
        />
        <span className="flex w-5 shrink-0 items-center justify-center">{largeIcon}</span>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[13px] font-medium text-[var(--theme-text)]">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary-600" : "bg-[var(--theme-divider)]"
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function Divider() {
  return <div className="my-3 border-t border-[var(--theme-divider)]" />;
}

export function ReadingToolbar({ segmentStyle }: { segmentStyle?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // View mode
  const viewMode = usePreferencesStore((s) => s.viewMode);

  // Arabic font sizes (per-mode)
  const normalArabicFontSize = usePreferencesStore((s) => s.normalArabicFontSize);
  const wbwArabicFontSize = usePreferencesStore((s) => s.wbwArabicFontSize);
  const mushafArabicFontSize = usePreferencesStore((s) => s.mushafArabicFontSize);
  const setNormalArabicFontSize = usePreferencesStore((s) => s.setNormalArabicFontSize);
  const setWbwArabicFontSize = usePreferencesStore((s) => s.setWbwArabicFontSize);
  const setMushafArabicFontSize = usePreferencesStore((s) => s.setMushafArabicFontSize);

  // Translation (normal mode)
  const normalTranslationFontSize = usePreferencesStore((s) => s.normalTranslationFontSize);
  const setNormalTranslationFontSize = usePreferencesStore((s) => s.setNormalTranslationFontSize);
  const showTranslation = usePreferencesStore((s) => s.showTranslation);
  const setShowTranslation = usePreferencesStore((s) => s.setShowTranslation);

  // Colorize
  const colorizeWords = usePreferencesStore((s) => s.colorizeWords);
  const setColorizeWords = usePreferencesStore((s) => s.setColorizeWords);
  const colorPaletteId = usePreferencesStore((s) => s.colorPaletteId);
  const setColorPalette = usePreferencesStore((s) => s.setColorPalette);

  // Word-by-word
  const showWordTranslation = usePreferencesStore((s) => s.showWordTranslation);
  const setShowWordTranslation = usePreferencesStore((s) => s.setShowWordTranslation);
  const wordTranslationSize = usePreferencesStore((s) => s.wordTranslationSize);
  const setWordTranslationSize = usePreferencesStore((s) => s.setWordTranslationSize);
  const showWordTransliteration = usePreferencesStore((s) => s.showWordTransliteration);
  const setShowWordTransliteration = usePreferencesStore((s) => s.setShowWordTransliteration);
  const wordTransliterationSize = usePreferencesStore((s) => s.wordTransliterationSize);
  const setWordTransliterationSize = usePreferencesStore((s) => s.setWordTransliterationSize);
  const wbwTransliterationFirst = usePreferencesStore((s) => s.wbwTransliterationFirst);
  const setWbwTransliterationFirst = usePreferencesStore((s) => s.setWbwTransliterationFirst);

  // Theme
  const theme = usePreferencesStore((s) => s.theme);
  const setTheme = usePreferencesStore((s) => s.setTheme);

  // Derive current mode's Arabic font size
  const arabicFontSize = getArabicFontSizeForMode({ viewMode, normalArabicFontSize, wbwArabicFontSize, mushafArabicFontSize });
  const translationFontSize = getTranslationFontSizeForMode({ viewMode, normalTranslationFontSize });
  const setArabicFontSize = (size: number) => {
    switch (viewMode) {
      case "wordByWord": return setWbwArabicFontSize(size);
      case "mushaf": return setMushafArabicFontSize(size);
      default: return setNormalArabicFontSize(size);
    }
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    },
    [],
  );

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleClickOutside, handleEscape]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 font-medium transition-colors ${
          segmentStyle
            ? `relative z-[1] justify-center rounded-lg px-2.5 py-1.5 text-[12px] sm:px-3.5 ${
                open
                  ? "text-[var(--theme-text)]"
                  : "text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-secondary)]"
              }`
            : `h-8 rounded-full px-3 text-[13px] ${
                open
                  ? "bg-primary-600 text-white"
                  : "bg-[var(--theme-pill-bg)] text-[var(--theme-text)] hover:bg-[var(--theme-hover-bg)]"
              }`
        }`}
        aria-label="Okuma ayarları"
        aria-expanded={open}
      >
        <span className="text-[14px] font-semibold">A</span>
        <span className="arabic-text text-[14px] font-semibold leading-none">ع</span>
      </button>

      {open && (
        <>
          {/* Backdrop — mobile only */}
          <div
            className="fixed inset-0 z-40 bg-black/30 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            ref={popoverRef}
            className="fixed inset-x-0 top-1/2 z-50 max-h-[80vh] -translate-y-1/2 overflow-y-auto overscroll-contain border-y border-[var(--theme-border)] bg-[var(--theme-bg-elevated)] p-5 shadow-[var(--shadow-float)] sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 sm:max-h-[70vh] sm:translate-y-0 sm:rounded-2xl sm:border sm:p-4 sm:animate-toolbar-in"
            style={{ backdropFilter: "saturate(180%) blur(20px)" }}
          >
          {/* Header: mode badge + close button */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-primary-600/10 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                {VIEW_MODE_LABELS[viewMode]}
              </span>
              <span className="text-[11px] text-[var(--theme-text-quaternary)]">
                moduna ait ayarlar
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 items-center gap-1 rounded-full bg-primary-600 px-2.5 text-[12px] font-medium text-white transition-colors hover:bg-primary-700 sm:hidden"
              aria-label="Kapat"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Tamam
            </button>
          </div>

          {/* ─── Common: Arabic font size ─── */}
          <SizeSlider
            label="Arapça Boyutu"
            value={arabicFontSize}
            onChange={setArabicFontSize}
            smallIcon={<span className="-translate-y-[4px] text-[15px] leading-none text-[var(--theme-text-tertiary)]" style={{ fontFamily: 'var(--font-arabic)' }}>ع</span>}
            largeIcon={<span className="-translate-y-[5px] text-[24px] leading-none text-[var(--theme-text-tertiary)]" style={{ fontFamily: 'var(--font-arabic)' }}>ع</span>}
          />

          {/* ─── Normal mode: Translation controls ─── */}
          {viewMode === "normal" && (
            <>
              <SizeSlider
                label="Çeviri Boyutu"
                value={translationFontSize}
                onChange={setNormalTranslationFontSize}
                smallIcon={<span className="text-[13px] text-[var(--theme-text-tertiary)]">A</span>}
                largeIcon={<span className="text-[24px] leading-none text-[var(--theme-text-tertiary)]">A</span>}
              />
              <ToggleRow
                label="Çeviri Göster"
                checked={showTranslation}
                onChange={setShowTranslation}
              />
            </>
          )}

          {/* ─── Word-by-word mode: WBW controls ─── */}
          {viewMode === "wordByWord" && (
            <>
              {(wbwTransliterationFirst
                ? [
                    { key: "transliteration", label: "Transliterasyon", sizeLabel: "Transliterasyon Boyutu", checked: showWordTransliteration, onChange: setShowWordTransliteration, size: wordTransliterationSize, onSizeChange: setWordTransliterationSize },
                    { key: "translation", label: "Kelime Çevirisi", sizeLabel: "Kelime Çevirisi Boyutu", checked: showWordTranslation, onChange: setShowWordTranslation, size: wordTranslationSize, onSizeChange: setWordTranslationSize },
                  ]
                : [
                    { key: "translation", label: "Kelime Çevirisi", sizeLabel: "Kelime Çevirisi Boyutu", checked: showWordTranslation, onChange: setShowWordTranslation, size: wordTranslationSize, onSizeChange: setWordTranslationSize },
                    { key: "transliteration", label: "Transliterasyon", sizeLabel: "Transliterasyon Boyutu", checked: showWordTransliteration, onChange: setShowWordTransliteration, size: wordTransliterationSize, onSizeChange: setWordTransliterationSize },
                  ]
              ).map((item) => (
                <div key={item.key}>
                  <ToggleRow label={item.label} checked={item.checked} onChange={item.onChange} />
                  {item.checked && (
                    <SizeSlider
                      label={item.sizeLabel}
                      value={item.size}
                      onChange={item.onSizeChange}
                      smallIcon={<span className="text-[13px] text-[var(--theme-text-tertiary)]">A</span>}
                      largeIcon={<span className="text-[24px] leading-none text-[var(--theme-text-tertiary)]">A</span>}
                    />
                  )}
                </div>
              ))}
              {/* Swap order button */}
              <button
                type="button"
                onClick={() => setWbwTransliterationFirst(!wbwTransliterationFirst)}
                className="mb-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--theme-divider)] px-2 py-1.5 text-[12px] font-medium text-[var(--theme-text-tertiary)] transition-colors hover:bg-[var(--theme-hover-bg)]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 4v16M7 4l-4 4M7 4l4 4M17 20V4M17 20l-4-4M17 20l4-4" />
                </svg>
                Sırayı Değiştir
              </button>
            </>
          )}

          <Divider />

          {/* ─── Common: Colorize words ─── */}
          <ToggleRow
            label="Kelime Renklendirme"
            checked={colorizeWords}
            onChange={setColorizeWords}
          />

          {/* Color palette selector (visible when colorize is on) */}
          {colorizeWords && (
            <div className="mb-3 flex items-center gap-2">
              {COLOR_PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setColorPalette(p.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                    colorPaletteId === p.id
                      ? "border-primary-600 ring-2 ring-primary-600/30"
                      : "border-[var(--theme-divider)]"
                  }`}
                  aria-label={p.name}
                  title={p.name}
                >
                  {/* 4-color mini swatch */}
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <rect x="1" y="1" width="7" height="7" rx="1.5" fill={p.colors[0]} />
                    <rect x="10" y="1" width="7" height="7" rx="1.5" fill={p.colors[1]} />
                    <rect x="1" y="10" width="7" height="7" rx="1.5" fill={p.colors[2]} />
                    <rect x="10" y="10" width="7" height="7" rx="1.5" fill={p.colors[3]} />
                  </svg>
                </button>
              ))}
            </div>
          )}

          <Divider />

          {/* ─── Common: Theme selector ─── */}
          <div>
            <span className="mb-2 block text-[12px] font-medium text-[var(--theme-text-tertiary)]">
              Tema
            </span>
            <div className="flex items-center justify-center gap-4">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className="flex flex-col items-center gap-1.5"
                  aria-label={t.label}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      theme === t.value
                        ? "border-primary-600 ring-2 ring-primary-600/30"
                        : "border-[var(--theme-divider)]"
                    }`}
                    style={{ backgroundColor: t.color }}
                  >
                    {theme === t.value && (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={t.value === "dark" ? "#e5e5e5" : "#059669"}
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-[11px] text-[var(--theme-text-tertiary)]">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
