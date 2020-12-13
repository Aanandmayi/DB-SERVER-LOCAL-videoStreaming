
const baseUrl = window.location.origin;
//FILES LIST FROM THE SERVER FILE SYSTEM
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


//display video player from server FILE SYSTEM
$(".serverVideoList").click((evt) => {
    console.log(evt);
    var src = baseUrl + "/streamLocalVideo?search=" + evt.target.innerHTML;
    var ele =
        '<video class="serverVideoelement" width="650" controls autoplay loop>' +
        '<source src=' + src + ' accept = "video/mp4,video/x-matroska" /> '
    '</video>';
    $(".serverVideo").append(ele);
})


//display list of all the video from database
getListFromDatabase = () => {
    console.log("hello");
    const ListURL = baseUrl + "/databaseFileName"
    $.get(ListURL, (data, status) => {
        console.log("status got it");
        $(".databaseVideoList").append("<ul></ul>")
        for (var i in data) {
            $("ul").append("<li>" + data[i].filename + "</li>")
        }
    })
}

//display video player from the database
$(".databaseVideoList").click((evt) => {
    console.log(evt);
    var src = baseUrl + "/streamLocalVideo?search=" + evt.target.innerHTML;
    var ele =
        '<video class="databaseVideoelement" width="650" controls autoplay loop>' +
        '<source src=' + src + ' accept = "video/mp4,video/x-matroska" /> '
    '</video>';
    $(".databaseVideo").append(ele);
})