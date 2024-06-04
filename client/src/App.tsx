import { Navbar } from "./components/Navbar/Navbar";
import { PageRouter } from "./routes/PageRouter";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-screen h-screen text-black flex">
        <Navbar />
        <div className="grow flex flex-col gap-8 px-2 py-8">
          <PageRouter />
        </div>
      </div>
    </>
  );
}

export default App;
