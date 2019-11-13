$(document).ready(function () {
    $("#customerForm").on("click", function (event) {
        event.preventDefault();
        var formInput = $(this).serialize();
        $.ajax("/api/formrequests", {
            type: "PUT",
            url: "api/forms",
            data: formInput
        }).then(function (res) {
            console.log(res);
            window.location.href = "recmechanic/" + res.insertId;  
        });     
    });
});