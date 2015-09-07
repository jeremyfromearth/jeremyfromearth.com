(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Shape;
    return Shape = (function(superClass) {
      extend(Shape, superClass);

      function Shape() {
        return Shape.__super__.constructor.apply(this, arguments);
      }

      Shape.prototype.init = function() {
        var i, len, p, ref, results;
        this.shapeData1 = [[30, 30], [200, 50], [220, 250], [100, 280], [30, 200]];
        this.shapeData2 = [];
        this.shapeData3 = [];
        ref = this.shapeData1;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          this.shapeData2.push([p[0] + 300, p[1]]);
          results.push(this.shapeData3.push([p[0] + 600, p[1]]));
        }
        return results;
      };

      Shape.prototype.step = function() {};

      Shape.prototype.render = function() {
        this.color("white");
        this.shape(this.shapeData1, false, false);
        this.shape(this.shapeData2, true, true);
        return this.shape(this.shapeData3, false, true);
      };

      return Shape;

    })(Renderer);
  });

}).call(this);
