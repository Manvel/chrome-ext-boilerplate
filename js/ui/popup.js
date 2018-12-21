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
  "click", () => reportIssue(tab)
);
