import React, {Component} from 'react';

import '../style/Dropdown.css'
// Import Materialize
import M from "materialize-css";


class Dropdown extends Component {
    componentDidMount() {
        M.AutoInit();
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
                    <li><a href="/" 
                           style={{ color: '#fdb016'  }}>
                                Menu
                        </a>
                    </li>
                    <li><a href="/" style={{ color: '#fdb016'  }}>My Picks</a></li>
                    <li className="divider black" tabIndex="-1"></li>
                    <li><a href="/" style={{ color: '#fdb016'  }}>Help</a></li>
                </ul>
            </div>
        </div>
        )
    }
}

export default Dropdown;