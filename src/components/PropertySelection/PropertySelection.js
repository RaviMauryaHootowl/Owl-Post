import React, {useState, useContext} from 'react';
import './PropertySelection.css';
import JSONPretty from 'react-json-pretty';
import { MdHighlightOff, MdAdd } from 'react-icons/md';
import {RequestContext, RequestProvider} from '../../contexts/RequestContext';

export const PropertySelection = () => {
    const tabsName = ['Params', 'Auth', 'Headers', 'Body'];
    const notSelectedTabClassName = "tab";
    const selectedTabClassName = "tab selectedtab"; 
    const [selectedTabNumber, setSelectedTabNumber] = useState(0);
    

    const selectTab = (index) => {
        setSelectedTabNumber(index);
    }
    const tabsComponent = [<ParamsTab />, <ParamsTab />, <HeadersTab />, <ParamsTab />];

    

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
    const [endpointURL,setEndpointURL,modifiedURL, setModifiedURL, paramArray, setParamArray ] = useContext(RequestContext);
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

export const HeadersTab = (props) => {
    const [endpointURL,setEndpointURL,modifiedURL, setModifiedURL, paramArray, setParamArray, headerArray, setHeaderArray ] = useContext(RequestContext);
    //const [paramArray, setParamArray] = useState([]);

    const addHeaderBox = () => {
        setHeaderArray(prevArray => [...prevArray, ["", ""]]);
    }

    const changeHeader = (e, index, pos) => {
        let tempHeaderArray = [...headerArray];
        tempHeaderArray[index][pos] = e.target.value;
        setHeaderArray(tempHeaderArray);
        console.log(paramArray);
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