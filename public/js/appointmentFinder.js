var appointmentLocalStorage;
var mechanicSelected;
$(document).ready(function () {
  appointmentLocalStorage = JSON.parse(localStorage.getItem("tempAppointmentForm"));
  if (!appointmentLocalStorage) {
    window.location.replace("/appointment");
  }
  console.log(appointmentLocalStorage);
});


$('#locationForm').on('submit', function (e) {
  e.preventDefault();
  var location = $(this).find('#locationInput').val().trim();
  if (location.length !== 0) {
    $.ajax({
      type: 'get',
      url: '/api/mechaniccentresfilter?serviceid=' + appointmentLocalStorage.serviceRequest + '&metres=10000&location=' + location
    }).done(function (data) {
      // console.log(data);
      $('#addressOutput').text(data.geography.formatted_address);
      $('#mechanicCentresList').empty();
      // console.log("emptying div")
      if (data.mechanics.length === 0) {
        $('#mechanicCentresList').removeClass('d-none');
        $('#mechanicCentresList').append(`
          <div class="col-12 my-2">
            <p class="text-center m-0">No mechanics found</p>
          </div>
        `);
      } else {
        $('#mechanicCentresList').removeClass('d-none');
        data.mechanics.forEach(function (curr, i, arr) {
          var button = $(`
            <button data-mechanicid="${curr.mechanic_centre_id}" data-index="${i}" class="card bg-white w-100 p-3" data-toggle="modal" data-target="#exampleModalLong">
              <p style="font-size: 1.2rem;"><b>${toTitleCase(curr.centre_name)}</b></p>
              <p class="mb-0 text-muted">Phone: ${curr.phone}</p>
              <p class="mb-0 text-muted">${curr.address_street}, ${curr.address_city}</p>
              <p class="mb-0 text-muted">${curr.address_state}, ${curr.address_postcode}</p>
              <p class="mb-0"><b>${(curr.distance_metres / 1000).toFixed(1)}</b> km away</p>
            </button>
        `);
          $('#mechanicCentresList').append(`
            <div class="col-12 my-2">
              
            </div>
          `);
          //mechanicSelected
        });
      }
    });
  }
});
$('#locationInput').on('input', function () {
  if ($(this).val().trim().length === 0) {
    $('#addressOutput').text('');
  }
});





$('#buttonBack').on('click', function () {
  window.location.href = "/appointment";
});


// $('#buttonNext').on('click', function () {
//   var detailsObj = {};
//   if (
//     $('#customerEmail').val().trim().length === 0 || ('#customerPhone').val().trim().length === 0 || $('#serviceRequest').val() === "0" ||
//     $('#carPlate').val().trim().length === 0 || $('#carMake').val().trim().length === 0 || $('#carModel').val().trim().length === 0
//   ) {
//     $('#step1Warning').removeClass('d-none');
//   } else {
//     detailsObj.customerEmail = $('#customerEmail').val().trim();
//     detailsObj.customerPhone = $('#customerPhone').val().trim();
//     detailsObj.serviceRequest = $('#serviceRequest').val().trim();
//     detailsObj.carPlate = $('#carPlate').val().trim();
//     detailsObj.carMake = $('#carMake').val().trim();
//     detailsObj.carModel = $('#carModel').val().trim();
//     detailsObj.customerNotes = $('#customerNotes').val().trim() || "";
//     localStorage.setItem("tempAppointmentForm", JSON.stringify(detailsObj));
//     console.log('to set 2');
//   }
// });

// $('#customerEmail, #customerPhone, #serviceRequest, #carPlate, #carMake, #carModel').on("input", function () {
//   $('#step1Warning').addClass('d-none');
//   if ($(this).val().trim().length === 0 || ($(this).attr('id') === "serviceRequest" && $(this).val() === "0")) {
//     $(this).addClass("border-danger");
//   } else {
//     $(this).removeClass("border-danger");
//   }
// });




function toTitleCase(str) {
  str = str.split(' ')
      .map(function (s) {
          return s.charAt(0).toUpperCase() + s.substring(1)
      })
      .join(' ');
  return str;
};
//NOTE: toTitleCase function is credited to Stack Overflow (https://stackoverflow.com/questions/5086390/jquery-title-case)