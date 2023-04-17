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

console.log(device)

var i;
// if user device is iPad.


var scale = function () {
    // Window width.
    var ww = $(window).width();
    // Window height.
    var wh = $(window).height();

    if (device == 'iPad') {

        //i = window.frameElement.parentElement;
        //ww = i.offsetWidth;
        //wh = ww * newAspect;
    };

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

    console.log(ratio)
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


//SCROLL TOUCH IOS

var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        
      var top = el.scrollTop
        , totalScroll = el.scrollHeight
        , currentScroll = top + el.offsetHeight
  
      //If we're at the top or the bottom of the containers
      //scroll, push up or down one pixel.
      //
      //this prevents the scroll from "passing through" to
      //the body.
      if(top === 0) {
        el.scrollTop = 1
      } else if(currentScroll === totalScroll) {
        el.scrollTop = top - 1
      }
    })
  
    el.addEventListener('touchmove', function(evt) {
        
      //if the content is actually scrollable, i.e. the content is long enough
      //that scrolling can occur
      if(el.offsetHeight < el.scrollHeight)
        evt._isScroller = true
    })
  }
  
  overscroll(document.querySelector('.scaleContainer'));
  
  document.body.addEventListener('touchmove', function(evt) {
    console.log("EVENT TOUCH")
    //In this case, the default behavior is scrolling the body, which
    //would result in an overflow.  Since we don't want that, we preventDefault.
    if(!evt._isScroller) {
      evt.preventDefault()
    }
  })