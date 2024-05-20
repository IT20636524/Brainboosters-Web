"use client";

import { useState, useEffect } from 'react';
import { variables } from 'src/env/env';
import ModalController from "@components/modal/ModalController";

export default function PlayerRecords() {
  const [playerRecords, setPlayerRecords] = useState({ Puzzle: [], Tetris: [] });
  const playerName = "Lakshan Sandanayaka"; // Dummy player name, replace it as needed

  useEffect(() => {
    const fetchPlayerRecords = async () => {
      try {
        const response = await fetch(`${variables.server}/api/playerRecord/${playerName}`);
        if (response.ok) {
          const data = await response.json();
          setPlayerRecords(data);
        } else {
          console.error('Failed to fetch player records');
        }
      } catch (error) {
        console.error('Error fetching player records:', error);
      }
    };

    fetchPlayerRecords();
  }, [playerName]);

  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Manage Player Records</div>

      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Game
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level/Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {playerRecords.Puzzle.length === 0 && playerRecords.Tetris.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center">No records available</td>
              </tr>
            ) : (
              <>
                {playerRecords.Puzzle.map(record => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Puzzle</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.percentage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(record.timestamp._seconds * 1000).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <button
                        onClick={() => handleDeleteRecord(record.id, 'Puzzle')}
                        className="text-red-600 hover:text-red-900 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {playerRecords.Tetris.map(record => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Tetris</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.percentage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">N/A</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(record.timestamp._seconds * 1000).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <button
                        onClick={() => handleDeleteRecord(record.id, 'Tetris')}
                        className="text-red-600 hover:text-red-900 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <ModalController />
    </div>
  );
}

const handleDeleteRecord = async (id, game) => {
  // Implement delete record functionality here
  console.log(`Deleting record with ID: ${id} from game: ${game}`);
};
