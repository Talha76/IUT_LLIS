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

$(document).ready(function(){
  $(".alert-dismissible").fadeTo(5000, 0, function(){
    $(this).alert('close');
  });
});
