$(document).ready(function () {
    $("#customerForm").on("submit", function (event) {
        event.preventDefault();
        var formInput = $(this).serialize();
        $.ajax("/api/formrequests", {
            type: "POST",
            url: "api/forms",
            data: formInput
        }).then(function (res) {
            console.log(res);
            window.location.href = "recmechanic/" + res.insertId;  
        });     
    });
});
