import { useState } from 'react';
import Header from './components/Header/Header';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import Button from './components/Button/Button';
import './App.css';

const getTodaysDate = (): string => {
  const dateString = new Date().toISOString();
  const dateOnlyString = dateString.substring(0, 10);
  return dateOnlyString;
};

const App = () => {
  const [startDate, setStartDate] = useState(getTodaysDate);
  const [endDate, setEndDate] = useState('');
  const [diffDays, setDiffDays] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const hideErrorBanner = (): void => setIsError(false);

  const getDayCount = (startDate: string, endDate: string): void => {
    // Validation
    if (!startDate || !endDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage('Enter both dates please!');
      return;
    }
    if (endDate < startDate) {
      setIsError(true);
      setDiffDays(null);
      setErrorMessage('End date can not be in past!');
      return;
    }

    // Converting & Calculations
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const diffTime = endTime - startTime;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    setIsError(false);
    setDiffDays(diffDays);
  };

  return (
    <div className='App'>
      <Header />
      <br />
      <h2>How many days until...</h2>
      <div className='card'>
        <form className='form'>
          <div className='form-control'>
            <label>Start Date</label>
            <input
              type='date'
              value={startDate}
              className='input-date'
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label>End Date</label>
            <input
              type='date'
              value={endDate}
              className='input-date'
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
        {diffDays && (
          <div className='days-until-text'>
            Pretty soon, <span className='days-until-date'>{diffDays}</span>{' '}
            days ahead!
          </div>
        )}
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
