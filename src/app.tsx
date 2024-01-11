import { createRoot } from 'react-dom/client';
import "./index.css";

const container = createRoot(document.getElementById('app-container'));

container.render(
    <>    
        <h1>💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
        <button className="btn btn-primary">Search</button>
        <div className="bg-red-200">Hello world</div>
    </>
);