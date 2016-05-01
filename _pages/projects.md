---
layout: page
headline: projects
permalink: /projects/
---

{% for project in site.projects reversed %}
#[{{ project.title }}  is . . .]({{ project.url }})
{{ project.description }}
[Read more »]({{ project.url }})
{% endfor %}
