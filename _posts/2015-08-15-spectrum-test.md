---
layout: post
date: 2015-08-14 23:56:45
description: Testing Spectrum in the blog
categories:
- blog
permalink: blog/spectrum-test
headline: blog
heading: Spectrum Tests
---

Sample post to show [Spectrum](https://github.com/jeremynealbrown/spectrum) working with this site

<canvas id="spectrum-test-canvas" class="post-canvas" width="1024" height="640"></canvas>
<script>
require(['spectrum/Player', 'spectrum_demos/NetworkGraph'], function(Player, App) {
    var canvas = document.getElementById("spectrum-test-canvas");
    var ctx = canvas.getContext('2d');
    var app = new App(ctx);

    var player = new Player(canvas);
    player.setRenderer(app);
    player.init();
    player.play();
});
</script>

{{ include "http://code.jeremynealbrown.com/visible/coffee/charting/NetworkGraph.coffee" }}
