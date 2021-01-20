import React from 'react';
import Radium from 'radium';

var styles = {
    base: {
        fontWeight: '400', 
        backgroundColor: '#FDB01600',
        color: '#FDB016',
        padding: '.6em', 
        marginRight: '2em',
        borderRadius: '7px',
        border: '2px solid #FDB016',

        ':hover': {
            backgroundColor: '#FDB016',
            color: '#464646',
            fontWeight: '600'
        },

        ':active': {
            border: '2px solid #8C5E00'
        }
    }
}

const QuickReply = (props) => {
    return (
        <a
        href="/" 
        // className="btn-floating btn-large waves-effect waves-light"
        style={ styles.base }
        onClick={(event) =>
            props.click(
                event,
                props.reply.payload,
                props.reply.text
            )
        }>
            {props.reply.text}
        </a>
    )
};

export default Radium(QuickReply);