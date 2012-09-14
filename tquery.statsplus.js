tQuery.World.registerInstance('enableStatsPlus', function(){
	var world	= this;
	
	var statsWebGL	= new StatsThreejsWebgl();
	statsWebGL.domElement.style.position	= 'absolute';
	statsWebGL.domElement.style.right	= '0px';
	statsWebGL.domElement.style.bottom	= (47*2)+'px';
	document.body.appendChild( statsWebGL.domElement );
	world.loop().hook(function(){
		statsWebGL.update(world.tRenderer());
	});

	var statsMemory	= new StatsMemory();
	statsMemory.domElement.style.position	= 'absolute';
	statsMemory.domElement.style.right	= '0px';
	statsMemory.domElement.style.bottom	= (47*1)+'px';
	document.body.appendChild( statsMemory.domElement );
	world.loop().hook(function(){
		statsMemory.update();
	});

	var statsDelay	= new StatsDelay();
	statsDelay.domElement.style.position	= 'absolute';
	statsDelay.domElement.style.right	= '0px';
	statsDelay.domElement.style.bottom	= '0px';
	document.body.appendChild( statsDelay.domElement );
	world.loop().hook(function(){
		statsDelay.update();
	});
	
	return this;	// for chained API
})