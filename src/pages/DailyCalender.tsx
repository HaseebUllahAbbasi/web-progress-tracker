import { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

const DailyCalender: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  return (

    <div>
      <Calendar onClickDay={(val, event) => {
        navigate(`/hourly/${new Date(val).toDateString()}`)
      }} value={value} />
    </div>
  )

}
export default DailyCalender