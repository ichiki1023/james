import browserLauncher from 'james-browser-launcher';
import {Builder, promise as promiseDriver} from 'selenium-webdriver';
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

  let driver = new Builder()
    .forBrowser(launchOptions.browser)
    .setProxy(proxy.manual({http: launchOptions.proxy}))
    .build();

  const flow = promiseDriver.controlFlow();
  return flow.execute(() => {
    requests.map( request => {
      flow.execute(() => {
        driver.get(request);
        driver.wait(() => { return true; }, 1000);
      });
    });
  }).then(() => {
    driver.quit();
    Promise.resolve();
  });
}

