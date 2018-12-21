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

 const datas = [
  {
    api: "tabs.create",
    arg: {'active': false, 'url': 'http://google.com'}
  }
];
const reports = [];
const promises = [];

function apiTest(api, arg)
{
  const [apiName, method] = api.split(".");
  return Promise.all([browser[apiName][method](arg)]).then(() =>
  {
    reports.push({api, result: "success"});
  }).catch(() =>
  {
    reports.push({api, result: "failed"});
  });
}

for (const {api, arg} of datas)
{
  promises.push(apiTest(api, arg));
}

Promise.all(promises).then(() =>
{
  const result = reports.reduce((acc, report) => 
  {
    const {api, result} = report;
    return acc += `${api}: ${result}\n`;
  }, "");
  document.querySelector("#result").textContent = result;
});
