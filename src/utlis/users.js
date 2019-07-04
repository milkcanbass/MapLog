const users = [];

// addUser, removeUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required"
    };
  }
  //Check for existing user
  const existingUser = users.find(() => {
    return users.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "Username is in use!"
    };
  }
  //Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

addUser({
  id: 22,
  username: "kai",
  room: "Toronto"
});
console.log(user);
