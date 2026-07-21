import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  useBackground?: boolean; // true — дефолтный фон (background_2)
  backgroundImage?: string; // кастомный фон для вкладки
}

function PageLayout({ children, useBackground = false, backgroundImage }: PageLayoutProps) {
  const bgUrl = backgroundImage || (useBackground ? '/makets/background_2.jpg' : '');

  return (
    <motion.section
      className={`page-layout ${bgUrl ? 'page-layout--bg' : ''}`}
      style={{ '--page-bg': bgUrl ? `url('${bgUrl}')` : 'none' } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.05, duration: 0.3 }}
    >
      <div className="container page-layout__inner">
        {children}
      </div>
    </motion.section>
  );
}

export default PageLayout;
