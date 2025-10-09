import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";

interface IProps {
  images: string[];
}

export function Slider({ images }: Readonly<IProps>): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative mx-auto my-6 flex h-60 w-full max-w-4xl overflow-hidden rounded-2xl md:h-120">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={`${images[index]}?auto=compress&cs=tinysrgb&w=800`}
          alt="article"
          className="absolute h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
