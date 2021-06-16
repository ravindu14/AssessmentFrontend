// @flow
import axios from "axios";

export class GalleryService {
  endpoint: string = "http://localhost:8080/gallery";

  arrangeFavorites(payload: Object) {
    return axios.put(this.endpoint, payload);
  }

  getFavorites(userId: string) {
    return axios.get(`${this.endpoint}/${userId}`);
  }
}
