import axios from 'axios';
const instance=axios.create({
     baseURL:"https://us-central1-challenge-4b2b2.cloudfunctions.net/api"
    //  "http://127.0.0.1:5001/clone-495fd/us-central1/api"

    // The API (Cloud Function) URL
});
export default instance;