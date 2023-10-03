import {createSlice} from '@reduxjs/toolkit'

const NAME = 'app';


const initialState = {
    users: null,
    fileId: null
}

const setUsers = (state, action) => {
    state.users = action.payload
}

const setFileId = (state, action) => {
    state.fileId = action.payload
}

export const {reducer: appReducer, actions:appActions} = createSlice({
    name: NAME,
    initialState,
    reducers: {
        setUsers,
        setFileId,
    },
})
