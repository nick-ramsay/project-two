$(document).ready(function () {
  var appointmentLocalStorage = JSON.parse(localStorage.getItem("tempAppointmentForm"));
  if (appointmentLocalStorage) {
    $('#customerEmail').val(appointmentLocalStorage.customerEmail);
    $('#customerPhone').val(appointmentLocalStorage.customerPhone);
    $('#serviceRequest').val(appointmentLocalStorage.serviceRequest);
    $('#carPlate').val(appointmentLocalStorage.carPlate);
    $('#carMake').val(appointmentLocalStorage.carMake);
    $('#carModel').val(appointmentLocalStorage.carModel);
    $('#customerNotes').val(appointmentLocalStorage.customerNotes);
  }
});


$('#clearDetails').on('click', function () {
  $('#customerEmail').val('');
  $('#customerPhone').val('');
  $('#serviceRequest').val(0);
  $('#carPlate').val('');
  $('#carMake').val('');
  $('#carModel').val('');
  $('#customerNotes').val('');
  localStorage.removeItem("tempAppointmentForm");
});


$('#buttonNext').on('click', function () {
  var detailsObj = {};
  if (
    $('#customerEmail').val().trim().length === 0 || $('#customerPhone').val().trim().length === 0 || $('#serviceRequest').val() === "0" ||
    $('#carPlate').val().trim().length === 0 || $('#carMake').val().trim().length === 0 || $('#carModel').val().trim().length === 0
  ) {
    $('#step1Warning').removeClass('d-none');
  } else {
    detailsObj.customerEmail = $('#customerEmail').val().trim();
    detailsObj.customerPhone = $('#customerPhone').val().trim();
    detailsObj.serviceRequest = $('#serviceRequest').val().trim();
    detailsObj.carPlate = $('#carPlate').val().trim();
    detailsObj.carMake = $('#carMake').val().trim();
    detailsObj.carModel = $('#carModel').val().trim();
    detailsObj.customerNotes = $('#customerNotes').val().trim() || "";
    localStorage.setItem("tempAppointmentForm", JSON.stringify(detailsObj));
    console.log('to set 2');
    window.location.href = "/appointment-finder";
  }
});

$('#customerEmail, #customerPhone, #serviceRequest, #carPlate, #carMake, #carModel').on("input", function () {
  $('#step1Warning').addClass('d-none');
  if ($(this).val().trim().length === 0 || ($(this).attr('id') === "serviceRequest" && $(this).val() === "0")) {
    $(this).addClass("border-danger");
  } else {
    $(this).removeClass("border-danger");
  }
});
// $('#customerEmail, #customerPhone, #serviceRequest, #carPlate, #carMake, #carModel').on("click", function (e) {
//   $(this).removeClass("border-danger");
// });