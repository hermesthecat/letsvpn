import React from 'react';
// @ts-ignore
import {DefaultToastContainer} from 'react-toast-notifications';


export default function MUIToastContainer(props: any) {
    const { children, ...otherProps} = props;
    return (
            <DefaultToastContainer {...otherProps} style={{marginTop: '60px'}}>{children}</DefaultToastContainer>
    );
}

