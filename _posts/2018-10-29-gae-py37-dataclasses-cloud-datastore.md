---
layout: post
date: 2018-10-29
categories:
  - code
  - cloud
  - python
published: true
permalink: blog/gae-py37-dataclasses-cloud-datastore/
headline: blog
heading: Py3.7 App Engine + Cloud Firestore + Dataclasses
---

TL;DR — Dataclasses are a great solution for creating a simple and extensible model class that wraps the underlying Cloud Firestore client. To install, do this: pip install `firestore_model`. [Check it out here](https://pypi.org/project/firestore-model/)

## A little background
Last week I decided to upgrade my project to the newly available [App Engine Python 3.7 Standard Environment](https://cloud.google.com/appengine/docs/standard/python3/) and was surprised by just how much has changed. It seems that Google has taken the opportunity to completely overhaul how Python App Engine projects are structured. They’ve moved away from the previously monolithic stack to a more idiomatic Python development experience.

Now, [atomic packages that interact with specific GCP services](https://googleapis.github.io/google-cloud-python/) can easily be installed using PIP. Additionally, third party libraries including those that implement C/C++ code can also be installed on the runtime. This last point is one of the main reasons I decided to upgrade. I’d like to be able to run libraries like [SpaCy](http://spacy.io/) and [RasaNLU](http://rasa.ai/) on App Engine.

Another major change in the new environment is that the NDB library is not compatible with Python 3.7. After reading the [documentation comparing GCP storage options](https://cloud.google.com/datastore/docs/firestore-or-datastore), I opted to make a big switch from Cloud Datastore to Cloud Firestore. The project I’ve been working on used NDB extensively. So a major refactor was in order.

Firestore, like Datastore or even MongoDB, is a schemaless document store. The [Google client library for interfacing with Firestore](https://googleapis.github.io/google-cloud-python/latest/firestore/index.html) is clean and simple, but it does not provide any kind of formal model data structures like NDB. Using it, you will most likely end up writing brittle code.

## Google’s Firestore client example:
```
from google.cloud import firestore
db = firestore.Client()
# Get document with matching id
db.collection(‘user’).document(‘e54af-1zeb3’).get()
# Get all users created before 1981 that have zero comments
db.collection(‘user’)
  .where(‘created_year’ ‘<’ 1981)
  .where(‘comments_count’ ‘==’ 0)
  .limit(10)
  .get()
```

The above syntax is declarative, readable and even familiar. However, as a project grows, it becomes difficult to keep track of collection types, property names and variable datatypes. For these reasons, the above syntax can become a bit cumbersome and unwieldy to maintain.

An NDB Example (works with Cloud Datastore and Python 2.7 only)

```
class User(ndb.Model):
  avatar = ndb.StringProperty(default=’’)
  date_created = ndb.DateTimeProperty(auto_now_add=True)
  name = ndb.StringProperty()
  email = ndb.StringProperty()
```
With NDB, you define and maintain a nice consistent structure for you data.

## A Custom Solution
I’ve hand rolled a solution for working with Cloud Firestore in a fashion similar to that of the NDB library and named it `firestore_model`. Below are some examples.

##### __Initialize `firestore_model`__

```
import firestore_model
from firestore_model import Model
from google.cloud import firestore
from dataclasses import dataclass, field
firestore_model.db = firestore.Client()
```

##### __Define a User model__

```
@dataclass
class User(Model):
  first_name:str
  last_name:str
  occupation:str
```

The above code simply imports the needed classes, initializes a handle to the Firestore client and then declares a class called User that has a handful of properties. Note the use of the `@dataclass` decorator. This tells the interpreter to generate a new kind of data structure in Python 3.7 called a dataclass.



<iframe width="560" height="315" src="https://www.youtube.com/embed/T-TwcmT6Rcw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Above is a great talk by Raymond Hettinger detailing dataclasses and their utility.

##### __Create and save a new user model__
```
u1 = User.make(
    first_name='Sonic',
    last_name='Brown',
    occupation='circus dog'
    save=True
  )
print(u1.id) #1a83598c-3624-4202-9caa-ce8403c19a0d
```

Notice that although we didn’t explicitly add an id property to `User`, it does in fact have one. This is because the base class `Model` automatically creates an `id` and `created` property when the `make()` factory function is invoked. This is a class method defined on `Model`, inherited by it’s sub-classes, that creates a new instance of the calling class.

##### __Get a User model back from Cloud Firestore__
```
u = User.get('1a83598c-3624-4202-9caa-ce8403c19a0d')
print(u.occupation) # 'circus dog'
```

… again, a class method is used for getting a single instance of a model.

##### __Fetch all users matching the supplied conditions__
```
users = User.query([
    ('occupation', 'circus dog'),
    ('created', '>', 1540776978)
  ]
).get()
```

Note that we didn’t explicitly declare a `created` property on this model. That property is given a value when you first instantiate new model instances.

##### __Iterate through the query results__
```
for u in users:
  print(u.id, u.created, u.first_name, u.last_name, u.occupation)
```
The return value of `.get()` is a generator that returns instances of the class `User`.

A query object returned by the `query()` method can be further modified by accessing the `q` property which is simple a handle to the underlying query object from the `google.cloud.firestore_v1beta1.query` module.

##### __Apply additional rules to a query__
```
user_query = Users.query([
  ('occupation', 'circus dog')
])
user_query.q
  .limit(10)
  .order_by('first_name')
for u in user_query.get():
  print(u.to_dict())
```

That is the extent of the functionality thus far. I’m sure there are changes and enhancements to be made, but for a first go around it seems to be working very well in replacing the NDB library in my current project. And, I do have a few enhancements planned:

 * Implement foreign keys
 * Use pytest/unititest and test routines
 * Handle unrecognized and missing fields (currently, when schemas change, the model instances returned by get and query may throw errors if the schema has changed)
 * More usage examples
