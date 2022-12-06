import { useState } from 'react';

import './App.css';

import Header from './components/Header/Header';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import Button from './components/Button/Button';

// Datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const getTodayDate = (): Date => new Date();

const App = () => {
  const [startDate, setStartDate] = useState<Date>(getTodayDate);
  const [endDate, setEndDate] = useState<Date>(getTodayDate);
  const [diffDays, setDiffDays] = useState<null | number | string>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const hideErrorBanner = (): void => setIsError(false);

  const getDayCount = (startDate: Date, endDate: Date): void => {
    if (!startDate || !endDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage(`Please, fill out both fields!`);
      return;
    }
    if (endDate < startDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage(`You can't time travel, don't you?`);
      return;
    }

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const diffTime = endTime - startTime;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      setIsError(false);
      setDiffDays('Today is the day! Congratulations!');
      return;
    }

    setIsError(false);
    setDiffDays(`Pretty soon, ${Math.ceil(diffDays)} more days`);
  };

  return (
    <div className='container'>
      <Header />
      <h2>How many days until?</h2>
      <div className='card'>
        <div className='form'>
          <div className='form-control'>
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              dateFormat='dd.MM.yyyy'
              minDate={new Date()}
              onChange={(updatedDate: Date) => setStartDate(updatedDate)}
            />
          </div>
          <div className='form-control'>
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              dateFormat='dd.MM.yyyy'
              minDate={new Date()}
              onChange={(updatedDate: Date) => setEndDate(updatedDate)}
            />
          </div>
        </div>
        <Button
          text='Calculate'
          clickFunction={() => getDayCount(startDate, endDate)}
        />
      </div>
      <div className='info-messages'>
        {diffDays && <div className='days-until-text'>{diffDays}</div>}
        {isError && (
          <ErrorBanner
            message={errorMessage}
            hideErrorBanner={hideErrorBanner}
          />
        )}
      </div>
    </div>
  );
};

export default App;
