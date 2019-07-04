const generateMessage = text => {
  return {
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocation = (latitude, longitude) => {
  return {
    url: `http://google.com/maps?q=${latitude},${longitude}`,
    latitude,
    longitude,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocation
};
