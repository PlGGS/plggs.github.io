var page = window.location.hash.substr(0);

$.get("/sites/"+page+".html", function(data) {
    $(function() {
        $("div.content").html(data);
    })
})