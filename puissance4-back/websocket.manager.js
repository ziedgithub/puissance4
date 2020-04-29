const Websocket = require('./startup/websocket');
const User = require('./models/user.model');


module.exports = (server) => {
  new Websocket(server);
  const io = Websocket.getInstance();

  const registerSocket = io.of('/register');
  const inviteSocket = io.of('/invite');
  const gameSocket = io.of('/game');

  registerSocket.on('connection', (socket)=> {
    socket.on('registerInfos', async (data) => {
      const user = new User(socket.id, data.username);
      await user.addUser();
      const users = await User.getUsers();
      await socket.join('connectedUsers');
      await socket.join(data.username);
      registerSocket.to('connectedUsers').emit('connectedUsers', users);
    });

    socket.on('disconnect', async () => {
      await socket.leave('connectedUsers');
      const username = await User.getUser(socket.id);
      await socket.leave(username);
      await User.delete(socket.id);
      const users = await User.getUsers();
      registerSocket.to('connectedUsers').emit('connectedUsers', users);
    });
  });

  inviteSocket.on('connection', (socket) => {
    socket.on('invite',async ({src, to}) => {
      await socket.join('invitation'+src+to);
      registerSocket.to(to).emit('newInvitation', src)
    });
    socket.on('confirm', ({src, to}) => {
      inviteSocket.to('invitation'+src+to).emit('confirmed');
    })
  })

  gameSocket.on('connection', (socket) => {
    socket.on('startGame', ({player1, player2}) => {
      socket.join(player1+'$'+player2);
    });
    socket.on('newAction', ({x,player, player1, player2}) => {
      gameSocket.to(player1+'$'+player2).emit('newAction',{
        x,
        player
      });
    })
  })
}
