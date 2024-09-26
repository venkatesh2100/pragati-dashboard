import NotificationComponent from '../../components/notifications';

const Dashboard = () => {
  const studentId = 'example-student-id'; // Replace with actual student ID

  return (
    <div>
      <h1>Student Dashboard</h1>
      <NotificationComponent studentId={studentId} />
      {/* Other components or content */}
    </div>
  );
};

export default Dashboard;
