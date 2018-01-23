# Welcome
This is the source code for my archive and experimentation site. You can check it out [here][site].

For preview, ensure that you have [Jekyll][jekyll] installed.

Start the Jekyll server. Optionally enable auto-build using `--watch` flag

```
jekyll serve --watch`
```

Open your browser to `http://localhost:4000`

To build the src folder and distribute the generated javascript into the app:
``` 
npx babel src --out-dir assets/js/app --presets=es2015,stage-0 --plugins=transform-es2015-modules-amd --watch
```

[jekyll]: http://jekyllrb.com/
[site]: http://jeremyfromearth.com
