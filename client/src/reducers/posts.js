// eslint-disable-vue/no-unused-components

import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            return posts.map((post)=> post._id === action.payload._id ? action.payload : post)
        case DELETE:
                return posts.filter((post)=> post._id !== action.payload)
        default:
            break;
    }
    return posts;
};

// export default (posts = [], action) => {
//     switch (action.type) {
//         case 'FETCH_ALL':
//             return action.payload;
//         case 'CREATE':
//             return posts;
//         default:
//             posts;
//     }
// }