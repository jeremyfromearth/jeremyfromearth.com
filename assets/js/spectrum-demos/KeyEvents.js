(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var KeyEvents;
    return KeyEvents = (function(superClass) {
      extend(KeyEvents, superClass);

      function KeyEvents() {
        return KeyEvents.__super__.constructor.apply(this, arguments);
      }

      KeyEvents.prototype.init = function() {
        this.font('normal 14px Helvetica');
        this.keyInfo = 'PRESS AN ARROW KEY';
        return this.pointList = [[this.width * .5, this.height * .5]];
      };

      KeyEvents.prototype.step = function() {};

      KeyEvents.prototype.render = function() {
        this.color('black');
        this.text(10, 30, this.keyInfo);
        this.color('dark slate grey');
        this.shape(this.pointList, false, false);
        this.color('black cat');
        return this.circles(this.pointList, 3);
      };

      KeyEvents.prototype.onKeyDown = function(keyCode, altKey, ctrlKey, shiftKey, timeStamp) {
        var amount, current, x, y;
        this.keyInfo = 'onKeyDown():' + ' keyCode: ' + keyCode + ' altKey: ' + altKey + ' ctrlKey: ' + ctrlKey + ' shiftKey: ' + shiftKey + ' timeStamp: ' + timeStamp;
        amount = 20;
        current = this.pointList[this.pointList.length - 1];
        x = current[0];
        y = current[1];
        switch (keyCode) {
          case 37:
            x -= amount;
            break;
          case 38:
            y -= amount;
            break;
          case 39:
            x += amount;
            break;
          case 40:
            y += amount;
        }
        return this.pointList.push([x, y]);
      };

      return KeyEvents;

    })(Renderer);
  });

}).call(this);
