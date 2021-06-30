import React from 'react'

const context = React.createContext({
  user_id: '',
  prescriptions: [],
  handleLoginSubmit: ()=>{}
})

export default context
