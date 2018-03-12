import { API_REQUEST, API_REQUEST_FAIL } from '../commons/const';
//import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { browserHistory } from 'react-router';


export function api(store) {
    return (next) => async (action) => {
        if (action.type !== API_REQUEST) {
            return next(action);
        }
        const { dispatch } = store;

        const { method, body, headers } = Object.assign({
            body: {},
            headers: {
                'Content-type': 'application/json'
            },
            method: 'GET'
        }, action);

        action.types[0].forEach((type) => {
            dispatch({ type });
        });

        dispatch(showLoading());
        try {
            debugger
            const params = {
                headers,
                method: method.toUpperCase()
            };

            const state = store.getState();

            //   if (state.user.token !== null) {
            //     headers.Authorization = `Bearer ${state.user.token}`;
            //   }

            // todo: if method GET

            if (params.method === 'POST' || params.method === 'PUT') {
                params.body = JSON.stringify(body);
            }
            debugger
            const result = await fetch(action.endpoint, params);

            const data = await result.json();

            if (result.status < 300 && data.status && data.status === 'OK') {
                debugger
                return next({
                    type: action.types[1],
                    payload: data.data,
                    hasErrors: false,
                    meta: { message: data.message, status: data.status }
                });
            }

            if (data.status === 'UNAUTHORIZED') {
                // TODO rewrite after rewrite api, request to get refresh token
                browserHistory.push('/login');
                throw new Error('Token expired');
            }

            return next({
                type: action.types[2],
                payload: data.data,
                hasErrors: true,
                meta: { message: data.message, status: data.status }
            });
        } catch (e) {
            toastr.error("server error");
            return next({ type: API_REQUEST_FAIL, hasErrors: true, payload: { message: "some error" } });
        } finally {
            dispatch(hideLoading());
        }
    };
}
