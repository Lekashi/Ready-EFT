var totalSeconds = 0;
let timerVariable;
var checkLsArr = [true]
let checker = arr => arr.every(Boolean);
var btnIndex = 9;
startRaidBtn(false);

// This for loop is for checking if all the checklist items are green || true

for (let i = 1; i < btnIndex; i++) {
    checkLsArr[i] = false;
    $(`#checklistitem${i}`).click(function (event) {
        var idClicked = event.target.id;
        if ($(`#${idClicked}`).hasClass("btn btn-outline-danger mb-2") === true) {
            $(`#${idClicked}`).removeClass("btn btn-outline-danger mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-success mb-2");
            checkLsArr[i] = true;
            startRaidBtn(checker(checkLsArr));
        } else {
            $(`#${idClicked}`).removeClass("btn btn-outline-success mb-2");
            $(`#${idClicked}`).addClass("btn btn-outline-danger mb-2");
            checkLsArr[i] = false;
            startRaidBtn(checker(checkLsArr));
        }
    });
};


// startRaidBtn function is for showing the 

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
    timerVariable = setInterval(raidTimer, 1000);
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#startMatchBtn').delay(1).fadeOut('fast');
    });
    $("#raidReset").click(function () {
        resetJs();
    });
    raidTimer();
}

function raidTimer() {
    console.log(totalSeconds);
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
    document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}

function resetJs() {
    console.log("reset started");
    for (let i = 1; i < btnIndex; i++) {
        $(`#checklistitem${i}`).removeClass("btn btn-outline-success mb-2");
        $(`#checklistitem${i}`).addClass("btn btn-outline-danger mb-2");
        checkLsArr[i] = false;
    }
    console.log(totalSeconds);
    clearInterval(timerVariable);
    console.log("cleared interval");
    $(document).ready(function () {
        $('#raidTime').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeIn('fast');
    });
    document.getElementById("count_up_timer").innerHTML = 0;
    totalSeconds = 0;
    timerVariable = null;
}