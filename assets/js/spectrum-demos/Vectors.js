(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer', 'spectrum/Vector'], function(Renderer, Vector) {
    var Particle, Vectors;
    Particle = (function() {
      function Particle(x, y) {
        this.update = bind(this.update, this);
        this.id = -1;
        this.alphaTarget = 1.0;
        this.coords = new Vector(x, y);
        this.damping = 0.1;
        this.direction = new Vector();
        this.target = new Vector();
        this.scale = 1.0;
        this.scaleTarget = 1.0;
        this.stiffness = 0.9;
        this.timeFactor = 0.2;
        this.velocity = new Vector();
        this.coordHistory = [];
        this.maxCoordHistoryLength = Math.round(Math.random() * 500);
      }

      Particle.prototype.update = function() {
        var delta;
        delta = this.target.sub(this.coords);
        if (Math.abs(delta.length() > 0.001)) {
          this.direction = delta;
          this.velocity = (this.velocity.scale(this.damping)).add(delta.scale(this.timeFactor)).scale(this.stiffness);
          this.coordHistory.push([this.coords.x, this.coords.y]);
          this.coords = this.coords.add(this.velocity.scale(this.timeFactor));
          this.scale += (this.scaleTarget - this.scale) * this.timeFactor;
          if (this.coordHistory.length > this.maxCoordHistoryLength) {
            return this.coordHistory.shift();
          }
        }
      };

      return Particle;

    })();
    return Vectors = (function(superClass) {
      extend(Vectors, superClass);

      function Vectors() {
        return Vectors.__super__.constructor.apply(this, arguments);
      }

      Vectors.prototype.init = function() {
        var i, j, results;
        this.particles = [];
        results = [];
        for (i = j = 0; j <= 10; i = ++j) {
          this.particles.push(new Particle(this.width * 0.5, this.height * 0.5));
          results.push(this.particles[i].target = new Vector(Math.randomInRange(0, this.width), Math.randomInRange(0, this.height)));
        }
        return results;
      };

      Vectors.prototype.step = function() {
        var j, len, particle, ref, results;
        ref = this.particles;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          particle = ref[j];
          results.push(particle.update());
        }
        return results;
      };

      Vectors.prototype.render = function() {
        var j, len, p1, p2, ref, results;
        ref = this.particles;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          p1 = ref[j];
          this.color("red");
          this.shape(p1.coordHistory, false, false);
          this.circle(p1.coords.x, p1.coords.y, 2);
          results.push((function() {
            var k, len1, ref1, results1;
            ref1 = this.particles;
            results1 = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              p2 = ref1[k];
              if (p1 !== p2) {
                results1.push(this.line(p1.coords.x, p1.coords.y, p2.coords.x, p2.coords.y));
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      return Vectors;

    })(Renderer);
  });

}).call(this);
