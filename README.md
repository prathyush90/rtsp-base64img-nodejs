Node.js,socket.io,express

Please download ffmpeg on to your local machine and make it available in the path before using this module since it assumes ffmpeg is available from command line while spawning a child process

This module converts a rtsp video feed into a sequence of base64 images by spawning child process and passes data to clients via websockets.It can be used to spawn multiple streams and clients join streams
which they are interested in.The module automatically kills the child process when the room is empty.


Using it is very very simple

Node.js : 

```node.js
npm i --save  rtsp-base64img-nodejs

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
Add this line at the top in your imports section inside your component 
```es6
import * as io from 'socket.io-client';
```


```es6
ngOnInit() {
    this.socket = io('http://localhost:9999');
    this.socket.on('connect',()=>{
    
    this.socket.emit('join',{url:'rtsp://your_rtsp_stream_url',ip:'192.168.1.108'});
    })
    this.img = document.getElementById('img'),
    this.socket.on('data',  (data)=> {
        
    //     console.log("entered");
    this.img.src = 'data:image/jpeg;base64,' + data;
    });


  }
```

1) First connect socket.io to your server with the mentioned port in the server.Default is 9999.
2) Once connected emit a join event and pass the <b>url of the stream</b> and <b>room name(ip)</b>.Here i have used ipaddress as the roomname because i was developing this for ipcameras.
3) Then get the image element's reference and update it'source with the base64 image that is being passed from the server.That's it

I have plans to extend it further and make the ffmpeg to be passed while creating <b>frameTransporter</b>.If anyone's interested please fork and start developing.Thanks



