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
        d3.select('#timeline-container').selectAll('div').data(data).enter().filter(function (d) {
          return d.projects.length;
        }).append('div').classed('timeline-block', true).each(function (d) {
          d3.select(this).append('div').classed('timeline-row', true).append('div').classed('timeline-col-year', true).text(d.year);

          d3.select(this).append('div').classed('timeline-row-container', true).selectAll('div').data(d.projects).enter().filter(function (d) {
            return d.published;
          }).append('div').classed('timeline-row', true).each(function (d, i) {
            var toggle = !(idx % 2);
            d3.select(this).append('div').classed('timeline-col-left', true).each(function (d) {
              if (toggle) {
                self.create_project_node(this, d);
                idx += 1;
              }
            });

            d3.select(this).append('div').classed('timeline-col-center', true).append('div').classed('dot', true);

            d3.select(this).append('div').classed('timeline-col-right', true).each(function (d) {
              if (!toggle) {
                self.create_project_node(this, d);
                idx += 1;
              }
            });
          });
        });
      });
    }

    _createClass(Timeline, [{
      key: 'create_project_node',
      value: function create_project_node(el, project) {
        if (project.title && project.published) {
          d3.select(el).append('div').classed('timeline-node-title', true).html(project.title);

          if (project.client) {
            d3.select(el).append('div').classed('timeline-node-client', true).html(project.client);
          }

          if (project.location) {
            d3.select(el).append('div').classed('timeline-node-location', true).html(project.location);
          }
        }
      }
    }]);

    return Timeline;
  }();

  module.exports = Timeline;
});