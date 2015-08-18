define ['spectrum/Renderer'], (Renderer) ->
    class Destijl extends Renderer
        # Initialize instance variables
        init : ->
          @bg = "#ffffff"
          @cx = @width * .5
          @cy = @height * .5
