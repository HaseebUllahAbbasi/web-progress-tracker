import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import { LogoutUser } from '../store/UserActions';
import { SERVER } from '../constant';
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';

interface HourlyUpdate {
  _id: string;
  timestamp: string;
  date: string;
  description: string[];
}

const HourlyUpdatesPage: React.FC = () => {
  const { date } = useParams();
  const selectedDate = date ? date : new Date().toDateString();
  const today = new Date().toDateString();
  const user = useSelector((state: StateType) => state?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>([]);
  const [desc, setDesc] = useState(['']);
  const socket = io(SERVER);

  // Fetch the hourly updates from the server
  useEffect(() => {
    if (!user?._id)
      navigate('/')
    fetchHourlyUpdates();

    socket.emit("hourly-user-update", { userId: user?._id })
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
        userId: user?._id, timestamp: formattedTime, today,
      });

      socket.emit('data-update', { userId: user?._id });
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
      <h2 className='text-center'>Hourly Updates</h2>
      <h3 className='text-center'>
        selectedDate : {selectedDate}
      </h3>
      <div className='text-center'>

        {/* <img src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`} alt="Profile" className='profile' /> */}
        <span className='user-name'>
          <span>
            🧑
          </span>
          <span className='user-name-only'>
            {user?.username}

          </span>
        </span>
        <button className=' btn ' onClick={() => {
          dispatch(LogoutUser())
          navigate('/')

        }}>
          <span className='logout' title='Logout'>
            🚪
          </span>
        </button>

      </div>
      {
        today === selectedDate &&
        <div>
          <h4 className='text-center'>Add New Update</h4>
          <div className='text-center px-5 my-3'>
            {
              desc.map((item, index) => <span className='d-flex ' key={index}>
                <span className='mx-3'>
                  {index + 1}.
                </span>
                <input key={index} className='form-control w-25' type='text' value={item} name={`${index}`} onChange={(e) => {
                  changeValue(e.target.value, index)
                }} />
                {
                  index + 1 === desc.length && <span className='mx-3 d-flex justify-content-around'>
                    <button className='btn btn-warning' title='add new Item' onClick={() => setDesc([...desc, ''])}>
                      ➕
                    </button>
                    <button className='btn btn-primary mx-1' onClick={handleAddUpdate}>Upload Hourly Data</button>

                  </span>

                }
              </span>)
            }


          </div>

        </div>
      }

      <div>
        <h4 className='text-center'>View Updates</h4>

        <div className='d-flex flex-wrap'>
          {hourlyUpdates.map((item, index) => (


            <div key={index} style={{ padding: "10px", borderRadius: "10px", margin: "10px", background: "linear-gradient(135deg, rgb(226, 139, 254) 0%, rgb(75, 225, 236) 100%)" }}>
              <p>
                {new Date(item.date).toDateString()}
              </p>
              <p className='text-center time'>
                {item.timestamp}
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
                    socket.emit('data-update', { userId: user?._id });
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
