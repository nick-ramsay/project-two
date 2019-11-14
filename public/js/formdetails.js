$(document).ready(function () {
    $("#customerForm").on("submit", function (event) {
        event.preventDefault();

        var formInput = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/appointment",
            data: formInput
        }).then(function (res) {
            console.log(res);
            window.location.href = "recmechanic/" + res.id;  
        });     
    });
});
