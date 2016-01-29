---
layout: post
date: 2015-12-07
description: Building on the work in the last couple of posts to create an IcoSphere
categories:
- code
permalink: blog/icosphere-with-scenekit
headline: blog
heading: Creating an IcoSphere with Swift & SceneKit
---
In my [last article](/blog/custom-geometry-swift-scenekit) I wrote about how to create an Icosahedron using Swift and SceneKit. The example used hard-coded values for the vertices and indices that define the shape. In this article, I'll show how we can create a sphere using that same data for initial values combined with an iterative algorithm. The algorithm takes each face of the Icosahedron and sub-divides it into four new triangles. The vertices of which are turned into new faces to be once again sub-divided in the next iteration.

![IcoSphere with one sub-division](/assets/images/blog/icosphere-1-subdivision.png)
__IcoSphere with one sub-division__

![IcoSphere with thre sub-divisions](/assets/images/blog/icosphere-3-subdivisions.png)
__IcoSphere with three sub-divisions__

Before we take a look at the code, make sure you take a look at the [extension for SCNVector](https://gist.github.com/simon-theta/8a9734849753e926a278) that I wrote about a while back. This algorithm uses two methods from that extension. Additionally, the following code also relies on a base class that I wrote about in my [previous article](https://gist.github.com/simon-theta/40d6efd44bd5bc4975f4).

<script src="https://gist.github.com/jeremynealbrown/1b2ca5d7da16bd781e64.js"></script>

## The Algorithm
The algorithm is pretty simple. It looks something like this:

* Initialize the data for vertices, faces and wireframe indices to the values of the Icosahedron
* Create a map of vertex string representations to indices (used to ensure no duplicates)
* For every sub-division:
    * Make a copy of the list of faces (used in the loop)
    * Initialize the faces and wireframe lists to empty lists
    * For each face (triangle - a set of three points)
        * Make a reference to the index of each vertex in the face
        * Make a reference to each actual vertex (`SCNVector3`)
        * Sub-divide each side of the triangle to create three new vertices.
        * Store each of the new vertices if they aren't already stored
        * Add indices for new vertices
        * Add new indices for points in the wireframe

## Laziness
 One interesting thing that I did not cover in the previous article was the use of the `lazy` keyword. This tells Swift to wait until the variable is accessed before it does any work to initialize it. Then, any subsequent references to it will use the value it was first initialized to. This is particularly useful in this case, because it is likely that you might only want face or wireframe data. If this were so, you could save memory by only creating the data you actually needed, just by making reference to it. Pretty cool.

## Wrapping Up
 In this article we looked at how to use the hard coded vertex and index data of the Icosahedron to programmatically create new geometry. No promises, but a logical next articles may involve calculating normals and deforming the sphere.
