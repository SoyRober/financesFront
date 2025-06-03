import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-[#16161a] border-b border-[#7f5af0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-[#fffffe] text-lg font-semibold">MyApp</span>
            <div>
              <Link to="/login" className="text-[#fffffe] hover:bg-[#7f5af0] hover:text-[#fffffe] px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="text-[#fffffe] hover:bg-[#7f5af0] hover:text-[#fffffe] px-3 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
