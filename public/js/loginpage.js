var credentials = JSON.parse(localStorage.getItem("credentials"));

if (credentials) {
  window.location.replace("/schedule");
} else {
  $("#mechanicLoginForm").on("submit", function(e) {
    e.preventDefault();
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
          var credentials = {
            username: data[0].user_username,
            password: data[0].user_password,
            mechanic_centre_id: data[0].mechanic_centre_id
          };
          localStorage.setItem("credentials", JSON.stringify(credentials));
          window.location.replace("/schedule");
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
    $("#outcomeMessage").addClass("d-none");
    switch ($(this).attr("id")) {
    case "mechanicUsername":
      if ($("#mechanicUsername").val().trim().length === 0) {
        $("#mechanicUsername").addClass("border-danger");
      } else {
        $("#mechanicUsername").removeClass("border-danger");
      }
      break;
    case "mechanicPassword":
      if ($("#mechanicPassword").val().trim().length === 0) {
        $("#mechanicUsername").addClass("border-danger");
      } else {
        $("#mechanicPassword").removeClass("border-danger");
      }
      break;
    }
  });

}