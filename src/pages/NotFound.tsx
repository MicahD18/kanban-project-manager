import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page Not Found</p>
      <Link to="" className="text-primary_btn_idle mt-8 font-bold text-lg">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
