function getBrowser() {
  if (typeof chrome !== "undefined") {
    if (typeof browser !== "undefined") {
      return "Firefox";
    } else {
      return "Chrome";
    }
  } else {
    return "Edge";
  }
}

if (getBrowser() == "Chrome")
{
  window.browser = window.chrome;
}

function getPromise()
{
  return browser.tabs.create({'active': false, 'url': 'http://google.com'});
}
Promise.all([getPromise()]).then(() =>
{
  document.querySelector("#result").textContent = "ready";
}).catch(()=>
{
  document.querySelector("#result").textContent = "error";
});
