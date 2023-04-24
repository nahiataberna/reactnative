import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            const newFavoritos = state.favoritos.includes(action.payload) ? state.favoritos : [...state.favoritos, action.payload];
            return {
                ...state,
                favoritos: newFavoritos
            }
        default:
            return state;
    }
};