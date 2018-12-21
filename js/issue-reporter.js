/**
    "browserAction.getPopup",
    "contextMenus.removeAll",
    "devtools.panels.create",
    "notifications.clear",
    "notifications.create",
    "runtime.getBrowserInfo",
    "runtime.openOptionsPage",
    "runtime.sendMessage",
    "runtime.setUninstallURL",
    "storage.local.get",
    "storage.local.remove",
    "storage.local.set",
    "storage.managed.get",
    "tabs.create",
    "tabs.executeScript",
    "tabs.get",
    "tabs.getCurrent",
    "tabs.insertCSS",
    "tabs.query",
    "tabs.reload",
    "tabs.remove",
    "tabs.removeCSS",
    "tabs.sendMessage",
    "tabs.update",
    "webNavigation.getAllFrames",
    "webRequest.handlerBehaviorChanged",
    "windows.create",
    "windows.update"
 */

 function getTabId()
 {
   return parseInt(location.search.replace(/^\?/, ""), 10);
 }

 const datas = [
  {
    api: "tabs.create",
    args: [{'active': false, 'url': 'http://google.com'}]
  },
  {
    api: "tabs.get",
    args: [getTabId()]
  },
  {
    api: "tabs.getCurrent",
    args: []
  },
  {
    api: "tabs.query",
    args: [{active: true}]
  },
  {
    api: "tabs.reload",
    args: [getTabId()]
  }
];
const reports = [];
const promises = [];

function apiTest(api, args)
{
  const [apiName, method] = api.split(".");
  return Promise.all([browser[apiName][method](...args)]).then(() =>
  {
    reports.push({api, result: "success"});
  }).catch((err) =>
  {
    console.log(err);
    reports.push({api, result: "failed"});
  });
}

for (const {api, args} of datas)
{
  promises.push(apiTest(api, args));
}

Promise.all(promises).then(() =>
{
  const result = reports.reduce((acc, report) => 
  {
    const {api, result} = report;
    return acc += `${api}: ${result}<br>`;
  }, "");
  document.querySelector("#result").innerHTML = result;
});
