var muxer;
var child_process = require('child_process');
var events 		  = require('events');
var util 		  = require('util');


muxer 	   =  function(options){

	//console.log(options);
	var self;
    self = this;
    this.url = options.url;
    this.rate = options.rate | 10;
    this.quality = (options.quality === undefined || options.quality === "") ? 3 : options.quality;
    this.stream = child_process.spawn("ffmpeg", ['-loglevel', 'quiet','-i', this.url, '-r', self.rate.toString(),'-q:v',this.quality.toString(),'-f', 'image2'
		, '-updatefirst', '1'
		, '-'], {
      detached: false
    });

    this.inputStreamStarted = true;
    this.stream.stdout.on('data', function(data) {
    	//console.log("yyyy");
      return self.emit('data', data.toString('base64'));
    });
    this.stream.stderr.on('data', function(data) {
    	//console.log("xxx");
      return self.emit('ffmpegError', data);
    });
 
    return this;
};

muxer.prototype.abort = function(){
	//console.log("request to abort");
	this.stream.kill('SIGINT');
}

util.inherits(muxer, events.EventEmitter);

module.exports = muxer;

