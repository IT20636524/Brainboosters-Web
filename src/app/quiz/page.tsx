"use client"

import { useState, useEffect } from 'react';
import ModalController from "@components/modal/ModalController";
import InfoCardCollection from "@components/info-card-collection/InfoCardCollection";
import { variables } from 'src/env/env';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Function to fetch quiz results from the API
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(variables.server+'/api/quiz');
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error('Failed to fetch quiz results');
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    fetchQuizzes(); // Call the fetchQuizzes function when the component mounts
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Manage Quizzes</div>
      
      {/* Quizzes Table */}
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Emotion
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map(quiz => (
              <tr key={quiz.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{quiz.childName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{quiz.points}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{quiz.emotion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{quiz.takenDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
