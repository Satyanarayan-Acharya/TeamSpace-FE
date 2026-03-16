import { createSlice } from '@reduxjs/toolkit'

interface WorkspaceState {
    workspaces: any[]
    currentWorkspace: any | null
    loading: boolean
}

const initialState: WorkspaceState = {
    workspaces: [],
    currentWorkspace: null,
    loading: false,
}

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        // Add reducers as needed
    },
})

export const { } = workspaceSlice.actions
export default workspaceSlice.reducer
