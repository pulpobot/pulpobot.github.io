sessionStorage.setItem('collectedAllSamplesStar', false);
sessionStorage.setItem('woreProtectiveGearStar', false);
sessionStorage.setItem('bloodSampleSpeedBonusStar', false);
sessionStorage.setItem('nasalSampleAccuracyBonusStar', false);
sessionStorage.setItem('mosquitoSampleSpeedBonusStar', false);

//ecologist session
sessionStorage.setItem('ecoWoreProtectiveGearStar', false);
sessionStorage.setItem('ecoCapturedFruitBat', false);
sessionStorage.setItem('ecoCapturedInsectBat', false);
sessionStorage.setItem('ecoSpeedBonus', false);
sessionStorage.setItem('ecoFiveEachBonus', false);

var fieldVeterinarianStars = 0;
var ecologistStars = 0;
var missionDuration = 50.0;
var currentMissionCountdownValue = 50.0;
var missionInterval;
var app = angular.module("outbreaksRole2", ["ngRoute"]);

app.config(function($routeProvider) 
{
    $routeProvider
    .when("/",
    {
        templateUrl: "views/ecologist.html",
        controller: "ecologistMainCtrl"
    }).when("/fVProtectiveGear",
    {
        templateUrl: "views/fVProtectiveGear.html",
        controller: "fVProtectiveGearCtrl"
    }).when("/fVCollectSamples",
    {
        templateUrl: "views/fVCollectSamples.html",
        controller: "fVCollectSamplesCtrl"
    }).when("/fVBloodSample",
    {
        templateUrl: "views/fVBloodSample.html",
        controller: "fVBloodSampleCtrl"
    }).when("/fVOralSample",
    {
        templateUrl: "views/fVOralSample.html",
        controller: "fVOralSampleCtrl"
    }).when("/fVMosquitoCollection",
    {
        templateUrl: "views/fVMosquitoCollection.html",
        controller: "fVMosquitoCollectionCtrl"
    }).when("/fVResults",
    {
        templateUrl: "views/fVResults.html",
        controller: "fVResultsCtrl"
    }).when("/epidemiologist",
    {
        templateUrl: "views/epidemiologist.html",
        controller: "epidemiologistMainCtrl"
    }).when("/epidemiologistProtectiveGear",
    {
        templateUrl: "views/epidemiologistProtectiveGear.html",
        controller: "epidemiologistProtectiveGearCtrl"
    }).when("/epidemiologistInvestigateArea",
    {
        templateUrl: "views/epidemiologistInvestigateArea.html",
        controller: "epidemiologistInvestigateAreaCtrl"
    }).when("/ecologist",
    {
        templateUrl: "views/ecologist.html",
        controller: "ecologistMainCtrl"
    }).when("/ecologistProtectiveGear",
    {
        templateUrl: "views/ecologistProtectiveGear.html",
        controller: "ecologistProtectiveGearCtrl"
    }).when("/ecologistNet",
    {
        templateUrl: "views/ecologistNet.html",
        controller: "ecologistNetCtrl"
    }).when("/ecologistNetPosition",
    {
        templateUrl: "views/ecologistNetPosition.html",
        controller: "ecologistNetPositionCtrl"
    }).when("/ecologistResults",
    {
        templateUrl: "views/ecologistResults.html",
        controller: "ecologistResultsCtrl"
    });
});

