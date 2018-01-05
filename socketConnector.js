var io 		 = require('socket.io');
var express  = require('express')
var app 	 = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var Streamer = require('./streamManager');

var hashListeners = {};
module.exports  = function(options){

	
	this.port   = options.port  | 9999;
	server.listen(this.port);
	console.log("socket server started on port "+this.port);
	var self = this;
	

	io.on('connection',  (socket) =>{
		socket.onclose = function(reason){

  			this.emit('disconnecting', reason); //<--insert the new event here
  			this.leaveAll();
			this.emit('disconnect', reason);
		};
		console.log("connected");
	    socket.on('join', (data)=>{
	        console.log(data);
	        var ip      = data.ip;
	        var url     = data.url;
	        var rooms   = io.sockets.adapter.rooms;

	        if(!rooms[ip]){
	        	//create stream manager because no client for that stream
	        	
	        	var stream   = new Streamer({streamUrl:url});
	        	hashListeners[ip] = stream;
	        	//self.writeSocket(socket);
	        	//Listen for stream events

	        	stream.on('data',(data)=>{
	        		//console.log("here")
	        		
					io.to(ip).emit('data',data);
					
				})

				stream.on('ffmpegError',(data)=>{
					 //console.log("error");
					 global.process.stderr.write(data);
				})
			}
			socket.join(ip)
			
	            
	    });

	    socket.on('disconnecting', function(reason){
	    	console.log("disconnecting");
    		var id = socket.id;
    		var rooms = socket.rooms;
    		
    		for(room in rooms){
    			if(room != id){

	    			var clientsInRoom = io.of('/').adapter.rooms[room];
	    			//console.log(clientsInRoom);
	    			var numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
	    			//console.log(numClients);
	      			var stream = hashListeners[room];
	      			
	      			if(stream && numClients <= 1){
	      				stream.remove();
	      			}
      			}
		      	
    		};
  		});


    })


    

	return this;
};

