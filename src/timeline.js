const d3 = require('lib/d3.min');

/*
<div class='timeline-block'>
  <div class='timeline-row'>
    <div class='timeline-col-year'>2010</div>  
  </div>
  <div class='timeline-row'>
    <div class='timeline-col-left'>
      <div class='timeline-node-title'>McArthur Foundation Experience</div>
      <div class='timeline-node-client'>John T. and Katherin D. McArthur Foundation</div>
      <div class='timeline-node-location'>Chicago, Illinois</div>
      <div class="timeline-node-tech">
        <i class="timeline-node-tech-item devicon-android-plain"></i>
        <i class="timeline-node-tech-item devicon-cplusplus-line"></i>
        <i class="timeline-node-tech-item devicon-django-plain"></i>
        <i class="timeline-node-tech-item devicon-visualstudio-plain"></i>
        <i class="timeline-node-tech-item fa fa-hand-pointer"></i>
      </div>
    </div>  
    <div class='timeline-col-center'>
      <div class='dot'></div> 
    </div>  
    <div class='timeline-col-right'></div>  
  </div>
</div>
*/

class Timeline {
  constructor() {
    const self = this;
    d3.json('/assets/data/work-timeline.json', (error, data) => {  
      var data = data.sort((a, b)=> {
          return d3.descending(a.year, b.year); 
        });
      
      let idx = 0;
      d3.select('#timeline-container')
        .selectAll('div')
        .data(data)
        .enter()
        .filter(function(d) {
          return d.projects.length;
        })
        .append('div')
        .classed('timeline-block', true)
        .each(function(d) {
          d3.select(this)
            .append('div')
            .classed('timeline-row', true)
            .append('div')
            .classed('timeline-col-year', true)
            .text(d.year);

          d3.select(this)
            .append('div')
            .classed('timeline-row-container', true)
            .selectAll('div')
            .data(d.projects)
            .enter()
            .filter(function(d) {
              return d.published;
            })
            .append('div')
            .classed('timeline-row', true)
            .each(function(d, i) {
              var toggle = !(idx % 2);
              d3.select(this)
                .append('div')
                .classed('timeline-col-left', true)
                .each(function(d) {
                  if(toggle) {
                    self.create_project_node(this, d);
                    idx += 1
                  }
                });

              d3.select(this)
                .append('div')
                .classed('timeline-col-center', true)
                .append('div')
                .classed('dot', true)

              d3.select(this)
                .append('div')
                .classed('timeline-col-right', true)
                .each(function(d) {
                  if(!toggle) {
                    self.create_project_node(this, d);
                    idx += 1
                  }
                });
            });

        })
    });
  }

  create_project_node(el, project) {
    if(project.title && project.published) {
      d3.select(el)
        .append('div')
        .classed('timeline-node-title', true)
        .html(project.title)

      if(project.client) {
        d3.select(el)
          .append('div')
          .classed('timeline-node-client', true)
          .html(project.client)
      }

      if(project.location) {
        d3.select(el)
          .append('div')
          .classed('timeline-node-location', true)
          .html(project.location)
      }
    }
  }
}

module.exports = Timeline
