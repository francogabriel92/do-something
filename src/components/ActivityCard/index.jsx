import PropTypes from 'prop-types';
import { ACTIVITIES_TYPES } from '../../utils/constants';
import FormSelect from '../Form/FormSelect';
import Spinner from '../Spinner';
import { capitalize } from '../../utils/strings';
import './styles.scss';

const ActivityCard = ({
  activity,
  handleRefresh,
  handleTypeChange,
  handleParticipantsChange,
  handleAddActivity,
  isLoading,
  error,
}) => {
  const typeOptions = ACTIVITIES_TYPES.map((type) => ({
    value: type,
    label: capitalize(type),
  }));

  const MAX_PARTICIPANTS = 10;

  const participantsOptions = [...Array(MAX_PARTICIPANTS).keys()].map(
    (_, index) => ({
      value: index + 1,
      label: index + 1,
    })
  );

  const mustShowFilter = handleTypeChange || handleParticipantsChange;
  const mustShowRefresh = handleRefresh;

  return (
    <div className="activity-card">
      <div className="activity-card__header">
        <h3>
          Activity: <br />
          <strong>{isLoading ? '' : activity?.activity}</strong>
        </h3>
      </div>
      <div className="activity-card__body">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="activity-card__text">{error}</p>
        ) : (
          <>
            <figure
              className={`activity-card__img icon-${activity?.type}`}
            ></figure>
            <button
              className="activity-card__btn btn btn--secondary"
              onClick={handleAddActivity}
            >
              Add to list
            </button>
          </>
        )}
        {(mustShowFilter || mustShowRefresh) && (
          <>
            <p className="activity-card__text">
              Don&lsquo;t like that one?
              <br />
              No problem, find another one!
            </p>
            <div className="activity-card__filter-container">
              {handleTypeChange ? (
                <FormSelect
                  label="Type"
                  id="activity-type"
                  options={typeOptions}
                  onChangeHandler={handleTypeChange}
                  icon="type"
                  placeholder="Any type"
                />
              ) : null}
              {handleParticipantsChange ? (
                <FormSelect
                  label="Participants"
                  id="activity-type"
                  options={participantsOptions}
                  onChangeHandler={handleParticipantsChange}
                  icon="participants"
                  placeholder="Any number"
                />
              ) : null}
            </div>
            {mustShowRefresh ? (
              <button
                className="activity-card__btn btn"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object,
  handleRefresh: PropTypes.func,
  handleTypeChange: PropTypes.func,
  handleParticipantsChange: PropTypes.func,
  handleAddActivity: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ActivityCard;
