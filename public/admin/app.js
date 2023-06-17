// Function to set default date limits
(() => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().slice(0, 10);
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  const nextYearString = nextYear.toISOString().slice(0, 10);

  const issueFromHtml = document.getElementById('issueFrom');
  issueFromHtml.setAttribute('max', currentDateString);

  const issueToHtml = document.getElementById('issueTo');
  issueToHtml.setAttribute('max', nextYearString);

  const departureFromHtml = document.getElementById('departureFrom');
  departureFromHtml.setAttribute('max', nextYearString);

  const departureToHtml = document.getElementById('departureTo');
  departureToHtml.setAttribute('max', nextYearString);

  const arrivalFromHtml = document.getElementById('arrivalFrom');
  arrivalFromHtml.setAttribute('max', nextYearString);

  const arrivalToHtml = document.getElementById('arrivalTo');
  arrivalToHtml.setAttribute('max', nextYearString);

  const approvedCheckBox = document.getElementById('approved');
  approvedCheckBox.checked = true;

  const rejectedCheckBox = document.getElementById('rejected');
  rejectedCheckBox.checked = true;
})();

function printResultsInHTML(list, tableBody) {
  tableBody.innerHTML = '';

  list.forEach((item) => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.setAttribute('id', 'leaveId');
    const tdIdLink = document.createElement('a');
    tdIdLink.setAttribute('href', `/admin/details?leaveId=${item.leaveId}`);
    tdIdLink.innerHTML = item.leaveId;
    tdId.appendChild(tdIdLink);
    tr.appendChild(tdId);

    const tdIssueTime = document.createElement('td');
    tdIssueTime.setAttribute('id', 'issueTime');
    tdIssueTime.innerHTML = item.issueTime;
    tr.appendChild(tdIssueTime);

    const tdStudentId = document.createElement('td');
    tdStudentId.setAttribute('id', 'studentId');
    const tdStudentIdLink = document.createElement('a');
    tdStudentIdLink.innerHTML = item.studentId;
    tdStudentId.appendChild(tdStudentIdLink);
    tr.appendChild(tdStudentId);

    const tdName = document.createElement('td');
    tdName.setAttribute('id', 'name');
    tdName.innerHTML = item.name;
    tr.appendChild(tdName);

    const tdPurposeOfVisit = document.createElement('td');
    tdPurposeOfVisit.setAttribute('id', 'purposeOfVisit');
    tdPurposeOfVisit.innerHTML = item.purposeOfVisit;
    tr.appendChild(tdPurposeOfVisit);

    const tdStatus = document.createElement('td');
    tdStatus.setAttribute('id', 'status');
    tdStatus.innerHTML = item.status;
    tr.appendChild(tdStatus);

    tableBody.appendChild(tr);
  });
}

// leave = { leaveId, issuTime, studentId, name, purposeOfVisit, status }
function getResults() {
  const leaveResults = [];

  // Extracting search-text, dates from the search-box
  const searchText = document.getElementById('searchText').value;


  // Extracting the data from the hidden-leave table 
  (() => {
    const leaves = document.querySelectorAll('tr[id="leaveHidden"]');
    leaves.forEach((leave) => {
      leaveResults.push({
        leaveId: parseInt(leave.querySelector('td[id="leaveId"]').innerText),
        issueTime: leave.querySelector('td[id="issueTime"]').innerText,
        studentId: parseInt(leave.querySelector('td[id="studentId"]').innerText),
        name: leave.querySelector('td[id="name"]').innerText,
        purposeOfVist: leave.querySelector('td[id="purposeOfVisit"]').innerText,
        status: leave.querySelector('td[id="status"]').innerText
      });
    });
  })();
  // Extraction from hidden-leave table ends here

  // Created mini-search instance
  const minisearch = new MiniSearch({
    idField: 'leaveId',
    fields: ['issueTime', 'studentId', 'name', 'purposeOfVisit', 'status'],
    storeFields: ['leaveId', 'issueTime', 'studentId', 'name', 'purposeOfVisit', 'status']
  });
  minisearch.addAll(leaveResults);

  let searchResults = minisearch.search(searchText, {
    prefix: true,
    fuzzy: 0.2,
  });

  if (!searchText) {
    searchResults = leaveResults;
  }

  printResultsInHTML(searchResults, document.querySelector('tbody[id="leaveTable"]'));

  console.table(searchResults);
}
