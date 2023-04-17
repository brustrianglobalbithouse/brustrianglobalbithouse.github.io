//v4
// * Timmer para actividades en IPAD scale()
// * Adaptación a BLINK Learning (origin transform top center)
// * native javascript
'use strict';

// Scale ratio.
var ratio = 1;

//Stage dimensions.
var sw = 1920;
var sh = 1080;

//Get the Stage Aspect.
var aspect = sw / sh;
var newAspect = 16 / 9;
// var orientation;
// var orientation = Math.abs(window.orientation);
var device = navigator.platform;

var i;


// Window width.
var ww = 0;
// Window height.
var wh = 0;

if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    ww = window.innerWidth;
    wh = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    ww = document.documentElement.clientWidth;
    wh = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    ww = document.body.clientWidth;
    wh = document.body.clientHeight;
}

var scale = function () {

    // Window width.
    var ww = 0;
    // Window height.
    var wh = 0;
    
    
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        ww = window.innerWidth;
        wh = window.innerHeight;
        // console.log("Non-IE")
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        ww = document.documentElement.clientWidth;
        wh = document.documentElement.clientHeight;
        // console.log("E 6+ in 'standards compliant mode'")
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        ww = document.body.clientWidth;
        wh = document.body.clientHeight;
        // console.log("IE 4 compatible")
    }
    

    //DEFINE RATIO
    var nw = ww / sw;
    var nh = wh / sh;
    if(nw <= nh){
        ratio = nw
    }else if(nw > nh){
        ratio = nh
    }

    document.getElementById("scaleContainer").style.transform = 'scale(' + ratio + ') translate(-50%, 0px)';
    document.getElementById("scaleContainer").style.transformOrigin = '0px 0px';
    document.getElementById("scaleContainer").style.top = '0px';
    document.getElementById("scaleContainer").style.left = '50%';

    document.getElementById("appParent").style.width = '100%';
    document.getElementById("appParent").style.height = '100%';

    // console.log("window.innerWidth: ", window.innerWidth)
    // console.log("window.innerHeight: ", window.innerHeight)
    // console.log("document.documentElement.clientWidth: ", document.documentElement.clientWidth)
    // console.log("document.documentElement.clientHeight: ", document.documentElement.clientHeight)
    // console.log("document.body.clientWidth: ", document.body.clientWidth)
    // console.log("document.body.clientHeight: ", document.body.clientHeight)

};


scale();

var tryswidth = 0;

var valWidth = setInterval(function () {

        if (device == 'iPad') {
            document.getElementById("appParent").style.width = '90%';
            document.getElementById("appParent").style.height = '90%';            
        }

        setTimeout(function(){
            scale();
        }, 500)


    tryswidth += 1;
    
    
    //10 INTENTOS EN 10 SEGUNDOS PARA REACOMODAR EL WIDTH DEL PARENT FRAME
    if( tryswidth == 10 ){
        clearInterval(valWidth);
    }

}, 1000);



if (device == 'iPad') {
        
}

window.addEventListener("orientationchange", function () {
    scale();
});

window.addEventListener('resize', function () {
    scale();
});

(function() {
    scale();
})();

function goFullScreen() {
    var cv = document.getElementById("appParent");
    if (!document.fullscreenElement) {
        cv.requestFullscreen().catch(function (err) {
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
        }
    }else if(e.message  !== undefined){
        if(e.message === 'fullscreen'){
            goFullScreen();
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
    //In this case, the default behavior is scrolling the body, which
    //would result in an overflow.  Since we don't want that, we preventDefault.
    if(!evt._isScroller) {
      evt.preventDefault()
    }
  })