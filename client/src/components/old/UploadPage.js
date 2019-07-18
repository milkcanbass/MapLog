import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const UploadPage = () => {
  useEffect(() => {
    console.log(myImg);
    console.log(title);
  });

  const [myImgState, setMyImgState] = useState({
    myImg: null,
    title: "",
    useName: "kai"
  });
  const { myImg, title } = myImgState;

  const imageUploaded = e => {
    setMyImgState({
      ...myImgState,
      myImg: e.target.files[0]
    });
  };

  const onChange = e => {
    setMyImgState({
      ...myImgState,
      title: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      //Set data to post
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      const formData = new FormData();
      await formData.append("myImg", myImg);
      await formData.append("title", title);
      await formData.append("userName", "kai");

      await axios.post("/api/comment/uploadImg", formData, config);
      console.log(formData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="file" name="myImg" onChange={e => imageUploaded(e)} />
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => onChange(e)}
          required
        />
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default UploadPage;
