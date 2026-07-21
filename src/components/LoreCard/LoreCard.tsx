import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './LoreCard.css';
import { type LoreCategory } from '../../data/loreData';

/* ---------- Entrance variant ---------- */

export const loreCardEntranceVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  }),
};

/* ---------- Hover variant ---------- */

export const loreCardHoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: "easeInOut" } as const,
  },
  tap: { y: 0 },
};

/* ---------- Пропсы ---------- */

interface LoreCardProps {
  data: LoreCategory;
  index?: number;
  onScreen?: boolean;
}

function LoreCard({ data, index = 0, onScreen = false }: LoreCardProps) {
  return (
    <motion.div
      className="lore-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={{ ...loreCardEntranceVariants, ...loreCardHoverVariants }}
      custom={index}
      whileHover="hover"
      whileTap="tap"
    >
      {/* Иконка-символ */}
      <div className="lore-card__icon-wrap">
        <span className="lore-card__icon">{data.icon}</span>
      </div>

      {/* Название и подзаголовок */}
      <div className="lore-card__header">
        <h3 className="lore-card__title">
          <Link to={`/lore/${data.id}`} className="lore-card__link">
            {data.title}
          </Link>
        </h3>
        <span className="lore-card__subtitle">{data.subtitle}</span>
      </div>

      {/* Описание */}
      <p className="lore-card__desc">{data.description}</p>

      {/* Плашка с количеством статей */}
      <div className="lore-card__plaque">
        <span className="lore-card__plaque-label">{data.count} статей</span>
        <span className="lore-card__plaque-arrow">→</span>
      </div>

      {/* Декоративная линия */}
      <div className="lore-card__line" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------- Сетка лор-разделов ---------- */

export function LoreGrid({
  categoriesData,
  onScreen,
}: {
  categoriesData: LoreCategory[];
  onScreen?: boolean;
}) {
  return (
    <div className="lore-grid">
      {categoriesData.map((cat, i) => (
        <LoreCard key={cat.id} data={cat} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export default LoreCard;
