---
layout: post
date: 2018-05-07
categories:
  - code
published: true
permalink: blog/numpy-slice-tutorial
headline: blog
heading: Numpy Slice Tutorial
extract: A look at how to use the slice feature to extract data from multi-dimensional Numpy arrays
---

In this tutorial we'll take a look at the slice operator of the Numpy array. This feature of Numpy is virtually indespensible when working with multi-dimensional arrays.

Often when I'm exploring a new Numpy feature, I like to shorten the precision of arrays printed to the console. This does not affect any of the actual values stored in the Numpy arrays, it just makes the ouput more legible.

```
np.set_printoptions(precision=2)
```

For example compare reading this: 

```
[ 0.78237689  0.14702891  0.56299867]
[ 0.78608308  0.42118598  0.56487815]
[ 0.36860649  0.84022819  0.49596571]
[ 0.27144711  0.16509963  0.66279947]
```
... to this: 
```
[ 0.77  0.48  0.86]
[ 0.63  0.25  0.56]
[ 0.78  0.83  0.02]
[ 0.83  0.39  0.85]
```
