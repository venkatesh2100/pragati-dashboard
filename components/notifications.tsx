import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationComponent = ({ studentId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(`/api/students?studentId=${studentId}`);
      setNotifications(response.data);
    };

    fetchNotifications();
  }, [studentId]);

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        notifications.map(notification => (
          <div key={notification.id} className="border-b py-2">
            <p>{notification.message}</p>
            <a href={`/tests/${notification.test.id}`} className="text-blue-500">Take Test</a>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationComponent;
