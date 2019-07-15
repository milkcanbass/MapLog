import { POST_SUCCESS, POST_FAIL } from "./types";
import axios from "axios";

export const post = payload => async dispatch => {
  try {
    //Need an image to upload comments.
    const { title, text, myImg, lat, lng } = payload;
    console.log(payload);

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    const formData = new FormData();
    await formData.append("myImg", myImg);
    await formData.append("title", title);
    await formData.append("text", text);
    await formData.append("lat", lat);
    await formData.append("lng", lng);

    await axios.post("/api/post/uploadImg", formData, config);
    console.log(formData);
    dispatch({ type: POST_SUCCESS, payload: payload });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: POST_FAIL });
  }
};
