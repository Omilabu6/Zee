import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Button } from "flowbite-react";   
import base44 from '@/api/base44Client';
import { createPageUrl } from "@/utils";
import QuizQuestion from "@/Components/quiz/QuizQuestion";
import QuizProgress from '@/Components/quiz/QuizProgress';
import { quizQuestions, stylePersonalities, calculateStylePersonality } from '@/components/quiz/quizData';

export default function StyleQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value
    }));
  };

  const goNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);

    try {
      const stylePersonality = calculateStylePersonality(answers);
      const personalityData = stylePersonalities[stylePersonality];

      // 1. Load existing profiles using the new API
      const existing = await base44.entities.StyleProfile.list();

      // 2. Delete old profiles
      if (Array.isArray(existing)) {
        for (const profile of existing) {
          await base44.entities.StyleProfile.delete(profile.id);
        }
      }

      // 3. Create new profile
      await base44.entities.StyleProfile.create({
        style_personality: stylePersonality,
        style_traits: personalityData.traits,
        color_palette: personalityData.colors,
        quiz_answers: answers,
        style_description: personalityData.description,
      });

      // 4. Navigate
      navigate(createPageUrl("StyleResult") + "?style=" + encodeURIComponent(stylePersonality));

    } catch (err) {
      console.error("Error saving style profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentAnswer = answers[quizQuestions[currentQuestion].id];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <QuizProgress current={currentQuestion + 1} total={quizQuestions.length} />
        </div>

        {/* Question */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <QuizQuestion
              key={currentQuestion}
              question={quizQuestions[currentQuestion].question}
              options={quizQuestions[currentQuestion].options}
              selectedAnswer={currentAnswer}
              onSelect={handleAnswer}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentQuestion === 0}
            className="text-gray-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={submitQuiz}
              disabled={!currentAnswer || isSubmitting}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-8"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Reveal My Style
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!currentAnswer}
              className="bg-gray-900 hover:bg-gray-800"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}