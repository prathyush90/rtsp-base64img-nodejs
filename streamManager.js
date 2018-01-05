var Muxer       = require('./muxer');
var manager;
var util 	    = require('util');
var events      = require('events');
manager     = function(options){


	
	var self 		 = this; 
	this.streamUrl   = options.streamUrl;
	

	this.streamMuxer     = new Muxer({url:this.streamUrl});

	
	this.streamMuxer.on('data',(data)=>{
		
		return self.emit('data',data);
	})

	this.streamMuxer.on('ffmpegError',(data)=>{
		return self.emit('ffmpegError',data);
	})

	return this;
	
}

manager.prototype.remove	= function(){
	//console.log("remove has been called");
	this.streamMuxer.abort();
}

util.inherits(manager, events.EventEmitter);



module.exports = manager;









