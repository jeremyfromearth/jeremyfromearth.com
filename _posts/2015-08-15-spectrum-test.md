---
layout: post
date: 2014-08-19 23:56:45
description: Testing Spectrum in the blog
categories:
- blog
permalink: spectrum-test
heading: Spectrum Test
---




Just a sample post to show Spectrum working this site

____

<canvas id="spectrum-test-canvas" class="post-canvas" width="800" height="450"></canvas>
<script>
require(['spectrum/Player', 'visible/charting/NetworkGraph'], function(Player, App) {
    var canvas = document.getElementById("spectrum-test-canvas");
    var ctx = canvas.getContext('2d');
    var app = new App(ctx);

    var player = new Player(canvas);
    player.setRenderer(app);
    player.init();
    player.play();
});
</script>
