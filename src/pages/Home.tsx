import { Link } from "react-router-dom";

const Home: React.FunctionComponent = () => {
  return <>
    <h1>Welcome to the Home Page!</h1>
    <nav>
      <ul>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/hourly">Hourly Updates</Link>
        </li>
      </ul>
    </nav>
  </>
}
export default Home;