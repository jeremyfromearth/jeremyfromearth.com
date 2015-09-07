(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Bezier;
    return Bezier = (function(superClass) {
      extend(Bezier, superClass);

      function Bezier() {
        return Bezier.__super__.constructor.apply(this, arguments);
      }

      Bezier.prototype.init = function() {
        this.bg = '#000';
        this.radius = 200;
        this.toggle = 0;
        this.center = {
          x: this.width * .5,
          y: this.height * .5
        };
        this.p1 = {
          x: Math.cos(Math.PI * -.45) * this.radius + this.center.x,
          y: Math.sin(Math.PI * -.45) * this.radius + this.center.y
        };
        this.p2 = {
          x: Math.cos(Math.PI * .25) * this.radius + this.center.x,
          y: Math.sin(Math.PI * .25) * this.radius + this.center.y
        };
        this.cp1 = {
          x: this.center.x,
          y: this.center.y
        };
        return this.cp2 = {
          x: this.center.x,
          y: this.center.y
        };
      };

      Bezier.prototype.render = function() {
        this.lineStyle(1);
        this.color('#ffffff');
        this.circle(this.center.x, this.center.y, 20);
        this.circle(this.center.x, this.center.y, this.radius, false);
        this.color('#22ffcc');
        this.lineStyle(1);
        this.line(this.cp1.x, this.cp1.y, this.p1.x, this.p1.y);
        this.line(this.cp2.x, this.cp2.y, this.p2.x, this.p2.y);
        this.circle(this.cp1.x, this.cp1.y, 5);
        this.circle(this.cp2.x, this.cp2.y, 5);
        this.color('#00ccff');
        this.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        this.color('#ffcc00');
        this.circle(this.p1.x, this.p1.y, 5, true);
        this.color('#ff00cc');
        this.circle(this.p2.x, this.p2.y, 5, true);
        return this.bezier(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.p1.x, this.p1.y, this.p2.x, this.p2.y);
      };

      Bezier.prototype.onMouseDown = function() {
        var cp;
        this.toggle = !this.toggle;
        cp = this.toggle ? this.cp1 : this.cp2;
        cp.x = this.mouseX;
        return cp.y = this.mouseY;
      };

      return Bezier;

    })(Renderer);
  });

}).call(this);
