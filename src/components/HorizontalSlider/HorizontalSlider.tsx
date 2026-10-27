import { useState, useRef, useCallback, useEffect } from 'react';

import './HorizontalSlider.css';

interface HorizontalSliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemKey: (item: T) => string;
  visibleCount?: number;
  className?: string;
}

const GAP = 20; /* px — отступ между слайдами */

function HorizontalSlider<T>({
  items,
  renderItem,
  itemKey,
  visibleCount = 3,
  className = '',
}: HorizontalSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const updateMeasurements = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    // Ширина трека = ширина контейнера минус отступы
    const trackW = track.clientWidth;
    // Ширина одной карточки = (trackWidth - GAP * (visibleCount - 1)) / visibleCount
    const sw = (trackW - GAP * (visibleCount - 1)) / visibleCount;
    setSlideWidth(sw);
  }, []);

  // Инициализация при монтировании
  useEffect(() => {
    updateMeasurements();
  }, [updateMeasurements]);

  // ResizeObserver на треке для отслеживания изменений размера с debounce
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeoutId: number | null = null;
    const observer = new ResizeObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateMeasurements, 100);
    });
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updateMeasurements]);

  // Offset: каждая карточка = slideWidth + GAP
  const offset = slideWidth > 0 ? currentIndex * (slideWidth + GAP) : 0;

  return (
    <div ref={containerRef} className={`horizontal-slider ${className}`}>
      {/* Стрелка влево */}
      <button
        className={`horizontal-slider__btn horizontal-slider__btn--prev ${currentIndex === 0 ? 'horizontal-slider__btn--disabled' : ''}`}
        onClick={goToPrev}
        disabled={currentIndex === 0}
        aria-label="Назад"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Трек с карточками */}
      <div ref={trackRef} className="horizontal-slider__track">
        <div
          className="horizontal-slider__slide"
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {items.map((item) => (
            <div key={itemKey(item)} className="horizontal-slider__item" style={{ width: slideWidth }}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Стрелка вправо */}
      <button
        className={`horizontal-slider__btn horizontal-slider__btn--next ${currentIndex === maxIndex ? 'horizontal-slider__btn--disabled' : ''}`}
        onClick={goToNext}
        disabled={currentIndex === maxIndex}
        aria-label="Вперёд"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="horizontal-slider__indicators">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`horizontal-slider__dot ${currentIndex === i ? 'horizontal-slider__dot--active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Перейти к слайду ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HorizontalSlider;
