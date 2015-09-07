(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var PolygonRings;
    return PolygonRings = (function(superClass) {
      extend(PolygonRings, superClass);

      function PolygonRings() {
        return PolygonRings.__super__.constructor.apply(this, arguments);
      }

      PolygonRings.prototype.init = function() {
        this.cx = this.width * .5;
        this.cy = this.height * .5;
        return this.poly1 = [0, 0, 30, 80, 6, 3, Math.PI * 2, false];
      };

      PolygonRings.prototype.render = function() {
        this.color("white");
        this.polygonRing(this.cx, this.cy, 20, 40, 3, 6);
        this.saveTransform();
        this.translate(this.cx - 200, this.cy);
        this.polygonRing.apply(this, this.poly1);
        this.restoreTransform();
        this.saveTransform();
        this.translate(this.cx + 200, this.cy);
        this.rotate(Math.PI);
        this.polygonRing.apply(this, this.poly1);
        return this.restoreTransform();
      };

      return PolygonRings;

    })(Renderer);
  });

}).call(this);
