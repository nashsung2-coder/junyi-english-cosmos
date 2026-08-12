import type { TargetAndTransition, Transition } from "framer-motion";

export type PageTransitionProps = {
  initial: false | TargetAndTransition;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  transition: Transition;
};

export function getPageTransition(reduceMotion: boolean): PageTransitionProps {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? undefined : { opacity: 0, y: -7 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
  };
}
