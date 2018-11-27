---
layout: post
date: 2018-09-02
description: Configuring a Full Stack Development Environment with App Engine, Flask & Vue
categories:
- code
- cloud
permalink: blog/fullstack-dev-with-gae-vue-flask/
headline: blog
heading: Configuring App Engine, Flask & Vue
---

![Logos](/assets/images/blog/gae-vue-flask.png)

In this article I'm going to summarize how to configure a development environment for building a single page web app using Google App Engine, Flask & Vue. Throughout, I'll assume a working knowledge of Python, Flask, Vue, Node, NPM & a general command line fluency.

## Goals for the development environment:
 * Serve a single page web app rendered with Vue from Flask
 * Serve API endpoints from Flask app
 * Fetch data on the client from Flask app
 * Rebuild and restart server when changes are saved
 * Use hot module reloading provided by Vue-CLI
 * Easily create builds for development and production deployments

## Google Cloud Platform SDK
 * First, if you don't have it, you'll need to download and install the GCP SDK. This toolkit provides all you need for developing and deploying web apps to App Engine.
 
## App Engine + Flask
Google provides loads of resources for learning about GCP. This tutorial on setting up a basic Flask app is very helpful if you're just getting started.

We aren't too concerned with serving up Jinja based templates from Flask since we'll be taking care of rendering on the client side. So instead, we only define a single view handler. Note the path to the index.html file. Later, we'll target this folder in the Vue configuration and copy compiled code and files to it.

```
from flask import Flask, render_template
app = Flask(__name__)
@app.route('/')
def index():
  return render_template('gen/index.html')
@app.route('api/get-docs/')
def get_documents():
  # endpoint for retrieving documents
  pass
```

Starting up the Flask app is simple, after you've followed the configuration setup in the tutorial linked to above. From the directory that the your server code is in, run the following:

```dev_appserver.py app.yaml```

dev_appserver.py is a part of the GCP SDK. It will run your app, monitor files in the project and restart the server when changes are made. It is important to note that this is one of two servers running in our dev environment and it runs on port 8080.

## File Structure
This is probably a good moment to take a look at the file structure for the project. Note that the server and client code are in their own directories.

```
project/
  |- server/
    |- app.yaml
    |- appengine_config.py
    |- lib/
    |- main.py
    |- requirements.txt
    |- static/
      |- gen/
    |- templates/
      |- gen
  |- client/
    |- package.json
    |- public/
    |- src/
      |- components/
    |- main.js
    |- vue.config.js
```

## Setting Up Vue
Creating a new Vue project is super simple using the Vue-CLI. If you don't already have it installed, you can do so by running:

```
npm install -g @vue/cli
```
Now you can create a new Vue project in the client directory:

```
cd client
vue create name-of-my-project
```

Vue-CLI is equipped with a development server that, like the GCP dev server, will monitor your project files and re-start when changes are detected. Additionally, it serves the app using hot module reloading. This means that you don't have to refresh your app in the browser to see changes and also that your app's state is maintained across changes. The is the second of two servers running in the development environment and if dev_appserver.py is running, it will be served on port 8081.

You can easily start the server from the command line using the following:

```vue-cli-service serve```
or… you can add a shortcut script to package.json for a more idiomatic syntax.

```
"scripts": {
  "serve": "vue-cli-service serve",
  "prod": "vue-cli-service build",
  "dev": "vue-cli-service build --mode=development"
}
```

Now npm run serve will start the server. Also notice the other scripts prod and dev. We'll look at those a bit later.

To enable our front-end code to fetch data from the Flask app, we'll need to configure the Vue-CLI service to proxy requests through the first server. Fortunately, this only requires making a small update to the Vue configuration and can be done by creating a file called vue.config.js in the root of the client directory.

```
module.exports = {
  devServer: {
    proxy: 'http://localhost:8080'
  }
}
```

## Building for Dev and Prod
At this point we have two servers running, one for serving the Flask based API and one for serving the Vue front-end. During development, you'll most likely be concerned with the front end server.

Before deploying the app, we need to compile and optimize our front end code and copy it over to the static/gen and templates/gen folders of the Flask app. I snuck in two other scripts in the above snippet, dev and prod. These scripts tell the Vue-CLI to build the project for development and production environments. All that is left is to tell Vue-CLI where to put the compiled files. We can do that in the vue.config.js file.

Note: this is the same file mentioned above, but now it returns different config options based on the arguments provided.

```
const path = require('path')
const argv = require('optimist').argv
let config = {}
let command = argv['_'][0]
switch(command) {
  case 'build':
    config = {
      baseUrl: '/static/gen',
      assetsDir: './',
      outputDir: '../server/static/gen',
      pages: {
        app: {
          entry: 'src/main.js',
          template: 'public/index.html',
          filename:
            path.resolve(
              '../server/templates/gen', 'index.html'),
          title: 'Paracosm Home'
        }
      }
    }
    break
  case 'serve':
    config = {
      devServer: {
        proxy: 'http://localhost:8080'
      }
    }
}
module.exports = config
```

Now we can build for dev by running npm run dev or for production with npm run prod.

After running either of those you can view the app from the Flask dev server at localhost:8080. Of course any changes you make to the front-end code won't show up here until you re-compile again. Once you are ready to deploy to App Engine, you can do so by running: gcloud app deploy server/app.yaml.

That's it! I hope others out there find this useful. Feel free to leave a comment or question.
