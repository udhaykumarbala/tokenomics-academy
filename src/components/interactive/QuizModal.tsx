"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Confetti } from "@/components/animations";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  options: string[];
  correctAnswer: string;
  nextLessonPath: string;
}

export default function QuizModal({
  isOpen,
  onClose,
  question,
  options,
  correctAnswer,
  nextLessonPath,
}: QuizModalProps) {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const resetQuizState = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetQuizState();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setHasAnswered(true);
    
    if (selectedAnswer === correctAnswer) {
      setShowConfetti(true);
    }
  };

  const handleNextLesson = () => {
    resetQuizState();
    router.push(nextLessonPath);
  };

  const handleClose = () => {
    resetQuizState();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">Quick Knowledge Check</h3>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">{question}</p>
          
          <div className="space-y-2">
            {options.map((option) => (
              <div 
                key={option}
                onClick={() => !hasAnswered && handleAnswerSelect(option)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  hasAnswered
                    ? option === correctAnswer
                      ? "bg-green-100 border-green-500"
                      : selectedAnswer === option
                      ? "bg-red-100 border-red-500"
                      : "border-gray-300"
                    : selectedAnswer === option
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {hasAnswered ? (
            selectedAnswer === correctAnswer ? (
              <button
                onClick={handleNextLesson}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
              >
                Continue to Next Lesson
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Review Lesson
              </button>
            )
          ) : (
            <>
              <button
                onClick={handleClose}
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded ${
                  !selectedAnswer && "opacity-50 cursor-not-allowed"
                }`}
              >
                Submit Answer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}