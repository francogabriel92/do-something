import { useEffect } from 'react';
import ActivityList from '../../components/ActivityList';
import { ActivitiesConsumer } from '../../contexts/activitiesContext';
import { AuthConsumer } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.scss';

const Activities = () => {
  const { activitiesList, deleteActivity } = ActivitiesConsumer();
  const { user } = AuthConsumer();
  const navigate = useNavigate();

  const handleDelete = (activityId) => {
    deleteActivity(activityId, user.email);
    toast.success('Activity deleted successfully!');
  };

  // If user enters this route directly, redirect to home
  useEffect(() => {
    if (!activitiesList) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="activities">
      <div className="wrapper">
        <h2 className="activities__text">Activities to&nbsp;do:</h2>
        {activitiesList?.length === 0 ? (
          <p className="activities__text--info">
            You don&lsquo;t have any activities yet. <br /> Go to{' '}
            <strong>
              <Link to="/home">Home</Link>
            </strong>{' '}
            to add some!
          </p>
        ) : (
          <ActivityList
            activities={activitiesList}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Activities;
