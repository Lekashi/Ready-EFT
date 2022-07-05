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


// startRaidBtn function is for checking if you have all checkboxes are red showing 

function startRaidBtn(res) {
    if (res === true) {
        $(document).ready(function () {
            $('#startMatchBtn').delay(1).fadeIn('fast');
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

// event lisnter for the start matchmaking button

$("#startMatchBtn").click(function () {
   raidTimer();
   displayStats();
});

// This function shows the document start raid button that start the timer

function displayStats() {
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeOut('fast');
        $(document).ready(function () {
            $('#raidTime').delay(1).fadeIn('fast');
        });
    });
    $(document).ready(function () {
        $('#startMatchBtn').delay(1).fadeOut('fast');
    });
}

// Event listner for after the timer started

$("#raidStatDead").click(function () {
    statDead();
});
$("#raidStatLive").click(function () {
    statLive();
});
$("#raidDeploying").click(function () {
    deployingBtn();
});
$("#raidReset").click(function () {
    resetJs();
});

// Start the raid timer function

function raidTimer() {
    timerVariable = setInterval(function() {
        console.log(totalSeconds);
        ++totalSeconds;
        var hour = Math.floor(totalSeconds / 3600);
        var minute = Math.floor((totalSeconds - hour * 3600) / 60);
        var seconds = totalSeconds - (hour * 3600 + minute * 60);
        document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
    }, 1000);
}

function currentTime() {
    var displayedTime = moment().format("LTS");
    $("#currentTime").text(displayedTime);
}

function resetJs() {
    console.log("reset started");
    clearInterval(timerVariable);
    $(document).ready(function () {
        $('#raidTime').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#startMatchBtn').delay(1).fadeIn('fast');
    });
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeIn('fast');
    });
    document.getElementById("count_up_timer").innerHTML = "0:0:0";
    totalSeconds = 0;
}

function statDead() {
    console.log("statDead started");
    for (let i = 1; i < btnIndex; i++) {
        $(`#checklistitem${i}`).removeClass("btn btn-outline-success mb-2");
        $(`#checklistitem${i}`).addClass("btn btn-outline-danger mb-2");
        checkLsArr[i] = false;
    }
    clearInterval(timerVariable);
    $(document).ready(function () {
        $('#raidReset').delay(1).fadeIn('fast');
    });
    $(document).ready(function () {
        $('#raidDeploying').delay(1).fadeIn('fast');
    });
    $(document).ready(function () {
        $('#raidTime').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeIn('fast');
    });
    document.getElementById("count_up_timer").innerHTML = "0:0:0";
    totalSeconds = 0;
}

function statLive() {
    console.log("statLive started");
    for (let i = 1; i < btnIndex; i++) {
        $(`#checklistitem${i}`).removeClass("btn btn-outline-success mb-2");
        $(`#checklistitem${i}`).addClass("btn btn-outline-danger mb-2");
        checkLsArr[i] = false;
    }
    clearInterval(timerVariable);
    $(document).ready(function () {
        $('#raidDeploying').delay(1).fadeIn('fast');
    });
    $(document).ready(function () {
        $('#raidReset').delay(1).fadeIn('fast');
    });
    $(document).ready(function () {
        $('#raidTime').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#checkItems').delay(1).fadeIn('fast');
    });
    document.getElementById("count_up_timer").innerHTML = "0:0:0";
    totalSeconds = 0;
}

function deployingBtn() {
    console.log("deployingBtn started");
    $(document).ready(function () {
        $('#raidDeploying').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#raidReset').delay(1).fadeOut('fast');
    });
}