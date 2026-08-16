import { useRef, useState } from 'react';
import styles from './DiaCarousel.module.css';

/** Carrossel horizontal com scroll-snap nativo (swipe funciona no touch) + setas e bolinhas clicáveis para navegação no mouse/desktop. */
export function DiaCarousel({ slides }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(index) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: 'smooth' });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.trackWrap}>
        {active > 0 && (
          <button
            type="button"
            className={`${styles.seta} ${styles.setaEsquerda}`}
            onClick={() => goTo(active - 1)}
            aria-label="Slide anterior"
          >
            ‹
          </button>
        )}
        <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
          {slides.map((slide) => (
            <div className={styles.slide} key={slide.key}>
              {slide.content}
            </div>
          ))}
        </div>
        {active < slides.length - 1 && (
          <button
            type="button"
            className={`${styles.seta} ${styles.setaDireita}`}
            onClick={() => goTo(active + 1)}
            aria-label="Próximo slide"
          >
            ›
          </button>
        )}
      </div>
      {slides.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Navegação do carrossel">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              className={styles.dotHit}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Ir para ${slide.key === 'flor' ? 'a flor' : slide.key === 'bilhete' ? 'o bilhete' : 'a foto'}`}
            >
              <span className={[styles.dot, i === active ? styles.dotAtiva : ''].filter(Boolean).join(' ')} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
