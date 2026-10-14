import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'

import { ThemeProvider } from './providers/ThemeProvider'

import AppLayout from './layouts/AppLayout'

import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import ArchivePage from './pages/ArchivePage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/story',
				element: <StoryPage />
			},
			{
				path: '/archive',
				element: <ArchivePage />
			}
		]
	}
], { basename: '/undertale-between-universes' });

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
);
