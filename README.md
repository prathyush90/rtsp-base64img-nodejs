This module converts a rtsp feed into a sequence of base64 images by spawning child process and passes data to clients via websockets.It can be used to spawn multiple streams and clients join streams
which they are interested in.The module automatically kills the child process when the room is empty.
