import { Request } from 'express';
import { verify } from 'jsonwebtoken'
import { environment } from './environments/environment'

export function authorUser (req: Request, res, next) {
  if (
    req.headers.authorization !== undefined &&
    req.headers.authorization !== null &&
    req.headers.authorization !== ""
  ) {
    const authSplitted = req.headers.authorization.split(" ");
    if ( authSplitted.length > 1 ) {
      const token = verify(authSplitted[1], environment.jwt_secret);
      const tokenParsed = JSON.parse(token as string);
      req.user = tokenParsed;
      next();
    } else {
      // Incorrect authrorisation header format
      res.status(401).json({ msgId: "incorrect_authorisation_header_format"})
    }
  } else {
    res.sendStatus(401)
  }
}

export function authorClient ( req, res, next ) {
  if ( req.hea) { return }
}
