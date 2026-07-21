import { motion } from 'framer-motion';

import './ClanCard.css';
import { type ClanData } from '../../data/gameData';

/* ---------- Entrance variant ---------- */

export const clanEntranceVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut",
    } as const,
  }),
};

/* ---------- Hover variant ---------- */

export const clanHoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: "easeInOut" } as const,
  },
  tap: { y: 0 },
};

/* ---------- Пропсы ---------- */

interface ClanCardProps {
  data: ClanData;
  index?: number;
  onScreen?: boolean;
}

/* ---------- Элемент-цвет (для цветных акцентов) ---------- */

const elementColors: Record<ClanData['element'], string> = {
  'Огонь': '#e8632a',
  'Тень': '#7a5c99',
  'Природа': '#3da34a',
  'Молния': '#00E5FF',
  'Лёд': '#88ccff',
  'Земля': '#b8960a',
};

export function ClanCard({ data, index = 0, onScreen = false }: ClanCardProps) {
  const accentColor = elementColors[data.element] || 'var(--color-gold)';

  return (
    <motion.div
      className="clan-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={{ ...clanEntranceVariants, ...clanHoverVariants }}
      custom={index}
      whileHover="hover"
      whileTap="tap"
      style={{ '--clan-accent': accentColor } as React.CSSProperties}
    >
      {/* Эмблема */}
      <div className="clan-card__emblem">
        <span className="clan-card__emblem-icon">{data.emblem}</span>
      </div>

      {/* Информация */}
      <div className="clan-card__body">
        <h3 className="clan-card__name">{data.name}</h3>

        <div className="clan-card__meta">
          <span className="clan-card__element">
            <span className="clan-card__element-dot" />
            {data.element}
          </span>
        </div>

        <p className="clan-card__desc">{data.description}</p>

        <div className="clan-card__territory">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{data.territory}</span>
        </div>
      </div>

      {/* Золотая линия */}
      <div className="clan-card__line" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------- Сетка кланов ---------- */

export function ClanGrid({
  clansData,
  onScreen,
}: {
  clansData: ClanData[];
  onScreen?: boolean;
}) {
  return (
    <div className="clan-grid">
      {clansData.map((clan, i) => (
        <ClanCard key={clan.id} data={clan} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export default ClanCard;
