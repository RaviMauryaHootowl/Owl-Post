import React, {useState, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {PropertySelection} from './components/PropertySelection/PropertySelection';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';

import { MdSend } from 'react-icons/md';
import { RequestContext } from './contexts/RequestContext';

function App() {
  //const [endpointURL, setEndpointURL] = useState('');
  //const [modifiedURL, setModifiedURL] = useState('');
  //const [method, setMethod] = useState('GET');
  const [res, setRes] = useState('');
  const [statusCode, setStatusCode] = useState("");
  const [endpointURL,setEndpointURL,modifiedURL, setModifiedURL, paramsArray, setParamsArray, headerArray, setHeaderArray, method, setMethod, bodyArray, setBodyArray] = useContext(RequestContext);

  const getRequest = () => {
    setRes('Fetching...');

    
    var myHeaders = new Headers();
    var bodyJSON = {};
    

    for(let i = 0; i < headerArray.length; i++){
      myHeaders.append(headerArray[i][0], headerArray[i][1]);
    }

    for(let i = 0; i < bodyArray.length; i++){
      bodyJSON[bodyArray[i][0]] = bodyArray[i][1];
    }

    var raw = JSON.stringify(bodyJSON);
    console.log(raw);

    var requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: 'follow'
    };

    if(method == 'POST' || method == 'PUT'){
      requestOptions["body"] = raw;
      myHeaders.append("Content-Type", "application/json");
    }

    fetch('https://cors-anywhere.herokuapp.com/' + `${modifiedURL}`, requestOptions)
      .then(response => {console.log(response); setStatusCode(response.status); return response.text()})
      .then(result => {console.log(result); setRes(result)})
      .catch(error => {console.log(typeof(error));});

  }

  const changeMethod = (tempMethod) => {
    setMethod(tempMethod);
  }


  return (
      <div className="App">
        <div className="pageContainer">
          <div className="navBarContainer">
            <img className="navIcon" src="https://webstockreview.net/images/clipart-animals-halloween-6.png" alt=""/>
            <span>Owl Post</span>
          </div>
          <div className="mainContainer">
            <div className="inputBar">
              <div className="dropdown">
                <button className="methodSelectBtn">{method}</button>
                <div className="dropDownMethodSelect">
                  <span onClick={() => {changeMethod('GET');}}>GET</span>
                  <span onClick={() => {changeMethod('POST');}}>POST</span>
                  <span onClick={() => {changeMethod('PUT');}}>PUT</span>
                  <span onClick={() => {changeMethod('DELETE');}}>DELETE</span>
                </div>
              </div>
              <input className="urlEndpointInput" type="text" value={endpointURL} onChange={(e) => {setEndpointURL(e.target.value); setModifiedURL(e.target.value);}} placeholder="Enter request URL"/>
              <button className="sendBtn" onClick={getRequest}><MdSend size={25}/></button>
            </div>
            <div className="bottomContainer">
              <div className="propertySelectionContainerAppPage">
                <PropertySelection />
              </div>
              <div className="resPane">
                <div className="statusBar">
                  <span className="statusBarTitle">Status: </span>
                  <span className="statusBarCode">{statusCode}</span>
                </div>
                <div className="resContainer">
                  <span className="result">
                    <JSONPretty className="responseResultJSON" id="json-pretty" data={res} theme={JSONPrettyMon}></JSONPretty>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
