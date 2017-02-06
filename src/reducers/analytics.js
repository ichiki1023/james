import { combineReducers } from 'redux';

import * as actions from '../actions/analytics.js';

const initialState = {
    definition: [], //定義されたデータ
    result: [] // SYNC_REQUESTと定義データを比較した結果
};

// reducers
function definition(state = initialState.definition, action) {
  if (action.type !== actions.GET_ANALYTICS_DEFINITION) {
    return state;
  }
  return action.definition;
}

function result(state = initialState.result, action) {
  if (action.type !== actions.CHECK_ANALYTICS) {
    return state;
  }
  return action.result;
}

export default combineReducers({
  definition,
  result
});


// selectors

