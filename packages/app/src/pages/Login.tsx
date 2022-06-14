import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div>
        <input placeholder="Email" type="text" />
        <input placeholder="Password" type="password" />
      </div>
    </nav>
  );
};

export default Login;
