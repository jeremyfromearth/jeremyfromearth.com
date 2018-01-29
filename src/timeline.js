const d3 = require('lib/d3.min');

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
        .append('div')
        .classed('timeline-block', true)
        .each(function(d) {
          d3.select(this)
            .filter(function(d) {
              var has_projects = false;
              d.projects.forEach(function(p) { 
                if(p.published) has_projects = true;
              })
              return has_projects;
            })
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
              let toggle = !(idx % 2);
              
              let left = d3.select(this)
                .append('div')
                .classed('timeline-col-left', true)
                
              let center = dot = d3.select(this)
                .append('div')
                .classed('timeline-col-center', true)
              
              let dot = center.append('div')
                .classed('dot', true)

              let right = d3.select(this)
                .append('div')
                .classed('timeline-col-right', true);

              self.create_project_node(toggle ? left : right, d, dot);
              idx++; 
            });
        });
    });
  }

  create_project_node(el, project, dot) {
    if(project.title && project.published) {
      let inner = el.append('div')
        .classed('timeline-col-inner', true);

      let bg = inner.append('div')
        .classed('timeline-col-bg', true);

      let info = inner.append('div')
        .classed('timeline-node-info-container', true);
      
      let title = info.append('div')
        .classed('timeline-node-title', true)
        .html(project.title)

      let client = null;
      if(project.client) {
        client = info.append('div')
          .classed('timeline-node-client', true)
          .html(project.client)
      }

      let location = null;
      if(project.location) {
        location = info.append('div')
          .classed('timeline-node-location', true)
          .html(project.location)
      }

      function add_mouse_handlers(el) {
        el.on('mouseenter', ()=> {
          dot.classed('dot-hover', true);
          bg.classed('timeline-col-bg-hover', true);
          title.classed('timeline-node-title-hover', true);
          if(client) client.classed('timeline-node-client-hover', true);
          if(location) location.classed('timeline-node-location-hover', true);

        });

        el.on('mouseleave', ()=> {
          dot.classed('dot-hover', false);
          bg.classed('timeline-col-bg-hover', false);
          title.classed('timeline-node-title-hover', false);
          if(client) client.classed('timeline-node-client-hover', false);
          if(location) location.classed('timeline-node-location-hover', false);
        });

        el.on('mousedown', ()=> {
          window.location.href = project.link;
        });
      }
      
      add_mouse_handlers(el);
      add_mouse_handlers(dot);
    }
  }
}

module.exports = Timeline
