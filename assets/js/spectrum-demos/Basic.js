(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var Basic;
    return Basic = (function(superClass) {
      extend(Basic, superClass);

      function Basic() {
        return Basic.__super__.constructor.apply(this, arguments);
      }

      Basic.prototype.init = function() {
        this["static"] = true;
        this.bg = "#222222";
        this.cx = this.width * .5;
        return this.cy = this.height * .5;
      };

      Basic.prototype.render = function() {
        this.font("bold 80pt Helvetica");
        this.color("#ffffff");
        this.text(165, 250, "SPECTRUM", false);
        this.color("#d13737");
        this.circle(this.cx - 25, this.cy + 20, 10);
        this.color("#45d137");
        this.circle(this.cx, this.cy + 20, 10);
        this.color("#3762d1");
        return this.circle(this.cx + 25, this.cy + 20, 10);
      };

      return Basic;

    })(Renderer);
  });

}).call(this);
