import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Server } from "miragejs";

new Server({
  routes() {
    this.namespace = "api";
    this.fieldDefinitions = [ 
		"Domain", 
		"Object", 
		"ObjectClass", 
		"FreeText", 
		"DateTime", 
		"Origin", 
		"OriginEvtClass", 
		"DomainClass", 
		"OriginSeverity", 
		"ObjectState", 
		"Name", 
		"AlertType", 
		"hasAccepted", 
		"hasAcknowledged"
	];

	this.selectedDefinitions = [];

    this.get("/definitions/", () => {
      	return { 
	      	"fieldDefinitions": this.fieldDefinitions, 
			"title": "The Editor" 
		}
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
