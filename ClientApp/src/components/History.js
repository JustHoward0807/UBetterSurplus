import {Component} from "react";

export class History extends Component {
    static displayName = History.name;
    
    render() {
        return (
            <div>
                <h1>Welcome to Geeks for Geeks </h1>
                <h3>Counter App using Functional Component : </h3>
                {/*<h2>{count}</h2>*/}
                {/*<button onClick={increase}>Add</button>*/}
            </div>
        );
    }
}