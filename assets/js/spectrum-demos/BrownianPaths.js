(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  define(['spectrum/Renderer'], function(Renderer) {
    var Basic;
    return Basic = (function(superClass) {
      extend(Basic, superClass);

      function Basic() {
        return Basic.__super__.constructor.apply(this, arguments);
      }

      Basic.prototype.init = function() {
        this["static"] = false;
        this.bg = "#ffffff";
        this.cx = this.width * .5;
        this.cy = this.height * .5;
        this.id = 0;
        this.paths = {};
        this.count = 0;
        this.freq = 0;
        this.segment = 10;
        return this.directions = [[this.segment, -this.segment], [-this.segment, -this.segment], [-this.segment, this.segment], [this.segment, this.segment]];
      };

      Basic.prototype.step = function() {
        var dir, direction, index, k, l, len, len1, m, n, neighbor, neighbors, path, point, ref, ref1, results, v, x, y;
        if (this.id < 10 && this.count >= this.freq) {
          this.id++;
          this.count = 0;
          this.freq = 50 + Math.floor(Math.random() * 60);
          this.paths[this.id] = {};
          path = this.paths[this.id];
          path.points = [];
          path.points[0] = [];
          point = path.points[0];
          point[0] = this.segment * ~~(Math.random() * (this.width / this.segment));
          point[1] = this.segment * ~~(Math.random() * (this.height / this.segment));
        }
        ({
          "else": this.count++
        });
        if (modulo(this.stepCount, 5) === 0) {
          ref = this.paths;
          results = [];
          for (k in ref) {
            v = ref[k];
            x = v.points[v.points.length - 1][0];
            y = v.points[v.points.length - 1][1];
            neighbors = [];
            ref1 = this.directions;
            for (l = 0, len = ref1.length; l < len; l++) {
              dir = ref1[l];
              neighbors.push([x + dir[0], y + dir[1]]);
            }
            neighbor = null;
            this.shuffle(neighbors);
            for (m = 0, len1 = neighbors.length; m < len1; m++) {
              n = neighbors[m];
              if (neighbor === null && !(this.contains(v.points, n))) {
                neighbor = n;
                break;
              }
            }
            if (neighbor === null) {
              index = ~~(Math.random() * this.directions.length);
              direction = this.directions[index];
              neighbor = [x + direction[0], y + direction[1]];
            }
            if (neighbor != null) {
              v.points.push(neighbor);
              if (v.points.length > 100) {
                results.push(v.points.shift());
              } else {
                results.push(void 0);
              }
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };

      Basic.prototype.contains = function(list, n) {
        var count, el, l, len;
        count = 0;
        for (l = 0, len = list.length; l < len; l++) {
          el = list[l];
          if (el[0] === n[0] && el[1] === n[1]) {
            if (count === list.length - 1) {
              return false;
            }
            return true;
          }
          count++;
        }
        return false;
      };

      Basic.prototype.shuffle = function(a) {
        var i, j, results, t;
        i = a.length;
        results = [];
        while (--i > 0) {
          j = ~~(Math.random() * (i + 1));
          t = a[j];
          a[j] = a[i];
          a[i] = t;
          results.push(a);
        }
        return results;
      };

      Basic.prototype.render = function() {
        var k, p, ref, results, v;
        ref = this.paths;
        results = [];
        for (k in ref) {
          v = ref[k];
          this.color("#da4939");
          this.shape(v.points, false, false);
          results.push((function() {
            var l, len, ref1, results1;
            ref1 = v.points;
            results1 = [];
            for (l = 0, len = ref1.length; l < len; l++) {
              p = ref1[l];
              results1.push(this.rectangle(p[0] - 2, p[1] - 2, 4, 4, true));
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      return Basic;

    })(Renderer);
  });

}).call(this);
