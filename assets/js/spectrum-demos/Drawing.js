(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Drawing;
    return Drawing = (function(superClass) {
      extend(Drawing, superClass);

      function Drawing() {
        return Drawing.__super__.constructor.apply(this, arguments);
      }

      Drawing.prototype.init = function() {
        return this.bg = "#222222";
      };

      Drawing.prototype.render = function() {
        this.color("#DDDDDD");
        this.lineStyle(1);
        this.font("lighter 14px monospace");
        this.arc(50, 50, 40, Math.PI, Math.TWO_PI * .75, false);
        this.arc(55, 50, 40, Math.TWO_PI * .75, Math.TWO_PI, false);
        this.arc(55, 55, 40, 0, Math.PI * .5, false);
        this.arc(50, 55, 40, Math.PI * .5, Math.PI, false);
        this.text(35, 110, "arc()");
        this.circle(160, 50, 40, false);
        this.circle(160, 50, 20, true);
        this.text(130, 110, "circle()");
        this.ctx.save();
        this.circles([[240, 25], [285, 25], [240, 70], [285, 70]], 15);
        this.color("#ff0000");
        this.circles([[240, 25], [285, 25], [240, 70], [285, 70]], 2, false);
        this.ctx.restore();
        this.text(230, 110, "circles()");
        this.grid(330, 15, 10, 10, 80, 80);
        this.text(350, 110, "grid()");
        this.shape([[420, 10], [520, 30], [540, 90], [500, 80], [460, 60]]);
        this.text(460, 110, "shape()");
        this.polygon(590, 50, 40, 12, false);
        this.polygon(590, 50, 30, 3, false);
        this.polygon(590, 50, 10, 6, false);
        this.text(560, 110, "polygon()");
        this.polygonRing(720, 50, 20, 50, 6, 6);
        this.text(670, 110, "polygonRing()");
        this.roundedRectangle(830, 10, 80, 80, 10);
        return this.text(800, 110, "roundedRectangle()");
      };

      return Drawing;

    })(Renderer);
  });

}).call(this);
