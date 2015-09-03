define ['spectrum/Renderer'], (Renderer) ->
    class Destijl extends Renderer
        init : ->
            @bg = "#ffffff"
            @circle_shapes = []

        step : ->
            if @stepCount is 0 or @stepCount %% 120 is 0
                @circle_shapes.push {radius: 100, alpha: 0.01}
            for c in @circle_shapes
                c.radius += 1
                if c.alpha * 1.02 <= 1.0
                    c.alpha *= 1.02

        render : ->
            cx = @width * .5
            cy = @height * .5
            for c in @circle_shapes
                @alpha c.alpha
                @color "#ff0000"
                @circle cx, cy, c.radius, false
