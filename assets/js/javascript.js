var checkLsArr = [true]
let checker = arr => arr.every(Boolean);
var btnIndex = 9;

for (let i = 1; i < btnIndex; i++) {
    checkLsArr[i] = false;
}


for (let i = 1; i < btnIndex; i++) {   
    $(`#checklistitem${i}`).click(function(event) {
        var idClicked = event.target.id;
        if ($(`#${idClicked}`).hasClass("btn btn-outline-danger mb-2") === true) {
            $(`#${idClicked}`).removeClass("btn btn-outline-danger mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-success mb-2");
            checkLsArr[i] = true;
            let checker = arr => arr.every(Boolean);
            console.log(checker(checkLsArr));
        } else {
            $(`#${idClicked}`).removeClass("btn btn-outline-success mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-danger mb-2");
            checkLsArr[i] = false;
            let checker = arr => arr.every(Boolean);
            console.log(checker(checkLsArr));
        }
        console.log(checkLsArr);
    });
};

setInterval(currentTime, 1000);

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}