import { Link, Outlet } from "react-router-dom";
import { Protected } from "../components/protected";

export const PageLayout = () => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Protected permission="pages:protected" disableRedirect>
        <Link to="/protected">Protected</Link>
      </Protected>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
