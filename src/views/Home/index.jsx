import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthConsumer } from '../../contexts/authContext';
import { ActivitiesConsumer } from '../../contexts/activitiesContext';
import ActivityCard from '../../components/ActivityCard';
import './styles.scss';

const Home = () => {
  const [type, setType] = useState(null);
  const [participants, setParticipants] = useState(null);
  const { user } = AuthConsumer();
  const {
    activity,
    getActivity,
    getActivityByFilter,
    isLoading,
    addActivity,
    getUserActivities,
    activitiesList,
    hasError,
    checkDuplicated,
  } = ActivitiesConsumer();

  const handleTypeChange = (value) => setType(value);
  const handleParticipantsChange = (value) => setParticipants(value);

  const handleRefresh = () => {
    const hasFilters = type || participants;
    if (hasFilters) {
      // Conditionally generate the filters object
      const filters = {
        ...(type && { type }),
        ...(participants && { participants }),
      };
      getActivityByFilter(filters);
    } else {
      getActivity();
    }
  };

  const handleAddActivity = () => {
    if (checkDuplicated(activity, user.email)) {
      toast.error('This activity is already on your list!');
      return;
    }
    addActivity(activity, user.email);
    toast.success('Activity added successfully!');
  };

  // Set user's activities on first render (if any)
  useEffect(() => {
    if (user && !activitiesList) getUserActivities(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="home">
      <div className="wrapper">
        <div className="home__text">
          <h2>
            Hi <strong>{user?.name}</strong>({user?.age}). <br /> Let&lsquo;s
            see what we can do today!
          </h2>
        </div>
        <div className="home__activity-container">
          <ActivityCard
            activity={activity}
            handleTypeChange={handleTypeChange}
            handleParticipantsChange={handleParticipantsChange}
            handleRefresh={handleRefresh}
            handleAddActivity={handleAddActivity}
            isLoading={isLoading}
            error={hasError}
          />
        </div>
        <div className="home__activities-list">
          <Link to="/activities" className="btn btn--secondary">
            Activities to do
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
