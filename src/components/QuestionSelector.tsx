import React from 'react';
import type { Question } from '../types/game';
import './QuestionSelector.css';

interface QuestionSelectorProps {
  questions: Question[];
  onSelect: (question: Question) => void;
  disabled?: boolean;
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({ questions, onSelect, disabled = false }) => {
  const getQuestionStyle = (question: Question) => {
    if (question.isCCTVClean) {
      return { borderColor: '#9C27B0', background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(103, 58, 183, 0.2) 100%)' };
    }
    if (question.anger && question.anger >= 20) {
      return { borderColor: '#f44336' };
    }
    if (question.remorse && question.remorse > 0) {
      return { borderColor: '#4CAF50' };
    }
    return {};
  };

  const getBadges = (question: Question) => {
    const badges = [];

    if (question.isCCTVClean) {
      badges.push(
        <span key="cctv" className="question-badge cctv-badge">
          🚨 CCTV 가리기
        </span>
      );
    }

    if (question.anger && question.anger > 0) {
      badges.push(
        <span key="anger" className="question-badge anger-badge">
          😤 열받음 +{question.anger}
        </span>
      );
    }

    if (question.remorse && question.remorse > 0 && !question.isCCTVClean) {
      badges.push(
        <span key="remorse" className="question-badge remorse-badge">
          😢 반성 +{question.remorse}
        </span>
      );
    }

    return badges;
  };

  return (
    <div className="question-selector">
      <h2 className="question-title">🎯 질문을 선택하세요</h2>
      <div className="questions-container">
        {questions.map((question) => (
          <button
            key={question.id}
            className={`question-card ${disabled ? 'disabled' : ''} ${question.isCCTVClean ? 'cctv-card' : ''}`}
            onClick={() => !disabled && onSelect(question)}
            disabled={disabled}
            style={getQuestionStyle(question)}
          >
            <span className="question-text">{question.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
