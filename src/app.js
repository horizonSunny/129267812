import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
// import { history } from 'umi';
// import PreLoader from './PreLoader';

export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error('dva_error_', e.message);
    },
    extraEnhancers: [
      createStore => (...args) => {
        const store = createStore(...args);
        const persistor = persistStore(store, {}, () => {
          console.log('lalalalalalala_3');
        });
        store.persistor = persistor;
        console.log('lalalalalalala_1');
        return store;
      },
    ],
    onReducer(reducer) {
      const persistConfig = {
        key: 'root',
        storage: storageSession,
      };
      return persistReducer(persistConfig, reducer);
    },
  },
};

// export function render(oldRender) {
//   history.push('/login');
//   persistStore(window.g_app._store, {}, () => {
//     console.log('lalalalalalala_3');
//     oldRender();
//   });
// }
// export function rootContainer(container) {
//   // debugger;
//   return React.createElement(PreLoader, null, container);
// }
