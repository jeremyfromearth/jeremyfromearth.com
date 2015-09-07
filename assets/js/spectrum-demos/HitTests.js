(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

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
        this.rx = this.centerX - 50;
        this.ry = this.centerY - 50;
        this.rw = 100;
        this.rh = 100;
        this.cx = this.centerX - 200;
        this.cy = this.centerY;
        this.cr = 50;
        this.tx0 = this.centerX + 200;
        this.ty0 = this.centerY - 50;
        this.tx1 = this.centerX + 150;
        this.ty1 = this.centerY + 50;
        this.tx2 = this.centerX + 400;
        this.ty2 = this.centerY + 50;
        this.r2x = this.centerX;
        this.r2y = this.cy + 150;
        this.r2r1 = 20;
        return this.r2r2 = 50;
      };

      HitTests.prototype.render = function() {
        if (Math.hitTestRectangle(this.mouseX, this.mouseY, this.rx, this.ry, this.rw, this.rh)) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.rectangle(this.rx, this.ry, this.rw, this.rh);
        if (Math.hitTestCircle(this.mouseX, this.mouseY, this.cx, this.cy, this.cr)) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.circle(this.cx, this.cy, this.cr);
        if (Math.hitTestTriangle(this.mouseX, this.mouseY, [this.tx0, this.ty0], [this.tx1, this.ty1], [this.tx2, this.ty2])) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        this.shape([[this.tx0, this.ty0], [this.tx1, this.ty1], [this.tx2, this.ty2]], true, true);
        if (Math.hitTestRing(this.mouseX, this.mouseY, this.r2x, this.r2y, this.r2r1, this.r2r2)) {
          this.color("#000000");
        } else {
          this.color("#ffffff");
        }
        return this.polygonRing(this.r2x, this.r2y, this.r2r1, this.r2r2, 16, 36);
      };

      return HitTests;

    })(Renderer);
  });

}).call(this);
