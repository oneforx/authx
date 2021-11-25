import { useRequest } from "@oneforx/poseidon";

type useConnectCredential = { email: string, password: string } | { token : string }

const useConnect = (url: string, credentials: useConnectCredential ) => {
  return useRequest(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(credentials)
  });
};

export default useConnect
