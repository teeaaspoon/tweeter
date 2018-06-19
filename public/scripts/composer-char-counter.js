$(document).ready(function() {
    const counter = $(".new-tweet form .counter")[0];
    $(".new-tweet form textarea").on("input", function() {
        const textareaLength = $(".new-tweet form textarea").val().length;
        counter.innerHTML = 140 - textareaLength;
        if (counter.innerHTML < 0) {
            $(counter).css("color", "red");
        } else {
            $(counter).css("color", "#244751");
        }
    });
});
