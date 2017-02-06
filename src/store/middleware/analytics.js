import * as analyticsActions from '../../actions/analytics.js';
import * as requestActions from '../../actions/requests.js';

const middleware = store => next => action => {
  const { requests: requestState, analytics: analyticsState } = store.getState();

  switch (action.type) {
    case requestActions.SYNC_REQUESTS:
      next(action);
      store.dispatch(analyticsActions.checkAnalyticsLog(analyticsState.definition, requestState.data.requests));
      break;

    default:
      return next(action);
  }

  return next(action);
};

export default middleware;

