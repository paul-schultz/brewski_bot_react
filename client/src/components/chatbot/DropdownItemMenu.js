import React from 'react';

const DropdownItemMenu = (props) => {
    return (
        <a
        href="/" 
        // className="btn-floating btn-large waves-effect waves-light"
        style={{ color: '#fdb016' }}
        onClick={(event) =>
            props.click(
                event,
                "Menu"
            )
        }>
            Menu
        </a>
    )
};

export default DropdownItemMenu;