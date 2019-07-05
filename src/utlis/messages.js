const generateMessage = (text, username) => {
  return {
    text,
    username,
    createdAt: new Date().getTime()
  };
};

const generateLocation = (username, latitude, longitude) => {
  return {
    url: `http://google.com/maps?q=${latitude},${longitude}`,
    username,
    latitude,
    longitude,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocation
};
