const getTab = new Promise(
  resolve =>
  {
    document.addEventListener("DOMContentLoaded", () =>
    {
      browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
      {
        resolve({id: tabs[0].id, url: tabs[0].url});
      });
    });
  }
);

function reportIssue(tab)
{
  browser.tabs.create({
    active: false,
    url: browser.runtime.getURL("/issue-reporter.html?" + tab.id)
  }).then(
    // force closing popup which is not happening in Firefox
    // @link https://issues.adblockplus.org/ticket/7017
    () => window.close()
  );
}

document.querySelector("#issue-reporter").addEventListener(
  "click", () => {
    getTab().then((tab) => 
    {
      reportIssue(tab)
    });
  }
);
