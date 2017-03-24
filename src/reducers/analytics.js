import { combineReducers } from 'redux';

import * as actions from '../actions/analytics.js';

const initialState = {
  definitions: [], //定義されたデータ
  analyticsProps: [],
  results: {} // SYNC_REQUESTと定義データを比較した結果
};

// reducers
function definitions(state = initialState.definitions, action) {
  switch (action.type) {
    case actions.GET_ANALYTICS_DEFINITIONS:
      return action.definitions;
    case actions.CHANGE_MULTIPLE_QUERY:
      const definitions = state.map( definition => {
        // 選択されたテストケースと同じ場合
        if(definition.id === action.id) {
          if(action.checked) {
            definition.query.push(action.value);
          } else {
            definition.query = definition.query.filter(v => v !== action.value);
          }
        }
        return definition;
      });
      return definitions;
    default:
      return state
  }
}

function analyticsProps(state = initialState.analyticsProps, action) {
  if (action.type !== actions.GET_ANALYTICS_PROPS) {
    return state;
  }
  return action.analyticsProps;

}

function results(state = initialState.results, action) {
  switch (action.type) {
    case actions.CHECK_ANALYTICS:
      return action.results;
    case actions.SUCCESS_CATCH_REQUESTS:
        return state;
    default:
      return state;
  }
}

export default combineReducers({
  definitions,
  analyticsProps,
  results
});

// selectors
export function getAnalytics(state) {
  return state.analytics;
}


