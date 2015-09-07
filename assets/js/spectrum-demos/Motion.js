(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Motion;
    return Motion = (function(superClass) {
      extend(Motion, superClass);

      function Motion() {
        return Motion.__super__.constructor.apply(this, arguments);
      }

      Motion.prototype.init = function() {
        this.n = 0;
        this.s = 0;
        this.bg = "#222222";
        this.cx = this.width * .5;
        return this.cy = this.height * .5;
      };

      Motion.prototype.step = function() {
        this.n += .01;
        return this.s = Math.sin(this.n);
      };

      Motion.prototype.render = function() {
        this.color("#ffcc00");
        this.alpha(Math.abs(this.s));
        this.saveTransform();
        this.translate(this.cx, this.cy);
        this.rotate(this.s);
        this.polygon(0, 0, 100, 2 + Math.ceil(Math.abs(this.s) * 10));
        return this.restoreTransform();
      };

      return Motion;

    })(Renderer);
  });

}).call(this);
