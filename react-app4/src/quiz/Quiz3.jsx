import logo from './logo.svg';
import './App.css';

function Content() {
  return (
    <p>Content Component</p>
  );
}

function Section() {
  return (
    <div>
      <h1>Section Component</h1>
      <Content />
      <Content />
    </div>

  );
}

function App() {
  return (
    <div>
      <Section />
      <Section />
    </div>
  );
}

export default App;
