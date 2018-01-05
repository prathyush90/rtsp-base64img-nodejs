Node.js,socket.io,express

Please download ffmpeg on to your local machine and make it available in the path before using this module since it assumes ffmpeg is available from command line while spawning a child process

This module converts a rtsp feed into a sequence of base64 images by spawning child process and passes data to clients via websockets.It can be used to spawn multiple streams and clients join streams
which they are interested in.The module automatically kills the child process when the room is empty.


Using it is very very simple

Node.js : 

```node.js
npm i --save npm i rtsp-base64img-nodejs

var frameTransporter = require('rtsp-base64img-nodejs');

var streamer = new frameTransporter({port:9999})

```

The port option is optional by default it starts socket.io on port 9999.You can change it by passing the port value in the option.That's it your server is all set up


I used angular2 on client side but any language which supports socket.io should be good to go

Angular 2 :

Inside your html add this image tag where you want to show the sequence of images 

```html
<img id="img"  >
 
```

In angular2 install socket.io-client from npm

```es6
import * as io from 'socket.io-client';
```
