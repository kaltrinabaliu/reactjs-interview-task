import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-gray-200 py-2 h-full">
          <HomePage />
        </div>
      </div>
    </>
  );
}

export default App;
