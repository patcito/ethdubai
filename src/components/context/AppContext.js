import React, { useState, createContext } from 'react'

const AppContext = createContext()

const AppProvider = props => {
  const [appData, setApp] = useState({

    isPinned: true,
    updateIsPinned: value => setApp(data => (
      { ...data, isPinned: value }
    )),

    isUnfixed: true,
    updateIsUnfixed: value => setApp(data => (
      { ...data, isUnfixed: value }
    )),

  })

  return <AppContext.Provider value={appData}>
    {props.children}
  </AppContext.Provider>
}

export { AppContext, AppProvider } 