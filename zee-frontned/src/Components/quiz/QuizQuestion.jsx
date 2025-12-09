import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function QuizQuestion({ question, options, selectedAnswer, onSelect, questionNumber, totalQuestions }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="mb-8">
        <span className="text-xs font-medium tracking-widest text-rose-400 uppercase">
          Question {questionNumber} of {totalQuestions}
        </span>
        <h2 className="mt-3 text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
          {question}
        </h2>
      </div>

      <div className="grid gap-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(option.value)}
            className={cn(
              "w-full p-5 text-left rounded-2xl border-2 transition-all duration-300",
              "hover:shadow-lg hover:border-rose-200",
              selectedAnswer === option.value
                ? "border-rose-400 bg-rose-50/50 shadow-md"
                : "border-gray-100 bg-white"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{option.emoji}</span>
              <div>
                <p className="font-medium text-gray-900">{option.label}</p>
                {option.subtitle && (
                  <p className="text-sm text-gray-500 mt-0.5">{option.subtitle}</p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}