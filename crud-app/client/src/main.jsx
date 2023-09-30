import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/Read.jsx'
import Header from "./Heads.jsx";
import Create from './Components/Create.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <div className='myDiv bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'>
    <App />
    <Create />
    </div>
  </React.StrictMode>,
)
