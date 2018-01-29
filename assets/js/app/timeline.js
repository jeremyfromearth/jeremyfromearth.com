define(['module', 'lib/d3.min'], function (module, d3) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Timeline = function () {
    function Timeline() {
      _classCallCheck(this, Timeline);

      var self = this;
      d3.json('/assets/data/work-timeline.json', function (error, data) {
        var data = data.sort(function (a, b) {
          return d3.descending(a.year, b.year);
        });

        var idx = 0;
        d3.select('#timeline-container').selectAll('div').data(data).enter().append('div').classed('timeline-block', true).each(function (d) {
          d3.select(this).filter(function (d) {
            var has_projects = false;
            d.projects.forEach(function (p) {
              if (p.published) has_projects = true;
            });
            return has_projects;
          }).append('div').classed('timeline-row', true).append('div').classed('timeline-col-year', true).text(d.year);

          d3.select(this).append('div').classed('timeline-row-container', true).selectAll('div').data(d.projects).enter().filter(function (d) {
            return d.published;
          }).append('div').classed('timeline-row', true).each(function (d, i) {
            var toggle = !(idx % 2);

            var left = d3.select(this).append('div').classed('timeline-col-left', true);

            var center = dot = d3.select(this).append('div').classed('timeline-col-center', true);

            var dot = center.append('div').classed('dot', true);

            var right = d3.select(this).append('div').classed('timeline-col-right', true);

            self.create_project_node(toggle ? left : right, d, dot);
            idx++;
          });
        });
      });
    }

    _createClass(Timeline, [{
      key: 'create_project_node',
      value: function create_project_node(el, project, dot) {
        if (project.title && project.published) {
          var add_mouse_handlers = function add_mouse_handlers(el) {
            el.on('mouseenter', function () {
              dot.classed('dot-hover', true);
              bg.classed('timeline-col-bg-hover', true);
              title.classed('timeline-node-title-hover', true);
              if (client) client.classed('timeline-node-client-hover', true);
              if (location) location.classed('timeline-node-location-hover', true);
            });

            el.on('mouseleave', function () {
              dot.classed('dot-hover', false);
              bg.classed('timeline-col-bg-hover', false);
              title.classed('timeline-node-title-hover', false);
              if (client) client.classed('timeline-node-client-hover', false);
              if (location) location.classed('timeline-node-location-hover', false);
            });

            el.on('mousedown', function () {
              window.location.href = project.link;
            });
          };

          var inner = el.append('div').classed('timeline-col-inner', true);

          var bg = inner.append('div').classed('timeline-col-bg', true);

          var info = inner.append('div').classed('timeline-node-info-container', true);

          var title = info.append('div').classed('timeline-node-title', true).html(project.title);

          var client = null;
          if (project.client) {
            client = info.append('div').classed('timeline-node-client', true).html(project.client);
          }

          var location = null;
          if (project.location) {
            location = info.append('div').classed('timeline-node-location', true).html(project.location);
          }

          add_mouse_handlers(el);
          add_mouse_handlers(dot);
        }
      }
    }]);

    return Timeline;
  }();

  module.exports = Timeline;
});