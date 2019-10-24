import React from 'react';
import ReactDOM from 'react-dom';
import Example from './examples/Example.js';

const container = document.getElementById('container');
export default ReactDOM.hydrate(<Example />, container);