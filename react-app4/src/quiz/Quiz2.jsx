import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <p>Home</p>
  );
}

function About() {
  return (
    <p>About</p>
  );
}

function Contact() {
  return (
    <p>Contact</p>
  );
}

function Navbar() {
  return (
    <div>
      <Home />
      <About />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
