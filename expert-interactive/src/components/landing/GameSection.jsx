import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GRID_SIZE,
  INSIGHTS,
  MILESTONE_LEVELS,
  STAGES,
  TARGET_TILE,
  TILE_COLORS,
} from "../../data/gameData";
import {
  addRandomTile,
  cloneGrid,
  getMaxTile,
  hasMovesLeft,
  initializeGrid,
  moveGrid,
} from "../../utils/game2048";

function GameSection() {
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() =>
    Number(localStorage.getItem("path-game-best") ?? 0)
  );
  const [insightLevel, setInsightLevel] = useState(null);
  const [shownInsights, setShownInsights] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const maxTile = useMemo(() => getMaxTile(grid), [grid]);

  useEffect(() => {
    localStorage.setItem("path-game-best", String(best));
  }, [best]);

  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setScore(0);
    setIsGameOver(false);
    setInsightLevel(null);
    setShownInsights(new Set());
  }, []);

  const handleMove = useCallback(
    (direction) => {
      if (insightLevel || isGameOver) return;

      const result = moveGrid(grid, direction);
      if (!result.hasChanged) return;

      const nextGrid = cloneGrid(result.grid);
      addRandomTile(nextGrid);

      const nextScore = score + result.scoreDelta;
      const nextBest = Math.max(best, nextScore);
      const nextMaxTile = getMaxTile(nextGrid);

      setGrid(nextGrid);
      setScore(nextScore);
      setBest(nextBest);

      if (!hasMovesLeft(nextGrid)) {
        setIsGameOver(true);
      }

      const hitLevel = MILESTONE_LEVELS.find(
        (level) => nextMaxTile >= level && !shownInsights.has(level)
      );
      if (hitLevel) {
        setInsightLevel(hitLevel);
        setShownInsights((prev) => new Set([...prev, hitLevel]));
      }
    },
    [best, grid, insightLevel, isGameOver, score, shownInsights]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const direction = keyMap[event.key];
      if (!direction) return;
      event.preventDefault();
      handleMove(direction);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minDistance = 30;

    if (Math.abs(deltaX) < minDistance && Math.abs(deltaY) < minDistance) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      handleMove(deltaX > 0 ? "right" : "left");
    } else {
      handleMove(deltaY > 0 ? "down" : "up");
    }
  };

  return (
    <section id="game" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
      <div className="rounded-premium border border-white/70 bg-white/60 p-5 shadow-premium sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cocoa/70">Мини-игра 2048</p>
            <h2 className="mt-2 text-2xl font-semibold text-espresso sm:text-3xl">
              Путь к реализации
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-champagne px-4 py-3 text-sm text-cocoa">
              <p className="text-xs uppercase tracking-wider text-cocoa/70">Счёт</p>
              <p className="text-xl font-semibold">{score}</p>
            </div>
            <div className="rounded-2xl bg-champagne px-4 py-3 text-sm text-cocoa">
              <p className="text-xs uppercase tracking-wider text-cocoa/70">Лучший</p>
              <p className="text-xl font-semibold">{best}</p>
            </div>
          </div>
        </div>

        <div
          className="mx-auto grid w-full max-w-[22rem] grid-cols-4 gap-2 rounded-3xl bg-[#e8d8c7] p-2 sm:max-w-md sm:gap-3 sm:p-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {grid.flatMap((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              layout
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`aspect-square rounded-2xl p-1.5 sm:p-2 ${
                value ? TILE_COLORS[value] ?? "bg-[#7b3555] text-white" : "bg-white/35"
              }`}
            >
              {value ? (
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[10px] font-medium text-current/90 sm:text-xs">
                    {value}
                  </span>
                  <span className="text-center text-[11px] font-semibold leading-tight sm:text-base">
                    {STAGES[value]}
                  </span>
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-cocoa/80">
          <p>
            Объединяйте одинаковые состояния. Цель - открыть уровень{" "}
            <span className="font-semibold text-fuchsiaSoft">{TARGET_TILE}</span>.
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="rounded-xl bg-espresso px-4 py-2 font-medium text-white transition hover:bg-cocoa"
          >
            Начать заново
          </button>
        </div>

        {isGameOver && (
          <div className="mt-5 rounded-2xl border border-fuchsiaSoft/35 bg-[#fff5fb] p-4 text-cocoa">
            Ходы закончились. Система создается шаг за шагом - попробуйте еще раз.
          </div>
        )}

        {maxTile >= TARGET_TILE && (
          <div className="mt-5 rounded-2xl border border-fuchsiaSoft/35 bg-[#fff5fb] p-4 text-cocoa">
            Вы дошли до "Реализации". Отличный момент перейти к калькулятору.
          </div>
        )}
      </div>

      <AnimatePresence>
        {insightLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-espresso/35 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-lg rounded-premium bg-white p-6 shadow-premium"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cocoa/60">
                Инсайт уровня {insightLevel}
              </p>
              <h3 className="mb-4 text-2xl font-semibold text-espresso">{STAGES[insightLevel]}</h3>
              <p className="mb-6 text-cocoa">{INSIGHTS[insightLevel]}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#calculator"
                  onClick={() => setInsightLevel(null)}
                  className="rounded-xl bg-fuchsiaSoft px-5 py-3 font-semibold text-white transition hover:bg-[#a74f72]"
                >
                  Рассчитать, сколько клиентов я теряю
                </a>
                <button
                  type="button"
                  onClick={() => setInsightLevel(null)}
                  className="rounded-xl border border-cocoa/30 px-5 py-3 font-medium text-cocoa transition hover:bg-cream"
                >
                  Продолжить игру
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GameSection;
