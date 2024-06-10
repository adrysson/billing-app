import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as Components from './components'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Components.NoMatch />} />
        <Route path="/" element={<Components.Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="file-upload" element={<Components.FileUploader />} />
          <Route path="uploaded-files" element={<Components.UploadedFilesViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
