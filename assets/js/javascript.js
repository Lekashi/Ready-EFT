var totalSeconds = 0;
let timerVariable;
var deployTime;
var btnIndex = 9;
var oldLocItem = JSON.parse(localStorage.getItem("raids"));
var checkLsArr = [true];
let checker = arr => arr.every(Boolean);
init();
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
    statDeadBtn();
});
$("#raidStatLive").click(function () {
    statLiveBtn();
});
$("#raidDeploying").click(function () {
    deployingBtn();
});
$("#raidReset").click(function () {
    resetMatchmake();
});

// Start the raid timer function

function raidTimer() {
    timerVariable = setInterval(function () {
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

function resetMatchmake() {
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

function statDeadBtn() {
    for (let i = 1; i < btnIndex; i++) {
        $(`#checklistitem${i}`).removeClass("btn btn-outline-success mb-2");
        $(`#checklistitem${i}`).addClass("btn btn-outline-danger mb-2");
        checkLsArr[i] = false;
    }
    var dlStat = false;
    raidTimeDisplay(dlStat, totalSeconds);
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

function statLiveBtn() {
    for (let i = 1; i < btnIndex; i++) {
        $(`#checklistitem${i}`).removeClass("btn btn-outline-success mb-2");
        $(`#checklistitem${i}`).addClass("btn btn-outline-danger mb-2");
        checkLsArr[i] = false;
    }
    var dlStat = true;
    raidTimeDisplay(dlStat, totalSeconds);
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

function raidTimeDisplay(res, time) {
    var hour = Math.floor(time / 3600);
    var minute = Math.floor((time - hour * 3600) / 60);
    var seconds = time - (hour * 3600 + minute * 60);
    var raidTime = `${hour}:${minute}:${seconds}`
    locStore(res, time);
    if (res === true) {
        $("#timeOfRaid").text(`Time of extract ${raidTime}`);
    } else {
        $("#timeOfRaid").text(`Time of death ${raidTime}`);
    }
}

function deployingBtn() {
    $(document).ready(function () {
        $('#raidDeploying').delay(1).fadeOut('fast');
    });
    $(document).ready(function () {
        $('#raidReset').delay(1).fadeOut('fast');
    });
    deployTime = totalSeconds;
    deployTimeDisplay(deployTime);
}

function deployTimeDisplay(res) {
    if (res === null) {
        $("#deployingTime").hide();
    } else {
        var hour = Math.floor(res / 3600);
        var minute = Math.floor((res - hour * 3600) / 60);
        var seconds = res - (hour * 3600 + minute * 60);
        deployTime = `${hour}:${minute}:${seconds}`;
        $("#deployingTime").text(`Deploy Time ${deployTime}`);
    }
}

function locStore(res, time) {
    var newLocItem =  {res, time, deployTime};
    oldLocItem = [ ...oldLocItem, newLocItem ];
    console.log("set item to localstorage");
    console.log(oldLocItem);
    localStorage.setItem('raids', JSON.stringify(oldLocItem));
}

function init() {
    console.log(oldLocItem);
    if (oldLocItem === null) {
        console.log("local storage is empty");
        oldLocItem = [];
        return;
    } else {
        var hour = Math.floor(oldLocItem[oldLocItem.length - 1].time / 3600);
        var minute = Math.floor((oldLocItem[oldLocItem.length - 1].time - hour * 3600) / 60);
        var seconds = oldLocItem[oldLocItem.length - 1].time - (hour * 3600 + minute * 60)
        var locTime = `${hour}:${minute}:${seconds}`;
        console.log(oldLocItem[oldLocItem.length - 1]);
        $("#deployingTime").text(`Deploy Time ${oldLocItem[oldLocItem.length - 1].deployTime}`);
        if (oldLocItem[oldLocItem.length - 1].res === true) {
            $("#timeOfRaid").text(`Time of extract ${locTime}`);
        } else {
            $("#timeOfRaid").text(`Time of death ${locTime}`);
        }
    }
}

$("#carouselExampleFade").hide();


$("#toggleMapBtn").click(function () {
    $("#carouselExampleFade").toggle('slow', function () { })
});

