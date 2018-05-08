---
layout: post
date: 2018-05-07
categories:
  - code
published: true
permalink: blog/numpy-slice-tutorial
headline: blog
heading: Numpy Slice Tutorial
---

In this tutorial we'll take a look at the slice operator of the Numpy array. This feature of Numpy is virtually indespensible when working with multi-dimensional arrays.

Before we get into it, let's configure Numpy to make this experiment a bit more easy to navigate. Often when I'm exploring a new Numpy feature, I like to shorten the precision of floating point values printed to the console and to supress scientific notiation. This does not affect the values stored in the arrays, it just makes the ouput more legible. I also like to provide a random seed so that I can work with the same random numbers throughout an experiment.

```
import numpy as np
np.set_printoptions(precision=2, supress=True)
np.random.seed(1)
```

For example compare reading this: 
```
[  4.17022005e-01   7.20324493e-01   1.14374817e-04]
[  3.02332573e-01   1.46755891e-01   9.23385948e-02]
[  1.86260211e-01   3.45560727e-01   3.96767474e-01]
[  5.38816734e-01   4.19194514e-01   6.85219500e-01]
```
... to this: 
```
[ 0.42  0.72  0.  ]
[ 0.3   0.15  0.09]
[ 0.19  0.35  0.4 ]
[ 0.54  0.42  0.69]
```

Ok, with that out of the way, let's create some RGB data that represents two 4x4 images.
```
images = np.random.rand(2, 4, 4, 3)
```

This produces the following data structure (I've annotated part of it to demonstrate how it represents a list of RGB images):

```

[
# image 0
  [
  # row 0    pixel 1            pixel 2              pixel 3            pixel 4
    [
        r     g     b
      [ 0.42  0.72  0.  ] [ 0.3   0.15  0.09] [ 0.19  0.35  0.4 ] [ 0.54  0.42  0.69]
    ]
  #...
  [[ 0.2   0.88  0.03]
   [ 0.67  0.42  0.56]
   [ 0.14  0.2   0.8 ]
   [ 0.97  0.31  0.69]]

  [[ 0.88  0.89  0.09]
   [ 0.04  0.17  0.88]
   [ 0.1   0.42  0.96]
   [ 0.53  0.69  0.32]]

  [[ 0.69  0.83  0.02]
   [ 0.75  0.99  0.75]
   [ 0.28  0.79  0.1 ]
   [ 0.45  0.91  0.29]]]

# image 1
 [[[ 0.29  0.13  0.02]
   [ 0.68  0.21  0.27]
   [ 0.49  0.05  0.57]
   [ 0.15  0.59  0.7 ]]
  ...
```

Like regular Python lists, we can fetch the first image using standard indexing: `images[0] or images[1]`. This is not so surprising. We can also use the syntax `images[0:1:2]`, where 0 is the start index, 1 is the end index and 2 is the number of indices to step.

Things get more interesting when we want to use ranges of indices in each dimension. For example, let's say that we want to access a 2x2 grid of all the images, containing all color channels. We can use: `images[:,0:2,0:2,:]`

```
[[[[ 0.42  0.72  0.  ]
   [ 0.3   0.15  0.09]]

  [[ 0.2   0.88  0.03]
   [ 0.67  0.42  0.56]]]


 [[[ 0.29  0.13  0.02]
   [ 0.68  0.21  0.27]]

  [[ 0.1   0.41  0.69]
   [ 0.41  0.05  0.54]]]]
```

Or, we may want to fetch a 2x2 grid of each image just in the red channel. This is equally straightforward: `images[:,0:2,0:2,0]`.

```
[[[ 0.42  0.3 ]
  [ 0.2   0.67]]

 [[ 0.29  0.68]
  [ 0.1   0.41]]]
```

In both of the above example we leave the index for the first dimension empty. This results in all elements in that dimension being returned. In this case, the first dimension represents the index of the image, thus all images are returned. If we were only to want to fetch the same data for the first image, we could use this: `images[0,0:2,0:2,0]`. Note the 0 in the first dimension, it indicates that we only want whatever is at index 0. You can also use a range here as well.

```
[[ 0.42  0.3 ]
 [ 0.2   0.67]]
```

The simplest way that I've found to think about these slicing operations is to remember that what is really happening is that your are taking selections along each dimension. For an even deeper dive into this feature check out the official Numpy [docs on indexing and slicing](https://docs.scipy.org/doc/numpy-1.13.0/reference/arrays.indexing.html).


