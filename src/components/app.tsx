import * as React from 'react';
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import uiStore from "../stores/uiStore";
import "../sass/styles.scss";

@observer
class App extends React.Component {
    componentDidMount() {
        // to show how mobx works
        setTimeout(() => {
            uiStore.firstName = 'Hojat';
            uiStore.lastName = 'Jafari';
            document.getElementById('fullName').style.color = 'red';
        }, 5000);
    }

    render() {
        return <div>
            <DevTools />
            <h1>Finally!!!!</h1>
            <h2>Hello HMR</h2>
            <p>Just as demo for mobx</p>
            <p>My Name is:</p>
            <p id='fullName'>{uiStore.fullName}</p>
        </div>;
    }
}

export default App;