"use client"
import React, { useState } from 'react';

interface Question {
  id: number;
  questionText: string;
  questionType: 'text' | 'multiple-choice' | 'short-answer' | 'long-answer' | 'dropdown' | 'checkbox'; // Expanded question types
  options?: string[]; // Options for multiple-choice and dropdown questions
}

const TestComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'text' | 'multiple-choice' | 'short-answer' | 'long-answer' | 'dropdown' | 'checkbox'>('text');
  const [newOptions, setNewOptions] = useState<string[]>(['']); // Options for multiple choice, dropdown, and checkbox

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      questionText: newQuestionText,
      questionType: newQuestionType,
      options: newQuestionType === 'multiple-choice' || newQuestionType === 'dropdown' || newQuestionType === 'checkbox' ? [...newOptions] : undefined,
    };

    setQuestions([...questions, newQuestion]);
    resetForm();
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const addOption = () => {
    setNewOptions([...newOptions, '']);
  };

  const resetForm = () => {
    setNewQuestionText('');
    setNewOptions(['']);
  };

  const handleSubmit = () => {
    console.log('Test Created:', { questions, timeLimit });
    setQuestions([]);
    setTimeLimit(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Test</h2>

      {/* Time Limit */}
      <div className="mb-4">
        <label className="block mb-2">Set Time Limit (in minutes):</label>
        <input
          type="number"
          className="border rounded-lg px-3 py-2 w-full"
          value={timeLimit || ''}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          placeholder="Enter time in minutes"
        />
      </div>

      {/* Add Question */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Question</h3>
        <input
          type="text"
          className="border rounded-lg px-3 py-2 w-full mb-2"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder="Enter question text"
        />
        <select
          className="border rounded-lg px-3 py-2 w-full mb-2"
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value as any)}
        >
          <option value="text">Short Answer</option>
          <option value="long-answer">Long Answer</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
        </select>

        {/* Options for multiple-choice, dropdown, and checkbox questions */}
        {['multiple-choice', 'dropdown', 'checkbox'].includes(newQuestionType) && (
          <div className="mb-2">
            {newOptions.map((option, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            <button type="button" className="bg-blue-500 text-white rounded-lg px-3 py-2" onClick={addOption}>
              Add Option
            </button>
          </div>
        )}

        <button type="button" className="bg-green-500 text-white rounded-lg px-4 py-2" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      {/* Preview the questions */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Test Preview</h3>
        {questions.map((question) => (
          <div key={question.id} className="mb-2">
            <p className="font-medium">
              {question.id}. {question.questionText}
            </p>
            {question.questionType === 'multiple-choice' && (
              <ul className="list-disc pl-5">
                {question.options?.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            )}
            {question.questionType === 'dropdown' && (
              <select className="border rounded-lg px-3 py-2">
                {question.options?.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            )}
            {question.questionType === 'checkbox' && (
              <div className="flex flex-col">
                {question.options?.map((option, idx) => (
                  <label key={idx} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button type="button" className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>
        Save Test
      </button>
    </div>
  );
};

export default TestComponent;
