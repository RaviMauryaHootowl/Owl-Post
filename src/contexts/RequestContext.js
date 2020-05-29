import React, {createContext, useEffect, useState} from 'react';
import queryString from 'query-string';

export const RequestContext = createContext();

export const RequestProvider = (props) => {
    const [endpointURL, setEndpointURL] = useState('');
    const [modifiedURL, setModifiedURL] = useState('');
    const [paramsArray, setParamsArray] = useState([]);
    const [headerArray, setHeaderArray] = useState([]);

    useEffect(() => {
        let tempObj = {};
        paramsArray.map((param) => {
            tempObj[param[0]] = param[1];
        });

        let paramsString = queryString.stringify(tempObj);
        //console.log('paramsString : ' + paramsString);
        setModifiedURL(`${endpointURL}?${paramsString}`);
        //console.log('modifiedURL : ' + modifiedURL);
    }, [paramsArray, headerArray, endpointURL]);

    return (
        <RequestContext.Provider value={[endpointURL,setEndpointURL,modifiedURL, setModifiedURL, paramsArray, setParamsArray, headerArray, setHeaderArray]}>
            {props.children}
        </RequestContext.Provider>
    );
}