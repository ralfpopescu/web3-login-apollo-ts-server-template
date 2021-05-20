const debug = (message, metadata) => {
  console.log(message);
  //console.log(JSON.stringify(metadata));
};

const error = (message, metadata, e) => {
  console.log(message);
  console.log(JSON.stringify(metadata));
  console.log(e);
};

module.exports = { debug, error };
