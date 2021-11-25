import React, { useEffect, useState } from "react";
import decryptJwt from 'jwt-decode'

export enum TokenState {
    TOKEN_STATE_VALID,
    TOKEN_STATE_EXPIRED,
    TOKEN_STATE_MISSING
}

function verifyToken ( token: string ) {
  if (token && token !== null && typeof (token) !== 'undefined') {
    try {
      const tok: { exp: number } = decryptJwt(token);
      if (tok.exp) {
          if (tok.exp * 1000 > new Date().getTime()) {
              return TokenState.TOKEN_STATE_VALID
          } else {
              return TokenState.TOKEN_STATE_EXPIRED
          }
      } else {
          return TokenState.TOKEN_STATE_VALID
      }
    } catch (err) {
      return TokenState.TOKEN_STATE_MISSING
    }
  } else {
    return TokenState.TOKEN_STATE_MISSING
  }
}

export const useTokenState = ( token: string ) => {
    const [ tokenState, setTokenState ] = useState ( verifyToken(token ) )

    useEffect(() => {
        if (verifyToken (token) !== tokenState) {
            setTokenState( verifyToken(token) );
        }
    }, [ token, tokenState ]);

    return tokenState
}

export default useTokenState;
