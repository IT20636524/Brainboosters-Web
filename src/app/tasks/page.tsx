"use client"

import { useState, useEffect } from 'react';
import ModalController from "@components/modal/ModalController";
import { variables } from 'src/env/env';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Function to fetch task results from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch(variables.server+'/api/task');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch task results');
        }
      } catch (error) {
        console.error('Error fetching task results:', error);
      }
    };

    fetchTasks(); // Call the fetchTasks function when the component mounts
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Manage Tasks</div>
      
      {/* Task Table */}
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Taken
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
            {tasks.map(task => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task.childName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task.points}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task.takenTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{new Date(task.takenDate._seconds * 1000).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
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
      
      {/* <ModalController /> */}
    </div>
  );
}
