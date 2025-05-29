"use client";

import { useRouter } from "next/navigation";

interface SkipAheadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToFirstIncomplete: (lessonPath: string) => void;
  onMarkPreviousComplete: () => void;
  firstIncompleteLessonPath: string;
}

export default function SkipAheadModal({
  isOpen,
  onClose,
  onGoToFirstIncomplete,
  onMarkPreviousComplete,
  firstIncompleteLessonPath,
}: SkipAheadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">A Little Heads-Up!</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            It looks like you've skipped a few lessons! We recommend going through them in order for the best learning experience.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onGoToFirstIncomplete(firstIncompleteLessonPath)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
          >
            Take Me to My Next Lesson
          </button>
          <button
            onClick={onMarkPreviousComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full"
          >
            I Know This, Mark Previous as Complete
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded w-full"
          >
            Stay Here
          </button>
        </div>
      </div>
    </div>
  );
}
