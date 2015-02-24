/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 * @author paulirish / http://paulirish.com/
 */
var MemoryStats = function (){

	var msMin	= 100;
	var msMax	= 0;
	var GRAPH_HEIGHT = 30;
	var redrawMBThreshold = GRAPH_HEIGHT;

	var container	= document.createElement( 'div' );
	container.id	= 'stats';
	container.style.cssText = 'width:80px;height:48px;opacity:0.9;cursor:pointer;overflow:hidden;z-index:10000;will-change:transform;';

	var msDiv	= document.createElement( 'div' );
	msDiv.id	= 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
	container.appendChild( msDiv );

	var msText	= document.createElement( 'div' );
	msText.id	= 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML= 'Memory';
	msDiv.appendChild( msText );

	var msGraph	= document.createElement( 'div' );
	msGraph.id	= 'msGraph';
	msGraph.style.cssText = 'position:relative;width:74px;height:' + GRAPH_HEIGHT + 'px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:' + GRAPH_HEIGHT + 'px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var updateGraph = function ( dom, height, color ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = height + 'px';
		if( color ) child.style.backgroundColor = color;

	};

	var redrawGraph = function(dom, oHFactor, hFactor) {
		[].forEach.call(dom.children, function(c) {
			var cHeight = c.style.height.substring(0, c.style.height.length-2);

			// Convert to MB, change factor
			var newVal = GRAPH_HEIGHT - ((GRAPH_HEIGHT - cHeight)/oHFactor) * hFactor;

			c.style.height = newVal + 'px';
		});
	};

	// polyfill usedJSHeapSize
	if (window.performance && !performance.memory){
		performance.memory = { usedJSHeapSize : 0, totalJSHeapSize : 0 };
	}

	// support of the API?
	if( performance.memory.totalJSHeapSize === 0 ){
		console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .');
	}

	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	var precision;
	var i;
	function bytesToSize( bytes, nFractDigit ){
		if (bytes === 0) return 'n/a';
		nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
		precision = Math.pow(10, nFractDigit);
		i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
	}

	// TODO, add a sanity check to see if values are bucketed.
	// If so, remind user to adopt the --enable-precise-memory-info flag.
	// open -a "/Applications/Google Chrome.app" --args --enable-precise-memory-info

	var lastTime	= Date.now();
	var lastUsedHeap = performance.memory.usedJSHeapSize;
	var delta = 0;
	var color = "#131";
	var ms = 0;
	var mbValue = 0;
	var factor = 0;
	var newThreshold = 0;

	return {
		domElement: container,

		update: function () {

			// update at 30fps
			if( Date.now() - lastTime < 1000/30 ) return;
			lastTime = Date.now();

			delta = performance.memory.usedJSHeapSize - lastUsedHeap;
			lastUsedHeap = performance.memory.usedJSHeapSize;

			// if memory has gone down, consider it a GC and draw a red bar.
			color = delta < 0 ? '#830' : '#131';

			ms = lastUsedHeap;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );
			msText.textContent = "Mem: " + bytesToSize(ms, 2);

			mbValue	= ms / (1024*1024);
			
			if(mbValue > redrawMBThreshold) {
				factor = (mbValue - (mbValue % GRAPH_HEIGHT))/ GRAPH_HEIGHT;
				newThreshold = GRAPH_HEIGHT * (factor + 1);
				redrawGraph(msGraph, GRAPH_HEIGHT/redrawMBThreshold, GRAPH_HEIGHT/newThreshold);
				redrawMBThreshold = newThreshold;
			}

			updateGraph( msGraph, GRAPH_HEIGHT-mbValue*(GRAPH_HEIGHT/redrawMBThreshold), color);


		}

	};

};

if (typeof module !== "undefined" && module.exports) {
	module.exports = MemoryStats;
}
