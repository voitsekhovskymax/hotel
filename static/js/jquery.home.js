// //Ховер для таблицы
$(document).ready(function () {

    $("td").on("mouseover", function () {
        var el = $(this),
            pos = el.index();
        el.parent().find(" td > div").addClass("hover");
        $("td ").filter(":nth-child(" + (pos + 1) + ")").children().addClass("hover");
    }).on("mouseout", function () {
        $("td > div").removeClass("hover");
    });
});
