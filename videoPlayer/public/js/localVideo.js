$(".localVideoFile").change(function (evt) {
    console.log("hello");
    console.log("hello");
    var fileUrl = window.URL.createObjectURL(this.files[0]);
    $("#videoPlayer").attr("src", fileUrl);
});

