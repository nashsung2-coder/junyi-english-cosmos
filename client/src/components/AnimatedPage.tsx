import { AnimatePresence, motion } from "framer-motion";
import React, { type ReactNode } from "react";
import { getPageTransition } from "@/lib/pageTransition";

type AnimatedPageProps = {
  location: string;
  reduceMotion: boolean;
  children: ReactNode;
};

export function AnimatedPage({ location, reduceMotion, children }: AnimatedPageProps) {
  const transition = getPageTransition(reduceMotion);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div id="main-content" tabIndex={-1} key={location} data-page-route={location} {...transition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
