$(document).ready(function () {
    $("#customerForm").on("click", function (event) {
        event.preventDefault();
        var mechInput = $(this).serialize();
        $.ajax({
            type: "PUT",
            url: "api/forms",
            data: mechInput
        }).then(function (res) {
            console.log(res);
            window.location.href = "recmechanic/" + res.insertId;  
        });     
    });
});