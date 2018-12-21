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
