# Welcome
This is the source code for my experimentation site. You can check it out [here][site].

Make sure to use Ruby 2.3.5, using [RVM](https://rvm.io/).

Install
```
bundle install
```

Start the Jekyll server. Optionally enable auto-build using `--watch` flag
```
jekyll serve --watch
```

Open your browser to `http://localhost:4000`

To build the src folder and distribute the generated javascript into the app:
``` 
npx babel src --out-dir assets/js/app --presets=es2015,stage-0 --plugins=transform-es2015-modules-amd --watch
```

[jekyll]: http://jekyllrb.com/
[site]: http://jeremyfromearth.com
