(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var FullScreen;
    return FullScreen = (function(superClass) {
      extend(FullScreen, superClass);

      function FullScreen() {
        this.render = bind(this.render, this);
        return FullScreen.__super__.constructor.apply(this, arguments);
      }

      FullScreen.prototype.render = function() {
        this.color('black');
        return this.text(20, 20, 'Click anywhere to toggle fullscreen');
      };

      FullScreen.prototype.onMouseDown = function(x, y) {
        return this.fullscreen();
      };

      return FullScreen;

    })(Renderer);
  });

}).call(this);
