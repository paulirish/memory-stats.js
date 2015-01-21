## memory-stats.js

Like [stats.js](https://github.com/mrdoob/stats.js/) but for JS memory

[@jeromeetienne](https://github.com/jeromeetienne/), inspired by mrdoob's stats.js code, wrote this as part of [tquery](https://github.com/jeromeetienne/tquery). I've now promoted it to a standalone repo and cleaned it all up.

![image](http://i.imgur.com/eUCFcAH.gif)

### Usage:

1. Start Chrome with `--enable-precise-memory-info`
    - Otherwise the results from performance.memory are bucketed and less useful.
1. Include memory.stats.js
1. Instatiate it (`stats = new MemoryStats()`, add the `stats.element` to the DOM, and run `stats.update()` regularly.

That might look something like:

```js
    var stats = new MemoryStats();

    stats.domElement.style.position = 'fixed';
    stats.domElement.style.right        = '0px';
    stats.domElement.style.bottom       = '0px';
    
    document.body.appendChild( stats.domElement );

    requestAnimationFrame(function rAFloop(){
        stats.update();
        requestAnimationFrame(rAFloop);
    });
```

Run Chrome with the flag and open `demo/index.html` to see it in action.