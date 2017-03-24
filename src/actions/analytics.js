import { getRequests } from '../service/open-browser';


export const GET_ANALYTICS_DEFINITIONS = 'GET_ANALYTICS_DEFINITIONS';
export const GET_ANALYTICS_PROPS = 'GET_ANALYTICS_PROPS';
export const CHECK_ANALYTICS = 'CHECK_ANALYTICS';
export const CHANGE_MULTIPLE_QUERY = 'CHANGE_MULTIPLE_QUERY';
export const SUCCESS_CATCH_REQUESTS = 'SUCCESS_CATCH_REQUESTS';

// 定義書のデータ呼び出し
export function getAnalyticsDefinitions() {
  //TODO: DBから値を取ってくる
  const definitions = getDefinitions();

  return {
    type: GET_ANALYTICS_DEFINITIONS,
    definitions: definitions
  }
}

export function getAnalyticsProps() {
  const analyticsProps = getAnalyticsPropsData();

  return {
    type: GET_ANALYTICS_PROPS,
    analyticsProps: analyticsProps
  }
}

// 複数選択可能なcheckbox
export function changeCheckbox(e, id) {
  return {
    type: CHANGE_MULTIPLE_QUERY,
    checked: e.target.checked,
    value: e.target.value,
    id: id
  }
}

//サイカタの値確認
export function checkAnalyticsLog(definition, requests) {
  const results = checkRequests(definition, requests);
  return {
    type: CHECK_ANALYTICS,
    results: results
  };
}

export function openBrowser(requests) {
  console.log(requests);
  getRequests(requests).then( () => {
    return {
      type: SUCCESS_CATCH_REQUESTS,
      data: {}
    }
  });
}


//比較ロジック
export function checkRequests(definitions, requests) {

  const requestObjects = requests.filter( (requestObject) => {
    const { query } = requestObject.request;
    const definition = definitions.find(definition => definition.url === query.c1);
    if (definition != null) {
      //definitions.push(definition);
      requestObject.definition = definition;
      return true;
    }
    return false;
  });

  if(!requestObjects || requestObjects.length < 0) {
    return {};
  }

  if(!definitions || Object.keys(definitions).length < 0) {
    return {};
  }

  const results = {};
  requestObjects.map( requestObject => {
    const requestQuery = requestObject.request.query;
    const definition = requestObject.definition;
    const result = {};
    definition.query.map( query => {
      if(requestQuery[query]) {
        result[query] = true;
      } else {
        result[query] = false;
      }
    });
    results[definition.url] = result;
  });
  return results;
}

// test データ
export function getDefinitions() {
  return [
    {
      id: 1,
      url: 'http://tabroom.jp/',
      query: ['pageName', 'c1', 'c2', 'c5', 'c6', 'c7', 'c8', 'c9', 'c11', 'c12', 'c17', 'c18', 'c19', 'c46', 'c49', 'c50']
    },
    {
      id: 2,
      url: 'http://tabroom.jp/interior-goods/',
      query: ['pageName', 'c1', 'c2', 'c5', 'c6', 'c7', 'c8', 'c9', 'c11', 'c12', 'c17', 'c29', 'c46', 'c49', 'c50']
    }
  ]
}

export function getAnalyticsPropsData() {
  return [
    "pageName","c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10",
    "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20",
    "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29", "c30",
    "c31", "c32", "c33", "c34", "c35", "c36", "c37", "c38", "c39", "c40",
    "c41", "c42", "c43", "c44", "c45", "c46", "c47", "c48", "c49", "c50"
    /*"c51", "c52", "c53", "c54", "c55", "c56", "c57", "c58", "c59", "c60",
     "c61", "c62", "c63", "c64", "c65", "c66", "c67", "c68", "c69", "c70",
     "c71", "c72", "c73", "c74", "c75", "c76", "c77", "c78", "c79", "c80"*/
  ];
}
