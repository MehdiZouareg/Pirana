checkServer();
checkAllPlants();

$("#server_btn").on("click", function()
{
    checkServer();
})

$(".check-all-button").on("click", function () {
    checkAllPlants();
})

$(".check_btn").on("click", function () {
    var host = $("#host").val();
    checkPlant($(this).attr('plantid'));
})

$(".configure-btn").on("click", function () {
    PlayPauseAudio();
})

$(".confirm-btn").on("click", function () {
    PlayConfirmAudio();
})

$(".close-btn").on("click", function () {
    PlayPauseAudio();
})

$(".nes-radio").on("click", function () {
    PlayMapMoveAudio();
})

$("[id^='water_']").click(function () {
    moveMarioToElem("#plant_img_1")
    makeMarioWater("#plant_img_1")
    makeMarioLeave()
    ResetMario("#plant_img_1")
    PlayWateringAudio()
}); 


$(".water-all-button").click(function () {
    for (let index = 1; index < 5; index++) {
        moveMarioToElem("#plant_img_" + index)
        makeMarioWater("#plant_img_" + index)
    }
    makeMarioLeave()
    ResetMario("#plant_img_1")
    PlayWateringAudio()
}); 

function ResetMario(elem) {
    var position = $(elem).offset();

    $("#mario_img").animate({
        left: 0,
        top: 0,
        opacity: '0',
    }, 0);
}

function moveMarioToElem(elem)
{
    var position = $(elem).offset();

    $("#mario_img").animate({
        left: position.left - 50,
        top: position.top,
        opacity: '1',
        height: '100px',
        width: '100px'
    }, 3000);
}

function makeMarioWater(elem)
{
    $("#mario_img").css({ transform: 'scaleX(1)' })

    for (let index = 0; index < 5; index++) {
        $("#mario_img").animate({
            opacity: '0',
        }, 0);
        $("#mario_img").animate({
            opacity: '1',
        }, 500);
    }    
}

function makeMarioLeave()
{
    $("#mario_img").animate({
        left: $(window).width(),
        top: 0,
        opacity: '0',
        height: '10px',
        width: '10px'
    }, 2000);
}

function checkServer(){
    var host = $("#host").val();
    var myHeaders = new Headers();

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request("http://" + host + "/status", myInit);
    clientLog("Connecting to server");

    fetch(myRequest, myInit).then(function (response) {
        return response.json().then(function (json) {
            // traitement du JSON
            if (json.serverState == "ok")
            {
                $("#server_btn").attr('class', 'nes-btn is-success');
                clientLog("Connected !");
            }
            else
            {
                $("#server_btn").attr('class', 'nes-btn is-warning');
            }
        });
    })
    .catch(function (error) {
        $("#server_btn").attr('class', 'nes-btn is-error');
    });
}


function checkAllPlants()
{
    clientLog("Fetching all plants status");

    for(var i = 1; i <= 4; i++)
    {
        checkPlant(i);
    }
}


function checkPlant(plantId){
    var host = $("#host").val();

    var myHeaders = new Headers();

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request("http://" + host + "/plant_stats/" + plantId, myInit);

    fetch(myRequest, myInit).then(function (response) {
        return response.json().then(function (json) {
            // traitement du JSON
            setProgressBar($('#humidite_' + plantId), json.humidite, json.maxHumidite);
            setProgressBar($('#ensoleillement_' + plantId), json.ensoleillement, json.maxEnsoleillement);
            setProgressBar($('#acidite_' + plantId), json.acidite, json.maxAcidite);
            setAutoIcon(plantId, json.auto);
        });
    })
    .catch(function (error) {
        $("#arduino_btn").attr('class', 'nes-btn is-error');
    });
}

function triggerSprinkle(){

}

function setButtonState(button, state)
{
    button.attr()
}

function clientLog(content)
{
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    $("#logs").prepend("<p>" + time + " " + content + "</p>");
}

function setProgressBar(elem, value, maxValue)
{
    elem.attr('value', value);
}

function setAutoIcon(plantId, value)
{
    $('#auto_' + plantId).attr('class', value ? 'is-error': 'is-dark');
}

function setPlantConfig(plantId)
{
    var host = $("#host").val();

    var myHeaders = new Headers();

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request("http://" + host + "/plant_stats/" + plantId, myInit);

    fetch(myRequest, myInit).then(function (response) {
        return response.json().then(function (json) {
            // traitement du JSON
            setProgressBar($('#humidite_' + plantId), json.humidite, json.maxHumidite);
            setProgressBar($('#ensoleillement_' + plantId), json.ensoleillement, json.maxEnsoleillement);
            setProgressBar($('#acidite_' + plantId), json.acidite, json.maxAcidite);
            setAutoColor(json.autoWatering)
        });
    })
    .catch(function (error) {
        $("#arduino_btn").attr('class', 'nes-btn is-error');
    });
}

function setAutoColor(value)
{
    console.log(value);
    $("#auto_1").attr('class', value ? 'is-error' :'is-dark');
}

//AUDIO
function PlayPauseAudio() {
    var audio = new Audio("/sounds/Pause.wav");
    audio.play();
}

function PlayConfirmAudio() {
    var audio = new Audio("/sounds/Coin.wav");
    audio.play();
}

function PlayMapMoveAudio() {
    var audio = new Audio("/sounds/MapMove.wav");
    audio.play();
}

function PlayWateringAudio() {
    var audio = new Audio("/sounds/Coin.wav");
    audio.play();
}
