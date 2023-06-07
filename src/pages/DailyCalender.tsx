import { useState } from 'react';
import Calendar from 'react-calendar';

const DailyCalender: React.FunctionComponent = () => {
  const [value, onChange] = useState(new Date());

  return (

    <div>
      <Calendar onClickDay={(val, event) => alert('Clicked day: ' + val)} value={value} />
    </div>
  )

}
export default DailyCalender