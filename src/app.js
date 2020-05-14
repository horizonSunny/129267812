import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
// import { history } from 'umi';
// import PreLoader from './PreLoader';
const persistConfig = {
  timeout: 1000, // you can define your time. But is required.
  key: 'root',
  storage: storageSession,
};

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  console.log('lalalalalalala_3', persist);

  return {
    persist,
    ...store,
  };
};
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error('dva_error_', e.message);
    },
    extraEnhancers: [persistEnhancer()],
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
