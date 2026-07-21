import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './DevLogCard.css';
import { type DevLogData } from '../../data/gameData';

/* ---------- Entrance variant ---------- */

export const devLogEntranceVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  }),
};

/* ---------- Пропсы ---------- */

interface DevLogCardProps {
  data: DevLogData;
  index?: number;
  onScreen?: boolean;
}

export function DevLogCard({ data, index = 0, onScreen = false }: DevLogCardProps) {
  const formattedDate = new Date(data.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      className="devlog-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={devLogEntranceVariants}
      custom={index}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* Дата и категория */}
      <div className="devlog-card__meta">
        <span className="devlog-card__date">{formattedDate}</span>
        <span className="devlog-card__category">{data.category}</span>
      </div>

      {/* Заголовок */}
      <h3 className="devlog-card__title">
        <Link to={`/games/log/${data.id}`} className="devlog-card__link">
          {data.title}
        </Link>
      </h3>

      {/* Краткое содержимое */}
      <p className="devlog-card__excerpt">{data.excerpt}</p>

      {/* Ссылка-кнопка */}
      <Link to={`/games/log/${data.id}`} className="devlog-card__read-more">
        <span>Читать</span>
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
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Декоративная линия */}
      <div className="devlog-card__line" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------- Сетка dev-логов ---------- */

export function DevLogGrid({
  logsData,
  onScreen,
}: {
  logsData: DevLogData[];
  onScreen?: boolean;
}) {
  return (
    <div className="devlog-grid">
      {logsData.map((log, i) => (
        <DevLogCard key={log.id} data={log} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export default DevLogCard;
