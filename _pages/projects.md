---
layout: page
headline: projects
permalink: /projects/
group: navigation
---

{% for project in site.projects reversed %}
[{{ project.title }}]({{ project.url }})
{% endfor %}
