import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 l6 offset-l3 grey darken-3" >
            <div className="card-panel grey darken-3 z-depth-1"  >
                <div className="row valign-wrapper grey darken-3">
                    {props.speaks==='bot' &&
                    <div className="col s2" >
                        <a href="/" className="btn-floating btn-large waves-effect waves-light z-depth-5"
                                    style={{ backgroundColor: '#FDB016',
                                             color: '#464646' }}
                                    >{props.speaks}</a>
                    </div>
                    }
                    {props.speaks==='bot' && 
                    <div className="col s10 left-align" style={{ fontSize: '1.4em'}}>
                        <span className="left" style={{ color: '#FDB016' }}>
                        {props.text}
                        </span>
                    </div>
                    }
                    {props.speaks==='me' && 
                    <div className="col s11 right-align" style={{ fontSize: '1.4em'}}>
                        <span className="right" style={{ color: '#FDB016' }}>
                        {props.text}
                        </span>
                    </div>
                    }
                    {props.speaks==='me' &&
                    <div className="col s1" >
                        {/* <a href="/" className="btn-floating btn-large waves-effect waves-light z-depth-5"
                                    style={{ backgroundColor: '#FDB016',
                                             color: '#464646' }}
                                    >{props.speaks}</a> */}
                    </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;
