import { combineReducers } from 'redux';

import * as actions from '../actions/analytics.js';

const initialState = {
  definitions: [], //定義されたデータ
  analyticsProps: [],
  result: [] // SYNC_REQUESTと定義データを比較した結果
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

function result(state = initialState.result, action) {
  if (action.type !== actions.CHECK_ANALYTICS) {
    return state;
  }
  return action.result;
}

export default combineReducers({
  definitions,
  analyticsProps,
  result
});

// selectors
export function getAnalytics(state) {
  return state.analytics;
}


