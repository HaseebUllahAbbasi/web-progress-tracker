import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HourlyUpdate {
  _id: string;
  timestamp: string;
  date: string;
  description: string[];
}

const HourlyUpdatesPage: React.FC = () => {
  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>([]);
  const [newUpdate, setNewUpdate] = useState('');

  // Fetch the hourly updates from the server
  useEffect(() => {
    fetchHourlyUpdates();
  }, []);

  const fetchHourlyUpdates = async () => {
    try {
      const response = await axios.get<HourlyUpdate[]>('/api/hourly-updates');
      setHourlyUpdates(response.data);
    } catch (error) {
      console.error('Error fetching hourly updates:', error);
    }
  };

  const handleAddUpdate = async () => {
    try {
      const response = await axios.post<HourlyUpdate>('/api/hourly-updates', { update: newUpdate });
      setHourlyUpdates([...hourlyUpdates, response.data]);
      setNewUpdate('');
    } catch (error) {
      console.error('Error adding hourly update:', error);
    }
  };

  return (
    <div>
      <h2>Hourly Updates</h2>
      <div>
        <h4>Add New Update</h4>
        <textarea
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
          placeholder="Enter your update..."
        />
        <button onClick={handleAddUpdate}>Add Update</button>
      </div>
      <div>
        <h4>View Updates</h4>
        {hourlyUpdates.map((update) => (
          <div key={update._id}>
            <p>{update.timestamp}</p>
            <ul>
              {
                update.description.map((item, index) => <li key={index}>
                  {item}
                </li>)
              }
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyUpdatesPage;
