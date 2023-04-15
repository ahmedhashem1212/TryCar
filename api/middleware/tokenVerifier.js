const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const errorCodes = require('../constants/statusCodes');
const {client} = require('../../config/DBConfig');

module.exports = {
  userToken: async (req, res, next) => {
    try {
      let decoded=null
      if(req.headers.authorization){
       decoded = await jwt.verify(
        req.headers.authorization.split(' ')[1],
        secretOrKey,
      );
      }
      let dateNow = Math.floor(Date.now() / 1000) 
      if (decoded!=null) {
        if(decoded.exp < dateNow){
          return res.status(401).json({
            ...errorCodes.UserCodes.tokenExpired,
          });
        }else{
          if (decoded.type == 'USER'){
            const reply = await client.get("USER_"+decoded.userId);
            if(reply){ 
             if(reply!=req.headers.authorization.split(' ')[1]){
               return res.status(401).json({
                 ...errorCodes.UserCodes.loginElsewhere,
               }); 
             }
            else{
              req.token = {
                userId: decoded.userId,
                userMongoId: decoded.userMongoId,
                type: decoded.type,
              };
              return next();
            }
          }
          } 
          return next();
        }
      }
      else{
        return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
      }
    } catch (exception) {
      console.log(exception)
      return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
    }
  },
  agentToken: async (req, res, next) => {
    try {
      let decoded=null
      if(req.headers.authorization){
       decoded = await jwt.verify(
        req.headers.authorization.split(' ')[1],
        secretOrKey,
      );
      }
      let dateNow = Math.floor(Date.now() / 1000) 
      if (decoded!=null) {
        if(decoded.exp < dateNow){
          return res.status(401).json({
            ...errorCodes.UserCodes.tokenExpired,
          });
        }else{
          if( decoded.type == 'AGENT'){
            const reply = await client.get("AGENT_"+decoded.userId);
            if(reply){ 
             if(reply!=req.headers.authorization.split(' ')[1]){
               return res.status(401).json({
                 ...errorCodes.UserCodes.loginElsewhere,
               }); 
             }
            else{
              req.token = {
                userId: decoded.userId,
                userMongoId: decoded.userMongoId,
                type: decoded.type,
              };
              return next();
            }
          }
        } 
        return next();
        }
      }
      else{
        return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
      }
    } catch (exception) {
      console.log(exception)
      return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
    }
  },
  hospitalToken: async (req, res, next) => {
    try {
      let decoded=null
      if(req.headers.authorization){
       decoded = await jwt.verify(
        req.headers.authorization.split(' ')[1],
        secretOrKey,
      );
      }
      let dateNow = Math.floor(Date.now() / 1000) 
      if (decoded!=null) {
        if(decoded.exp < dateNow){
          return res.status(401).json({
            ...errorCodes.UserCodes.tokenExpired,
          });
        }else{
          const reply = await client.get("HOSPITAL_"+decoded.userId);
            if(reply){ 
             if(reply!=req.headers.authorization.split(' ')[1]){
               return res.status(401).json({
                 ...errorCodes.UserCodes.loginElsewhere,
               }); 
             }
            else{
            if (decoded.type == 'HOSPITAL'){
              req.token = {
                userId: decoded.userId,
                userMongoId: decoded.userMongoId,
                type: decoded.type,
              };
              return next();
            }
            }
          }else{
            return res.status(401).json({
              ...errorCodes.UserCodes.unauthorized,
            });
          }
           
          
         
        }
      }
      else{
        return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
      }
    } catch (exception) {
      console.log(exception)
      return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
    }
  },
  adminToken: async (req, res, next) => {
    try {
      let decoded=null
      if(req.headers.authorization){
       decoded = await jwt.verify(
        req.headers.authorization.split(' ')[1],
        secretOrKey,
      );
      }
      let dateNow = Math.floor(Date.now() / 1000) 
      if (decoded!=null) {
        if(decoded.exp < dateNow){
          return res.status(401).json({
            ...errorCodes.UserCodes.tokenExpired,
          });
        }else{
          const reply = await client.get("ADMIN_"+decoded.userId);
            if(reply){ 
             if(reply!=req.headers.authorization.split(' ')[1]){
               return res.status(401).json({
                 ...errorCodes.UserCodes.loginElsewhere,
               }); 
             }
            else{
            if (decoded.type == 'ADMIN'){
              req.token = {
                userId: decoded.userId,
                userMongoId: decoded.userMongoId,
                type: decoded.type,
              };
              return next();
            }
            }
          }else{
            return res.status(401).json({
              ...errorCodes.UserCodes.unauthorized,
            });
          }
           
          
         
        }
      }
      else{
        return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
      }
    } catch (exception) {
      console.log(exception)
      return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
    }
  },
  doctorToken: async (req, res, next) => {
    try {
      let decoded=null
      if(req.headers.authorization){
       decoded = await jwt.verify(
        req.headers.authorization.split(' ')[1],
        secretOrKey,
      );
      }
      let dateNow = Math.floor(Date.now() / 1000) 
      if (decoded!=null) {
        if(decoded.exp < dateNow){
          return res.status(401).json({
            ...errorCodes.UserCodes.tokenExpired,
          });
        }else{
          const reply = await client.get("Doctor_"+decoded.doctorId);
            if(reply){ 
             if(reply!=req.headers.authorization.split(' ')[1]){
               return res.status(401).json({
                 ...errorCodes.UserCodes.loginElsewhere,
               }); 
             }
            else{
            if (decoded.type == 'Doctor'){
              req.token = {
                doctorId: decoded.doctorId,
                doctorMongoId: decoded.doctorMongoId,
                type: decoded.type,
              };
              return next();
            }
            }
          }else{
            return res.status(401).json({
              ...errorCodes.UserCodes.unauthorized,
            });
          }
           
          
         
        }
      }
      else{
        return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
      }
    } catch (exception) {
      console.log(exception)
      return res.status(401).json({
        ...errorCodes.UserCodes.unauthorized,
      });
    }
  },
};
