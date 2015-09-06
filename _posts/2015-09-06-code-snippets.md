---
layout: post
date: 2015-09-06
description: Code snippet tests
categories:
- blog
- code
permalink: blog/code-snippet-tests
headline: blog
heading: Code Snippet Tests
---

Using Pygments for code highlighting

{% highlight coffee %}
# Returns whether or not a point is in the provided list
contains : (list, n) ->
  count = 0
    for el in list
      if el[0] == n[0] and el[1] == n[1]
        if count == list.length - 1
          return no
        return yes
      count++
  return no
{% endhighlight %}

Below is some code from a Gist

{% gist fbrundu/7870063 %}
