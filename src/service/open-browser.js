import browserLauncher from 'james-browser-launcher';
import webdriver from 'selenium-webdriver';
import proxy from 'selenium-webdriver/proxy';

const defaultOptions = {
  browser: 'firefox',
  proxy: 'localhost:1338'
};

export default function openBrowser(options) {
  const launchOptions = {
    ...defaultOptions,
    ...options
  };

  return new Promise((resolve, reject) => {
    browserLauncher((err, launch) => {
      if (err) return reject(err);
      launch('http://www.uxebu.com/', launchOptions, (launchErr) => {
        if (launchErr) return reject(launchErr);
        resolve();
      });
    });
  });
}


export function getRequests(requests) {
  const launchOptions = {
    ...defaultOptions
  };

  let driver = new webdriver.Builder()
    .forBrowser(launchOptions.browser)
    .setProxy(proxy.manual({http: launchOptions.proxy}))
    .build();

  /*
  const promises = [];
  requests.map((request) => {
    promises.push(requestPromise(driver, request));
  });

  return Promise.all(promises).then( () => {
    driver.quit();
  }).catch( (e) =>{
    logger.warn((e));
  });
  */
  console.log(requests[0]);
  return requestPromise(driver, requests[0]).then( () => {
    return true;
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
