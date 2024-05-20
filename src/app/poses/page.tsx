"use client"

import { useState, useEffect } from 'react';
import ModalController from "@components/modal/ModalController";
import { variables } from 'src/env/env';

export default function Poses() {
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await fetch(variables.server+'/api/pose');
        if (response.ok) {
          const data = await response.json();
          setPoses(data);
        } else {
          console.error('Failed to fetch pose data');
        }
      } catch (error) {
        console.error('Error fetching pose data:', error);
      }
    };

    fetchPoses();
  }, []);

  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Manage Poses</div>
      
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
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Files
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {poses.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center">No records available</td>
              </tr>
            ) : (
              poses.map(pose => (
                <tr key={pose.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pose.childName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pose.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(pose.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={pose.fileIcon} alt="File Icon" className="h-6 w-6" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <button
                      onClick={() => handleDeletePose(pose.id)}
                      className="text-red-600 hover:text-red-900 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <ModalController />
    </div>
  );
}
