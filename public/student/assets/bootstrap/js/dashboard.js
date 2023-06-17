const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 6);
const nextDate = new Date(currentDate);
nextDate.setDate(nextDate.getDate() + 30);
document.getElementById("departureDate").min = currentDate.toISOString().slice(0, 10);
document.getElementById("arrivalDate").max = nextDate.toISOString().slice(0, 10);

const leastTime = new Date();
leastTime.setDate(leastTime.getDate() - 7);
leastTime.setHours(6, 0);
const mostTime = new Date();
mostTime.setHours(5, 59, 59);
mostTime.setDate(mostTime.getDate() + 1);
const currentDateLeastTime = new Date();
currentDateLeastTime.setHours(6, 0);

document.getElementById("departureTime").min = leastTime.toISOString().slice(0, 16);
document.getElementById("departureTime").max = mostTime.toISOString().slice(0, 16);
document.getElementById("arrivalTime").min = currentDateLeastTime.toISOString().slice(0, 16);
document.getElementById("arrivalTime").max = mostTime.toISOString().slice(0, 16);

document.getElementById('departureDate').addEventListener('change', () => {
  const departureDate = document.getElementById('departureDate').value;
  const arrivalDateMax = new Date(departureDate);
  arrivalDateMax.setDate(arrivalDateMax.getDate() + 15);

  const arrivalDate = document.getElementById('arrivalDate');
  arrivalDate.min = departureDate;
  arrivalDate.max = arrivalDateMax.toISOString().slice(0, 10);
});

function getReasonBox(val) {
  const reason = document.getElementsByName('othersDescription')[1];
  if (val === "others") {
    reason.classList.add("show");
    reason.setAttribute('required', '');
  } else {
    reason.classList.remove("show");
    reason.removeAttribute('required');
  }
}

function getDescriptionBox(val) {
  const description = document.getElementsByName('othersDescription')[0];
  if (val === "others") {
    description.classList.add("show");
    description.setAttribute('required', '');
  } else {
    description.classList.remove("show");
    description.removeAttribute('required');
  }
}

$(document).ready(() => {
  setTimeout(() => {
    $('.alert-dismissible').fadeOut('slow');
  }, 3000);
});