app.controller("fVMainCtrl", function ($scope, $location, $timeout) 
{
    $('body').css(
    {
        'background-image' : 'url(../images/missionStartBackground.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $timeout(function()
    {
        $location.path('fVProtectiveGear');
    }, 5000);

    var countdownNumber = $('#missionCountdownNumber');
    var countdown = 5;

    countdownNumber.html(5);

    setInterval(function()
    {
        countdown = --countdown <= 0 ? 5 : countdown;

        countdownNumber.html(countdown)
    }, 1000);
});

app.controller("fVProtectiveGearCtrl", function ($scope, $location) 
{
    $('body').css(
    {
        'background-image' : 'url(../images/protectiveGearBackground.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $scope.yes = function()
    {
        $('.protectiveGearContent').hide();
        $('#modalMiddle').show();
        $('.modalHeader').html('<h1>GOOD CHOICE</h1>');
        $('#modalTextContentText').html('You need to take precautions when dealing with potentially infected animals');

        sessionStorage.woreProtectiveGearStar = true;

        fieldVeterinarianStars++;
    }
    $scope.no = function()
    {
        $('.protectiveGearContent').hide();
        $('#modalMiddle').show();
        $('.modalHeader').html('<h1>BAD CHOICE</h1>');

        sessionStorage.woreProtectiveGearStar = false;
    }
    $scope.beginMission = function()
    {
        $location.path('fVCollectSamples');
    }
});

app.controller("fVCollectSamplesCtrl", function ($scope, $location)
{
    $('body').css(
    {
        'background-image' : 'url(../images/mission1Background.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $('#modalMiddle').show();

    $scope.beginMission = function()
    {
        $location.path('fVBloodSample');
    }
});

app.controller("fVBloodSampleCtrl", function ($scope, $location, $timeout)
{
    var missionInterval;

    $('body').css(
    {
        'background-image' : 'url(../images/mission1Objective1Background.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $("#syringe").draggable(
    {
        axis: 'x',
        containment: [0, 0, 790, 0]
    });

    $("#syringe").on('drag', function()
    {
        if ($("#syringe").position().left < 0)
        {
            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#syringeMeter').hide();
            $('#syringeIMGMission').hide();
            $('#currentMissionCountdown').hide();
            $('#currentMissionCountdownNumber').hide();
            $('#modalMiddle').show();

            $('body').css(
            {
                'background-image' : 'url(../images/mission1Background.jpg)',
                'background-position' : 'center',
                'background-repeat' : 'no-repeat',
                'background-size' : 'cover'
            });

            sessionStorage.bloodSampleSpeedBonusStar = true;

            fieldVeterinarianStars++;

            clearInterval(missionInterval);
        }
    });

    var countdownNumber = $('#currentMissionCountdownNumber');
    var countdown = 30;

    countdownNumber.html(30);

    missionInterval = setInterval(function()
    {
        countdown = --countdown <= -1 ? 30 : countdown;

        countdownNumber.html(countdown)

        if (countdown < 10)
        {
            $('#currentMissionCountdownNumber').css(
            {
                'left': '67px'
            });
        }
        else
        {
            $('#currentMissionCountdownNumber').css(
            {
                'left': '60px'
            });
        }

        if (countdown == 0)
        {
            sessionStorage.bloodSampleSpeedBonusStar = false;

            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#syringeMeter').hide();
            $('#syringeIMGMission').hide();
            $('#currentMissionCountdown').hide();
            $('#currentMissionCountdownNumber').hide();
            $('#modalMiddle').show();

            $('body').css(
            {
                'background-image' : 'url(../images/mission1Background.jpg)',
                'background-position' : 'center',
                'background-repeat' : 'no-repeat',
                'background-size' : 'cover'
            });

            clearInterval(missionInterval);
        }
    }, 1000);

    $scope.beginMission = function()
    {
        $location.path('fVOralSample');
    }
});

app.controller("fVOralSampleCtrl", function ($scope, $location, $timeout)
{
    $('body').css(
    {
        'background-image' : 'url(../images/mission1Objective2Background.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    var c = document.getElementById("oralSampleCanvas");
    var ctx = c.getContext("2d");

    ctx.lineWidth = 15;
    ctx.strokeStyle = "rgba(355, 355, 355, 0.4)";

    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(200, 250);
    ctx.lineTo(240, 125);
    ctx.lineTo(325, 250);
    ctx.lineTo(800, 250);
    ctx.stroke();

    console.log($("#qTip").position().left);
    console.log($("#qTip").position().top);

    $( "#qTip" ).draggable(
    {
        containment: [555, 0, 1320, 1078]
    });

    $("#qTip").on('drag', function()
    {
        console.log('Top: ' + $("#qTip").position().top);
        console.log('Left: ' + $("#qTip").position().left);

        if (($("#qTip").position().left < 250) && (($("#qTip").position().top > 378.3125) || ($("#qTip").position().top < 338.3125)))
        {
            console.log('qTip has gone too far off track');
            $("#qTip").animate(
            {
                'top' : '355',
                'left' : '75'
            });
        }
        if (($("#qTip").position().left >= 250) && (($("#qTip").position().top < 190) || ($("#qTip").position().left < 250) || ($("#qTip").position().left > 300)))
        {
            console.log('qTip has gone too far off track');
            $("#qTip").animate(
            {
                'top' : '355',
                'left' : '75'
            });
        }
        if (($("#qTip").position().left >= 383) && (($("#qTip").position().top > 378.3125) || ($("#qTip").position().top < 338.3125)))
        {
            console.log('qTip has gone too far off track');
            $("#qTip").animate(
            {
                'top' : '355',
                'left' : '75'
            });
        }
        if ($("#qTip").position().left == 840)
        {
            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#modalMiddle').show();
        }
    });

    // $timeout(function()
    // {
    //     $('.headerRow').hide();
    //     $('.contentRow').hide();
    //     $('#modalMiddle').show();
    // }, 5000);

    $scope.beginMission = function()
    {
        $location.path('fVMosquitoCollection');
    }
});

app.controller("fVMosquitoCollectionCtrl", function ($scope, $location, $timeout)
{
    $('body').css(
    {
        'background-image' : 'url(../images/mission1Objective3Background.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    var countdownNumber = $('#currentMissionCountdownNumber');
    var countdown = 30;

    countdownNumber.html(30);

    missionInterval = setInterval(function()
    {
        countdown = --countdown <= -1 ? 30 : countdown;

        countdownNumber.html(countdown)

        if (countdown < 10)
        {
            $('#currentMissionCountdownNumber').css(
            {
                'left': '67px'
            });
        }
        else
        {
            $('#currentMissionCountdownNumber').css(
            {
                'left': '60px'
            });
        }

        if (countdown == 0)
        {
            sessionStorage.mosquitoSampleSpeedBonusStar = false;

            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#dipperMeter').hide();
            $('#dipper').hide();
            $('#currentMissionCountdown').hide();
            $('#currentMissionCountdownNumber').hide();
            $('#modalMiddle').show();

            $('body').css(
            {
                'background-image' : 'url(../images/mission1Background.jpg)',
                'background-position' : 'center',
                'background-repeat' : 'no-repeat',
                'background-size' : 'cover'
            });

            clearInterval(missionInterval);
        }
    }, 1000);

    var xPosition = $("#dipper").position().left;

    $("#dipper").draggable(
    {
        axis: "x",
        containment: [165, 0, 1025, 0]
    });

    $("#dipper").on('drag', function()
    {
        if ($("#dipper").position().left == 526.9945068359375)
        {
            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#dipperMeter').hide();
            $('#dipper').hide();
            $('#currentMissionCountdown').hide();
            $('#currentMissionCountdownNumber').hide();
            $('#modalMiddle').show();

            $('body').css(
            {
                'background-image' : 'url(../images/mission1Background.jpg)',
                'background-position' : 'center',
                'background-repeat' : 'no-repeat',
                'background-size' : 'cover'
            });

            sessionStorage.mosquitoSampleSpeedBonusStar = true;

            fieldVeterinarianStars++;

            clearInterval(missionInterval);
        }
    });

    $scope.seeResults = function()
    {
        $location.path('fVResults');
    }
});

app.controller("fVResultsCtrl", function ($scope, $location, $timeout)
{
    $('body').css(
    {
        'background-image' : 'url(../images/missionStartBackground.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });
    
    if (fieldVeterinarianStars == 1)
    {
        $('#fVStar1').css(
        {
            'color' : '#000000'
        });
    }
    if (fieldVeterinarianStars == 2)
    {
        $('#fVStar1').css(
        {
            'color' : '#000000'
        });
        $('#fVStar2').css(
        {
            'color' : '#000000'
        });
    }
    if (fieldVeterinarianStars == 3)
    {
        $('#fVStar1').css(
        {
            'color' : '#000000'
        });
        $('#fVStar2').css(
        {
            'color' : '#000000'
        });
        $('#fVStar3').css(
        {
            'color' : '#000000'
        });
    }

    if (sessionStorage.collectedAllSamplesStar == 'true')
    {
        $('#collectedAllSamples').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.woreProtectiveGearStar == 'true')
    {
        $('#woreProtectiveGear').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.bloodSampleSpeedBonusStar == 'true')
    {
        $('#bloodSampleBonus').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.nasalSampleAccuracyBonusStar == 'true')
    {
        $('#nasalSampleBonus').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.mosquitoSampleSpeedBonusStar == 'true')
    {
        $('#mosquitoSampleBonus').css(
        {
            'opacity': '1'
        });
    }

    var countdownNumber = $('#missionCountdownNumber');
    var countdown = 10;

    countdownNumber.html(10);

    $('#missionCountdownNumber').css(
    {
        'right': '118px'
    });

    setInterval(function()
    {
        countdown = --countdown <= 0 ? 10 : countdown;

        countdownNumber.html(countdown);

        $('#missionCountdownNumber').css(
        {
            'right': '145px'
        });

    }, 1000);

    $timeout(function()
    {
        $location.path('epidemiologist');
    }, 10000);
});

app.controller("ecologistMainCtrl", function ($scope, $location, $timeout) 
{
    clearInterval(missionInterval);

    // $timeout(function()
    // {
    //     $location.path('ecologistNetPosition');
    // }, 5000);

    //var countdownNumber = $('#missionCountdownNumber');
    //var countdown = 5;

    //countdownNumber.html(5);

    //setInterval(function()
    //{
    //    countdown = --countdown <= 0 ? 5 : countdown;

    //    countdownNumber.html(countdown)
    //}, 1000);


    $scope.continue = function () {
        $location.path('ecologistNetPosition');
    }
});

//DEPRECATED DUE TO FRAME CHANGES
app.controller("ecologistProtectiveGearCtrl", function ($scope, $location, $timeout) {
    clearInterval(missionInterval);
    $('body').css(
       {
           'background-image': 'url(../images/protectiveGearBackground.jpg)',
           'background-position': 'center',
           'background-repeat': 'no-repeat',
           'background-size': 'cover'
       });

    $scope.yes = function () {
        $('.protectiveGearContent').hide();
        $('#modalRight').show();
        $('.modalHeaderRight').html('<h1>GOOD CHOICE</h1>');
        $('#modalTextContentText').html('You need to take precautions when dealing with potentially infected animals');
        sessionStorage.ecoWoreProtectiveGearStar = true;
    }
    $scope.no = function () {
        $('.protectiveGearContent').hide();
        $('#modalRight').show();
        $('.modalHeaderRight').html('<h1>INCORRECT</h1>');
        $('#modalTextContentText').html("That will leave you exposed to potential pathogens.");
        sessionStorage.ecoWoreProtectiveGearStar = false;
    }

    $('#missionCountdownNumber').css(
    {
        'right': '118px'
    });

    $scope.seeResults = function () {
        $location.path('ecologistResults');
    }

    currentMissionCountdownValue = missionDuration;
    var countdownNumber = $('#missionCountdownNumber');
    countdownNumber.html(missionDuration);

    $('#currentObjectiveMission2CountdownTimer').css(
    {
        'animation': 'countdown ' + missionDuration.toString() + 's linear 1 forwards',
    });

    missionInterval = setInterval(function () {
        currentMissionCountdownValue = --currentMissionCountdownValue <= -1 ? missionDuration : currentMissionCountdownValue;

        if (currentMissionCountdownValue < 10) {
            $('#missionCountdownNumber').css(
            {
                'right': '145px'
            });
        }
        else {
            $('#missionCountdownNumber').css(
            {
                'right': '118px'
            });
        }

        countdownNumber.html(currentMissionCountdownValue)

        if (currentMissionCountdownValue == 0) {
            $('.protectiveGearContent').hide();
            $('#modalRight').hide();
            EndNetEcologist(0, 0);
            clearInterval(missionInterval);
        }
    }, 1000);

    $scope.beginMission = function () {
        clearInterval(missionInterval);
        $location.path('ecologistNet');
    }
});

//DEPRECATED DUE TO FRAME CHANGES
app.controller("ecologistNetCtrl", function ($scope, $location) {
    clearInterval(missionInterval);
    $('body').css(
    {
        'background-image': 'url(../images/ecologist/2B_1_Background.jpg)',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
    });

    $('#modalRight').show();

    $scope.seeResults = function () {
        $location.path('ecologistResults');
    }

    var countdownNumber = $('#missionCountdownNumber');
    countdownNumber.html(currentMissionCountdownValue);

    if (currentMissionCountdownValue < 10) {
        $('#missionCountdownNumber').css(
        {
            'right': '145px'
        });
    }
    else {
        $('#missionCountdownNumber').css(
        {
            'right': '118px'
        });
    }

    var delay = (currentMissionCountdownValue - missionDuration).toString() + 's';

    $('#currentObjectiveMission2CountdownTimer').css(
    {
        'animation': 'countdown ' + missionDuration.toString() + 's linear 1 forwards',
        'animation-delay': delay
    });

    missionInterval = setInterval(function () {
        currentMissionCountdownValue = --currentMissionCountdownValue <= -1 ? missionDuration : currentMissionCountdownValue;

        if (currentMissionCountdownValue < 10) {
            $('#missionCountdownNumber').css(
            {
                'right': '145px'
            });
        }
        else {
            $('#missionCountdownNumber').css(
            {
                'right': '118px'
            });
        }

        countdownNumber.html(currentMissionCountdownValue)

        if (currentMissionCountdownValue == 0) {
            $('#modalRight').hide();
            EndNetEcologist(0, 0);
            clearInterval(missionInterval);
        }
    }, 1000);

    $scope.beginMission = function () {
        clearInterval(missionInterval);
        $location.path('ecologistNetPosition');
    }
});

function EndNetEcologist(fruitBats, insectBats)
{    
    sessionStorage.ecoFiveEachBonus = true;
    sessionStorage.ecoSpeedBonus = true;

    //Hide net and show final message
    if(fruitBats >= 5 && insectBats >= 3)
        $("#mission2EndRightHeader").html('<h1>GREAT JOB!</h1>');
    else if (fruitBats >= 5 && insectBats <= 2)
        $("#mission2EndRightHeader").html('<h1>FAIR JOB!</h1>');
    else
        $("#mission2EndRightHeader").html('<h1>POOR JOB!</h1>');

    $("#netNormal").hide();
    $("#modal2BMiddleComplete").show();
    $("#mission2EndModalTextContentText").html("You collected " + fruitBats.toString() + " Fruit Bats and " + insectBats.toString() + " Insectivorous Bats. Samples from the bats will be sent to the lab.");
}

app.controller("ecologistNetPositionCtrl", function ($scope, $location, $timeout) {
    var batsInterval;
    var insectBatsInterval;
    var heightTarget;
    var netSet = false;
    var fruitBatsCompleted = false;
    var fruitBatsCaptured = 0;
    var fruitBatsGoal = 5;
    var insectBatsCompleted = false;
    var insectBatsCaptured = 0;
    var insectBatsGoal = 5;
    $("#topCornerBatModalInsect").hide();
    $('body').css(
    {
        'background-image': 'url(../images/ecologist/2B_1_Background.jpg)',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
    });

    $("#netNormal").hide();
    $("#netNormal").draggable(
   {
       containment: [300, 0, 1200, 700]
   });
    $("#netCircularField").hide();
    $("#netDragHand").hide();
    $("#protectiveGear2BChoice").hide();
    $("#starArrow12B").hide();
    $("#fruitBatsTutorialTitle").hide();
    $("#fruitBatsTutorialDescription").hide();
    $("#fruitBatsTutorialNet").hide();
    $("#insectBatsTutorialTitle").hide();
    $("#insectBatsTutorialDescription").hide();
    $("#netTutorialArrow").hide();
    $("#fruitBatsReminderTitle").hide();
    $("#fruitBatsReminderDescription").hide();
    $("#insectBatsReminderTitle").hide();
    $("#insectBatsReminderDescription").hide();
    $('#starEarnedTitle').hide();
    $('#checkFruitBats').hide();
    $('#checkInsectBats').hide();
    $('#globalExpert').hide();
    $('#globalExpertTitle').hide();
    $('#globalExpertBubble').hide();
    $('#globalExpertDescription').hide();
    $('#repositionArrow').hide();
    $('#repositionDescription').hide();
    $('#repositionTitle').hide();
    $('#modal2BMiddleComplete').hide();

    $("#mission2EndRight").hide();
    $("#batCaptureCircle1").hide();
    $("#batCaptureCircle2").hide();
    $("#batCaptureCircle3").hide();
    $("#batCaptureCircle4").hide();
    $("#batCaptureCircle5").hide();

    $("#iconArrowDown1").hide();
    $("#iconArrowDown2").hide();
    $("#iconArrowDown3").hide();
    $("#iconArrowDown4").hide();
    $("#iconArrowDown5").hide();

    $("#swipeText1").hide();
    $("#swipeText2").hide();
    $("#swipeText3").hide();
    $("#swipeText4").hide();
    $("#swipeText5").hide();


    //bats can have different speeds
    var batsSpeed = [-100, 100, -100, 100, 100];
    var insectBatsSpeed = [-100, 100, -100, 100, 100];

    for (var i = 0; i < 5; i++) {
        var bat = "#fruitBat" + ((i + 1).toString());
        if(batsSpeed[i] >= 0)
            $(bat).css({ transform: "scale(1, 1)" });
        else
            $(bat).css({ transform: "scale(-1, 1)" });
    }

    var batTrapped = [false, false, false, false, false];
    var fruitTopPos = [0, 0, 0, 0, 0];
    var insectBatTrapped = [false, false, false, false, false];
    var insectBatTopPos = [0, 0, 0, 0, 0];
    for (var i = 0; i < 5; i++) {
        var bat = "#insectBat" + ((i + 1).toString());
        insectBatTopPos[i] = $(bat).position().top;
        bat = "#fruitBat" + ((i + 1).toString());
        fruitTopPos[i] = $(bat).position().top;
    }
    var batsInNet = 0;
    var fps = 0.02;

    insectBatsInterval = setInterval(function () {
        for (var i = 0; i < 5; i++) {
            var bat = "#insectBat" + ((i + 1).toString());
            var dist = Math.abs($(bat).position().top - $("#netNormal").position().top);

            //if this bat is not trapped, move it
            if (!insectBatTrapped[i]) {
                //Scale and direction
                if ($(bat).position().left >= 1500 && insectBatsSpeed[i] > 0) {
                    insectBatsSpeed[i] = insectBatsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(-1, 1)" });
                }
                else if ($(bat).position().left <= 300 && insectBatsSpeed[i] < 0) {
                    insectBatsSpeed[i] = insectBatsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(1, 1)" });
                }

                //Move the bat horizontally
                var x = $(bat).position().left + insectBatsSpeed[i] * fps;
                var y = $(bat).position().top;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                //Assign the new positions
                $(bat).css({ left: xpx });
                $(bat).css({ top: ypx });

                //Check if the bat is inside the net
                if (!insectBatsCompleted && netSet && batsInNet < 1 && $(bat).position().left > $("#netNormal").position().left + 200 && $(bat).position().left < $("#netNormal").position().left + 300 && dist <= 200 && dist > 70) {
                    $(bat).css(
                   {
                       'z-index': 4
                   });
                    $("#netNormal").draggable({ disabled: true });
                    $(document).trigger("mouseup");
                    insectBatTrapped[i] = true;
                    batsInNet++;
                    $("#batCaptureCircle" + (i + 1).toString()).css
                    (
                    {
                        left: ($(bat).position().left - 10).toString() + 'px',
                        top: ($(bat).position().top - 60).toString() + 'px',
                    });

                    $("#iconArrowDown" + (i + 1).toString()).css
                    (
                    {
                        left: ($(bat).position().left + 50).toString() + 'px',
                        top: ($(bat).position().top + 80).toString() + 'px',
                    });

                    $("#swipeText" + (i + 1).toString()).css
                    (
                    {
                        left: ($(bat).position().left - 20).toString() + 'px',
                        top: ($(bat).position().top - 100).toString() + 'px',
                    });

                    $("#batCaptureCircle" + (i + 1).toString()).show();
                    $("#iconArrowDown" + (i + 1).toString()).show();
                    $("#swipeText" + (i + 1).toString()).show();
                    //Make him draggable
                    $(bat).draggable({ disabled: false });
                }
            }
            //Check if the bat has been dragged enoughly far away from the net
            else if (!insectBatsCompleted && insectBatTrapped[i] && (dist > 210 || dist < 60)) {
                $(bat).css(
               {
                   'z-index': 1
               });
                //Hide him and stop the dragging
                $("#netNormal").draggable({ disabled: false });
                $(bat).draggable({ disabled: true });
                $("#batCaptureCircle" + (i + 1).toString()).hide();
                $("#iconArrowDown" + (i + 1).toString()).hide();
                $("#swipeText" + (i + 1).toString()).hide();
                $(document).trigger("mouseup");
                $(bat).hide();
                batsInNet--;
                //Update the current score
                insectBatsCaptured++;
                insectBatTrapped[i] = false;
                $('#topCornerInsectBatCounterMission2B').html(insectBatsCaptured.toString());

                //Win condition
                if (insectBatsCaptured >= insectBatsGoal && !insectBatsCompleted) {
                    //Increase the stars
                    var star = 1;
                    if (sessionStorage.ecoWoreProtectiveGearStar == 'true') 
                        star++;

                    if (fruitBatsCaptured >= fruitBatsGoal)
                        star++;

                    $('#2bMissionStar' + star.toString()).css(
                       {
                           'color': '#ffffff'
                       });

                    $('#starEarnedTitle').show();                  

                    $('#starEarnedTitle').css({
                        left: $('#2bMissionStar'+ star.toString()).position().left + 'px'
                    });


                    //Mark the objective as done
                    $('#insectBatsPaper').css(
                       {
                           'opacity': '0.25'
                       });

                    $('#checkInsectBats').show();

                    //Show health office
                    $('#globalExpert').show();
                    $('#globalExpertTitle').show();
                    $('#globalExpertBubble').show();
                    $('#globalExpertDescription').show();

                    setTimeout(function () {
                        $('#starEarnedTitle').hide();
                        $('#globalExpert').hide();
                        $('#globalExpertTitle').hide();
                        $('#globalExpertBubble').hide();
                        $('#globalExpertDescription').hide();

                    }, 3000);

                    if (fruitBatsCaptured < fruitBatsGoal)
                    {
                        $('#repositionArrow').show();
                        $('#repositionArrow').css(
                          {
                              left: ($("#netNormal").position().left - 20).toString() + 'px',
                              top: ($("#netNormal").position().top + 130).toString() + 'px'
                          });
                        $('#repositionDescription').show();
                        $('#repositionDescription').html("We need to catch fruit bats!");
                        $('#repositionDescription').css(
                        {
                            left: ($("#netNormal").position().left - 280).toString() + 'px',
                            top: ($("#netNormal").position().top + 320).toString() + 'px'
                        });
                        $('#repositionTitle').show();
                        $('#repositionTitle').css(
                        {
                            left: ($("#netNormal").position().left - 280).toString() + 'px',
                            top: ($("#netNormal").position().top + 270).toString() + 'px'
                        });
                    }

                    sessionStorage.ecoCapturedInsectBat = true;
                    insectBatsCompleted = true;
                    $(document).trigger("mouseup");

                    //release all the bats
                    for (var i = 0; i < 5; i++) {
                        insectBatTrapped[i] = false;
                        $(bat).draggable({ disabled: true });
                    }

                    $("#batCaptureCircle1").hide();
                    $("#batCaptureCircle2").hide();
                    $("#batCaptureCircle3").hide()
                    $("#batCaptureCircle4").hide();
                    $("#batCaptureCircle5").hide();

                    $("#iconArrowDown1").hide();
                    $("#iconArrowDown2").hide();
                    $("#iconArrowDown3").hide()
                    $("#iconArrowDown4").hide();
                    $("#iconArrowDown5").hide();

                    $("#swipeText1").hide();
                    $("#swipeText2").hide();
                    $("#swipeText3").hide()
                    $("#swipeText4").hide();
                    $("#swipeText5").hide();

                    if (fruitBatsCaptured >= fruitBatsGoal)
                    {
                        batsInNet = 3;
                        EndNetEcologist(fruitBatsCaptured, insectBatsCaptured);    
                    }
                    
                }
                else {
                    //Create a new bat after a few seconds
                    setTimeout(function () {
                        for (var i = 0; i < 5; i++) {
                            var bat = "#insectBat" + ((i + 1).toString());
                            var isHidden = !($(bat).is(":visible"));
                            if (isHidden) {
                                var ypx = insectBatTopPos[i].toString() + 'px';
                                var xpx = "400px";
                                if (Math.random() > 0.5)
                                    xpx = 1400;

                                if (insectBatsSpeed[i] < 0)
                                    $(bat).css({ transform: "scale(-1, 1)" });
                                else
                                    $(bat).css({ transform: "scale(1, 1)" });

                                $(bat).css({ left: xpx });
                                $(bat).css({ top: ypx });
                                $(bat).show();
                                insectBatTrapped[i] = false;
                                break;
                            }
                        }
                    }, 2000);

                    if (insectBatsCaptured == insectBatsGoal- 1 && fruitBatsCaptured < fruitBatsGoal) {
                        $("#fruitBatsReminderTitle").show();
                        $("#fruitBatsReminderDescription").show();
                        setTimeout(function () {
                            $("#fruitBatsReminderTitle").hide();
                            $("#fruitBatsReminderDescription").hide();
                        }, 3000);
                    }
                }
            }
        }
    }, fps * 100);   
    

    batsInterval = setInterval(function () {
        //Fruit Bats Loop
        for (var i = 0; i < 5; i++) {
            var bat = "#fruitBat" + ((i + 1).toString());
            var dist = Math.abs($(bat).position().top - $("#netNormal").position().top);

            //if this bat is not trapped, move it
            if (!batTrapped[i]) {
                //Scale and direction
                if ($(bat).position().left >= 1600 && batsSpeed[i] > 0) {
                    batsSpeed[i] = batsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(-1, 1)" });
                }
                else if ($(bat).position().left <= 450 && batsSpeed[i] < 0) {
                    batsSpeed[i] = batsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(1, 1)" });
                }               

                //Move the bat horizontally
                var x = $(bat).position().left + batsSpeed[i] * fps;
                var y = $(bat).position().top;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                //Assign the new positions
                $(bat).css({ left: xpx });
                $(bat).css({ top: ypx });
                
                //Check if the bat is inside the net
                if (!fruitBatsCompleted && netSet && batsInNet < 1 && $(bat).position().left > $("#netNormal").position().left + 200 && $(bat).position().left < $("#netNormal").position().left + 300 && dist <= 200 && dist > 70)
                {
                    $(bat).css(
                       {
                           'z-index': 4
                       });
                    $(document).trigger("mouseup");
                    $("#netNormal").draggable({ disabled: true });
                    batTrapped[i] = true;
                    batsInNet++;
                    if (i != 1 & i != 2) {
                        $("#batCaptureCircle" + (i + 1).toString()).css
                            (
                            {
                                left: ($(bat).position().left - 40).toString() + 'px',
                                top: ($(bat).position().top - 40).toString() + 'px',
                            });

                        $("#iconArrowDown" + (i + 1).toString()).css
                            (
                            {
                                left: ($(bat).position().left + 20).toString() + 'px',
                                top: ($(bat).position().top + 90).toString() + 'px',
                            });

                        $("#swipeText" + (i + 1).toString()).css
                            (
                            {
                                left: ($(bat).position().left - 80).toString() + 'px',
                                top: ($(bat).position().top - 80).toString() + 'px',
                            });
                    }
                    else
                    {
                        $("#batCaptureCircle" + (i + 1).toString()).css
                         (
                         {
                             left: ($(bat).position().left - 40).toString() + 'px',
                             top: ($(bat).position().top - 10).toString() + 'px',
                         });

                        $("#iconArrowDown" + (i + 1).toString()).css
                            (
                            {
                                left: ($(bat).position().left + 20).toString() + 'px',
                                top: ($(bat).position().top + 120).toString() + 'px',
                            });

                        $("#swipeText" + (i + 1).toString()).css
                         (
                         {
                             left: ($(bat).position().left - 70).toString() + 'px',
                             top: ($(bat).position().top - 50).toString() + 'px',
                         });
                    }

                    $("#batCaptureCircle" + (i + 1).toString()).show();
                    $("#iconArrowDown" + (i + 1).toString()).show();
                    $("#swipeText" + (i + 1).toString()).show();

                    //Make him draggable
                    $(bat).draggable({ disabled: false });
                }
            }
            //Check if the bat has been dragged enoughly far away from the net
            else if (!fruitBatsCompleted && batTrapped[i] && (dist > 190 || dist < 70))
            {
                $(bat).css(
                {
                    'z-index': 1
                });
                $("#netNormal").draggable({ disabled: false });
                //Hide him and stop the dragging
                $(bat).draggable({ disabled: true });
                $("#batCaptureCircle" + (i + 1).toString()).hide();
                $("#iconArrowDown" + (i + 1).toString()).hide();
                $("#swipeText" + (i + 1).toString()).hide();
                $(document).trigger("mouseup");
                $(bat).hide();
                batsInNet--;
                //Update the current score
                fruitBatsCaptured++;
                batTrapped[i] = false;
                $('#topCornerFruitBatCounterMission2B').html(fruitBatsCaptured.toString());

                //Win condition
                if (fruitBatsCaptured >= fruitBatsGoal && !fruitBatsCompleted) {
                    var star = 1;

                    if (sessionStorage.ecoWoreProtectiveGearStar == 'true')
                        star++;

                    if (insectBatsCaptured >= insectBatsGoal)
                        star++;


                    $('#starEarnedTitle').show();

                    $('#2bMissionStar' + star.toString()).css(
                       {
                           'color': '#ffffff'
                       });

                    $('#starEarnedTitle').css({
                        left: $('#2bMissionStar'+ star.toString()).position().left + 'px'
                    });


                    //Mark the objective as done
                    $('#fruitBatsPaper').css(
                       {
                           'opacity': '0.25'
                       });

                    $('#checkFruitBats').show();

                    //Show health office
                    $('#globalExpert').show();
                    $('#globalExpertTitle').show();
                    $('#globalExpertBubble').show();
                    $('#globalExpertDescription').show();

                    if (insectBatsCaptured < insectBatsGoal)
                    {
                        $('#repositionArrow').show();
                        $('#repositionArrow').css(
                          {
                              left: ($("#netNormal").position().left - 20).toString() + 'px',
                              top: ($("#netNormal").position().top + 130).toString() + 'px'
                          });
                        $('#repositionDescription').show();
                        $('#repositionDescription').html("We need to catch insectivorous bats!");
                        $('#repositionDescription').css(
                        {
                            left: ($("#netNormal").position().left - 340).toString() + 'px',
                            top: ($("#netNormal").position().top + 320).toString() + 'px'
                        });
                        $('#repositionTitle').show();
                        $('#repositionTitle').css(
                        {
                            left: ($("#netNormal").position().left - 280).toString() + 'px',
                            top: ($("#netNormal").position().top + 270).toString() + 'px'
                        });
                    }

                    setTimeout(function () {
                        $('#starEarnedTitle').hide();
                        $('#globalExpert').hide();
                        $('#globalExpertTitle').hide();
                        $('#globalExpertBubble').hide();
                        $('#globalExpertDescription').hide();
                    }, 3000);


                    sessionStorage.ecoCapturedFruitBat = true;
                    //Restore dragging to the net
                    fruitBatsCompleted = true;                    
                    netSet = false;
                    batsInNet = 0;
                    //release all the bats
                    for (var i = 0; i < 5; i++) {
                        batTrapped[i] = false;
                        $(bat).draggable({ disabled: true });
                    }

                    $("#batCaptureCircle1").hide();
                    $("#batCaptureCircle2").hide();
                    $("#batCaptureCircle3").hide()
                    $("#batCaptureCircle4").hide();
                    $("#batCaptureCircle5").hide();

                    $("#iconArrowDown1").hide();
                    $("#iconArrowDown2").hide();
                    $("#iconArrowDown3").hide()
                    $("#iconArrowDown4").hide();
                    $("#iconArrowDown5").hide();

                    $("#swipeText1").hide();
                    $("#swipeText2").hide();
                    $("#swipeText3").hide()
                    $("#swipeText4").hide();
                    $("#swipeText5").hide();

                    if (insectBatsCaptured >= insectBatsGoal) {
                        batsInNet = 3;
                        EndNetEcologist(fruitBatsCaptured, insectBatsCaptured);
                    }

                }
                else
                {
                    //Create a new bat after a few seconds
                    setTimeout(function () {
                        for (var i = 0; i < 5; i++) {
                            var batSpawn = "#fruitBat" + ((i + 1).toString());
                            var isHidden = !($(batSpawn).is(":visible"));
                            if (isHidden)
                            {
                                var ypx = fruitTopPos[i].toString() + 'px';
                                var xpx = "400px";
                                if(Math.random() > 0.5)
                                    xpx = 1400;

                                if (batsSpeed[i] < 0)
                                    $(batSpawn).css({ transform: "scale(-1, 1)" });
                                else
                                    $(batSpawn).css({ transform: "scale(1, 1)" });

                                $(batSpawn).css({ left: xpx });
                                $(batSpawn).css({ top: ypx });
                                $(batSpawn).show();
                                batTrapped[i] = false;
                                $(batSpawn).draggable({ disabled: true });
                                break;
                            }
                        }
                    }, 2000);


                    if (fruitBatsCaptured == fruitBatsGoal - 1 && insectBatsCaptured < insectBatsGoal)
                    {
                        $("#insectBatsReminderTitle").show();
                        $("#insectBatsReminderDescription").show();

                        setTimeout(function () {
                            $("#insectBatsReminderTitle").hide();
                            $("#insectBatsReminderDescription").hide();
                        }, 3000);
                    }

                }
            }
        }
    }, fps*100);
    $("#netPositionConfirmTitleText").hide();
    $("#netPositionConfirmDescriptionText").hide();

    $("#netNormal").on('mouseup', function () {
        netSet = true;
        heightTarget = $("#netNormal").position().top + 100;
        //Deprecated Code, but this can be useful in the future if it is required to catch certain bats in order
        /*
        //if should capture fruit bats
        if (fruitBatsCaptured <= 0) {
            if ($("#netNormal").position().top > (window.innerHeight / 3.9)) {
                //Calculate the position of the confirm text based on the net position
                var y = $("#netNormal").position().top - 90;
                var x = $("#netNormal").position().left + 120;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                $("#netPositionConfirmTitleText").css({ top: ypx });
                $("#netPositionConfirmTitleText").css({ left: xpx });
                y = y + 50;
                x = x - 10;
                ypx = y.toString() + 'px';
                xpx = x.toString() + 'px';
                $("#netPositionConfirmDescriptionText").css({ top: ypx });
                $("#netPositionConfirmDescriptionText").css({ left: xpx });
                y = y + 160;
                x = x + 100;
                ypx = y.toString() + 'px';
                xpx = x.toString() + 'px';
                $("#netDragHand").css({ top: ypx });
                $("#netDragHand").css({ left: xpx });

                //Show confirm text if not in the right place for fruit bats
                $("#netPositionConfirmTitleText").show();
                $("#netPositionConfirmDescriptionText").show();
                $("#netDragHand").show();

                //Show title
                $("#Title").show();
                $("#ecologistMission2TopTaskDescription").show();
            }
            else {
                //Start catching bats
                heightTarget = $("#netNormal").position().top + 100;
                $("#netNormal").draggable({ disabled: true });
            }
        }
        //if it should capture insect bats
        else if (fruitBatsCompleted)
        {
            if ($("#netNormal").position().top <= (window.innerHeight / 2)) {
                //Calculate the position of the confirm text based on the net position
                var y = $("#netNormal").position().top - 90;
                var x = $("#netNormal").position().left + 120;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                $("#netPositionConfirmTitleText").css({ top: ypx });
                $("#netPositionConfirmTitleText").css({ left: xpx });
                y = y + 50;
                x = x - 50;
                ypx = y.toString() + 'px';
                xpx = x.toString() + 'px';
                $("#netPositionConfirmDescriptionText").css({ top: ypx });
                $("#netPositionConfirmDescriptionText").css({ left: xpx });
                y = y + 160;
                x = x + 100;
                ypx = y.toString() + 'px';
                xpx = x.toString() + 'px';
                $("#netDragHand").css({ top: ypx });
                $("#netDragHand").css({ left: xpx });

                //Show confirm text if not in the right place for insect bats
                $("#netPositionConfirmTitleText").show();
                $("#netPositionConfirmDescriptionText").show();
                $("#netDragHand").show();
            }
            else {               
                heightTarget = $("#netNormal").position().top + 100;
                netSet = true;
                $("#Title").show();
                $("#ecologistMission2TopTaskDescription").show();
                $("#netNormal").draggable({ disabled: true });
            }
        }
        */
    });

    //net dragging callback
    $("#netNormal").on('drag', function () {
        netSet = false;
        $('#netCircularField').hide();
        $("#netPositionConfirmTitleText").hide();
        $("#netPositionConfirmDescriptionText").hide();
        $("#netDragHand").hide();
        $("#fruitBatsTutorialTitle").hide();
        $("#fruitBatsTutorialDescription").hide();
        $("#fruitBatsTutorialNet").hide();
        $("#insectBatsTutorialTitle").hide();
        $("#insectBatsTutorialDescription").hide();
        $("#netTutorialArrow").hide();
        $('#repositionArrow').hide();
        $('#repositionDescription').hide();
        $('#repositionTitle').hide();
    });

    $scope.seeResults = function () {
        clearInterval(missionInterval);
        clearInterval(batsInterval);
        clearInterval(insectBatsInterval);
        $location.path('ecologistResults');
    }

    //holds the callback timeout from the protective gear
    var protectTimeOut;
    var timeoutDuration = 3000;
    //Protective Gear Callbacks
    $scope.yes = function () {
        $("#modal2BMiddle").hide();
        $("#protective2BGear").hide();
        $("#protectiveGear2BProTip").hide();
        $("#starArrow12B").show();

        sessionStorage.ecoWoreProtectiveGearStar = true;
        $('#2bMissionStar1').css(
       {
           'color': '#ffffff'
       });
        $('.protectiveGear2BChoice').html('<span class="protectiveGearGoodBad2BChoice">GOOD CHOICE!</span><br>Wearing protective gear<br> will protect you from infection.');
        $('.protectiveGear2BChoice').css(
        {
            'top': '350px'
        });

        protectTimeOut = setTimeout(function () {
            $("#starArrow12B").hide();
            $(".protectiveGear2BChoice").hide();
            $("#netNormal").show();
            $("#netCircularField").show();
            $("#netDragHand").show();
            $("#fruitBatsTutorialTitle").show();
            $("#fruitBatsTutorialDescription").show();
            $("#fruitBatsTutorialNet").show();
            $("#insectBatsTutorialTitle").show();
            $("#insectBatsTutorialDescription").show();
            $("#netTutorialArrow").show();
        }, timeoutDuration);
    }

    $scope.no = function () {
        $("#modal2BMiddle").hide();
        $("#protective2BGear").hide();
        $("#protectiveGear2BProTip").hide();
        $("#starArrow12B").show();

        sessionStorage.ecoWoreProtectiveGearStar = false;
        $('.protectiveGear2BChoice').html('<span class="protectiveGearGoodBad2BChoice">RISKY CHOICE!</span><br>Not wearing protective gear<br>puts you at risk of infection.');
        $('.protectiveGear2BChoice').css(
        {
            'top': '350px'
        });
        protectTimeOut = setTimeout(function () {
            $("#starArrow12B").hide();
            $(".protectiveGear2BChoice").hide();
            $("#netNormal").show();
            $("#netCircularField").show();
            $("#netDragHand").show();
            $("#fruitBatsTutorialTitle").show();
            $("#fruitBatsTutorialDescription").show();
            $("#fruitBatsTutorialNet").show();
            $("#insectBatsTutorialTitle").show();
            $("#insectBatsTutorialDescription").show();
            $("#netTutorialArrow").show();
        }, timeoutDuration);
    }


    $('#missionCountdownNumber').css(
       {
           'right': '118px'
       });

    var countdownNumber = $('#missionCountdownNumber');

    countdownNumber.html(currentMissionCountdownValue);

    if (currentMissionCountdownValue < 10) {
        $('#missionCountdownNumber').css(
        {
            'right': '145px'
        });
    }
    else {
        $('#missionCountdownNumber').css(
        {
            'right': '118px'
        });
    }

    var delay = (currentMissionCountdownValue - missionDuration).toString() + 's';

    $('#currentObjectiveMission2CountdownTimer').css(
    {
        'animation': 'countdown ' + missionDuration.toString() + 's linear 1 forwards',
        'animation-delay': delay
    });

    missionInterval = setInterval(function () {
        currentMissionCountdownValue = --currentMissionCountdownValue <= -1 ? missionDuration : currentMissionCountdownValue;

        if (currentMissionCountdownValue < 10) {
            $('#missionCountdownNumber').css(
            {
                'right': '145px'
            });
        }
        else
        {
            $('#missionCountdownNumber').css(
            {
                'right': '118px'
            });
        }

        countdownNumber.html(currentMissionCountdownValue)

        if (currentMissionCountdownValue == 0) {
            $('#modal2BMiddle').hide();
            $('#modal2BMiddle').hide();
            $("#netDragHand").hide();
            $("#fruitBatsTutorialTitle").hide();
            $("#fruitBatsTutorialDescription").hide();
            $("#fruitBatsTutorialNet").hide();
            $("#insectBatsTutorialTitle").hide();
            $("#insectBatsTutorialDescription").hide();
            $("#netTutorialArrow").hide();
            $("#netCircularField").hide();
            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#mission2StartCountdown').hide();
            $('#missionBeginText').hide();
            $('#protective2BGear').hide();
            $('#protectiveGear2BProTip').hide();
            $('#missionCountdownNumber').hide();
            $("#fruitBatsReminderTitle").hide();
            $("#fruitBatsReminderDescription").hide();
            $("#insectBatsReminderTitle").hide();
            $("#insectBatsReminderDescription").hide();

            for (var i = 0; i < 5; i++) {
                $("#batCaptureCircle" + (i + 1).toString()).hide();
                $("#iconArrowDown" + (i + 1).toString()).hide();
                $("#swipeText" + (i + 1).toString()).hide();

            }

            $('#modalMiddle').show();

            clearTimeout(protectTimeOut);

            $('body').css(
            {
                'background-image': 'url(../images/ecologist/2B_1_Background.jpg)',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            });

            $(document).trigger("mouseup");
            netSet = false;
            batsInNet = 3;
            //release all the bats
            for (var i = 0; i < 5; i++) {
                var bat = "#fruitBat" + ((i + 1).toString());
                batTrapped[i] = false;
                $(bat).draggable({ disabled: true });
                insectBatTrapped[i] = false;
                bat = "#insectBat" + ((i + 1).toString());
                $(bat).draggable({ disabled: true });
            }

            clearInterval(batsInterval);
            clearInterval(insectBatsInterval);
            $timeout(function () {
                $location.path('ecologistResults');
            }, 250);
            clearInterval(missionInterval);
        }
    }, 1000);

});

app.controller("ecologistResultsCtrl", function ($scope, $location, $timeout) {
    $('body').css(
    {
        'background-image': 'url(../images/missionStartBackground.jpg)',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
    });
        

    if (sessionStorage.ecoWoreProtectiveGearStar == 'true') {
        ecologistStars++;
        $('#ecoWoreProtectiveGearStar').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.ecoCapturedFruitBat == 'true') {
        ecologistStars++;
        $('#ecoCapturedFruitBat').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.ecoCapturedInsectBat == 'true') {
        ecologistStars++;
        $('#ecoCapturedInsectBat').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.ecoSpeedBonus == 'true') {
        ecologistStars++;
        $('#ecoSpeedBonus').css(
        {
            'opacity': '1'
        });
    }
    if (sessionStorage.ecoFiveEachBonus == 'true') {
        ecologistStars++;
        $('#ecoFiveEachBonus').css(
        {
            'opacity': '1'
        });
    }

    for (var i = 0; i < ecologistStars; i++) {
        var star = "#fVStar" + (i + 1).toString();
        $(star).css(
       {
           'color': '#000000'
       });
    }

    var countdownNumber = $('#missionCountdownNumber');
    var countdown = 10;

    countdownNumber.html(10);

    $('#missionCountdownNumber').css(
    {
        'right': '118px'
    });

    setInterval(function () {
        countdown = --countdown <= 0 ? 10 : countdown;

        countdownNumber.html(countdown);

        $('#missionCountdownNumber').css(
        {
            'right': '145px'
        });

    }, 1000);

    if(ecologistStars >= 4)
    {
        $('#resultsPaneHeader').html("Great job!");
        $('#resultsPaneText').html("Your bat samples helped confirm that Virus X spread from fruit bats to goats to humans.<br>The Ministry of Health Official will give you the details about how your team did.");
    }
    else if(ecologistStars >= 2)
    {
        $('#resultsPaneHeader').html("Fair job!");
        $('#resultsPaneText').html("Your bat samples helped confirm that Virus X spread from fruit bats to goats to humans.<br>The Ministry of Health Official will give you the details about how your team did.");
    }
    else
    {
        $('#resultsPaneHeader').html("Poor job!");
        $('#resultsPaneText').html("Better luck next time. Fortunately, our team was still able to confirm that Virus X spread from fruit bats to goats to humans.<br>The Ministry of Health Official will give you the details about how your team did.");
    }

    $("#resultsPaneLine").html();

    //$timeout(function () {
    //    $location.path('epidemiologist');
    //}, 10000);
});


app.controller("epidemiologistMainCtrl", function ($scope, $location, $timeout) 
{
    $('body').css(
    {
        'background-image' : 'url(../images/mission3StartBackground.png)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $timeout(function()
    {
        $location.path('epidemiologistProtectiveGear');
    }, 5000);

    var countdownNumber = $('#missionCountdownNumber');
    var countdown = 5;

    countdownNumber.html(5);

    setInterval(function()
    {
        countdown = --countdown <= 0 ? 5 : countdown;

        countdownNumber.html(countdown)
    }, 1000);
});

app.controller("epidemiologistProtectiveGearCtrl", function ($scope, $location) 
{
    $('body').css(
    {
        'background-image' : 'url(../images/protectiveGearBackground.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $scope.yes = function()
    {
        $('.protectiveGearContent').hide();
        $('#modalMiddle').show();
        $('.modalHeader').html('<h1>BAD CHOICE</h1>');
        $('#modalTextContentText').html('You need to take precautions when dealing with potentially infected animals');
    }
    $scope.no = function()
    {
        $('.protectiveGearContent').hide();
        $('#modalMiddle').show();
        $('.modalHeader').html('<h1>GOOD CHOICE</h1>');
        $('#modalTextContentText').html("There's no need for protective gear in this case.");

    }
    $scope.beginMission = function()
    {
        $location.path('epidemiologistInvestigateArea');
    }
});

app.controller("epidemiologistInvestigateAreaCtrl", function ($scope, $location)
{
    $('body').css(
    {
        'background-image' : 'url(../images/mission3Background.png)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

    $('#modalMiddle').show();

    $scope.beginMission = function()
    {
        $location.path('fVBloodSample');
    }
});

