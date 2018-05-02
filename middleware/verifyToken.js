import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken

    //decoded token
    const decoded = jwt.decode(bearerToken, { complete: true })
    console.log(decoded)

    next()
  } else {
    res.sendStatus(403)
  }
}
