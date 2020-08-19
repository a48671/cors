import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [result, setResult] = useState('');
    const onLogin = () => {
        fetch('http://localhost:4000/public')
            .then(response => response.json())
            .then(response => setResult(response.message));
    }
    return (
        <Fragment>
            <h1>Hello</h1>
            <button onClick={onLogin}>Login</button>
            <div>{result}</div>
        </Fragment>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
