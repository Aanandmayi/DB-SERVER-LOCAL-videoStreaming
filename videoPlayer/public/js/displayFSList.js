
const baseUrl = window.location.origin;
getFileList = () => {
    console.log("hello");
    const ListURL = baseUrl + "/getVideoListInServer"
    $.get(ListURL, (data, status) => {
        console.log("status got it");
        $(".serverVideoList").append("<ul></ul>")
        for (var i in data) {
            $("ul").append("<li>" + data[i] + "</li>")
        }
    })
}


//play video from server
$(".serverVideoList").click((evt) => {
    console.log(evt);
    var src = baseUrl + "/streamLocalVideo?search=" + evt.target.innerHTML;
    var ele =
        '<video class="serverVideoelement" width="650" controls autoplay loop>' +
        '<source src=' + src + ' accept = "video/mp4,video/x-matroska" /> '
    '</video>';
    $(".serverVideo").append(ele);

})