import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise App</h1>

      <Link to="/product">Product</Link>
    </div>
  );
}

export default Homepage;
