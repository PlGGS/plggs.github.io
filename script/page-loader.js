---
---
$(function() {
    window.onhashchange = function() {
        //console.log(window.location.hash)
        history.pushState({page:window.location.hash}, $("head title").text(), window.location.hash);
        window.location.reload();
    }
})
var page = window.location.hash.substr(1);
page = (page)?page:"home";

//console.log(page)

$.get("/sites/"+page+".html", function(data) {
    console.log(data)
    if(data.indexOf("[TITLE]") != -1) {
        var title = data.substring(data.indexOf("[TITLE]")+7, data.indexOf("[/TITLE]"));
    }
    $(function() {
        $("head title").text((title)?title:(page.split("/")[page.split("/").length-1].capitalize() + " - Blake Boris"))
        $("div.content").html(data);
    })
})