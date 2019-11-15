var credentials;


$('#logout').removeClass('d-none');
$('#logout').on('click', function () {
    localStorage.removeItem("credentials");
    window.location.replace("/");
});
var currentDate;

function toTitleCase(str) {
    str = str.split(' ')
        .map(function (s) {
            return s.charAt(0).toUpperCase() + s.substring(1)
        })
        .join(' ');
    return str;
  };
//NOTE: toTitleCase function is credited to Stack Overflow (https://stackoverflow.com/questions/5086390/jquery-title-case)

function currentDate() {
    currentDate = moment().format("YYYY-MM-DD");
    $("#selectedMechanicDate").val(currentDate);
    renderTable();
};

function renderTable() {
    $("#scheduleBody").empty();
    var mechanicID = credentials.mechanic_centre_id;
    var scheduleDate = $("#selectedMechanicDate").val();
    var timeSlots;

    $.ajax({
        type: "POST",
        url: "/api/viewmechaniccentreappointments",
        data: credentials
    }).done(function (data) {
        console.log("##########################", data);
        var appointments = [];
        data.forEach(function (appointment) {
            appointments.push(appointment);
        });

        //console.log(appointments);

        $.get("api/mechaniccentreordinaryhours/" + mechanicID + "/" + scheduleDate, function (data) {
            timeslots = data;

            for (i = 0; i < timeslots.length; i++) {
                var bookedAppointments = 0;
                var tableDataClass;
                appointments.forEach(function (appointment) {
                    console.log(moment(appointment.appointment_date).format("YYYY-MM-DD"));
                    console.log(timeslots[i].slotDate);
                    if (moment(appointment.appointment_date).format("YYYY-MM-DD") == timeslots[i].slotDate && moment(appointment.appointment_time, "HH:mm:ss") >= moment(timeslots[i].startTime, "HH:mm:ss") && moment(appointment.appointment_time, "HH:mm:ss") < moment(timeslots[i].endTime, "HH:mm:ss")) {
                        bookedAppointments += 1;
                    }
                });
                if (bookedAppointments > 0) {
                    tableDataClass = "bg-warning timeslot"
                } else {
                    tableDataClass = "table-success timeslot"
                };
                var tableRow = `<tr>`;
                var tableRowTitle = `<th scope="row">` + moment(timeslots[i].startTime, "HH:mm:ss").format("hh:mm A") + `</th>`;
                var tableRowData = `<td class="` + tableDataClass + `" data-date = "` + timeslots[i].slotDate + `" data-starttime="` + timeslots[i].startTime + `" data-endTime="` + timeslots[i].endTime + `">` + bookedAppointments + ` appointment(s)</td></tr>`;
                tableRow += tableRowTitle;
                tableRow += tableRowData;
                $("#scheduleBody").append(tableRow);
            };
        });
    });
};

function renderApptDetails() {
    $(".appointmentDetails").empty();
    var slotStart = moment($(this).attr("data-starttime"), "HH:mm:ss");
    var slotEnd = moment($(this).attr("data-endtime"), "HH:mm:ss");
    var slotDate = $(this).attr("data-date");
    $.ajax({
        type: "POST",
        url: "/api/viewmechaniccentreappointments",
        data: credentials
    }).done(function (data) {
        var appointments = [];
        data.forEach(function (appointment) {
            var appointmentDate = moment(appointment.appointment_date).format("YYYY-MM-DD");
            var appointmentTime = moment(appointment.appointment_time, "HH:mm:ss");
            if (appointmentDate == slotDate && appointmentTime >= slotStart && appointmentTime < slotEnd) {
                appointments.push(appointment);
            };
        });
        var selectedTime = '<h4>' + moment(slotStart).format("hh:mm A") + '</h5>';
        $(".appointmentDetails").append(selectedTime);
        console.log(appointments);
        if (appointments.length === 0) {
            var cardClass = '<div class="card mb-1"><div class="card-body">';
            var cardEmail = '';
            $(".appointmentDetails").append(`
                <div class="card mb-1">
                    <div class="card-body">
                        <p class="card-text m-0 text-muted"><i>No appointments at this time</i></p>
                    </div>
                </div>`);
        } else {
            appointments.forEach(function (appointments) {
                var cardClass = '<div class="card mb-1"><div class="card-body">';
                var cardTitle = '<h5 class="card-title">' + appointments.car_brand.toUpperCase() + " " + appointments.car_model.toUpperCase() + '</h5>';
                var cardMessage = '<p class="card-text m-0" style="font-style:italic;">"' + appointments.additional_notes + '"</p>';
                var cardService = '<p class="card-text m-0"><strong>Service: </strong> ' + toTitleCase(appointments.service_name) + '</p>';
                var cardPlate = '<p class="card-text m-0"><strong>Plate #: </strong> ' + appointments.car_plate + '</p>';
                var cardPhone = '<p class="card-text m-0"><strong>Phone: </strong> ' + appointments.phone + '</p>';
                var cardEmail = '<p class="card-text m-0"><strong>Email: </strong> ' + appointments.email + '</p>';
                //var cardButton = '<button type="button" class="btn btn-primary apptDetailsBtn" data-toggle="modal" data-target="#exampleModal">Details</button>';
                cardClass += cardTitle;
                cardClass += cardMessage;
                cardClass += cardService;
                cardClass += cardPlate;
                cardClass += cardPhone;
                cardClass += cardEmail;
                $(".appointmentDetails").append(cardClass);
            });
        }
    });
};

$("body").on("click", ".timeslot", renderApptDetails);
$("body").on("click", ".apptDetailsBtn", function () {
    $("#exampleModal").attr("style", "display:show");
});
$("#newDateBtn").on("click", renderTable);
window.onload = runOnLoad;




function runOnLoad() {
    credentials = JSON.parse(localStorage.getItem("credentials"));

    if (!credentials) {
        window.location.replace("/404");
    }
    $.ajax({
        type: 'get',
        url: "/api/mechaniccentres/" + credentials.mechanic_centre_id
    }).done(function (data) {
        $('#mechanicCentreName').html(toTitleCase(data.centre_name));
    });
    currentDate();

}