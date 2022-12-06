import { useState } from 'react';
import Header from './components/Header/Header';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import Button from './components/Button/Button';
import './App.css';

const getTodayDate = (): string => {
  const dateString = new Date().toISOString();
  const dateOnlyString = dateString.substring(0, 10);
  return dateOnlyString;
};

const App = () => {
  const [startDate, setStartDate] = useState(getTodayDate);
  const [endDate, setEndDate] = useState('');
  const [diffDays, setDiffDays] = useState<null | number | string>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const hideErrorBanner = (): void => setIsError(false);

  const getDayCount = (startDate: string, endDate: string): void => {
    if (!startDate || !endDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage(`Please, add both dates!`);
      return;
    }
    if (endDate < startDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage(`Time travel?`);
      return;
    }

    // Converting & Calculations
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const diffTime = endTime - startTime;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      setIsError(false);
      setDiffDays('Today is the day!');
      return;
    }

    setIsError(false);
    setDiffDays(`Pretty soon, ${diffDays} more days`);
  };

  return (
    <div className='container'>
      <Header />
      <h2>How many days until?</h2>
      <div className='card'>
        <form className='form'>
          <div className='form-control'>
            <label>Start Date</label>
            <input
              type='date'
              value={startDate}
              className='input-date'
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label>End Date</label>
            <input
              type='date'
              value={endDate}
              className='input-date'
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </form>
        <br />
        <Button
          text='Calculate'
          clickFunction={() => getDayCount(startDate, endDate)}
        />
        <br />
        <br />
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
