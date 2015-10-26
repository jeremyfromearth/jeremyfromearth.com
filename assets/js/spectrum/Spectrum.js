(function() {
  var Spectrum;

  define(['Renderer', 'Player', 'Dispatcher', 'Utils', 'Vector'], function(Renderer, Player, Dispatcher, Utils, Vector) {}, Spectrum = (function() {
    function Spectrum() {}

    Spectrum.Player = Player;

    Spectrum.Renderer = Renderer;

    Spectrum.Dispatcher = Dispatcher;

    Spectrum.Utils = Utils;

    Spectrum.Vector = Vector;

    return Spectrum;

  })());

}).call(this);
