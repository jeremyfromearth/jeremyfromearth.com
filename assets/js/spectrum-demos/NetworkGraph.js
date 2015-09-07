(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var NetworkGraph;
    return NetworkGraph = (function(superClass) {
      extend(NetworkGraph, superClass);

      function NetworkGraph() {
        return NetworkGraph.__super__.constructor.apply(this, arguments);
      }

      NetworkGraph.prototype.init = function() {
        var cps, edge, i, j, len, n, n1, n2, numEdges, numNodes, ref, results, thetaInc;
        this.bg = '#000';
        this["static"] = true;
        this.radius = 250;
        this.center = {
          x: this.width * .5,
          y: this.height * .5
        };
        numNodes = 100;
        thetaInc = Math.PI * 2 / numNodes;
        this.nodes = (function() {
          var j, ref, results;
          results = [];
          for (n = j = 0, ref = numNodes; 0 <= ref ? j < ref : j > ref; n = 0 <= ref ? ++j : --j) {
            results.push({
              theta: n * thetaInc,
              x: (Math.cos(n * thetaInc)) * this.radius + this.center.x,
              y: (Math.sin(n * thetaInc)) * this.radius + this.center.y,
              color: Math.randomColor()
            });
          }
          return results;
        }).call(this);
        numEdges = 50;
        this.edges = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = numEdges; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push({
              a: this.rnd(),
              b: this.rnd()
            });
          }
          return results;
        }).call(this);
        ref = this.edges;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          edge = ref[j];
          n1 = this.nodes[edge.a];
          n2 = this.nodes[edge.b];
          cps = this.getControlPointsForEdge(n1, n2);
          edge.cp1 = cps.cp1;
          results.push(edge.cp2 = cps.cp2);
        }
        return results;
      };

      NetworkGraph.prototype.render = function() {
        var edge, j, k, len, len1, n1, n2, node, ref, ref1, results;
        ref = this.edges;
        for (j = 0, len = ref.length; j < len; j++) {
          edge = ref[j];
          n1 = this.nodes[edge.a];
          n2 = this.nodes[edge.b];
          if (n1 !== n2) {
            this.color(n1.color);
            this.bezier(edge.cp1.x, edge.cp1.y, edge.cp2.x, edge.cp2.y, n1.x, n1.y, n2.x, n2.y);
          }
        }
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          this.color(node.color);
          this.circle(node.x, node.y, 2);
          this.color(node.color);
          results.push(this.circle(node.x, node.y, 2));
        }
        return results;
      };

      NetworkGraph.prototype.rnd = function() {
        return Math.randomInRange(0, this.nodes.length - 1, true);
      };

      NetworkGraph.prototype.getControlPointsForEdge = function(p1, p2) {
        var cp1, cp2, r1, r2;
        cp1 = {};
        cp2 = {};
        r1 = this.radius * .3;
        r2 = this.radius * .1;
        cp1.x = p1.x - Math.cos(p1.theta) * r1;
        cp1.y = p1.y - Math.sin(p1.theta) * r1;
        cp2.x = p2.x - Math.cos(p2.theta) * r2;
        cp2.y = p2.y - Math.sin(p2.theta) * r2;
        return {
          cp1: cp1,
          cp2: cp2
        };
      };

      return NetworkGraph;

    })(Renderer);
  });

}).call(this);
