import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUser } from '../store/UserActions';
import { SERVER } from '../constant';
import { useNavigate, useParams } from 'react-router-dom';
import './TodoList.css';

interface HourlyUpdate {
  _id: string;
  timestamp: string;
  date: Date;
  description: string[];
}

const HourlyUpdatesPage: React.FC = () => {
  const { date } = useParams();
  const selectedDate = date || new Date().toDateString();
  const today = new Date().toDateString();
  const user = useSelector((state: StateType) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>([]);
  const [desc, setDesc] = useState<string[]>(['']);
  const socket = io(SERVER);

  // Fetch the hourly updates from the server
  useEffect(() => {
    if (!user?._id) navigate('/');
    fetchHourlyUpdates();

    socket.emit('hourly-user-update', { userId: user?._id });
    socket.on('get-hourly-user', (updatedData: [HourlyUpdate]) => {
      setHourlyUpdates(updatedData);
    });

    // Clean up the WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchHourlyUpdates = async () => {
    try {
      if (user) {
        const response = await axios.get<HourlyUpdate[]>(`${SERVER}/api/hourly/user/${user?._id}`);
        setHourlyUpdates(response.data);
      } else {
        alert('User is not present');
      }
    } catch (error) {
      console.error('Error fetching hourly updates:', error);
    }
  };

  const handleAddUpdate = async () => {
    try {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      // Format the time as "HH:mm"
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      console.log(formattedTime); // Output: "14:00"

      const response = await axios.post<HourlyUpdate>(`${SERVER}/api/hourly`, {
        description: desc,
        userId: user?._id,
        timestamp: formattedTime,
        date: new Date(),
      });

      socket.emit('data-update', { userId: user?._id });
    } catch (error) {
      console.error('Error adding hourly update:', error);
    }
  };

  const handleChangeValue = (value: string, index: number): void => {
    const updatedDesc = [...desc];
    updatedDesc[index] = value;
    setDesc(updatedDesc);
  };

  return (
    <div className="container-custom">
      <h2 className="text-center display-3">Hourly Updates</h2>
      <h3 className="text-center">Selected Date: {selectedDate}</h3>
      <div className="text-center">
        {/* Add user profile and logout button */}
      </div>
      {today === selectedDate && (
        <div>
          <h4 className="text-center">Add New Update</h4>
          <div className="text-center px-5 my-3">
            <div className="d-flex flex-wrap">
              {desc.map((item, index) => (
                <div className="input-group mb-3 mx-2" key={index}>
                  <span className="input-group-text">{index + 1}.</span>
                  <input
                    className="form-control"
                    type="text"
                    value={item}
                    name={`${index}`}
                    onChange={(e) => handleChangeValue(e.target.value, index)}
                  />
                  <span>
                    <button
                      className="btn btn-warning mx-1"
                      title="Add new item"
                      onClick={() => setDesc([...desc, ''])}
                    >
                      ➕
                    </button>

                  </span>
                </div>
              ))}
              <div className="d-flex flex-wrap mx-2">
                <button className="btn btn-primary mb-2" onClick={handleAddUpdate}>
                  Upload Hourly Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h4 className="text-center">View Updates</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {hourlyUpdates.map((item, index) => (
            <div
              key={index}
              className="card m-2"
              style={{ background: 'linear-gradient(135deg, rgba(21, 21, 1, 0.8) 0%, rgba(60, 58, 5) 100%)' }}
            >
              <div className="card-body">
                <p>{new Date(item.date).toDateString()}</p>
                <p className="text-center time">{item.timestamp}</p>
                <ul className="list-unstyled">
                  {item?.description?.map((subItem, subIndex) => (
                    <li key={subIndex}>{subItem}</li>
                  ))}
                </ul>
                <div className="text-center">
                  <button
                    className="btn btn-warning"
                    onClick={async () => {
                      const response = await axios.delete(`${SERVER}/api/hourly/${item._id}`);
                      socket.emit('data-update', { userId: user?._id });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyUpdatesPage;
