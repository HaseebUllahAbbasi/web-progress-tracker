import { SITE } from "../constant";
import './TodoList.css';

const Home: React.FunctionComponent = () => {
  const showNotification = () => {
    if (Notification.permission === 'granted') {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour >= 0 && currentHour <= 23) {
        const notification = new Notification('New Notification', {
          body: 'Click to open the platform',
        });

        notification.addEventListener('click', () => {
          window.open(SITE, '_blank');
        });
      }
    }
  };

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // Permission granted, show notification every hour
        setInterval(() => {
          showNotification();
        }, 3600000); // 1 hour in milliseconds
      }
    });
  };

  return (
    <>
      <div className="container-custom">
        <h1 className="text-center display-3 my-5">Welcome to the Home Page!</h1>
        <div className="text-center">
          <button className="btn btn-warning" onClick={requestNotificationPermission}>
            Allow Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
