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
          <Link to="/to-do">To Do Task</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/calender">Calender</Link>
        </li>

      </ul>
    </nav>
  </>
}
export default Home;