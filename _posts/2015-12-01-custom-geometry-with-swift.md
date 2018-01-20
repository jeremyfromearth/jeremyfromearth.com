---
layout: post
date: 2015-12-01
description: An introduction to creating custom 3D geometry with Swift and SceneKit
categories:
- code
permalink: blog/custom-geometry-swift-scenekit
headline: blog
heading: Custom 3D Geometry With Swift and SceneKit
---
In this article I'll demonstrate an of example of creating custom 3D geometry for SceneKit using the Swift programming language. We'll look at how to create the simple yet very interesting polyhedron known as the [Icosahedron](https://en.wikipedia.org/wiki/Icosahedron).

![Icosahefron made with SceneKit](/assets/images/blog/scenekit-icosahedron.png)

As stated on the Wikipedia page, the Icosahedron consist of 12 vertices which compose 30 edges and 20 faces. In the following code for an Icosahedron class you can see how these vertices are defined quite explicity. Interestingly, the vertices of an Icosahedron can be defined by three orthogonal rectangles. It just so happens that these [rectangles are of the golden variety](https://en.wikipedia.org/wiki/Golden_rectangle), which explains why you see the golden ratio as the variable t. The property `vertices` is a list of `SCNVector3` objects that define the corners of those three rectangles.

{% gist jeremyfromearth/9ac4084b5d8cec0d5e1d %}

## Vertices & Indices
As mentioned above, there are 12 vertices. In order to draw different types of geometries we need to define the order in which to connect these vertices. The lists `faceIndices`, `planeIndices` and `wireframeIndices` do just this. These lists of indices are used to point to the vertices for each type of drawing. Faces are described by triangles, hence the seperation into groups of three. Planes and wireframes are drawn as lines and are sepearated into groups of two, to represent two vertices for each line.

## Example Usage
The following snippet shows how to use the above class. Some important code regarding setting up your view and camera is not covered here. There are plenty of [tutorials out there about SceneKit basics](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=scenekit%20tutorial).

{% highlight swift  %}
let scene = SCNScene()
let icosahedron = Icosahedron()
let facesNode = SCNNode(geometry: icosahefron.faces)
let wireframeNode = SCNNode(geometry: icosahedron.wireframe)
scene.rootNode.addChildNode(node)
{% endhighlight %}

## A Bit More Detail
Careful readers will notice that the Icosahedron class extends `Geometry`. You may have also noticed the `createGeometry` method called in each of the lazy properties and that that method is not declared in the Icosahedron class. In order to actually create the data that the underlying rendering engine requires to display our content, we need to carry out some conversions on the vertex and index lists. The `Geometry` class, listed below, is responsible for this.

{% gist jeremyfromearth/e1b10d156133efd1b20a %}

## Wrapping Up
In this article we looked at creating geometry from a hardcoded set of vertices and indices. Coming up, we'll explore using the existing data structures in the Icosahedron as the seed for a more dynaimic geometric object called the IcoSphere.
