import React from 'react';
import './header.less';
import Link from '../../node_modules/.4.3.1@react-router-dom/Link';

class Header extends React.Component {
    render(){
        return (
            <Link to='/'>
                <div className="row components-logo">
                    <img src="/static/images/logo.png" alt="" width="40" className="-col-auto"/>
                    <h1>React Music Player</h1>
                </div>
            </Link>
        );
    }
}

export default Header;