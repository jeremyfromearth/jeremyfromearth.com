----
layout: page
headline: projects
title: Spectrum
group: navigation
description: an HTML5 Canvas framework with a concise drawing API, simple animation loop and a handful of helpful utilities.
---
# Spectrum
* src: [https://github.com/jeremynealbrown/spectrum](https://github.com/jeremynealbrown/spectrum)
* deps: [require.js](http://requirejs.org/)
* tags: creative-coding, canvas, data-visualization

----

##### OVERVIEW
Spectrum is an HTML5 Canvas framework with a concise drawing API, simple animation loop and a handful of helpful utilities. The motivation behind this project is to provide a simple and consistent means of creating programmatic visualizations. The syntax is mostly declarative and meant to pack a lot of functionality into every single line of code.

##### INSTALLATION
Spectrum is registered with bower.io. To install with Bower, simply use: `bower install spectrum-js`. You can also just link directly to the source code in `spectrum/js`.

The project file structure is set up as follows:

{% highlight yaml %}
spectrum:
    #coffeescript for spectrum itself
    - coffee/
    #spectrum demos
    - demos/
        #coffeescript for demos
        - coffee/
        #stylesheets for demos
        - css/
        #an html file for each demos
        - html/
        #the compiled source code for each demos
        - js/
    #compiled source code for spectrum
    - js/
    #bower descriptor
    - bower.json
    #file for auto-compiling all of spectrum and demos
    - Cakefile
{% endhighlight %}

##### ANATOMY OF A SPECTRUM APP
A Spectrum app is comprised of an instance of the `Player` class and an instance of a `Renderer` *subclass*. The `Player` is responsible for managing a render loop and events and the `Renderer` is responsible for drawing. The `Renderer` should be sub-classed, while the `Player` can be used as it is out of the box.

The following snippet demonstrates a very basic app that animates a blue ball across the screen.

{% highlight coffee %}
define ['spectrum/Renderer'], (Renderer) ->
    class Demo extends Renderer
        # initialize any member variables
        init : =>
            @point = [0, @height * 0.5]
        # called every frame prior to render()
        # this is a good place to update variables
        step : =>
            @point[0]++
        # called every frame after step()
        # this is where all drawing should happen
        render : =>
            @color "blue"
            @circle @point, 10, true
{% endhighlight %}

The above code won't do anything by itself. It is only a renderer and needs to be coupled with an instance of the `Player` class in order for it to be displayed. Often it is most straightforward to take care of this in an inline `<script>` tag, using plain JavaScript, like so:

{% highlight html %}
<html>
    <head>
        <title>Spectrum Basic Demo</title>
        <script>
            require(['spectrum/js/Player', 'Demo'], function(Player, Demo) {
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext('2d');
                var demo = new Demo(ctx);
                var player = new Player(canvas);
                player.setFullWindow(true)
                player.setRenderer(demo);
                player.init();
                player.play();
            });
        </script>
    </head>
    <body>
        <canvas id="canvas" width="1024" height="540"></canvas>
    </body>
</html>
{% endhighlight %}
