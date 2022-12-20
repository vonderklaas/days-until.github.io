import React from 'react';

import DatePicker from 'react-datepicker';

// CSS for DatePicker
import 'react-datepicker/dist/react-datepicker.css';

// Custom CSS
import './Input.css';

interface InputInterface {
  label: string;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Input = ({ label, date, setDate }: InputInterface) => {
  return (
    <div className='form-control'>
      <label>{label}</label>
      <DatePicker
        selected={date}
        dateFormat='dd.MM.yyyy'
        minDate={new Date()}
        onChange={(updatedDate: Date) => setDate(updatedDate)}
      />
    </div>
  );
};

export default Input;
