import { useState } from 'react';

import './App.css';

import Header from './components/Header/Header';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

const getTodayDate = (): Date => new Date();

const App = () => {
  const [startDate, setStartDate] = useState<Date>(getTodayDate);
  const [endDate, setEndDate] = useState<Date>(getTodayDate);
  const [diffDays, setDiffDays] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const hideErrorBanner = (): void => setIsError(false);

  const getDayCount = (startDate: Date, endDate: Date): void => {
    if (!startDate || !endDate) {
      setIsError(true);
      setDiffDays('');
      setErrorMessage(`Please, fill out both fields!`);
      return;
    }
    if (endDate < startDate) {
      setIsError(true);
      setDiffDays('');
      setErrorMessage(`You can't time travel, don't you?`);
      return;
    }

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
    setDiffDays(`Pretty soon, ${Math.ceil(diffDays)} more days`);
  };

  return (
    <div className='container'>
      <Header />
      <h2>How many days until?</h2>
      <div className='card'>
        <div className='form'>
          <Input label='Start Date' date={startDate} setDate={setStartDate} />
          <Input label='End Date' date={endDate} setDate={setEndDate} />
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
