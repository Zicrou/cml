import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const composeEnhancers = compose

const middleware = applyMiddleware(thunk)
// const persistedReducer = persistReducer(rootReducer);
const store = createStore(rootReducer, composeEnhancers(middleware))
// let persistor = persistStore(store);

export { store }

// export const store = createStore(notesReducer);
