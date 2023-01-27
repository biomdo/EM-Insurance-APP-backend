import jwt from 'jsonwebtoken'

const authenticate = (req) => {
  var userAuth = []
  var token = req.headers['x-access-token']
  if (!token) {
    userAuth = {
      status: 200,
      auth: false,
      message: 'No token provided.',
      data: [],
    }
    //return res.status(401).send({ auth: false, message: 'No token provided.' })
  } else {
    jwt.verify(token, 'APIKeyYangu', function (err, decoded) {
      if (err) {
        userAuth = {
          status: 200,
          auth: false,
          message: 'Failed to authenticate token.',
          data: [],
        }
        /* return res
            .status(500)
            .send({ auth: false, message: 'Failed to authenticate token.' })*/
      } else {
        userAuth = {
          status: 200,
          auth: true,
          message: 'authenticated',
          data: decoded,
        }
        //res.status(200).send(decoded)
      }
    })
  }
  return userAuth
}

export default authenticate
