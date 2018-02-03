---
layout: post
date: 2018-02-06
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
In this post I'll demostrate how two of my JavaScript libraries, [Pixelspace](https://github.com/jeremyfromearth/pixelspace) and [UIbot](https://github.com/jeremyfromearth/uibot) can be used together to create interactive visualizations in the browser. 

Pixelspace makes drawing shapes, lines and text easy using the HTML5 Canvas API. The Canvas is already a pretty high level drawing interface. That said, there is still a good amount of boiler plate code that can be abstracted away. So, I decided to wrap that functionality into a couple of classes and call it Pixelspace.

UIBot is another library I've written that enables the autonomous creation of simple user controller interfaces. This achieved by supplying the `UIBot.build` method with a target object, whose properties are intended to be changed by the generated UI, and a params objects, which describes detials and constraints about those changes.

<canvas id='sketch'></canvas>

<div id='uibot'>

</div>

<script>
require(['app/waves', 'lib/uibot'], function(Waves, uibot) {
  console.log(Waves);
  console.log(UIBot);
  var params = {
    
  };
});
</script>


