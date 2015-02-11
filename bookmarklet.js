var module;
var script = document.createElement('script');
script.onload = function() {
  var stats = new MemoryStats();

    stats.domElement.style.position = 'fixed';
    stats.domElement.style.right        = '0px';
    stats.domElement.style.bottom       = '0px';

    document.body.appendChild( stats.domElement );

    requestAnimationFrame(function rAFloop(){
        stats.update();
        requestAnimationFrame(rAFloop);
    });
};
script.src = "https://cdn.rawgit.com/paulirish/memory-stats.js/b2fde44a6279d72dd272c04a01d1f67327906188/memory-stats.js";
document.getElementsByTagName('head')[0].appendChild(script);