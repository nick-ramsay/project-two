var appointmentLocalStorage;
var mechanicSelected;
var selectedDay;
$(document).ready(function () {
  appointmentLocalStorage = JSON.parse(localStorage.getItem("tempAppointmentForm"));
  if (!appointmentLocalStorage) {
    window.location.replace("/appointment");
  }
  // console.log(appointmentLocalStorage);
});


$('#locationForm').on('submit', function (e) {
  e.preventDefault();
  var location = $(this).find('#locationInput').val().trim();
  if (location.length !== 0) {
    $.ajax({
      type: 'get',
      url: '/api/mechaniccentresfilter?serviceid=' + appointmentLocalStorage.serviceRequest + '&metres=5000&location=' + location
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
          <button data-mechanicid="${curr.mechanic_centre_id}" data-index="${i}" class="card bg-white w-100 p-3" data-toggle="modal" data-target="#mechanicModal">
          <p style="font-size: 1.2rem;"><b>${toTitleCase(curr.centre_name)}</b></p>
          <p class="mb-0 text-muted">Phone: ${curr.phone}</p>
          <p class="mb-0 text-muted">${curr.address_street}, ${curr.address_city}</p>
          <p class="mb-0 text-muted">${curr.address_state}, ${curr.address_postcode}</p>
          <p class="mb-0"><b>${(curr.distance_metres / 1000).toFixed(1)}</b> km away</p>
          </button>
          `);
          var col = $(`
            <div class="col-12 my-2"></div>
          `);
          col.append(button);          
          $('#mechanicCentresList').append(col);
          button.on('click', function(e) {
            // console.log($(this).attr('data-index'));
            mechanicSelected = data.mechanics[Number($(this).attr('data-index'))];
            // console.log(mechanicSelected);
            $('#modalMechanicName').text(toTitleCase(mechanicSelected.centre_name));
            $('#modalPhone').text('Phone: ' + mechanicSelected.phone);
            $('#modalAddress1').text(mechanicSelected.address_street + ' ' +mechanicSelected.address_city);
            $('#modalAddress2').text(mechanicSelected.address_state + ', ' + mechanicSelected.address_postcode);
            $('#modalDistance').text(mechanicSelected.distance_metres + ' metres away');
            $.ajax({
              type: 'get',
              url: '/api/appointmentscount/' + mechanicSelected.mechanic_centre_id
            }).done(function(results) {
              //
              // console.log('####', results);
              renderTable(results);
            });
          });
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



function renderTable(counts) {
  // var mechanicSelected;
  // find earliest start time

  var startTimes = [mechanicSelected.mon_start, mechanicSelected.tue_start, mechanicSelected.wed_start, mechanicSelected.tue_start, mechanicSelected.fri_start, mechanicSelected.sat_start, mechanicSelected.sun_start];
  var endTimes = [mechanicSelected.mon_end, mechanicSelected.tue_end, mechanicSelected.wed_end, mechanicSelected.tue_end, mechanicSelected.fri_end, mechanicSelected.sat_end, mechanicSelected.sun_end];

  var currTime = new moment();
  var tomorrowIndex = Number(currTime.format('d')) + 1;
  if (tomorrowIndex === 7) {
    tomorrowIndex = 0
  }
  var tomorrow = currTime.add(1, 'day');
  // console.log(Number(currTime.format('d')) + 1);

  var earliestTime = startTimes[tomorrowIndex];
  var latestTime = endTimes[tomorrowIndex];
  // console.log(tomorrowIndex);

  earliestTime = new moment(earliestTime, "LTS");
  latestTime = new moment(latestTime, "LTS");
  var time = earliestTime;

  $('#allTimes').empty();
  $('#allTimes').append(`<span></span>`);
  $('#day').empty();
  $('#day').append(`<span class="border">${tomorrow.format('ddd D MMM YYYY')}</span>`);
  // console.log(counts);
  while (time < latestTime) {
    $('#allTimes').append(`<span>${time.format("HH:mm")}</span>`);
    // console.log(tomorrow.format('YYYY-MM-DD') + ' ' + time.format("HH:mm:ss"));

    var button = $(`<button data-datetime="${tomorrow.format('YYYY-MM-DD') + ' ' + time.format("HH:mm:ss")}">Available</button>`);
    $('#day').append(button);
    time.add(30, "minutes");
    button.on('click', function() {
      selectedDay = $(this).attr('data-datetime');
      // console.log(selectedDay);
      $('#day').find('button').removeClass('selected');
      $(this).addClass('selected');
    });

    var timeslot = tomorrow.format('YYYY-MM-DD') + ' ' + time.format("HH:mm:ss");
    if (timeslot === counts[0].appointment_datetime && mechanicSelected.employee_count === counts[0].count) {
      // console.log(timeslot);
      button.attr('disabled', true);
      button.addClass('disabled');
      button.text('Full');
    }
  }
}


$('#bookAppointment').on('click', function() {
  console.log(appointmentLocalStorage);
  console.log(mechanicSelected);
  console.log(selectedDay);
  var time = new moment(selectedDay);
  var appointmentObj = {
    mechanic_centre_id: mechanicSelected.mechanic_centre_id,
    service_id: appointmentLocalStorage.serviceRequest,
    appointment_date: time.format("YYYY-MM-DD"),
    appointment_time: time.format("HH:mm:ss"),
    appointment_datetime: selectedDay,
    phone: appointmentLocalStorage.customerPhone,
    email: appointmentLocalStorage.customerEmail,
    car_plate: appointmentLocalStorage.carPlate,
    car_brand: appointmentLocalStorage.carMake,
    car_model: appointmentLocalStorage.carModel,
    additional_notes: appointmentLocalStorage.customerNotes,
  }
  console.log(appointmentObj);
  $.ajax({
    type: 'post',
    url: '/api/appointments',
    data: appointmentObj
  }).done(function(data) {
    localStorage.removeItem("tempAppointmentForm");
    window.location.href = "/";
  });
});

function toTitleCase(str) {
  str = str.split(' ')
    .map(function (s) {
      return s.charAt(0).toUpperCase() + s.substring(1)
    })
    .join(' ');
  return str;
};
//NOTE: toTitleCase function is credited to Stack Overflow (https://stackoverflow.com/questions/5086390/jquery-title-case)