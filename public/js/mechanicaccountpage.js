var credentials = JSON.parse(localStorage.getItem("credentials"));

$(document).ready(function () {
  if (credentials) {
    $('#logout').removeClass('d-none');
    $('#logout').on('click', function () {
      localStorage.removeItem("credentials");
      window.location.replace("/");
    });
  }
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
    $('updateAccountForm').on('submit', function (e) {
      e.preventDefault();
      console.log(
        $('#updateMechanicShopName').val(),
        $('#updateMechanicCount').val(),
        $('#updateMechanicEmail').val(),
        $('#updateMechanicPhone').val(),
        $('#updateMechanicAddress').val(),
        $('#updateMechanicCity').val(),
        $('#updateMechanicState').val(),
        $('#updateMechanicPostcode').val()
      );
    });
  });


  /**
   * updateMechanicShopName
   * updateMechanicCount
   * updateMechanicEmail
   * updateMechanicPhone
   * updateMechanicAddress
   * updateMechanicCity
   * updateMechanicState
   * updateMechanicPostcode
   * updateAccountForm
   */
});
