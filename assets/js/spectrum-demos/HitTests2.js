(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  define(['spectrum/Renderer'], function(Renderer) {
    var HitTests;
    return HitTests = (function(superClass) {
      extend(HitTests, superClass);

      function HitTests() {
        return HitTests.__super__.constructor.apply(this, arguments);
      }

      HitTests.prototype.init = function() {
        this.centerX = this.width * .5;
        this.centerY = this.height * .5;
        this.rect1 = [this.centerX - 50, this.centerY - 50, 100, 100];
        this.circ1 = [this.centerX - 200, this.centerY, 50];
        this.tri1 = [[this.centerX + 200, this.centerY - 50], [this.centerX + 150, this.centerY + 50], [this.centerX + 400, this.centerY + 50]];
        return this.ring1 = [this.centerX, this.centerY + 150, 20, 50, 16, 36];
      };

      HitTests.prototype.render = function() {
        if (Math.hitTestRectangle.apply(Math, [this.mouseX, this.mouseY].concat(slice.call(this.rect1)))) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.rectangle.apply(this, this.rect1);
        if (Math.hitTestCircle.apply(Math, [this.mouseX, this.mouseY].concat(slice.call(this.circ1)))) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.circle.apply(this, this.circ1);
        if (Math.hitTestTriangle.apply(Math, [this.mouseX, this.mouseY].concat(slice.call(this.tri1)))) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.shape(this.tri1, true, true);
        if (Math.hitTestRing.apply(Math, [this.mouseX, this.mouseY].concat(slice.call(this.ring1)))) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        return this.polygonRing.apply(this, this.ring1);
      };

      return HitTests;

    })(Renderer);
  });

}).call(this);
