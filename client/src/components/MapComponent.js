import React, { useState, Fragment, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from "react-redux";
import { post } from "../actions/postAction";
import { requestImg } from "../actions/getPostAction";
import PropTypes from "prop-types";

//CSS
import "./css/mapComponent.css";
import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/uploadIcon.png";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const MapComponent = props => {
  const { loadAllPost, allPost, isAuth } = props;

  const [selectedPost, setSelectedPost] = useState(null);

  const [addPost, setAddPost] = useState({
    title: null,
    text: null,
    lat: "",
    lng: "",
    myImg: null,
    openInfo: true,
    prevImgUrl: null
  });
  const { title, text, lat, lng, myImg, openInfo, prevImgUrl } = addPost;

  const addNewMarker = e => {
    if (isAuth) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setAddPost({
        ...addPost,
        lat,
        lng
      });
    } else {
      return null;
    }
  };

  const addPostInfoOpen = () => {
    setAddPost({
      ...addPost,
      openInfo: true
    });
  };

  const addPostInfoClose = () => {
    setAddPost({
      ...addPost,
      openInfo: false
    });
  };

  const imgChange = e => {
    if (e.target.type === "file") {
      try {
        setAddPost({
          ...addPost,
          myImg: e.target.files[0],
          prevImgUrl: URL.createObjectURL(e.target.files[0])
        });
      } catch (err) {
        console.log(err.message);
        setAddPost({
          ...addPost,
          prevImgUrl: sampleImage
        });
      }
    } else {
      setAddPost({
        ...addPost,
        [e.target.name]: e.target.value
      });
    }
  };

  const defaultMapOptions = {
    fullscreenControl: false
  };

  const submitPost = e => {
    e.preventDefault();

    props.post(addPost);
  };

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 43.653908, lng: -79.384293 }}
      defaultOptions={defaultMapOptions}
      onClick={e => addNewMarker(e)}
    >
      <Marker
        position={{ lat: addPost.lat, lng: addPost.lng }}
        onClick={() => addPostInfoOpen()}
      >
        {addPost.openInfo && (
          <InfoWindow
            position={{
              lat: addPost.lat,
              lng: addPost.lng
            }}
            onCloseClick={() => addPostInfoClose()}
          >
            <Fragment>
              <Form onSubmit={e => submitPost(e)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => imgChange(e)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={e => imgChange(e)}
                    rows="3"
                    name="text"
                    value={text}
                  />
                </Form.Group>
                <InputGroup className="mb-3">
                  <FormControl
                    type="file"
                    name="myImg"
                    onChange={e => imgChange(e)}
                  />
                </InputGroup>
                <Button type="submit">Post</Button>
                <Image
                  src={
                    prevImgUrl === null || prevImgUrl === ""
                      ? sampleImage
                      : prevImgUrl
                  }
                  className="imagePreview"
                  required
                />
              </Form>
            </Fragment>
          </InfoWindow>
        )}
      </Marker>
      {loadAllPost
        ? allPost.map(post => {
            const fLat = parseFloat(post.metadata.lat);
            const fLng = parseFloat(post.metadata.lng);
            const filename = post.filename;
            const getImg = filename => {
              setSelectedPost(filename);
              props.requestImg(filename);
            };
            const base64 = props.img;
            console.log(base64);

            return (
              <Marker
                key={post._id}
                position={{ lat: fLat, lng: fLng }}
                onClick={() => getImg(filename)}
                defaultAnimation="2"
              >
                {selectedPost === post.filename && (
                  <InfoWindow
                    key={post.filename}
                    position={{
                      lat: fLat,
                      lng: fLng
                    }}
                    onCloseClick={() => {
                      setSelectedPost(null);
                    }}
                  >
                    <div>
                      <Fragment>
                        <center>
                          <h1>{post.metadata.title}</h1>
                          <h1>{post.metadata.uploadDate}</h1>
                          <div>
                            <img
                              src={`data:image/;base64, ${props.img}`}
                              className="imgStyle"
                            />
                            {/* <Image src={sampleImage} className="imgStyle" /> */}
                            <p>{post.metadata.text}</p>
                          </div>

                          <Button type="button">Delete</Button>
                        </center>
                      </Fragment>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })
        : null}
    </GoogleMap>
  );
};

MapComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  allPost: PropTypes.array.isRequired,
  loadAllPost: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  lat: state.userReducer.lat,
  lng: state.userReducer.lng,
  isAuth: state.userReducer.isAuth,
  allPost: state.getPostReducer.allPost,
  loadAllPost: state.getPostReducer.loadAllPost,
  img: state.getPostReducer.img
});

export default connect(
  mapStateToProps,
  { post, requestImg }
)(MapComponent);
