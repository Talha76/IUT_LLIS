function getReasonBox(val) {
  const reason = document.getElementsByName('othersDescription')[1];
  if (val === "others") {
    reason.classList.add("show");
  } else {
    reason.classList.remove("show");
  }
}

function getDescriptionBox(val) {
  const description = document.getElementsByName('othersDescription')[0];
  if (val === "others") {
    description.classList.add("show");
  } else {
    description.classList.remove("show");
  }
}
