---
layout: post
date: 2015-08-18 21:23:45
description: A quick tip for getting up and running with DotCloud
categories:
- serverside
permalink: blog/dotclouds-broken-five-minute-quickstart
headline: blog
heading: DotCloud's Broken 5 Minute Quickstart
---

If you run into this error when attempting to create a user on Linux or OSX:

`-bash: /usr/local/bin/dcuser: python: bad interpreter: No such file or directory`

you'll need to make a quick adjustment to the file:

`/usr/local/bin/dcuser`.

At the top of the file change `#!python`, to `#!/usr/bin/python`
