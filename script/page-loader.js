---
---
$(function() {
var page = window.location.hash.substr(1);

console.log(page)

$.get("/sites/"+page+".html", function(data) {
    console.log(data)
    $(function() {
        $("div.content").html(data);
    })
})
})