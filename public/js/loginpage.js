$("#mechanicLoginForm").on("submit", function(e) {
  e.preventDefault();
  $("#outcomeMessage").addClass("d-none");
  var username = $("#mechanicUsername")
    .val()
    .trim();
  var password = $("#mechanicPassword")
    .val()
    .trim();
  if (username.length !== 0 && password.length !== 0) {
    var testCredentials = {
      username: username,
      password: password
    };
    $.ajax({
      type: "post",
      url: "/api/login",
      data: testCredentials
    }).done(function(data) {
      if (data.length !== 0) {
        console.log(data[0]);
        var credentials = {
          username: data[0].user_username,
          password: data[0].user_password,
          mechanic_centre_id: data[0].mechanic_centre_id
        };
        localStorage.setItem("credentials", JSON.stringify(credentials));
        // console.log(
        //   "localStorage",
        //   JSON.parse(localStorage.getItem("credentials"))
        // );
      } else {
        console.log("no matches found");
        $("#outcomeMessage").removeClass("d-none");
      }
    });
  } else {
    if (username.length === 0) {
      $("#mechanicUsername").addClass("border-danger");
    }
    if (password.length === 0) {
      $("#mechanicPassword").addClass("border-danger");
    }
    console.log("missing field");
  }
});

$("#mechanicUsername, #mechanicPassword").on("input", function() {
  switch ($(this).attr("id")) {
    case "mechanicUsername":
      $("#mechanicUsername").removeClass("border-danger");
      break;
    case "mechanicPassword":
      $("#mechanicPassword").removeClass("border-danger");
      break;
  }
});
