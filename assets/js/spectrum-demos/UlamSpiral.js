(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer', 'spectrum/Utils'], function(Renderer, Util) {
    var UlamSpiral;
    return UlamSpiral = (function(superClass) {
      extend(UlamSpiral, superClass);

      function UlamSpiral() {
        return UlamSpiral.__super__.constructor.apply(this, arguments);
      }

      UlamSpiral.prototype.init = function() {
        var changes, count, current, i, j, num, prev, ref, results;
        this.font('bold 24pt sans-serif');
        this.dist = 12;
        this.total = 1601;
        this.direction = {
          x: this.dist,
          y: 0
        };
        this.points = [
          {
            x: this.width * .5,
            y: this.height * .5,
            num: 1,
            prime: false
          }
        ];
        num = 0;
        count = 0;
        changes = 0;
        results = [];
        for (i = j = 2, ref = this.total + 1; 2 <= ref ? j < ref : j > ref; i = 2 <= ref ? ++j : --j) {
          prev = this.points[i - 2];
          current = {
            x: prev.x + this.direction.x,
            y: prev.y + this.direction.y,
            num: i,
            prime: this.isPrime(i)
          };
          count++;
          if (count > num) {
            changes++;
            if (changes === 2) {
              num++;
              changes = 0;
            }
            count = 0;
            this.updateDirection();
          }
          results.push(this.points.push(current));
        }
        return results;
      };

      UlamSpiral.prototype.isPrime = function(n) {
        var i, j;
        for (i = j = 2; j < 10; i = ++j) {
          if (n % i === 0 && n !== i || n === 1) {
            return false;
          }
        }
        return true;
      };

      UlamSpiral.prototype.updateDirection = function() {
        var x, y;
        x = this.direction.x;
        y = this.direction.y;
        if (x > 0 && y === 0) {
          x = 0;
          y = -this.dist;
        } else if (x === 0 && y < 0) {
          x = -this.dist;
          y = 0;
        } else if (x < 0 && y === 0) {
          x = 0;
          y = this.dist;
        } else if (x === 0 && y > 0) {
          x = this.dist;
          y = 0;
        }
        this.direction.x = x;
        return this.direction.y = y;
      };

      UlamSpiral.prototype.render = function() {
        var j, len, p, ref, results;
        ref = this.points;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          p = ref[j];
          if (p.num === 1) {
            this.color('red');
          } else if (p.prime) {
            this.color('slategrey');
          } else {
            this.color('white');
          }
          this.circle(p.x, p.y, this.dist * .5 - 2);
          if (Math.hitTestCircle(this.mouseX, this.mouseY, p.x, p.y, this.dist * .5)) {
            if (p.prime) {
              this.color('slategrey');
            } else {
              this.color('black');
            }
            results.push(this.text(20, 50, 'Number: ' + p.num));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };

      return UlamSpiral;

    })(Renderer);
  });

}).call(this);
