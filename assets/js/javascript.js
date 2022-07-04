var totalSeconds = 0;
var timerVariable = setInterval(raidTimer, 1000);
var checkLsArr = [true]
let checker = arr => arr.every(Boolean);
var btnIndex = 9;
startRaidBtn(false);


for (let i = 1; i < btnIndex; i++) {
    checkLsArr[i] = false;
    $(`#checklistitem${i}`).click(function (event) {
        var idClicked = event.target.id;
        if ($(`#${idClicked}`).hasClass("btn btn-outline-danger mb-2") === true) {
            $(`#${idClicked}`).removeClass("btn btn-outline-danger mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-success mb-2");
            checkLsArr[i] = true;
            let checker = arr => arr.every(Boolean);
            startRaidBtn(checker(checkLsArr));
        } else {
            $(`#${idClicked}`).removeClass("btn btn-outline-success mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-danger mb-2");
            checkLsArr[i] = false;
            let checker = arr => arr.every(Boolean);
            startRaidBtn(checker(checkLsArr));
        }
    });
};

function startRaidBtn(res) {
    if (res === true) {
        $(document).ready(function () {
            $('#startMatchBtn').delay(1).fadeIn('fast');
        });
        $("#startMatchBtn").click(function () {
            displayStats();
            $(document).ready(function () {
                $('#raidTime').delay(1).fadeIn('fast');
            });
        });
    } else {
        $(document).ready(function () {
            $('#startMatchBtn').delay(1).fadeOut('fast');
        });
        $(document).ready(function () {
            $('#raidTime').delay(1).fadeOut('fast');
        });
    }
}

function displayStats() {
    alert("Handler for .click() called.");
    raidTimer();
}

function raidTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
    document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

setInterval(currentTime, 1000);

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}