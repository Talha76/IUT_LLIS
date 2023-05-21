const queryString = window.location.search;

if (queryString) {
  const query = queryString.substring(1);
  const queryArray = query.split('&');
  queryArray.forEach((query) => {
    const [ key, value ] = query.split('=');
    const elements = document.getElementsByName(key);
    elements.forEach((element) => element.value = value);
  });
}
