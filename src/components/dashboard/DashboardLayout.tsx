import React from "react";
import NavigationPanel from "./NavigationPanel";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen">
    <NavigationPanel />
    <main className="flex-1 p-6">{children}</main>
  </div>
);

export default DashboardLayout;