import './ErrorBanner.css';

interface ErrorBannerInterface {
  message: string;
  hideErrorBanner(): void;
}

const ErrorBanner = ({ message, hideErrorBanner }: ErrorBannerInterface) => {
  return (
    <div className='error-wrapper'>
      <p className='error-text'>{message}</p>
      <div className='error-close' onClick={() => hideErrorBanner()}>
        &times;
      </div>
    </div>
  );
};

export default ErrorBanner;
