var page = window.location.hash;

$.get("/sites/"+page+".html", function(data) {
    $(function() {
        $("div.content").html(data);
    })
})