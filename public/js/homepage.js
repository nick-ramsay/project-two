// $("#buttonCustomerStart").on("click", function() {
//     page
// });
// $("#buttonMechanicStart").on("click", function() {

// });
var credentials = JSON.parse(localStorage.getItem("credentials"));

if (credentials) {
  $('#mechanicPortal').attr('href', "/schedule");
}