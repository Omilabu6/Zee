import React from 'react';
import { motion } from 'framer-motion';

export default function QuizProgress({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}