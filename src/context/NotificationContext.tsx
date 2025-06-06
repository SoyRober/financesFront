import React, { createContext, useContext } from "react";
import { useSnackbar } from "notistack";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextProps {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message: string, type: NotificationType = "info") => {
    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      }
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};