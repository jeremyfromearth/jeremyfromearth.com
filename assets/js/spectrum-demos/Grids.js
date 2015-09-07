(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Grids;
    return Grids = (function(superClass) {
      extend(Grids, superClass);

      function Grids() {
        return Grids.__super__.constructor.apply(this, arguments);
      }

      Grids.prototype.init = function() {
        return this.bg = "#222222";
      };

      Grids.prototype.render = function() {
        this.color("#333333");
        this.grid(0, 0, this.height / 10, this.width / 10, this.width, this.height);
        this.color("#66CCFF");
        this.grid(30, 50, 10, 10, 100, 100);
        this.color("#CCFF66");
        this.grid(160, 50, 10, 10, 200, 200);
        this.color("#FF3366");
        return this.grid(390, 50, 10, 10, 400, 400);
      };

      return Grids;

    })(Renderer);
  });

}).call(this);
