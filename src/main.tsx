import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { JobContextProvider } from "./contexts/JobContext";

import  { ToastProvider } from 'react-toast-notifications';
 
createRoot(document.getElementById('root')!).render(
  <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
      <JobContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
              <App/>
          </Suspense>
      </JobContextProvider>
  </ToastProvider>
)

// serviceWorker.unregister();