import PropTypes from 'prop-types';
import { capitalize } from '../../utils/strings';
import './styles.scss';

const ActivityList = ({ activities, handleDelete }) => {
  return (
    <div className="activity-list__container">
      <ul className="activity-list__list">
        {activities?.map((activity) => (
          <li key={activity.key} className="activity-list__item">
            <span className="activity-list__item-text">
              Activity: {activity.activity} <br />
              Type: {capitalize(activity.type)} <br />
              Participants: {activity.participants} <br />
              Price: {activity.price} <br />
              Accessibility: {activity.accessibility} <br />
            </span>
            {handleDelete && (
              <button
                className="activity-list__item-btn btn btn--secondary"
                onClick={() => handleDelete(activity.key)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default ActivityList;
