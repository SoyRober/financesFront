import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", to: "/overview" },
  { label: "Settings", to: "/settings" },
];

const profileItem = [
  { label: "Profile", to: "/profile" },
  { label: "Log Out", to: "/logout" },
];

const authItems = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const NavigationPanel: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <nav className="w-52 py-5 px-3 bg-neutral-900 min-h-screen border-r border-primary-500 flex flex-col">
      <ul className="list-none m-0 p-0 text-white">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`block px-5 py-2 rounded transition no-underline ${
                location.pathname === item.to
                  ? "bg-primary text-white"
                  : "hover:text-white hover:bg-primary-500"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {token && (
          <ul className="list-none m-0 p-0 text-white">
            {profileItem.map((item) => (
              <li key={item.to}>
          <Link
            to={item.to}
            className={`block px-5 py-2 rounded transition no-underline ${
              location.pathname === item.to
                ? "bg-primary text-white"
                : "hover:text-white hover:bg-primary-500"
            }`}
          >
            {item.label}
          </Link>
              </li>
            ))}
          </ul>
        )}
        {!token && (
          <ul className="list-none m-0 p-0 text-white">
            {authItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block px-5 py-2 rounded transition no-underline ${
                    location.pathname === item.to
                      ? "bg-primary text-white"
                      : "hover:text-white hover:bg-primary-500"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavigationPanel;
