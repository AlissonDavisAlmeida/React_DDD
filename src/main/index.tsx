import { router } from '@/presentation/components/router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/presentation/styles/global.scss';

const root = createRoot(document.getElementById('main') as HTMLElement);

root.render(

	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>
);
