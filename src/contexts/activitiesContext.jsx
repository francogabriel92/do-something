import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../utils/constants';
import PropTypes from 'prop-types';

const activitiesContext = createContext();

// Example of a custom provider with logic inside the provider itself
export const ActivitiesProvider = ({ children }) => {
  const [activitiesList, setActivitiesList] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getActivity = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(`${API_URL}`);
      const result = await response.json();
      setActivity(result);
    } catch (error) {
      setHasError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityByFilter = async (filters = {}) => {
    setIsLoading(true);
    setHasError(false);
    const queryParams = Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    try {
      const response = await fetch(`${API_URL}?${queryParams}`);
      const result = await response.json();
      if (result?.error) throw new Error(result.error);
      setActivity(result);
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong';
      setActivity(null);
      setHasError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = (activity, user) => {
    const savedActivities = JSON.parse(
      window.localStorage.getItem('activities')
    );

    if (savedActivities && savedActivities[user]) {
      if (checkDuplicated(activity, user)) return;
      const newActivities = [...savedActivities[user], activity];
      const activitiesToSave = {
        ...savedActivities,
        [user]: newActivities,
      };
      window.localStorage.setItem(
        'activities',
        JSON.stringify(activitiesToSave)
      );
    } else {
      const activitiesToSave = {
        [user]: [activity],
      };
      window.localStorage.setItem(
        'activities',
        JSON.stringify(activitiesToSave)
      );
    }
    setActivitiesList((prevState) => [...prevState, activity]);
  };

  const deleteActivity = (activityId, user) => {
    setActivitiesList((prevState) => {
      const newActivities = prevState.filter(
        (activity) => activity.key !== activityId
      );
      const savedActivities = JSON.parse(
        window.localStorage.getItem('activities')
      );
      const activitiesToSave = {
        ...savedActivities,
        [user]: newActivities,
      };
      window.localStorage.setItem(
        'activities',
        JSON.stringify(activitiesToSave)
      );
      return newActivities;
    });
  };

  const checkDuplicated = (activity, user) => {
    const savedActivities = JSON.parse(
      window.localStorage.getItem('activities')
    );
    if (savedActivities && savedActivities[user]) {
      const isDuplicated = savedActivities[user].some(
        (a) => a.key === activity.key
      );
      return isDuplicated;
    }
    return false;
  };

  const getUserActivities = (email) => {
    const savedActivities = JSON.parse(
      window.localStorage.getItem('activities')
    );
    if (savedActivities && savedActivities[email]) {
      setActivitiesList(savedActivities[email]);
    } else {
      setActivitiesList([]);
    }
  };

  // Get initial activity to show from the API
  useEffect(() => {
    getActivity();
  }, []);

  const providerValues = {
    activity,
    getActivity,
    getActivityByFilter,
    addActivity,
    deleteActivity,
    activitiesList,
    isLoading,
    hasError,
    getUserActivities,
    checkDuplicated,
  };

  return (
    <activitiesContext.Provider value={providerValues}>
      {children}
    </activitiesContext.Provider>
  );
};

ActivitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ActivitiesConsumer() {
  return useContext(activitiesContext);
}
