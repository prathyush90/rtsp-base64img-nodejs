Node.js,socket.io,express

Please download ffmpeg on to your local machine and make it available in the path before using this module since it assumes ffmpeg is available from command line while spawning a child process

This module converts a rtsp feed into a sequence of base64 images by spawning child process and passes data to clients via websockets.It can be used to spawn multiple streams and clients join streams
which they are interested in.The module automatically kills the child process when the room is empty.
