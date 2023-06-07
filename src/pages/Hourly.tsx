import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import { LogoutUser } from '../store/UserActions';
import { SERVER } from '../constant';

interface HourlyUpdate {
  _id: string;
  timestamp: string;
  date: string;
  description: string[];
}

const HourlyUpdatesPage: React.FC = () => {
  const user = useSelector((state: StateType) => state?.user);

  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>([]);
  const [desc, setDesc] = useState(['']);
  const socket = io(SERVER);

  // Fetch the hourly updates from the server
  useEffect(() => {
    fetchHourlyUpdates();

    // Subscribe to the "data-update" event
    socket.on('data-update', (updatedData: HourlyUpdate) => {
      setHourlyUpdates((prevUpdates) => [...prevUpdates, updatedData]);
    });

    // Clean up the WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchHourlyUpdates = async () => {
    try {
      if (user) {
        const response = await axios.get<HourlyUpdate[]>(SERVER + '/api/hourly/user/' + user?._id);
        setHourlyUpdates(response.data);
      }
      else alert("User is not present")
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
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      console.log(formattedTime); // Output: "14:00"

      const response = await axios.post<HourlyUpdate>(SERVER + '/api/hourly', {
        description: desc,
        userId: user?._id, timestamp: formattedTime, date: Date.now(),
      });

      socket.emit('data-update', response.data);
    } catch (error) {
      console.error('Error adding hourly update:', error);
    }
  };

  function changeValue(value: string, index: number): void {
    const updatedDesc = [...desc];
    updatedDesc[index] = value;
    setDesc(updatedDesc);
  }

  return (
    <div>
      <h2>Hourly Updates</h2>
      <div>
        {
          JSON.stringify(user)
        }
        <button onClick={() => {
          LogoutUser()
        }}>
          Logout
        </button>

      </div>
      <div>
        <h4>Add New Update</h4>
        {
          desc.map((item, index) => <input key={index} className='form-control w-25' type='text' value={item} name={`${index}`} onChange={(e) => {
            changeValue(e.target.value, index)
          }} />)
        }
        <button className='btn btn-warning' onClick={() => setDesc([...desc, ''])}>
          ➕
        </button>





      </div>
      <div >
        <button className='btn btn-primary' onClick={handleAddUpdate}>Add Update</button>

      </div>
      <div>
        <h4>View Updates</h4>
        <div className='d-flex flex-wrap'>
          {hourlyUpdates.map((item, index) => (


            <div key={index} style={{ padding: "10px", borderRadius: "10px", margin: "10px", background: "linear-gradient(135deg, rgb(226, 139, 254) 0%, rgb(75, 225, 236) 100%)" }}>
              {/* use this when vertical */}
              {/* <p style={{}}> {(index == 0) ? new Date(item.date).toDateString() : new Date(hourlyUpdates[index].date).toDateString() === new Date(hourlyUpdates[index - 1].date).toDateString() ? "" : new Date(item.date).toDateString()} -{item.timestamp}</p> */}
              <p>
                {new Date(item.date).toDateString()}
              </p>
              <ul style={{ minHeight: "60px", width: "200px" }}>
                {item?.description?.map((SubItem, subIndex) => (
                  <li key={subIndex}>{SubItem}</li>
                ))}
              </ul>
              <div className='text-center'>
                <button className='btn btn-danger'
                  onClick={async () => {
                    const response = await axios.delete(SERVER + "/api/hourly/" + item._id)
                    socket.emit('data-update', response.data);

                  }}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div >
  );
};

export default HourlyUpdatesPage;
