import './ErrorBanner.css';

interface ErrorBannerInterface {
  message: string;
  hideErrorBanner(): void;
}

const ErrorBanner = ({ message, hideErrorBanner }: ErrorBannerInterface) => {
  return (
    <div className='error-wrapper' onClick={() => hideErrorBanner()}>
      <p className='error-text'>{message}</p>
    </div>
  );
};

export default ErrorBanner;
