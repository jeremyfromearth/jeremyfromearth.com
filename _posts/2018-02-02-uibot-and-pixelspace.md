---
layout: post
date: 2018-02-02
categories:
  - code
  - uibot
  - pixelspace
published: false
permalink: blog/reboot
headline: blog
heading: Pixelspace & UIBot
description: In this post I'll demostrate how to use a couple of my JavaScript libraries, Pixelspace & UIbot can be used together to create interactive visualizations.
---
In this post I'll demostrate how two of my open source projects, [Pixelspace](https://github.com/jeremyfromearth/pixelspace) and [UIbot](https://github.com/jeremyfromearth/uibot) can be used together to create interactive visualizations in the browser. 

<style>
  .uibot-container {
    width: 100%;
    padding-bottom: 1em;
  }
</style>

<script>
require(['lib/pixelspace', 'lib/uibot', 'app/waves'], function(Pixelspace, uibot, Waves) {
  var canvas = document.getElementById('sketch');
  var uibot_container = document.getElementById('uibot');
  if(canvas) {
    var ctx = canvas.getContext('2d');
    var renderer = new Waves(ctx);
    player = new Pixelspace.Player(canvas);
    player.setRenderer(renderer);
    player.init();
    player.play();

    var params = [{
      t: {
        label: 'Time Step'
      }
    }
    ];

    var uibot = UIBot();
    uibot.build(renderer, params, uibot_container); 
  }
});
</script>

<canvas id='sketch' width="1024" height="512"></canvas>
<div id='uibot' class='uibot-container'></div>

Pixelspace makes sketching visualizations easy, using the HTML5 Canvas API. The Canvas is most certainly a high level drawing interface. Howerver, prior to Pixelspace, I found myself re-writing the same boiler plate code each time I started a new sketch. So, I decided to wrap that basic functionality into a couple of classes and call it Pixelspace.

UIBot is another library I've written that enables the autonomous creation of simple user controller interfaces. This achieved by supplying the `UIBot.build` method with a target object, whose properties are intended to be changed by the generated UI, and a params objects, which describes detials and constraints about those changes.



