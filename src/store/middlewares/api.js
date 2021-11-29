import {api} from "../../apis";
import * as actions from "../api";

const apiMiddleware = ({dispatch}) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {url, method, data, onStart, onSuccess, onError} = action.payload;
    next(action);
    if (onStart) dispatch({type: onStart});
  
    try {
      const res = await api.request({
        url,
        method,
        data
      });
      console.log("response in api middleware: ", res);
  
      dispatch(actions.apiCallSuccess(res.data));
      if (onSuccess) dispatch({type: onSuccess, payload: res.data});
    } catch (err) {
      dispatch(actions.apiCallFailed(err));
      if (onError) dispatch({type: onError, payload: err});
    }
  };
  
export default apiMiddleware;