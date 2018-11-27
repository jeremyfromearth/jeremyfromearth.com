---
layout: post
date: 2018-09-30
categories:
  - code
  - cloud
  - python
published: true
permalink: blog/cloud-storage-file-upload/
headline: blog
heading: Google Cloud Storage File Upload with Flask & JavaScript
---

In this article, I’ll quickly demonstrate how to upload an image file to Google Cloud Storage from a Flask app on App Engine Standard. Additionally, I’ve added a bit of code that crops and resizes the image before storing it.

First you’ll need a basic file input element somewhere in your HTML. For this specific task, I included a file type filter that only accepts jpg and png files. In reality, much of what is demonstrated here can be used for uploading any type of file.

```
<input id=’avatar-file-input’ type=’file’ multiple=’false’ accept=’.jpg,.jpeg,.png’/>
```

Next we’ll define a JavaScript handler that invokes the file upload from the front-end. Note that, in this example, we are only uploading a single file.

```
let avatar_file_input = document.getElementById('avatar-file-input')
avatar_file_input.addEventListener('change', on_file_select)
on_file_select() {
  if(avatar_file_input.files.length > 0) {
    let file = avatar_file_input.files[0]
    // clear the data from the file input element
    avatar_file_input.value = ''

    // constrain the file size to 500kb
    if(file.size < 500000) { // bytes
      let fd = new FormData()
      fd.append('image', data)
      axios.post('/avatar/update', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response=> {
        // handle success
      })
      .catch(err=> {
        // handle error
      })
    } else {
       // show an error
    }
  }
}
```

Nothing is to surprising about the above. Do note that this example uses the [`axios`](https://www.npmjs.com/package/axios) library for making http requests, but it’s completely doable with regular XMLHttpRequests.

Before handling the image data in the Flask app, we need to take a minute to look at setting up Cloud Storage in your App Engine project.

If you haven’t already created a bucket in the Cloud Storage, you will need to do so through the GCP console. This is well documented, so I’ll refrain from echoing the GCP docs and just provided a [link](https://cloud.google.com/storage/docs/creating-buckets). Importantly, you must set the permissions to this bucket to be public. Again, I won’t reiterate the docs, so here is a link explaining [how to set permissions on a Storage bucket](https://cloud.google.com/storage/docs/access-control/making-data-public). For my use case, I’ve designated one bucket for public access and others for data and files that may contain more sensitive information.

Before you can interface with Cloud Storage in a Flask app, you will also need to install a library that provides helpful utilities for working with the service. I added this to my requirements.txt file and ran `pip install -t lib`.

```
GoogleAppEngineCloudStorageClient==1.9.22
```

It’s worth noting that there is a dependency on the PIL library for handling images. I had to install version 1.1.7 manually to make this work. However, when I deployed to App Engine, it worked without any special considerations. Before we can handle the file upload we’ll need to initialize Cloud Storage in the Flask app.

> The following assumes that you’ve already created a Flask based GAE project.

```
import uuid
import cloudstorage as gcs
from google.appengine.api import images, app_identity
from flask import Flask, request, jsonify
JPEG = images.images_service_pb.OutputSettings.JPEG
PNG = images.images_service_pb.OutputSettings.PNG
bucket_name =
  os.environ.get(
    'BUCKET_NAME',
    app_identity.get_default_gcs_bucket_name()
  )

```

With that taken care of we can now look at the endpoint that crops, resizes and stores the image file in the Cloud Storage.

```
@app.route('/avatar/update', methods=['POST'])
def user_update_avatar():
  # Make sure we have an image in the request
  original = request.files.get('image', None)
  if not original:
    return jsonify(
      {'error': 'Missing image, can not change avatar'}
    )
  try:
    # Create image data from the original
    image = images.Image(original.read())
    # Resize and crop the image to a give size,
    # while maintaining aspect ratio
    image.resize(
      width=128, height=128, crop_to_fit=True, allow_stretch=False
    )
    # Commit the transformation on the image data
    result = image.execute_transforms(output_encoding=JPEG)
    # Create a filename for the stored image
    filename = 'avatar-{}.jpg'.format(uuid.uuid4())
    filepath = '/{}/{}'.format(bucket_name, filename)
    # Store the image in Cloud Storage with a random filename
    f = gcs.open(filepath, 'w', content_type='image/jpg')
    f.write(result)
    f.close()
    # Return the url of the stored image
    return jsonify({
      'avatar_url': '/storage/{}'.format(filename)
    }), 200
  except Exception as e:
    return jsonify({
      'error': 'Could not create image data'
    }), 500
```

You may have noticed that the file path contains a random string and look roughly like this: `/my-bucket-name/avatar-3f8f3dbefacc9.jpg`. Additionally, the file path in the response is prepended with `storage/`. Next, we’ll create an endpoint that can fetch the files from Cloud Storage using a route that expects this format.

```
@app.route('/storage/<filename>')
def storage(filename):
  """Endpoint for files in Cloud Storage
       @filename - The name of the file only, not the entire path
  """
  try:
    # Reformat the filename using the bucket name fetched above
    fname = '/{}/{}'.format(bucket_name, filename)
    f = gcs.open(fname)
    data = f.read()
    return data
  except Exception as e:
    return jsonify({'error': 'Could not find file {}'.format(filename)})
```

You can now set the source of an image element to `storage/FILENAME`, and get the requested asset.

As always, hope someone out there finds this helpful. Feel free to post questions and comments. Uploading images to Cloud Storage was relatively new territory for me, so I thought I’d document my approach here. If anyone out there finds this and knows of a more efficient way to do this, don’t hesitate to let me know! :)
