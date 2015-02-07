## memory-stats.js

Like [stats.js](https://github.com/mrdoob/stats.js/) but for JS memory

[@jeromeetienne](https://github.com/jeromeetienne/), inspired by mrdoob's stats.js code, wrote this as part of [tquery](https://github.com/jeromeetienne/tquery). I've now promoted it to a standalone repo and cleaned it all up.

![image](http://i.imgur.com/eUCFcAH.gif)

### Usage:

1. Start Chrome [with](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) `--enable-precise-memory-info`
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

# Framework adaptors

* Angular component by [@livingobjects](https://github.com/livingobjects): https://github.com/livingobjects/angular-memory-stats
* Ember addon by [@stefanpenner](https://github.com/stefanpenner): https://github.com/stefanpenner/ember-browser-stats
