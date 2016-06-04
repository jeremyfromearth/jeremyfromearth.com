(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer', 'spectrum/Vector', 'spectrum/Utils'], function(Renderer, Vector, Utils) {
    var Node, VectorChains;
    Node = (function() {
      function Node(x, y) {
        this.position = new Vector(x, y);
        this.target = new Vector();
        this.velocity = new Vector();
        this.damping = 0.3;
        this.stiffness = 0.9;
        this.timeFactor = 0.6;
      }

      Node.prototype.update = function(setNewTarget) {
        var delta, norm, opposite;
        this.theta += this.thetaInc;
        this.radius = Math.abs(Math.sin(this.theta)) * this.radiusFactor;
        delta = this.target.sub(this.position);
        if (delta.length() > 0.1) {
          norm = delta.normalized();
          opposite = norm.scale(-1.0);
          this.velocity = this.velocity.scale(this.damping).add(delta.scale(this.timeFactor)).scale(this.stiffness);
          return this.position = this.position.add(this.velocity.scale(this.timeFactor));
        } else if (setNewTarget) {
          return this.target = Vector.Random(0, 960, 0, 540);
        }
      };

      return Node;

    })();
    return VectorChains = (function(superClass) {
      extend(VectorChains, superClass);

      function VectorChains() {
        return VectorChains.__super__.constructor.apply(this, arguments);
      }

      VectorChains.prototype.init = function() {
        this.chains = [];
        this.theta = 0.0;
        return this.createChain(this.width * 0.5, this.height * 0.5);
      };

      VectorChains.prototype.step = function() {
        var chain, delta, direction, i, j, leader, len, link, ref, results, target;
        ref = this.chains;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          chain = ref[j];
          results.push((function() {
            var k, ref1, results1;
            results1 = [];
            for (i = k = 0, ref1 = chain.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
              link = chain[i];
              if (i === 0) {
                results1.push(link.update(true));
              } else {
                leader = chain[i - 1];
                direction = leader.target.sub(leader.position).normalized();
                target = leader.position.sub(direction.scale(5.0));
                delta = target.sub(link.position);
                link.target = target;
                results1.push(link.update());
              }
            }
            return results1;
          })());
        }
        return results;
      };

      VectorChains.prototype.render = function() {
        var chain, j, len, points, ref, results, v;
        ref = this.chains;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          chain = ref[j];
          this.color('red');
          points = [
            (function() {
              var k, len1, results1;
              results1 = [];
              for (k = 0, len1 = chain.length; k < len1; k++) {
                v = chain[k];
                results1.push([v.position.x, v.position.y]);
              }
              return results1;
            })()
          ][0];
          this.shape(points, false, false);
          results.push(this.circles(points, 2, true));
        }
        return results;
      };

      VectorChains.prototype.onMouseDown = function(x, y) {
        return this.createChain(x, y);
      };

      VectorChains.prototype.createChain = function(x, y) {
        var center, damping, i, j, linkCount, n, ref, results, stiffness, timeFactor;
        this.chains.push([]);
        center = new Vector(x, y);
        linkCount = Math.randomInRange(3, 5);
        timeFactor = Math.randomInRange(0.2, .7);
        damping = Math.randomInRange(0.01, 0.6);
        stiffness = Math.randomInRange(0.7, 0.9);
        results = [];
        for (i = j = 0, ref = linkCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          n = new Node(x, y);
          n.timeFactor = timeFactor;
          n.damping = damping;
          n.stiffness = stiffness;
          n.target = Vector.Random(0, this.width, 0, this.height);
          n.position = center;
          results.push(this.chains[this.chains.length - 1].push(n));
        }
        return results;
      };

      return VectorChains;

    })(Renderer);
  });

}).call(this);
