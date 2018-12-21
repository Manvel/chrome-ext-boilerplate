function getPromise()
{
  return browser.tabs.create({'active': false, 'url': 'http://google.com'});
}
Promise.all([getPromise()]).then(() =>
{
  console.log('ready');
}).catch(()=>
{
  console.log('error');
});