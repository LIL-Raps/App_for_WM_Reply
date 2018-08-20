import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {store} from './store/configureStore';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import StopPoint from "./components/StopPoint";


const history = createHistory();
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={App}/>
                <Route path='/stoppoint/:id' component={StopPoint}/>
            </div>
        </ConnectedRouter>

    </Provider>, document.getElementById('root'));