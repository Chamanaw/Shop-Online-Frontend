import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.tsx'
import InjectTailwind from './injectTailwind.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InjectTailwind>
      <RouterProvider router={routes} />
    </InjectTailwind>
  </React.StrictMode>,
)
