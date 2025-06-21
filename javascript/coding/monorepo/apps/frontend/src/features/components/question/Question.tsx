import { useCallback, useState, useEffect } from 'react';
import type { QuestionMetadata } from '../course/Course';

export const Question: React.FunctionComponent<{
  question: QuestionMetadata;
  handleNext: () => void;
}> = ({ question, handleNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  useEffect(() => {
    setSelectedOption(undefined);
  }, [question]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <h1>{question.question}</h1>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="question-option"
                value={option}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {selectedOption !== undefined &&
        (isCorrect ? (
          <div>
            Correcto!{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </div>
        ) : (
          <div>
            Incorrecto!{' '}
            <span role="img" aria-label="cross">
              ❌
            </span>{' '}
            <br />
            Correct answer: {question.answer} <br />
            Explanation: {question.explanation} <br />
            {Object.entries(question.invalidOptions).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
          </div>
        ))}

      <button onClick={handleNext}>Next</button>
    </div>
  );
};
