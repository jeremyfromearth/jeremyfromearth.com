(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer', 'coffeerithms/quick_union/WeightedQuickUnionUF'], function(Renderer, WeightedQuickUnionUF) {
    var DynamicConnectivitySimulation, DynamicConnectivityVisualization;
    DynamicConnectivitySimulation = (function() {
      function DynamicConnectivitySimulation() {}

      DynamicConnectivitySimulation.prototype.init = function(N) {
        var col, row;
        this.dimension = N;
        this.totalSites = N * N;
        this.topVirtual = this.totalSites;
        this.bottomVirtual = this.totalSites + 1;
        this.qf1 = new WeightedQuickUnionUF(this.totalSites + 2);
        this.qf2 = new WeightedQuickUnionUF(this.totalSites + 1);
        return this.sites = [
          (function() {
            var i, ref, results;
            results = [];
            for (row = i = 0, ref = N - 1; 0 <= ref ? i <= ref : i >= ref; row = 0 <= ref ? ++i : --i) {
              results.push((function() {
                var j, ref1, results1;
                results1 = [];
                for (col = j = 0, ref1 = N - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; col = 0 <= ref1 ? ++j : --j) {
                  results1.push(false);
                }
                return results1;
              })());
            }
            return results;
          })()
        ][0];
      };


      /*
       * Converts from row, col to 0 to N -1 index
       */

      DynamicConnectivitySimulation.prototype.getSiteIndex = function(row, col) {
        return row * this.dimension + col;
      };

      DynamicConnectivitySimulation.prototype.getSite = function(index) {
        return [Math.floor(index / this.dimension), index % this.dimension];
      };

      DynamicConnectivitySimulation.prototype.isConnected = function() {
        return this.qf1.connected(this.topVirtual, this.bottomVirtual);
      };

      DynamicConnectivitySimulation.prototype.isFull = function(index) {
        var col, row, site;
        site = this.getSite(index);
        row = site[0];
        col = site[1];
        if (this.sites[row][col]) {
          return this.qf2.connected(this.totalSites, index);
        }
        return false;
      };

      DynamicConnectivitySimulation.prototype.isOpen = function(index) {
        var col, row, site;
        site = this.getSite(index);
        row = site[0];
        col = site[1];
        return this.sites[row][col];
      };


      /*
       * Open a new site
       * If neighboring sites are open, connect them with the newly opened site
       */

      DynamicConnectivitySimulation.prototype.open = function(index) {
        var col, row, site;
        site = this.getSite(index);
        row = site[0];
        col = site[1];
        this.sites[row][col] = true;
        if (row === 0) {
          this.qf1.union(this.totalSites, index);
          this.qf2.union(this.totalSites, index);
        }
        if (row === this.dimension - 1) {
          this.qf1.union(this.totalSites + 1, index);
        }
        if (row > 0) {
          this.union(index, index - this.dimension);
        }
        if (row < this.dimension - 1) {
          this.union(index, index + this.dimension);
        }
        if (col > 0) {
          this.union(index, index - 1);
        }
        if (col < this.dimension - 1) {
          return this.union(index, index + 1);
        }
      };


      /*
       * Try to create a union between to sites
       * The parameters should be two union find indices, eg... 0 to N-1
       */

      DynamicConnectivitySimulation.prototype.union = function(a, b) {
        var bSite;
        bSite = this.getSite(b);
        if (this.isOpen(b)) {
          this.qf1.union(a, b);
          return this.qf2.union(a, b);
        }
      };

      return DynamicConnectivitySimulation;

    })();
    return DynamicConnectivityVisualization = (function(superClass) {
      extend(DynamicConnectivityVisualization, superClass);

      function DynamicConnectivityVisualization() {
        return DynamicConnectivityVisualization.__super__.constructor.apply(this, arguments);
      }

      DynamicConnectivityVisualization.prototype.init = function() {
        this.gap = 2;
        this.border = 2.5;
        this.bg = "#222222";
        this.stepInterval = 10;
        this.initialDim = 9;
        return this.start(this.initialDim);
      };

      DynamicConnectivityVisualization.prototype.start = function(N) {
        this.sim = new DynamicConnectivitySimulation;
        this.sim.init(N);
        this.siteHeight = (this.height - this.border * 2 - this.gap * (this.sim.dimension - 1)) / this.sim.dimension;
        return this.siteWidth = (this.width - this.border * 2 - this.gap * (this.sim.dimension - 1)) / this.sim.dimension;
      };

      DynamicConnectivityVisualization.prototype.step = function() {
        var rnd;
        if (!this.sim.isConnected()) {
          if (this.stepCount % this.stepInterval === 0) {
            rnd = Math.floor(Math.random() * (this.sim.totalSites - 1));
            if (!this.sim.isOpen(rnd)) {
              return this.sim.open(rnd);
            } else {
              return this.step();
            }
          }
        }
      };

      DynamicConnectivityVisualization.prototype.render = function() {
        var c, col, count, i, r, ref, results, row, x, y;
        count = 0;
        results = [];
        for (r = i = 0, ref = this.sim.sites.length - 1; 0 <= ref ? i <= ref : i >= ref; r = 0 <= ref ? ++i : --i) {
          row = this.sim.sites[r];
          results.push((function() {
            var j, ref1, results1;
            results1 = [];
            for (c = j = 0, ref1 = row.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; c = 0 <= ref1 ? ++j : --j) {
              if (this.sim.isConnected() && !this.sim.isFull(count)) {
                this.color("#666666");
              } else if (this.sim.isFull(count)) {
                this.color("#ffffff");
              } else {
                this.color("#666666");
              }
              col = row[c];
              x = this.border + Math.round(c * this.siteWidth + this.gap * c);
              y = this.border + Math.round(r * this.siteHeight + this.gap * r);
              this.rectangle(x, y, Math.floor(this.siteWidth), Math.floor(this.siteHeight), col);
              results1.push(count++);
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      DynamicConnectivityVisualization.prototype.onMouseDown = function(x, y) {
        this.frame = 0;
        if (this.sim.dimension * 2 > this.initialDim * 4) {
          return this.start(this.initialDim);
        } else {
          return this.start(this.sim.dimension * 2);
        }
      };

      return DynamicConnectivityVisualization;

    })(Renderer);
  });

}).call(this);
