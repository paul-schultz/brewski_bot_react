import React, { Component } from 'react';
import emailjs from 'emailjs-com'

import{ init } from 'emailjs-com';


import './style/Form.css'

class Form extends Component {

    render() {
        function sendEmail(e) {
            init("user_ffMLYnYAK7mJO5N4edd3p");
            e.preventDefault();
        
            emailjs.sendForm('service_hhsxg7u', 'template_aua2h4m', e.target, 'user_ffMLYnYAK7mJO5N4edd3p')
                .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset();
        }

        return (
            <div id="contact-form">
                <p>have a question or comment about brewski_bot?</p>
                <p>get in touch!</p>
                <form onSubmit={sendEmail}>
                    <input type="text" placeholder="Name" name="name"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="text" placeholder="Subject" name="subject"/>
                    <textarea name="message" id="" cols="30" rows="5" placeholder="Message" name="message"></textarea>
                    <input type="submit" value="Send Message"/>
                </form>                
            </div>
        )
    }
}

export default Form;