// const axios = require('axios').default;
// const API_KEY = '29596647-f7db787be5835d1b0c2ce2eda'
// const API_URL = 'https://pixabay.com/api/'

// export default class PixabayAPI {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//         this.perPage = 40;
//     }
// }

import api from "https";

export default class PixabayServices {
    static async getImages(query, page = 1) {
        return await api.get('', {
            params: {
                q: query,
                page,
                // image_type: 'photo',
                orientation: 'horizontal'
            }
        })
    }



}