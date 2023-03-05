import React from 'react';

import style from './app.module.scss'

const App = () => {
    return <div className={style.root}>
        <h1>Hello World!!!</h1>
        <h2>Image tag with relative URL ('/assets/images/...')</h2>
        <img src="/assets/images/sample.png" alt='' />
        <h2>Image tag with relative URL ('/assets/icons/...')</h2>
        <img src="/assets/icons/wifi-icon.svg" alt='' style={{height: "250px"}} />
    </div>
}

export default App
