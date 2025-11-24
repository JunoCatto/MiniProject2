import "./App.css";
import Router from "./Routes/Router";
import PlayerGreeting from "./Components/PlayerGreeting";

function App() {
  return (
    <>
      <h1 className="title">OSRS Skill Lookup</h1>
      <PlayerGreeting />
      <Router />
    </>
  );
}

export default App;
