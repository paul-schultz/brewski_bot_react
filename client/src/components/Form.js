import React, { Component } from 'react';

import './style/Form.css'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          description: 'Message'
        };
    }

    render() {
        return (
            <div id="contact-form">
                <p>have a question or comment about brewski_bot?</p>
                <p>get in touch!</p>
                <form>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <textarea name="message" id="" cols="30" rows="5" value={this.state.description}
                    style={{ color: '#e1e1e1'}}></textarea>
                    <input type="submit" placeholder="Email"/>
                </form>                
            </div>
        )
    }
}

export default Form;