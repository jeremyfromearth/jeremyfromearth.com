(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var MouseEvents;
    return MouseEvents = (function(superClass) {
      extend(MouseEvents, superClass);

      function MouseEvents() {
        return MouseEvents.__super__.constructor.apply(this, arguments);
      }

      MouseEvents.prototype.init = function() {
        this.data = [];
        this.bg = "#222222";
        this.current = null;
        return this.currentMouseEventType = "None";
      };

      MouseEvents.prototype.step = function() {
        var i, results;
        i = 0;
        results = [];
        while (i < this.data.length) {
          if ((this.data[i] != null) && this.data[i] !== this.current) {
            this.data[i].scale -= .005;
            this.data[i].alpha -= .005;
            if (this.data[i].alpha < 0) {
              this.data[i] = null;
            }
          }
          results.push(i++);
        }
        return results;
      };

      MouseEvents.prototype.render = function() {
        var i, p;
        i = 0;
        while (i < this.data.length) {
          p = this.data[i];
          if (p != null) {
            this.alpha(p.alpha);
            this.color(p.color);
            this.circle(p.x, p.y, p.radius * p.scale);
          }
          i++;
        }
        this.alpha(1);
        this.color("#ffffff");
        this.text(30, 30, "Mouse position x: " + this.mouseX + ", y: " + this.mouseY);
        this.text(30, 45, "Current mouse event type: " + this.currentMouseEventType);
        return this.text(30, 60, "mouseIsDragging: " + this.mouseIsDragging + ", mouseIsOver: " + this.mouseIsOver + ", mouseIsDown: " + this.mouseIsDown);
      };

      MouseEvents.prototype.onMouseDown = function(x, y) {
        this.currentMouseEventType = "mouseDown";
        this.current = {
          x: x,
          y: y,
          color: this.randomColor(),
          radius: Math.random() * 20 + 5,
          alpha: 1,
          scale: 1
        };
        return this.data.push(this.current);
      };

      MouseEvents.prototype.onMouseMove = function(x, y) {
        this.currentMouseEventType = "mouseMove";
        if (this.mouseIsDragging) {
          if (this.current != null) {
            this.current.x = x;
            return this.current.y = y;
          }
        }
      };

      MouseEvents.prototype.onMouseUp = function(x, y) {
        this.currentMouseEventType = "mouseUp";
        return this.current = null;
      };

      MouseEvents.prototype.onMouseOver = function(x, y) {
        this.currentMouseEventType = "mouseOver";
        return this.bg = "#222222";
      };

      MouseEvents.prototype.onMouseOut = function(x, y) {
        this.currentMouseEventType = "mouseOut";
        return this.bg = "#000000";
      };

      return MouseEvents;

    })(Renderer);
  });

}).call(this);
