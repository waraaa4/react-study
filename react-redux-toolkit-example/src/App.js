import './App.css';
import Counter from './component/Counter';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {

  return (
    <div>
      {/* Provider로 앱에 스토어 주입 */}
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default App;
