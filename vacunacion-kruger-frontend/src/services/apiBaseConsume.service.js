
import axios from "axios";
class apiBaseConsume {
  constructor() {
    this.baseUrl = "http://localhost:8080/api";
  }

  async getMethod(endPoint) {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${endPoint}`,
        method: "GET",
      });
      return response;
    } catch (e) {
      console.log(e);
      console.log("error");
      return e;
    }
  }

  async postMethod(endPoint, dataRecord) {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${endPoint}`,
        method: "POST",
        data: dataRecord,
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async putMethod(endPoint, idRecord, dataRecord) {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${endPoint}/${idRecord}`,
        method: "PUT",
        data: dataRecord,
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteMethod(endPoint, idRecord) {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${endPoint}/${idRecord}`,
        method: "DELETE",
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

export default apiBaseConsume;
