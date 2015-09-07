(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var ImageBasics;
    return ImageBasics = (function(superClass) {
      extend(ImageBasics, superClass);

      function ImageBasics() {
        this.onImageLoad = bind(this.onImageLoad, this);
        return ImageBasics.__super__.constructor.apply(this, arguments);
      }

      ImageBasics.prototype.init = function() {
        console.log(Image);
        this.img = new Image();
        this.img.addEventListener('load', this.onImageLoad);
        return this.img.src = 'http://24.media.tumblr.com/71a5b5ad517988f25b257d36be093316/tumblr_mw9w2ck3Ot1t1a31uo2_1280.jpg';
      };

      ImageBasics.prototype.render = function() {
        return this.ctx.drawImage(this.img, 0, 0, 960, 540);
      };

      ImageBasics.prototype.onImageLoad = function(event) {
        return console.log(this.img.width, 'x', this.img.height, this.img.data);
      };

      return ImageBasics;

    })(Renderer);
  });

}).call(this);
