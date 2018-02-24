---
layout: post
date: 2018-02-23
categories:
  - status
published: true
permalink: blog/hibernation
headline: blog
heading: Hibernation Synthesis
extract: It's been a mild winter here in Oregon and I've kept pretty busy a variety of projects on both work and play...
---

![Snowy view from my window](/assets/images/blog/hibernation.jpg)

It's been a pretty mild winter here in Oregon, however February has been colder than previous months and the brittle air has inspired many meditative hours spent coding to strange and surreal ambient soundscapes. I've compiled some of my favorite blissfully bleeping tracks into [an hour long playlist][google-playlist]. It's certain to convert your space into a beautiful hibernation lair.

Here's the track listing:
1. Movement 3, Perpetual - Ryuichi Sakamoto / Illuha / Taylor Deupree
1. waves, Field - Shuttle358
1. Aoka, Somi - Taylor Deupree
1. Kuula (Kiitos), Tummaa - Vladislav Delay
1. Return, Horizon - Christopher Willits
1. Snow Slowed, Lowlands - Taylor Deupree
1. Vitra Desk, Dok - Oval
1. Ecclectrig, Init Ding - Microstoria
1. Losing Houston, All India Radio - The Inevitable

[Enjoy :)][google-playlist]

## Development Log

#### uibot
In other news, I completely refactored the CSS for [UIBot][uibot]. It now uses CSS3 Flexbox for laying out components. Editing CSS is not my favorite thing to do, but I have to say that it is pretty satisfying when you find the right tool for the job. Flexbox makes seemingly sophisticated layouts simple to conceptualize and build. The layout and nesting rules it provides are simple and intuitive and in general it seems to simplify responsive design quite a bit!

#### magic-window
I made some significant updates to [MagicWindow][magic-window] and added a new sample that demostrates the Particle Demo, from the Cinder samples, running in a MagicWindow app. I also added a getting started guide to the README file.

![Image of the particle simulation](/assets/images/blog/magic-window-particle-demo.jpg)

#### pixelspace-demos
I've been working to convert the [Pixelspace demos][pixelspace-demos] to ES6 style JavaScript. In that process, I've built a testbed app that demonstrates all of the various features on a single web page. It's coming along nicely and I'm hoping to finish it up over the next few days.

## Online Courses
I also finished *Structuring Machine Learning Projects* offered by [DeepLearning.ai][deep-learning-ai] through Coursera. It was a short and simple course that provided some really nice insights into the more practical aspects of working with Deep Learning. I particularly enjoyed learning about Bayes Error and Human error as a metric for evaluating performance. It is interesting to consider that once Human performance is surpassed by machines, it becomes more difficult to train a learning algorithm. It poses the question that if a machine can outperform a human, how will a human know how to improve the performance of the machine?

## Next Steps
My first priority is to finish up the Pixelspace demos. After that, I'm planning to get back to work on my Natural Language Processing project, called Metonym. It's very close to being feature complete for an alpha release and I'm looking forward to introducing it to the [RASA NLU][rasa] community once it is ready. Maybe I'm just getting a jump on Spring cleaning, but I'm trying to de-clutter and wrap up some older project before diving into a bunch of new ideas next month!

[google-playlist]:https://play.google.com/music/playlist/AMaBXyn6x3oCL62vXjK3GH0srTkql5V-Qq5nwFNr1ufLv4y8nahVq2HxYVdLrt-Fa49BbF_j2vUWWb24UFl6Jms_xpNgkuiYnw%3D%3D
[uibot]:https://github.com/jeremyfromearth/uibot
[magic-window]:https://github.com/jeremyfromearth/magic-window
[deep-learning-ai]:https://deeplearning.ai
[pixelspace-demos]:https://github.com/jeremyfromearth/pixelspace-demos
[rasa]:http://rasa.com
