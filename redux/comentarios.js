import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      const comentario = {
        id: state.comentarios.length,
        comentario: action.payload.comentario,
        autor: action.payload.autor,
        dia: action.payload.dia,
        valoracion: action.payload.valoracion,
        excursionId: action.payload.excursionId,
      }

      const newComentarios = [...state.comentarios, comentario];
      return {
        ...state,
        comentarios: newComentarios
      }

    default:
      return state;
  }
};