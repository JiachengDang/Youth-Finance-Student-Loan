import React, { Component } from 'react';
import Page from './Page/Page'
import classes from './Pages.module.css'

const Pages = () => {
    return (  
        <div className={classes.Pages}>
        <Page/>
        </div>
    );
}
 
export default Pages;