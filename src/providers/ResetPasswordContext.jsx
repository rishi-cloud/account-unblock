import React , {createContext} from 'react'
import axios from "axios"
 

const ResetPasswordContext = createContext({})

function ResetPasswordProvider(props) {

    const sendResetPassword = (url, data, headers) => {
        return axios.post(url, data, {
          headers,
        });
      };
    return (
        <ResetPasswordContext.Provider
          value={{
            sendResetPassword,
          }}
        >
          {props.children}
        </ResetPasswordContext.Provider>
      );
}

export {ResetPasswordContext, ResetPasswordProvider}
