import React from 'react'

const context = React.createContext({
    user_id: '',
    prescriptions: [],
    login: false,
    backClick: '',
    addClick: '',
    editClick: '',
    handleLoginSubmit: () => { },
    handleBackClick: () => { },
    handleRemoveBackClick: () => {},
    handleAddClick: ()=>{},
    handleAddClick: ()=>{},
    handleEditClick: ()=>{}
})

export default context
