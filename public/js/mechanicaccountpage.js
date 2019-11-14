var credentials = JSON.parse(localStorage.getItem("credentials"));

$(document).ready(function () {
  if (credentials) {
    $('#logout').removeClass('d-none');
    $('#logout').on('click', function () {
      localStorage.removeItem("credentials");
      window.location.replace("/");
    });
    $.ajax({
      type: 'get',
      url: '/api/mechaniccentresandordinaryhours/' + credentials.mechanic_centre_id
    }).done(function (data) {
      $('#updateMechanicShopName').val(data[0].centre_name);
      $('#updateMechanicCount').val(data[0].employee_count);
      $('#updateMechanicEmail').val(data[0].email);
      $('#updateMechanicPhone').val(data[0].phone);
      $('#updateMechanicAddress').val(data[0].address_street);
      $('#updateMechanicCity').val(data[0].address_city);
      $('#updateMechanicState').val(data[0].address_state);
      $('#updateMechanicPostcode').val(data[0].address_postcode);
      $('#updateMonStartHour').val(data[0].mon_start);
      $('#updateMonEndHour').val(data[0].mon_end);
      $('#updateTueStartHour').val(data[0].tue_start);
      $('#updateTueEndHour').val(data[0].tue_end);
      $('#updateWedStartHour').val(data[0].wed_start);
      $('#updateWedEndHour').val(data[0].wed_end);
      $('#updateThuStartHour').val(data[0].thu_start);
      $('#updateThuEndHour').val(data[0].thu_end);
      $('#updateFriStartHour').val(data[0].fri_start);
      $('#updateFriEndHour').val(data[0].fri_end);
      $('#updateSatStartHour').val(data[0].sat_start);
      $('#updateSatEndHour').val(data[0].sat_end);
      $('#updateSunStartHour').val(data[0].sun_start);
      $('#updateSunEndHour').val(data[0].sun_end);
      $('#updateAccountForm').on('submit', function (e) {
        e.preventDefault();

        var detailsObj = {
          username: credentials.username,
          password: credentials.password,
          name: $("#updateMechanicShopName")
            .val()
            .trim(),
          mechanicCount: $("#updateMechanicCount").val().trim(),
          email: $("#updateMechanicEmail")
            .val()
            .trim(),
          phone: $("#updateMechanicPhone")
            .val()
            .trim(),
          address1: $("#updateMechanicAddress")
            .val()
            .trim(),
          city: $("#updateMechanicCity")
            .val()
            .trim(),
          postcode: $("#updateMechanicPostcode")
            .val()
            .trim(),
          state: $("#updateMechanicState")
            .val()
            .trim()
        };

        if (
          !detailsObj.name ||
        !detailsObj.mechanicCount ||
        !detailsObj.email ||
        !detailsObj.phone ||
        !detailsObj.address1 ||
        !detailsObj.city ||
        !detailsObj.postcode ||
        !detailsObj.state ||
        detailsObj.state === "Choose..."
        ) {
          alert("You haven't completed all the fields");
          return;
        } else if (detailsObj.mechanicCount < 1) {
          alert("Mechanic count must be at least 1");
          return;
        }
        $.ajax({
          type: "put",
          url: "/api/updatemechaniccentre",
          data: detailsObj
        }).done(function () {
          window.location.replace("/account");
        });
      });
    });
  } else {
    window.location.replace("/404");
  }
});
// console.log(
//   $('#updateMechanicShopName').val(),
//   $('#updateMechanicCount').val(),
//   $('#updateMechanicEmail').val(),
//   $('#updateMechanicPhone').val(),
//   $('#updateMechanicAddress').val(),
//   $('#updateMechanicCity').val(),
//   $('#updateMechanicState').val(),
//   $('#updateMechanicPostcode').val()
// );