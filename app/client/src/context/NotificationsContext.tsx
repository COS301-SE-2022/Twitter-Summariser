import { createContext, useState } from "react";

export const NotificationsContext = createContext<any>({});

function NotificationsProvider({children}: any) {
    
    
    const [notifications, setNotifications] = useState<any[]>([]);

    const addNotifications =async (notification:any) => {
        setNotifications(
            notification
        );
    };

    const removeNotification =async (id:any) => {
        notifications.forEach((notification: any, index) => {
            if (notification.id === id) {
                notifications.splice(index, 1);
            }
        });

        setNotifications(notifications);
    }

    return <NotificationsContext.Provider value={{notifications, addNotifications, removeNotification}}>
        {children}
    </NotificationsContext.Provider>
}

export default NotificationsProvider;