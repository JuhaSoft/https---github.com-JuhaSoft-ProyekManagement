const sendDataWithToken = (req, res, next) => {
    if (res.locals.newAccessToken) {
      res.setHeader('x-access-token', res.locals.newAccessToken);
    }
    next();
  };
  
  module.exports = sendDataWithToken;
  