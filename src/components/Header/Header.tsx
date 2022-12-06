import './Header.css';

const Header = () => {
  return (
    <div>
      <span>Made with </span>
      <a href='https://vitejs.dev' target='_blank'>
        Vite
      </a>
      <span>, </span>
      <a href='https://reactjs.org' target='_blank'>
        React
      </a>
      <span> and </span>
      <a href='https://www.typescriptlang.org/' target='_blank'>
        TypeScript
      </a>
      <div className='profile-link'>
        <a href='https://github.com/garbalau-github' target='_blank'>
          @garbalau-github
        </a>
      </div>
    </div>
  );
};

export default Header;
