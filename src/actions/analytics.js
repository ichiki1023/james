import webdriver from 'selenium-webdriver';
import proxy from 'selenium-webdriver/proxy';

export const GET_ANALYTICS_DEFINITIONS = 'GET_ANALYTICS_DEFINITIONS';
export const GET_ANALYTICS_PROPS = 'GET_ANALYTICS_PROPS';
export const CHECK_ANALYTICS = 'CHECK_ANALYTICS';
export const CHANGE_MULTIPLE_QUERY = 'CHANGE_MULTIPLE_QUERY';

const defaultOptions = {
  browser: 'firefox',
  proxy: 'localhost:1338'
};

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
  const result = checkRequests(definition, requests);
  return {
    type: CHECK_ANALYTICS,
    result: result
  };
}

export function openBrowser(requests) {
  console.log(requests);
  const launchOptions = {
    ...defaultOptions
  };

  let driver = new webdriver.Builder()
    .forBrowser(launchOptions.browser)
    .setProxy(proxy.manual({http: launchOptions.proxy}))
    .build();

  const promises = [];
  requests.map((request) => {
    promises.push(requestPromise(driver, request));
  });

  Promise.all(promises).then( () => {
    driver.quit();
  });
}

function requestPromise(driver, request) {
  return new Promise((resolve) => {
    driver.get(request).then( () => {
      console.log("finish url:" + request);
      resolve();
    }).catch((error) => {
      console.log("driver error:" + error);
      resolve();
    });
  }).catch((error) => {
    console.log("promise error:" + error);
  });
}

//比較ロジック
export function checkRequests(definitions, requests) {
  const result = {};
  const requestQueries = requests.filter( (requests) => {
    const { query } = requests.request;
    const definition = definitions.find( definition => definition.url === query.c1 );
    if(definition){
      return true;
    }
    return false;
  });

  if(!requestQueries || requestQueries.length < 0) {
    return result;
  }

  const request = requestQueries[0];

  if(!request) {
    return result;
  }

  const requestQuery = request.request.query;
  console.log(requestQuery);

  Object.keys(query).forEach( key => {
    console.log(query);
    console.log(key);
    console.log(result);
    // queryがtrueの場合
    if(query[key] === true) {
      //値が定義されている
      if(requestQuery[key]) {
        result[key] = true;
        //成功
      } else {
        result[key] = false;
      }
    } else {
      //値が定義されていない
      if(!requestQuery[key]) {
        //成功
        result[key] = true;
      } else{
        //失敗
        result[key] = false;
      }
    }
  });
  return result;
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
