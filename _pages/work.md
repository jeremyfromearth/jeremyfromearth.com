---
layout: page
headline: work
permalink: /work/
group: navigation
---

<ul>
{% for work in site.work %}
<li><a href="{{ work.url }}">{{ work.title }}</a></li>
{% endfor %}
</ul>
