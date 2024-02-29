import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'

import 'ant-design-draggable-modal/dist/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DraggableModalProvider>

      <App />
    </DraggableModalProvider>
  </React.StrictMode>,
)
