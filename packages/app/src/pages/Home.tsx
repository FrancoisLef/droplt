import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav className="bg-slate-50 px-1 py-0">
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Home;
