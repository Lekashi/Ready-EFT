var totalSeconds = 0;
let timerVariable;
var deployTime;
var btnIndex = 9;
var oldLocItem = JSON.parse(localStorage.getItem("raids"));
var checkLsArr = [true];
let checker = arr => arr.every(Boolean);
init();
currentTime();
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
        $('#startMatchBtn').delay(1).fadeIn('fast');
    } else {

        $('#startMatchBtn').delay(1).fadeOut('fast');
        $('#raidTime').delay(1).fadeOut('fast');
    }
}

// event lisnter for the start matchmaking button

$("#startMatchBtn").click(function () {
    raidTimer();
    displayStats();
});

// This function shows the document start raid button that start the timer

function displayStats() {
    $('#checkItems').delay(1).fadeOut('fast');
    $('#raidTime').delay(1).fadeIn('fast');
    $('#startMatchBtn').delay(1).fadeOut('fast');
};

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
    $('#raidTime').delay(1).fadeOut('fast');
    $('#startMatchBtn').delay(1).fadeIn('fast');
    $('#checkItems').delay(1).fadeIn('fast');
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
    $('#raidReset').delay(1).fadeIn('fast');
    $('#raidDeploying').delay(1).fadeIn('fast');
    $('#checkItems').delay(1).fadeIn('fast');
    $('#raidTime').delay(1).fadeOut('fast');
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
    $('#raidDeploying').delay(1).fadeIn('fast');
    $('#raidReset').delay(1).fadeIn('fast');
    $('#raidTime').delay(1).fadeOut('fast');
    $('#checkItems').delay(1).fadeIn('fast');
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
    $('#raidDeploying').delay(1).fadeOut('fast');
    $('#raidReset').delay(1).fadeOut('fast');
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
    var newLocItem = { res, time, deployTime };
    oldLocItem = [...oldLocItem, newLocItem];
    console.log("set item to localstorage");
    console.log(oldLocItem);
    localStorage.setItem('raids', JSON.stringify(oldLocItem))
    updateLast10();
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
        for (let i = 0; i < 10; i++) {
            if (typeof oldLocItem[i] === 'undefined') {
                console.log('oldLocItem showed up undefined');
                return;
            } else {
                console.log(oldLocItem[i]);
                var locHour = Math.floor(oldLocItem[i].time / 3600);
                var locMinute = Math.floor((oldLocItem[i].time - locHour * 3600) / 60);
                var locSeconds = oldLocItem[i].time - (locHour * 3600 + locMinute * 60)
                var last10Time = `${locHour}:${locMinute}:${locSeconds}`;
                console.log(last10Time);
                if (oldLocItem[i].res === true) {
                    if (typeof oldLocItem[i].deployTime === 'undefined') {
                        $(`#lastRaid${i}`).text(`Time of extract ${last10Time}`);
                    } else {
                        $(`#lastRaid${i}`).text(`Time of extract ${last10Time}, MatchMake Time ${oldLocItem[i].deployTime}`);
                    }
                } else {
                    if (typeof oldLocItem[i].deployTime === 'undefined') {
                        $(`#lastRaid${i}`).text(`Time of death ${last10Time}`);
                    } else {
                        $(`#lastRaid${i}`).text(`Time of death ${last10Time}, MatchMake Time ${oldLocItem[i].deployTime}`);
                    }
                }
            }
        }
    }
}

function updateLast10() {
    for (let i = 0; i < 10; i++) {
        if (typeof oldLocItem[i] === 'undefined') {
            console.log('oldLocItem showed up undefined');
            return;
        } else {
            console.log(oldLocItem[i]);
            var locHour = Math.floor(oldLocItem[i].time / 3600);
            var locMinute = Math.floor((oldLocItem[i].time - locHour * 3600) / 60);
            var locSeconds = oldLocItem[i].time - (locHour * 3600 + locMinute * 60)
            var last10Time = `${locHour}:${locMinute}:${locSeconds}`;
            console.log(last10Time);
            if (oldLocItem[i].res === true) {
                if (typeof oldLocItem[i].deployTime === 'undefined') {
                    $(`#lastRaid${i}`).text(`Time of extract ${last10Time}`);
                } else {
                    $(`#lastRaid${i}`).text(`Time of extract ${last10Time}, MatchMake Time ${oldLocItem[i].deployTime}`);
                }
            } else {
                if (typeof oldLocItem[i].deployTime === 'undefined') {
                    $(`#lastRaid${i}`).text(`Time of death ${last10Time}`);
                } else {
                    $(`#lastRaid${i}`).text(`Time of death ${last10Time}, MatchMake Time ${oldLocItem[i].deployTime}`);
                }
            }
        }
    }
}

$("#carouselExampleFade").hide();

$("#toggleMapBtn").click(function () {
    $("#carouselExampleFade").toggle('slow', function () { })
});
