---
---
$(function() {
    window.onhashchange = function() {
        history.pushState({page:window.location.hash}, $("head title").text(), "#"+window.location.hash);
        window.location.reload();
    }
})
var page = window.location.hash.substr(1);

console.log(page)

$.get("/sites/"+page+".html", function(data) {
    console.log(data)
    $(function() {
        $("div.content").html(data);
    })
})