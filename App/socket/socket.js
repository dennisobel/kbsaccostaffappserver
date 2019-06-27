module.exports = function(io, clients, isequal){
	
	io.on('connection',function(socket){	
		socket.emit("connected",clients)	
		console.log("a new client has connected with the id " + socket.id + "!");

		//get connected users
		socket.on("getconnectedusers",()=>{
			console.log("here are the connected clients",clients)
			socket.emit("emitconnectedusers",clients)
		})	


		socket.on('requestswap',(data)=>{
			let recepient = data.recepient
			console.log(recepient)
			console.log(clients)
			if(recepient in clients){
				console.log(clients[recepient].socket)
				socket.to(clients[recepient].socket).emit('incomingswap',data)
			}

		})
		
		//add cart
		socket.on("orderNotification",(data)=>{				
			console.log("RECEIVING CART:",data)
			io.emit('notifyRetailer',data);	
		});

		//add user obj to client
		socket.on("add_user",(data)=>{		
			clients[data.username]	= {
				"socket":socket.id
			};	
			console.log(clients)		
		});

		socket.on('disconnect',(data)=>{
			console.log(data + " disconnected")
		})

		//ready for pickup
		socket.on("pickup",(data)=>{
			socket.emit("pickup",data)
		})

		//go offline
		socket.on("offline",(data)=>{
			console.log("clients: " + JSON.stringify(clients))
			console.log("data : " + data.username)

			for(var key in clients){
				if(data.username === key){
					delete clients[data.username]
					console.log(clients)
					socket.emit("emitconnectedusers",clients)
				}
			}
		})

		function getAllSockets(){
			let _clients = []
			Object.keys(io.sockets.sockets).forEach(function(id) {
			    console.log("ID:",id)  // socketId
			    _clients.push(id)

			    // for(var key in clients){
			    // 	console.log("whagwan")
			    // }

			})	
			socket.emit("getAllSockets",JSON.stringify(_clients))		
		}

		socket.on("_activeUsers",()=>{
			getAllSockets()
		})
	})	
}