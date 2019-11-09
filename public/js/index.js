var $createNewAccount = $("#createNewAccountBtn");
var $updateAccount = $("#updateAccountBtn");

$(".timeslot").on("click", function () {
  console.log("Test");
  var date = $("#selectedMechanicDate").val()
  var time = $(this).attr("data-time");
  console.log(date);
  console.log(time);
});

$(".mechanicBtn").on("click", function () {
  window.location.href = "login";
});

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  createAccount: function(newAccount) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/mechaniccentres",
      data: JSON.stringify(newAccount)
    });
  },
  updateAccount: function(updateAccount) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/api/mechaniccentres/" + updateAccount.id,
      data: JSON.stringify(updateAccount)
    });
  }
  /*
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }*/
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

var handleCreateAccountSubmit = function(event) {
  event.preventDefault();

  var newAccount = {
    name: $("#mechanicShopName").val().trim(),
    mechanicCount: $("#mechanicCount").val(),
    email: $("#mechanicEmail").val().trim(),
    phone: $("#mechanicPhone").val().trim(),
    password: $("#newMechanicPW").val().trim(),
    confirmPassword: $("#newMechanicPWConfirm").val().trim(),
    address1: $("#mechanicAddress").val().trim(),
    address2: $("#mechanicAddress2").val().trim(),
    city: $("#mechanicCity").val().trim(),
    state: $("#mechanicState").val().trim(),
    postcode: $("#mechanicPostcode").val().trim()
  };

  if (!newAccount.name || !newAccount.mechanicCount || !newAccount.email || !newAccount.phone || !newAccount.password || !newAccount.confirmPassword || !newAccount.address1 || !newAccount.city || !newAccount.postcode || !newAccount.state || newAccount.state === "Choose...") {
    alert("You haven't completed all the fields");
    return;
  } else if (newAccount.mechanicCount < 1) {
    alert("Mechanic count must be at least 1")
    return;
  } else if (newAccount.password !== newAccount.confirmPassword) {
    alert("Passwords don't match. Please enter new password.");
    $("#newMechanicPW").val("");
    $("#newMechanicPWConfirm").val("");
    return;
  }

  API.createAccount(newAccount).then(function () {
    console.log("createAccount response received");
  });

  window.location.href = "schedule";
};

var handleUpdateAccountSubmit = function(event) {
  event.preventDefault();

  var updateAccount = {
    id: $("#updateAccountForm").attr("data-accountID"),
    name: $("#updateMechanicShopName").val().trim(),
    mechanicCount: $("#updateMechanicCount").val(),
    email: $("#updateMechanicEmail").val().trim(),
    phone: $("#updateMechanicPhone").val().trim(),
    address1: $("#updateMechanicAddress").val().trim(),
    address2: $("#updateMechanicAddress2").val().trim(),
    city: $("#updateMechanicCity").val().trim(),
    state: $("#updateMechanicState").val().trim(),
    postcode: $("#updateMechanicPostcode").val().trim()
  };

  if (!updateAccount.name || !updateAccount.mechanicCount || !updateAccount.email || !updateAccount.phone || !updateAccount.address1 || !updateAccount.city || !updateAccount.postcode || !updateAccount.state || updateAccount.state === "Choose...") {
    alert("You haven't completed all the fields");
    return;
  } else if (updateAccount.mechanicCount < 1) {
    alert("Mechanic count must be at least 1");
    return;
  }

  API.updateAccount(updateAccount).then(function() {
    console.log("updateAccount response received");
  });
};

$updateAccount.on("click", handleUpdateAccountSubmit);
$createNewAccount.on("click", handleCreateAccountSubmit);

$(".customerButton").on("click", function (event) {
  alert("hello");
});

$(".mechanicButton").on("click", function (event) {
  alert("hi");
});
