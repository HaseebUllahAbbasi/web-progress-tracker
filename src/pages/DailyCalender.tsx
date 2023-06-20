import { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';

const DailyCalender: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  return (

    <div className="container-custom">
      <h1 className='text-center display-3'>Select Date Track Progress</h1>
      <Calendar className={"shadow-lg"} onClickDay={(val, event) => {
        navigate(`/hourly/${new Date(val).toDateString()}`)
      }} value={value} />
    </div>
  )

}
export default DailyCalender