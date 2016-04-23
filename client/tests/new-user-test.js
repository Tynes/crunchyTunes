import sessionData from '../../server/sessionData.js';
import io from 'socket.io-client';

let testSession = Object.create({}, sessionData);
const socketURL = 'http://localhost:8080';
const options = {
  transports: ['websocket'],
  'force new connection': true,
};
let chatUser1 = { name: 'kdawg' };
let chatUser2 = { name: 'lizzard' };
let chatUser3 = { name: 'jdawg' };

describe('users over sockets', () => {
  it('can emit messages to users', () => {
    let client1 = io.connect(socketURL, options);

    client1.on('connect', (data) => {
      client1.emit('connection name', chatUser1);
      let client2 = io.connect(socketURL, options);

      client2.on('connect', (data) => {
        client2.emit('connection name', chatUser2);
      });

      client2.on('new user', (usersName) => {
        expect(usersName).to.equal(`${chatUser2.name} has joined.`);
        client2.disconnect();
      });
    });

    let numUsers = 0;
    client1.on('new user', (usersName) => {
      numUsers += 1;

      if (numUsers === 2) {
        expect(usersName).to.equal(`${chatUser2.name} has joined.`);
        client1.disconnect();
        done();
      }
    });
  });
});
