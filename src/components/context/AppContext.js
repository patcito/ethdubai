import React, { useState, createContext } from 'react'

const AppContext = createContext()

const AppProvider = props => {
  const [appData, setApp] = useState({

    isPinned: false,
    updateIsPinned: value => setApp(data => (
      { ...data, isPinned: value }
    )),
    
  })
  
  return <AppContext.Provider value={appData}>
    {props.children}
  </AppContext.Provider>
}

export { AppContext, AppProvider }