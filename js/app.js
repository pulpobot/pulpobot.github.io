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
    $('body').css(
    {
        'background-image': 'url(../images/ecologist/2B_Background_MissionStart.jpg)',
        'background-position' : 'center',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover'
    });

     $timeout(function()
     {
         $location.path('ecologistProtectiveGear');
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

app.controller("ecologistProtectiveGearCtrl", function ($scope, $location, $timeout) {
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
    $scope.beginMission = function () {
        $location.path('ecologistNet');
    }
});

app.controller("ecologistNetCtrl", function ($scope, $location) {
    $('body').css(
    {
        'background-image': 'url(../images/ecologist/2B_1_Background.jpg)',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
    });

    $('#modalRight').show();

    $scope.beginMission = function () {
        $location.path('ecologistNetPosition');
    }
});

function EndNetEcologist(fruitBats, insectBats)
{
    if (fruitBats >= 5 && insectBats >= 5)
        sessionStorage.ecoFiveEachBonus = true;

    $("#topCornerBatModal").hide();
    $("#mission2InsectModalRight").hide();
    //Hide net and show final message
    if(fruitBats >= 5 && insectBats >= 3)
        $("#mission2EndRightHeader").html('<h1>GREAT JOB!</h1>');
    else if (fruitBats >= 5 && insectBats <= 2)
        $("#mission2EndRightHeader").html('<h1>FAIR JOB!</h1>');
    else
        $("#mission2EndRightHeader").html('<h1>POOR JOB!</h1>');

    $("#netNormal").hide();
    $("#mission2EndRight").show();

    $("#mission2EndModalTextContentText").html("You collected " + fruitBats.toString() + " Fruit Bats and " + insectBats.toString() + " Insectivorous Bats. Samples from the bats will be sent to the lab. They will be released unharmed because fruit bats help pollinate the forests and insectivorous bats eat insects that damage crops.<br><br>");
}

app.controller("ecologistNetPositionCtrl", function ($scope, $location) {
    var missionInterval;
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

    $("#netNormal").draggable(
   {
       containment: [300, 0, 1200, 700]
   });

    $("#mission2EndRight").hide();

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

    var batRepositioning = [true, true, true, true, true];
    var insectBatRepositioning = [true, true, true, true, true];
    var batTrapped = [false, false, false, false, false];
    var insectBatTrapped = [false, false, false, false, false];
    var batsInNet = 0;
    var fps = 0.02;

    insectBatsInterval = setInterval(function () {
        for (var i = 0; i < 5; i++) {
            var bat = "#insectBat" + ((i + 1).toString());

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
                //Move the bat downwards if he is on an upper position
                if (fruitBatsCompleted && netSet && insectBatsCaptured < insectBatsGoal) {
                    if ($(bat).position().top + 10 < heightTarget) {
                        //avoid the bat to be catched by the net while repositioning himself
                        y = $(bat).position().top + 12 * fps;
                        insectBatRepositioning[i] = true;
                    }
                        //Move the bat upwards if he is on an lower position
                    else if ($(bat).position().top - 10 > heightTarget) {
                        y = $(bat).position().top - 12 * fps;
                        //avoid the bat to be catched by the net while repositioning himself
                        insectBatRepositioning[i] = true;
                    }
                    else {
                        insectBatRepositioning[i] = false;
                    }
                }

                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                //Assign the new positions
                $(bat).css({ left: xpx });
                $(bat).css({ top: ypx });

                //Check if the bat is inside the net
                if (!insectBatsCompleted && netSet && !insectBatRepositioning[i] && batsInNet < 3 && $(bat).position().left > $("#netNormal").position().left + 100 && $(bat).position().left < $("#netNormal").position().left + 400) {
                    insectBatTrapped[i] = true;
                    batsInNet++;
                    //Make him draggable
                    $(bat).draggable({ disabled: false });
                }
            }
                //Check if the bat has been dragged enoughly far away from the net
            else if (!insectBatsCompleted && insectBatTrapped[i] && ($(bat).position().top > heightTarget + 50 || $(bat).position().top < heightTarget - 50)) {
                //Hide him and stop the dragging
                $(bat).draggable({ disabled: true });
                $(document).trigger("mouseup");
                $(bat).hide();
                batsInNet--;
                //Update the current score
                insectBatsCaptured++;
                sessionStorage.ecoCapturedInsectBat = true;
                insectBatTrapped[i] = false;
                $('#topCornerInsectBatModalCounter').html('<br><br><p>' + insectBatsCaptured.toString() + "/" + insectBatsGoal.toString() + "</p>");

                //Win condition
                if (insectBatsCaptured >= insectBatsGoal && !insectBatsCompleted) {
                    insectBatsCompleted = true;
                    batsInNet = 3;
                    $(document).trigger("mouseup");

                    //release all the bats
                    for (var i = 0; i < 5; i++) {
                        insectBatTrapped[i] = false;
                        $(bat).draggable({ disabled: true });
                    }

                    sessionStorage.ecoSpeedBonus = true;

                    EndNetEcologist(fruitBatsCaptured, insectBatsCaptured);    
                    
                }
                else {
                    //Create a new bat after a few seconds
                    setTimeout(function () {
                        for (var i = 0; i < 5; i++) {
                            var bat = "#insectBat" + ((i + 1).toString());
                            var isHidden = !($(bat).is(":visible"));
                            if (isHidden) {
                                var ypx = heightTarget.toString() + 'px';
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
                }
            }
        }
    }, fps * 100);

    batsInterval = setInterval(function () {
        //Fruit Bats Loop
        for (var i = 0; i < 5; i++) {
            var bat = "#fruitBat" + ((i + 1).toString());

            //if this bat is not trapped, move it
            if (!batTrapped[i]) {
                //Scale and direction
                if ($(bat).position().left >= 1500 && batsSpeed[i] > 0) {
                    batsSpeed[i] = batsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(-1, 1)" });
                }
                else if ($(bat).position().left <= 300 && batsSpeed[i] < 0) {
                    batsSpeed[i] = batsSpeed[i] * -1;
                    $(bat).css({ transform: "scale(1, 1)" });
                }               

                //Move the bat horizontally
                var x = $(bat).position().left + batsSpeed[i] * fps;
                var y = $(bat).position().top;
                //Move the bat downwards if he is on an upper position
                if (!fruitBatsCompleted)
                {
                    if ($(bat).position().top + 10 < heightTarget) {
                        //avoid the bat to be catched by the net while repositioning himself
                        y = $(bat).position().top + 12 * fps;
                        batRepositioning[i] = true;
                    }
                    //Move the bat upwards if he is on an lower position
                    else if ($(bat).position().top - 10 > heightTarget) {
                        y = $(bat).position().top - 12 * fps;
                        //avoid the bat to be catched by the net while repositioning himself
                        batRepositioning[i] = true;
                    }
                    else {
                        batRepositioning[i] = false;
                    }
                }

                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                //Assign the new positions
                $(bat).css({ left: xpx });
                $(bat).css({ top: ypx });
                
                //Check if the bat is inside the net
                if (!fruitBatsCompleted && netSet && !batRepositioning[i] && batsInNet < 3 && $(bat).position().left > $("#netNormal").position().left + 100 && $(bat).position().left < $("#netNormal").position().left + 400)
                {
                    batTrapped[i] = true;
                    batsInNet++;
                    //Make him draggable
                    $(bat).draggable({ disabled: false });
                }
            }
            //Check if the bat has been dragged enoughly far away from the net
            else if (!fruitBatsCompleted && batTrapped[i] && ($(bat).position().top > heightTarget + 50 || $(bat).position().top < heightTarget - 50))
            {
                //Hide him and stop the dragging
                $(bat).draggable({ disabled: true });
                $(document).trigger("mouseup");
                $(bat).hide();
                batsInNet--;
                //Update the current score
                fruitBatsCaptured++;
                sessionStorage.ecoCapturedFruitBat = true;
                batTrapped[i] = false;
                $('#topCornerBatModalCounter').html('<br><br><p>' + fruitBatsCaptured.toString() + "/" + fruitBatsGoal.toString() + "</p>");

                //Win condition
                if (fruitBatsCaptured >= fruitBatsGoal && !fruitBatsCompleted) {
                    //Restore dragging to the net
                    fruitBatsCompleted = true;
                    $('#netPositionConfirmDescriptionText').html('Insectivorous Bats like to fly<br>at lower altitudes');
                    $('#ecologistMission2TopTaskDescription').html('Move the net into the flight path<br>of the Insectivorous Bats.');
                    netSet = false;
                    batsInNet = 0;
                    //release all the bats
                    for (var i = 0; i < 5; i++) {
                        batTrapped[i] = false;
                        $(bat).draggable({ disabled: true });
                    }

                    //Start catching bats
                    $("#topCornerBatModal").hide();
                    $("#mission2InsectModalRight").show();
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
                                var ypx = heightTarget.toString() + 'px';
                                if (fruitBatsCompleted)
                                    ypx = "180px";

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
                }
            }
        }
    }, fps*100);
    $("#netPositionConfirmTitleText").hide();
    $("#netPositionConfirmDescriptionText").hide();

    $("#netNormal").on('mouseup', function () {
        //if should capture fruit bats
        if (fruitBatsCaptured <= 0) {
            if ($("#netNormal").position().top > (window.innerHeight / 3.9)) {
                //Calculate the position of the confirm text based on the net position
                var y = $("#netNormal").position().top - 90;
                var x = $("#netNormal").position().left + 180;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                $("#netPositionConfirmTitleText").css({ top: ypx });
                $("#netPositionConfirmTitleText").css({ left: xpx });
                y = y + 50;
                x = x - 70;
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
                netSet = true;
                $("#netNormal").draggable({ disabled: true });
            }
        }
        //if it should capture insect bats
        else if (fruitBatsCompleted)
        {
            if ($("#netNormal").position().top <= (window.innerHeight / 1.8)) {
                //Calculate the position of the confirm text based on the net position
                var y = $("#netNormal").position().top - 90;
                var x = $("#netNormal").position().left + 190;
                var ypx = y.toString() + 'px';
                var xpx = x.toString() + 'px';
                $("#netPositionConfirmTitleText").css({ top: ypx });
                $("#netPositionConfirmTitleText").css({ left: xpx });
                y = y + 50;
                x = x - 100;
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

    });

    //net dragging callback
    $("#netNormal").on('drag', function () {
        $('#netCircularField').hide();
        $("#netPositionConfirmTitleText").hide();
        $("#netPositionConfirmDescriptionText").hide();
        $("#netDragHand").hide();

        if ($("#netNormal").position().top > 340) {
            $("#Title").show();
            $("#ecologistMission2TopTaskDescription").show();
        }
        else
        {
            $("#Title").hide();
            $("#ecologistMission2TopTaskDescription").hide();
        }
    });

    //Start Insectivorous bat catching callback
    $scope.beginInsect = function () {
        $("#netNormal").draggable({ disabled: false });
        $("#mission2InsectModalRight").hide();
        $("#topCornerBatModalInsect").show();
    }

    $scope.seeResults = function () {
        clearInterval(missionInterval);
        clearInterval(batsInterval);
        clearInterval(insectBatsInterval);
        $location.path('ecologistResults');
    }

    $('#missionCountdownNumber').css(
       {
           'right': '118px'
       });

    var countdownNumber = $('#missionCountdownNumber');
    var countdown = 30;

    countdownNumber.html(30);

    missionInterval = setInterval(function () {
        countdown = --countdown <= -1 ? 30 : countdown;

        if (countdown < 10) {
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

        countdownNumber.html(countdown)

        if (countdown == 0) {
            sessionStorage.bloodSampleSpeedBonusStar = false;

            $('.headerRow').hide();
            $('.contentRow').hide();
            $('#mission2StartCountdown').hide();
            $('#missionBeginText').hide();
            $('#missionCountdownNumber').hide();
            $('#modalMiddle').show();

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

            EndNetEcologist(fruitBatsCaptured, insectBatsCaptured);
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

