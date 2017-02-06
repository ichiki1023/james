
export const GET_ANALYTICS_DEFINITION = 'GET_ANALYTICS_DEFINITION';
export const GET_ANALYTICS_REQUESTS = 'GET_ANALYTICS_REQUESTS';
export const CHECK_ANALYTICS = 'CHECK_ANALYTICS';

// 定義書のデータ呼び出し
export function getAnalyticsDefinition() {
  //TODO: DBから値を取ってくる
  const definition = getDefinition();

  return {
    type: GET_ANALYTICS_DEFINITION,
    definition: definition
  }
}

//サイカタの値確認
export function checkAnalyticsLog(definition, requests) {
  const result = checkRequests(definition, requests);
  return {
    type: CHECK_ANALYTICS,
    result: result
  };
}

//比較ロジック
export function checkRequests(definition, requests) {
  const query = definition.query;
  const result = {};
  const requestQuery = requests.filter( (requests) => {
    const { query } = requests.request;
    return query.c1 === definition.url; //URL比較
  });

  if(!requestQuery || requestQuery.length < 0) {
    return result;
  }

  const request = requestQuery[0];

  if(!request) {
    return result;
  }
  console.log(request);

  Object.keys(query).forEach( key => {
    // queryがtrueの場合
    if(query[key] == true) {
      //値が定義されている
      if(request[key]) {
        result[key] = true;
        //成功
      }
      result[key] = false;
    } else {
      //値が定義されていない
      if(!request[key]) {
        //成功
        result[key] = true;
      }
      //失敗
      result[key] = false;
    }
  });
  return result;
}

// test データ
export function getDefinition() {
  return {
    url: 'http://shoplier.jp/',
    query: {
      pageName: true,
      c1: true,
      c2: true,
      c3: false,
      c4: false,
      c5: false,
      c6: false,
      c7: false,
      c8: false,
      c9: false,
      c10: true
    }
  }
}
