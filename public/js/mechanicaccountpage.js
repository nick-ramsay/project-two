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
      url: '/api/mechaniccentres/' + credentials.mechanic_centre_id
    }).done(function (data) {
      $('#updateMechanicShopName').val(data.centre_name);
      $('#updateMechanicCount').val(data.employee_count);
      $('#updateMechanicEmail').val(data.email);
      $('#updateMechanicPhone').val(data.phone);
      $('#updateMechanicAddress').val(data.address_street);
      $('#updateMechanicCity').val(data.address_city);
      $('#updateMechanicState').val(data.address_state);
      $('#updateMechanicPostcode').val(data.address_postcode);
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