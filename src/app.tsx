import { createRoot } from 'react-dom/client';
import { Content } from './content/content';

const container = createRoot(document.getElementById('app-container'));

container.render(
    <>
        <Content></Content>
    </>
);