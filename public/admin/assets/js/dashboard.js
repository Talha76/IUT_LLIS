const queryString = window.location.search;

const params = [];

if (queryString) {
  const query = queryString.substring(1);
  const queryArray = query.split('&');
  queryArray.forEach((query) => {
    const [ key, value ] = query.split('=');
    params[key] = value;

    const elements = document.getElementsByName(key);
    elements.forEach((element) => element.value = value);

  });
}

var appendQuery = '';
for (const [ key, value ] of Object.entries(params)) {
  appendQuery += '&' + key + '=' + value;
}

const leaveApprove = document.getElementsByName('leaveApprove');
leaveApprove.forEach((leave) => leave.href += appendQuery);

const leaveReject = document.getElementsByName('leaveReject');
leaveReject.forEach((leave) => leave.href += appendQuery);
