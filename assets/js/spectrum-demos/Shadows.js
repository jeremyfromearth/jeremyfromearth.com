(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Shadows;
    return Shadows = (function(superClass) {
      extend(Shadows, superClass);

      function Shadows() {
        return Shadows.__super__.constructor.apply(this, arguments);
      }

      Shadows.prototype.init = function() {
        this.n = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.radius = 10;
        this.bg = "#CCCCCC";
        this.cx = this.width * .5;
        return this.cy = this.height * .5;
      };

      Shadows.prototype.step = function() {
        this.offsetY = Math.sin(this.n) * this.radius;
        this.offsetX = Math.cos(this.n) * this.radius;
        return this.n += .1;
      };

      Shadows.prototype.render = function() {
        this.color("white");
        this.circle(this.cx - 150, this.cy, 30);
        this.shadow(this.offsetX, this.offsetY, 10, "#000000");
        this.circle(this.cx, this.cy, 50);
        this.shadowClear();
        return this.circle(this.cx + 150, this.cy, 30);
      };

      return Shadows;

    })(Renderer);
  });

}).call(this);
