import React from 'react'

const context = React.createContext({
    user_id: '',
    prescriptions: [],
    login: false,
    backClick: '',
    addClick: '',
    editClick: '',
    scriptEdit: {},
    handleLoginSubmit: () => { },
    handleBackClick: () => { },
    handleRemoveBackClick: () => {},
    handleAddClick: ()=>{},
    handleEditClick: ()=>{}
})

export default context
