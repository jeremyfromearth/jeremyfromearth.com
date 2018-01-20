---
layout: post
date: 2015-11-15
description: An extension for Swift's SCNVector3 providing common vector operations
categories:
- code
permalink: blog/scnvector3-extension
headline: blog
heading: SCNVector3 Extension for SceneKit
---
The `SCNVector3` class for SceneKit is a bit under-featured. Here is an extension that adds many useful operators and a few nice to have methods to it. A feature in Swift that is particularly helpful here is the ability to declare a function parameter as an [`inout`](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID545) variable. This allows you to reassign a value to the variable itself. This is especially useful for defining `+=`, `*=` and the like.

{% gist jeremyfromearth/46017fc3fe93eb611387 %}

## Two Examples

### Adition & Subtraction
{% highlight swift %}
let v1 = SCNVector3(0, 0, 1)
let v2 = SCNVector3(2, 1, 5)
var v3 = v1 + v2
print(v3) // 2.0, 1.0, 6.0)
v3 -= SCNVector3(8, 16, 32)
print(v3) // (-6.0, -15.0, -26.0)
{% endhighlight %}

### Multiplication & Division
{% highlight swift %}
let v1 = SCNVector3(1, 2, 1)
let v2 = SCNVector3(2, 3, 4)
var v3 = v1 * v2
print(v3) // (2, 6, 4)
v3 /= 2
print(v3) // (1, 3, 2)
{% endhighlight %}

## More on the way
These additions to the `SCNVector3` will prove very useful in up-coming articles about creating custom geometry using Swift & Scenekit.
