import React from 'react';

const DropdownItemHelp = (props) => {
    return (
        <a
        href="/" 
        // className="btn-floating btn-large waves-effect waves-light"
        style={{ color: '#fdb016' }}
        onClick={(event) =>
            props.click(
                event,
                "Help"
            )
        }>
            Help
        </a>
    )
};

export default DropdownItemHelp;