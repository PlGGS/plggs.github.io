var page = window.location.href;

$.get("/sites/"+page+".html", function(data) {
    $(function() {
        $("div.content").html(data);
    })
})