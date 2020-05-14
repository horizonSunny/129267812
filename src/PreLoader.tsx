import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import React, { Component, ReactDOM } from 'react';

const { Consumer, Provider } = React.createContext();
export { Consumer, Provider };
export default class Preloader extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    // persistStore(window.g_app._store, {}, () => {
    //   this.setState({ rehydrated: true });
    // });
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>123</div>;
    }
    return <div>456</div>;
  }
}
// persistStore(window.g_app._store, {}, () => {
//   console.log('lalalalalalala_3');
// });

// creating the store but not calling persistStore yet
// ReactDOM.render(<Preloader store={store} />);
