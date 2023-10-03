export const appSelector = (state) => state.app;

export const usersSelector = (state) => appSelector(state).users;

export const fileIdSelector = (state) => appSelector(state).fileId;

