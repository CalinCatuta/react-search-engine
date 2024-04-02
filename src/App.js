import "./App.css";
import Fetch from "./components/Fetch";
// context
import { TagsProvider } from "./context/TagsContext";
function App() {
  return (
    <TagsProvider>
      <div>
        <Fetch />
      </div>
    </TagsProvider>
  );
}

export default App;
