import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Tabletop from 'tabletop'
// import logo from './logo.svg'

// import './App.css'

const App = () => {
  const [excluded, setExcluded] = useState()
  const [secondOption, setSecondOption] = useState()
  const [thirdOption, setThirdOption] = useState()

  const removeEmpty = (array, selector) =>
    _.map(array, val => val[selector]).filter(item => item !== '')

  useEffect(() => {
    Tabletop.init({
      key: '1PGbqJbl81PFz8Pv4DLH0moHuJPEpd2qnEGNhq610gM4',
      callback: data => {
        setExcluded(removeEmpty(data, 'excluded'))
        setSecondOption(removeEmpty(data, 'secondOption'))
        setThirdOption(removeEmpty(data, 'thirdOption'))
      },
      simpleSheet: true,
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Google Sheets Demo</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <pre className="App-data">{JSON.stringify(excluded, null, 2)}</pre>

        <pre className="App-data">{JSON.stringify(secondOption, null, 2)}</pre>

        <pre className="App-data">{JSON.stringify(thirdOption, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
