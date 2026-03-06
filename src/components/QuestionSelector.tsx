import React from 'react';
import type { Question } from '../types/game';
import './QuestionSelector.css';

interface QuestionSelectorProps {
  questions: Question[];
  onSelect: (question: Question) => void;
  disabled?: boolean;
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({ questions, onSelect, disabled = false }) => {
  return (
    <div className="question-selector">
      <h2 className="question-title">질문을 선택하세요</h2>
      <div className="questions-container">
        {questions.map((question) => (
          <button
            key={question.id}
            className={`question-card ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onSelect(question)}
            disabled={disabled}
          >
            <span className="question-text">{question.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
