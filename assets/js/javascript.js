var checkLsArr = [true]
let checker = arr => arr.every(Boolean);
var btnIndex = 9;
startRaidUp(false);


for (let i = 1; i < btnIndex; i++) {   
    checkLsArr[i] = false;
    $(`#checklistitem${i}`).click(function(event) {
        var idClicked = event.target.id;
        if ($(`#${idClicked}`).hasClass("btn btn-outline-danger mb-2") === true) {
            $(`#${idClicked}`).removeClass("btn btn-outline-danger mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-success mb-2");
            checkLsArr[i] = true;
            let checker = arr => arr.every(Boolean);
            startRaidUp(checker(checkLsArr));
        } else {
            $(`#${idClicked}`).removeClass("btn btn-outline-success mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-danger mb-2");
            checkLsArr[i] = false;
            let checker = arr => arr.every(Boolean);
            startRaidUp(checker(checkLsArr));
        }
    });
};

function startRaidUp(res) {
    if (res === true) {
        $(document).ready(function() {
            $('#startMatchBtn').delay(1).fadeIn('fast');
        });
        console.log("All boxes green");
    } else {
        $(document).ready(function() {
            $('#startMatchBtn').delay(1).fadeOut('fast');
        });
        console.log("Not All Green boxes");
    }
}

setInterval(currentTime, 1000);

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}