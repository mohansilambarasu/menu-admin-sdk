// import "./ui/styles/variables.css"; // For Dev purpose.
// import "./ui/styles/global.css"; // For Dev purpose.
// import "./ui/styles/App.css"; // For Dev purpose.
// import "./ui/styles/Form.css"; // For Dev purpose.
// import "./ui/styles/List.css"; // For Dev purpose.
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App theme="light" />);
