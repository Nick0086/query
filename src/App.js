import logo from './logo.svg';
import './App.css';
import Header from './componets1/Header';
import Home from './ShadowDom/Home';
import AutoRefetch from './AutoRefetching/AutoRefetch';
import PlayGround from './PlayGround/PlayGround';
// import Home from './Algolia/Home';

function App() {
  return (
    <div>
      {/* <Header /> */}
      {/* <Home/> */}
        <PlayGround/>
    </div>

  );
}

export default App;
