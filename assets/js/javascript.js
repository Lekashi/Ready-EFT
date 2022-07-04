setInterval(currentTime, 1000);

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}

for (let i = 1; i < 9; i++) {   
    $(`#checklistitem${i}`).click(function(event) {
        var idClicked = event.target.id;
        if ($(`#${idClicked}`).hasClass("btn btn-outline-danger mb-2") === true) {
            $(`#${idClicked}`).removeClass("btn btn-outline-danger mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-success mb-2");
        } else {
            $(`#${idClicked}`).removeClass("btn btn-outline-success mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-danger mb-2");
        }
      });
}