import { useEffect, useState } from 'react'
import Header from './components/head/header'
import AppMain from './components/appMain/AppMain'
import './App.css'



function App() {

  const initialState = JSON.parse(window.localStorage.getItem('dataArray')) || []
  const [dataArray, setData] = useState(initialState)

  useEffect(()=> {
    window.localStorage.setItem('dataArray', JSON.stringify(dataArray))
  })

  return (
    <div className='app'>
        <Header />
        <AppMain dataArray={dataArray} setData={setData} />
    </div>
  )
}

export default App
