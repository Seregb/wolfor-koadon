import { motion, type Variants, type Transition } from 'framer-motion';

/* Варианты анимации перехода между страницами */
const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition: Transition = {
  ease: "easeInOut" as const,
  duration: 0.35,
} as const;

interface PageTransitionProps {
  name: string;
  children: React.ReactNode;
}

function PageTransition({ name, children }: PageTransitionProps) {
  return (
    <motion.div
      key={name}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
