import React, {Component} from 'react';
import M from "materialize-css";

import '../style/Dropdown.css';

import DropdownItem from './DropdownItem';

class Dropdown extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, text) {
        this.props.replyClick(event, text);
    }
    
    render() {
        return(
            
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <a className='dropdown-trigger btn' 
               href='#' 
               data-target='dropdown1'
               style={{ backgroundColor: '#ffffff00',
                        }}
            >
                <i className="material-icons"
                   style={{ fontSize: '36px',
                            color: '#fdb016' }} 
                >menu</i></a>
            <div>
                <ul id='dropdown1' 
                    className='dropdown-content' 
                    style={{ backgroundColor: '#464646'}}
                >
                    <li>
                        <DropdownItem click={this._handleClick} />
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

export default Dropdown;