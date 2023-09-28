/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-eval */
import React, { createContext, useEffect } from 'react';
import dsBridge from 'dsbridge';


export const dsbridgeContext = createContext();

const DSBridgeProvider = (props) => {
	useEffect(() => {
		initDSBridge();
	}, []);
	// const sendPostMessage = (eventName, params='') => {
	// 	console.log({eventName});
	// 	window[eventName]?.postMessage(params);
	// }
	const initDSBridge = () => {
		logger(null, 'INIT CALLED');
		// sendPostMessage(DSBridgeEvents.INIT)
		dsBridge.hasNativeMethod("initCallBack") && dsBridge.call("initCallBack");
	};

	const logger = (data, title = null) => {
		let params = {
			data,
			title: `NEO WEB VIEW :: ${title}`,
		};
		console.log(params.title, data);
		dsBridge.call("logger", JSON.stringify(params));

		
			// Get the logger div element.
			const loggerDiv = document.getElementById('myLogger');
		  
			// Convert the JSON to a string.
			let jsonString = JSON.stringify(params,  null, " ");
			  jsonString += '\n';
			// Create a new code element to contain the JSON string.
			const codeElement = document.createElement('code');
			codeElement.textContent = jsonString;
		  
			// Add the code element to the logger div.
			loggerDiv.appendChild(codeElement);



		// sendPostMessage(DSBridgeEvents.LOGGER, JSON.stringify(params))
	};

	const registerDSBridgeEvent = (event, callback) => {
		dsBridge.register(event, (data) => {
			logger(data, event);
			callback(data);
		});
	};

	const callDSBridgeEvent = (event, params) => {
		// sendPostMessage(event, params)
		logger(params, event);
		dsBridge.call(event, params);
	};

	return (
		<dsbridgeContext.Provider
			value={{
				call: callDSBridgeEvent,
				register: registerDSBridgeEvent,
				logger,
			}}>
			{props.children}
		</dsbridgeContext.Provider>
	);
};

export default DSBridgeProvider;
