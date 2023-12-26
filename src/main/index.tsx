import { router } from '@/presentation/components/router/router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

const root = createRoot(document.getElementById('main') as HTMLElement);

root.render(

	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>
);
