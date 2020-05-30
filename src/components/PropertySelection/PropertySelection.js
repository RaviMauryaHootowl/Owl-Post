import React, {useState, useContext} from 'react';
import './PropertySelection.css';
import JSONPretty from 'react-json-pretty';
import { MdHighlightOff, MdAdd } from 'react-icons/md';
import {RequestContext, RequestProvider} from '../../contexts/RequestContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const PropertySelection = () => {
    const tabsName = ['Params', 'Auth', 'Headers', 'Body'];
    const notSelectedTabClassName = "tab";
    const selectedTabClassName = "tab selectedtab"; 
    const [selectedTabNumber, setSelectedTabNumber] = useState(0);
    

    const selectTab = (index) => {
        setSelectedTabNumber(index);
    }
    const tabsComponent = [<ParamsTab />, <AuthTab />, <HeadersTab />, <BodyTab />];

    

    return (
        <div className="propertySelectionContainer">
            <div className="tabsContainer">
                {
                    tabsName.map((tabName, index) => {
                        return (selectedTabNumber == index) ? 
                        <div className={`${selectedTabClassName} tab${index}`} onClick={() => {selectTab(index)}}>{tabName}</div>
                        : <div className={`${notSelectedTabClassName} tab${index}`} onClick={() => {selectTab(index)}}>{tabName}</div>
                    })
                }
            </div>
            <div className="tabViewContainer">
                {
                    tabsComponent[selectedTabNumber]
                }
            </div>
        </div>
    );
}

export const ParamsTab = (props) => {
    const {paramArray, setParamArray } = useContext(RequestContext);
    //const [paramArray, setParamArray] = useState([]);

    const addParamBox = () => {
        setParamArray(prevArray => [...prevArray, ["", ""]]);
    }

    const changeParam = (e, index, pos) => {
        let tempParamArray = [...paramArray];
        tempParamArray[index][pos] = e.target.value;
        setParamArray(tempParamArray);
        console.log(paramArray);
        //props.setParamCall(paramArray);
    }

    const removeParam = (index) => {
        let tempParamArray = [...paramArray];
        tempParamArray.splice(index, 1);
        setParamArray(tempParamArray);
    }

    return (
        <div className="paramsTabContainer">
            {
                paramArray.map((paramPair, index) => {
                    return <div className="keyValueBox">
                        <input value={paramArray[index][0]} className="paramsKey" type="text" placeholder="Key" onChange={(e) => {changeParam(e, index, 0)}}/>
                        <input value={paramArray[index][1]} className="paramsValue" type="text" placeholder="Value" onChange={(e) => {changeParam(e, index, 1)}}/>
                        <button className="removeParam" onClick={() => {removeParam(index)}}><MdHighlightOff size={25}/></button>
                    </div>
                })
            }
            <button onClick={addParamBox} className="addParamsBtn"><MdAdd size={20}/></button>
        </div>
    );
}

export const AuthTab = (props) => {
    const { authType, setAuthType, authValue, setAuthValue } = useContext(RequestContext);

    const options = ['No Auth', 'Bearer Token', 'OAuth 2.0'];
    const [optionNumber, setOptionNumber] = useState(0);
    const views = [
        <div></div>,
        <input value={authValue} className="authKey" type="text" placeholder="Token" onChange={(e) => {setAuthValue(e.target.value)}}/>,
        <input value={authValue} className="authKey" type="text" placeholder="Access Token" onChange={(e) => {setAuthValue(e.target.value)}}/>
    ]

    const changeAuthType = (e) => {
        setAuthValue('');
        setAuthType(e.value);
        if(e.value == options[0]) setOptionNumber(0);
        else if(e.value == options[1]) setOptionNumber(1);
        else setOptionNumber(2);
    }

    return (
        <div className="authTabContainer">
            <Dropdown options={options} onChange={changeAuthType} value={authType} placeholder="Select an option" />
            { views[optionNumber] }
        </div>
    );
}

export const HeadersTab = (props) => {
    const { headerArray, setHeaderArray } = useContext(RequestContext);
    //const [paramArray, setParamArray] = useState([]);

    const addHeaderBox = () => {
        setHeaderArray(prevArray => [...prevArray, ["", ""]]);
    }

    const changeHeader = (e, index, pos) => {
        let tempHeaderArray = [...headerArray];
        tempHeaderArray[index][pos] = e.target.value;
        setHeaderArray(tempHeaderArray);
        //props.setParamCall(paramArray);
    }

    const removeHeader = (index) => {
        let tempHeaderArray = [...headerArray];
        tempHeaderArray.splice(index, 1);
        setHeaderArray(tempHeaderArray);
    }

    return (
        <div className="headerTabContainer">
            {
                headerArray.map((headerPair, index) => {
                    return <div className="keyValueBox">
                        <input value={headerArray[index][0]} className="paramsKey" type="text" placeholder="Key" onChange={(e) => {changeHeader(e, index, 0)}}/>
                        <input value={headerArray[index][1]} className="paramsValue" type="text" placeholder="Value" onChange={(e) => {changeHeader(e, index, 1)}}/>
                        <button className="removeParam" onClick={() => {removeHeader(index)}}><MdHighlightOff size={25}/></button>
                    </div>
                })
            }
            <button onClick={addHeaderBox} className="addParamsBtn"><MdAdd size={20}/></button>
        </div>
    );
}


export const BodyTab = (props) => {
    const { bodyArray, setBodyArray } = useContext(RequestContext);
    //const [paramArray, setParamArray] = useState([]);

    const addBodyBox = () => {
        setBodyArray(prevArray => [...prevArray, ["", ""]]);
    }

    const changeBody = (e, index, pos) => {
        let tempBodyArray = [...bodyArray];
        tempBodyArray[index][pos] = e.target.value;
        setBodyArray(tempBodyArray);
        //console.log(bodyArray);
        //props.setParamCall(paramArray);
    }

    const removeBody = (index) => {
        let tempBodyArray = [...bodyArray];
        tempBodyArray.splice(index, 1);
        setBodyArray(tempBodyArray);
    }

    return (
        <div className="bodyTabContainer">
            {
                bodyArray.map((bodyPair, index) => {
                    return <div className="keyValueBox">
                        <input value={bodyArray[index][0]} className="paramsKey" type="text" placeholder="Key" onChange={(e) => {changeBody(e, index, 0)}}/>
                        <input value={bodyArray[index][1]} className="paramsValue" type="text" placeholder="Value" onChange={(e) => {changeBody(e, index, 1)}}/>
                        <button className="removeParam" onClick={() => {removeBody(index)}}><MdHighlightOff size={25}/></button>
                    </div>
                })
            }
            <button onClick={addBodyBox} className="addParamsBtn"><MdAdd size={20}/></button>
        </div>
    );
}