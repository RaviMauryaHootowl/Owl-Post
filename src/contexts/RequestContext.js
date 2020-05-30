import React, {createContext, useEffect, useState} from 'react';
import queryString from 'query-string';

export const RequestContext = createContext();

export const RequestProvider = (props) => {
    const [endpointURL, setEndpointURL] = useState('');
    const [modifiedURL, setModifiedURL] = useState('');
    const [paramArray, setParamArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);
    const [bodyArray, setBodyArray] = useState([]);
    const [method, setMethod] = useState('GET');
    const [authType, setAuthType] = useState('No Auth');
    const [authValue, setAuthValue] = useState("");

    useEffect(() => {
        let tempObj = {};
        paramArray.map((param) => {
            tempObj[param[0]] = param[1];
        });

        let paramString = queryString.stringify(tempObj);
        //console.log('paramsString : ' + paramsString);
        setModifiedURL(`${endpointURL}?${paramString}`);
        //console.log('modifiedURL : ' + modifiedURL);
    }, [paramArray, headerArray, endpointURL, bodyArray]);

    return (
        <RequestContext.Provider value={{endpointURL,setEndpointURL,modifiedURL, setModifiedURL, paramArray, setParamArray, headerArray, setHeaderArray, method, setMethod, bodyArray, setBodyArray, authType, setAuthType, authValue, setAuthValue}}>
            {props.children}
        </RequestContext.Provider>
    );
}