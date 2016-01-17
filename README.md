# Watermark
Graduation project Loftschool.com.
## Add custom watermark to photos, it`s easy.
![Project] (http://wt.alskr.ru/project.png)

### How to use
- Upload source image
- Upload image for watermark
- Change watermark position and opacity if it necessary
- Finish. Download the result

### Requirements
- node.js - evented I/O for the backend
- bower - a package manager for the web
- gulp - Automate and enhance your workflow
- browserify - lets you require('modules') in the browser by bundling up all of your dependencies
- jade - node template engine
- ruby - a dynamic, open source programming language with a focus on simplicity and productivity
- sass - is the most mature, stable, and powerful professional grade CSS extension language in the world
- compass - is an open-source CSS Authoring Framework
- php >=5.4 with Imagick - Hypertext Preprocessor
- composer - dependency Manager for PHP

### Installation

```sh
$ git clone https://github.com/skaynetmen/watermark.git watermark
$ cd watermark
$ npm install
$ bower install
```

#### Production

```sh
$ gulp build
$ cd dist
```
Copy dist on your web-server, then:

```sh
$ composer install
$ mkdir -p app/uploads/results
```

#### Development

```sh
$ gulp jade
$ gulp sass
$ gulp scripts
$ gulp
```

Or wia php

```sh
$ cd app/
$ php -S 127.0.0.1:9000
```

Then open your browser, http://localhost:9000

### Project tree
```sh
└───app
    ├───api
    ├───css
    ├───fonts
    ├───img
    │   └───icons
    ├───jade
    │   ├───common
    │   └───partials
    ├───js
    │   ├───modules
    │   └───vendor
    ├───scss
    │   ├───common
    │   └───partials
    └───uploads
```

### Developer
* Alexandr Skrylev [skaynetmen](https://github.com/skaynetmen) teamleader, git, code review, markup, js, php, testing
* Dmytro Kryshtopa [kryshtopa](https://github.com/kryshtopa) js
* Vadim Novash [stakeout](https://github.com/stakeout) js
* Kanat Sadykov [kAn13](https://github.com/kAn13) js
* Alexandra Veyt [AlexWeit](https://github.com/AlexWeit) js
* Zoryana Petrova  [zoryana-petrova](https://github.com/zoryana-petrova) php

License
----

MIT