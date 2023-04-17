// Scale ratio.
var ratio = 1;

//Stage dimensions.
var sw = 1920;
var sh = 1080;

//Get the Stage Aspect.
var aspect = sw / sh;
var newAspect = 16 / 9;
var orientation;
var

//Get orientation
orientation = Math.abs(window.orientation);
var device = navigator.platform;


var i;
// if user device is iPad.


var scale = function () {
    // Window width.
    var ww = $(window).width();
    // Window height.
    var wh = $(window).height();

    var frame = window.frameElement;
    if (!frame) {
        nw = ww / sw;
        nh = wh / sh;
        if(nw <= nh){
            ratio = nw
        }else if(nw > nh){
            ratio = nh
        }
    } else {
        var frameHeight = frame.parentElement.parentElement.parentElement.offsetHeight;
        ratio = frameHeight / sh;

        var frameWidth = frame.parentElement.offsetWidth;
        if (frameHeight * aspect > frameWidth) {
            ratio = frameWidth / sw;
        }
    }

    //Hide scrollbar.
    $('body').css('overflow', 'hidden');

    $('.scaleContainer').css({
        '-webkit-transform': 'scale(' + ratio + ')',
        '-moz-transform': 'scale(' + ratio + ')',
        '-ms-transform': 'scale(' + ratio + ')',
        '-o-transform': 'scale(' + ratio + ')',
        'transform': 'scale(' + ratio + ')'
    });

    $('#appParent').width(document.body.clientWidth);
    $('#appParent').height(window.innerHeight);

};


scale();


window.addEventListener("orientationchange", function () {
    scale();
});

window.addEventListener('resize', function () {
    scale();
});

var Trace
var loadScripts

$(document).ready(function(){
    loadScripts = new libraryLoader();
    loadScripts.loadScriptsInOrder([
        './santillana_traceability_library.js',
    ]).then(function() {

        console.log("loader santillana library - correcto");
        Trace = window.SANTILLANA_TRACE;
        if( !Trace.hasTrace ){
            console.log("no hay traza");
        }else{
            Trace.initialize();
        }
        
    }).catch(function(e){
        console.log("error:");
        console.log(e);
    });
});

function scoreActivity(score){
    console.log(score)
    if( !Trace.hasTrace ) return
    Trace.score = score
    Trace.complete(score)
}

function goFullScreen(){
    cv = document.getElementById("appParent");
    if (!document.fullscreenElement) {
        cv.requestFullscreen().catch(err => {
            alert("No es posible ver en pantalla completa en este dispositivo");
        });
    } else {
        document.exitFullscreen();
    }
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    if(e.data !== undefined){
        if(e.data === 'fullscreen'){
            goFullScreen();
        }else{
            scoreActivity(e.data);
        }
    }else if(e.message  !== undefined){
        if(e.message === 'fullscreen'){
            goFullScreen();
        }else{
            scoreActivity(e.message);
        }
    }
});