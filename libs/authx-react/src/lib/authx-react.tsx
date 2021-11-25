import { createContext, useCallback, useEffect, useMemo } from "react";
import { useLocalState, useRequest } from "@oneforx/poseidon"
import useTokenState, { TokenState } from "./use-token-state";
import useConnect from "./use-connect";

const InitialState = {
  isConnected: false,
}

// const connectWithCred = ( uri: string ) => new Promise((resolve, reject) => {
//     fetch(uri)
//     .then((res) => res.json())
//     .then((data) => data)
//     .catch((reason) => reject(reason));
// });

interface IAuthxContextValues {
    isConnected: boolean,
    disconnect?: () => void,
    connectWithCred?: ( email: string, password: string ) => void
}

export const AuthxContext = createContext<IAuthxContextValues>(InitialState);

interface IAuthxContextProviderProps {
    url: string,
    secret_key: string,
    children: React.ReactChild | React.ReactNode
}

export const AuthxContextProvider = ({ url, secret_key, children }: IAuthxContextProviderProps) => {
  const [ authToken, setAuthToken, deleteAuthToken ] = useLocalState<string>("authToken");
  const authTokenState = useTokenState(authToken && authToken || "");
  const isConnected = useMemo(() => authTokenState === TokenState.TOKEN_STATE_VALID, [ authTokenState ])
  const [ connectReponse, connect ] = useConnect(url, { token: authToken && authToken || "" })

  useEffect(() => {
    if ( !connectReponse.isLoading )
      if ( !connectReponse.error ) {
        if ( connectReponse.data !== null && connectReponse.data.msgId === "account_found" ) {
          setAuthToken( connectReponse.data.msgData.accessToken )
        }
      }
  }, [ connectReponse, setAuthToken ])

  const disconnect = useCallback(() => {
    deleteAuthToken();
}, [ deleteAuthToken ]);

  return (
      <AuthxContext.Provider value={{
          isConnected,
          disconnect,
          connectWithCred: ( email: string, password: string ) => connect({ body: JSON.stringify({ email, password })}),
      }}> {children} </AuthxContext.Provider>
  );
}


export default AuthxContext
