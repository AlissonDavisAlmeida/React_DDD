import { App } from '@/App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('main') as HTMLElement);

root.render(<App />);
