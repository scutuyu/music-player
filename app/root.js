import React from 'react';
import ReactDom from 'react-dom';
import App from './App';


/**
 * 可以从上自下开发
 * 也可以自下而上的开发
 * 
 * 我将采用自下而上的方式，最后进行拼接
 */

ReactDom.render(
    <div>
        <App/>
    </div>,
    document.getElementById('root')
);

module.hot.accept();

