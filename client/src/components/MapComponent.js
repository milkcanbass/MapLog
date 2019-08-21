import React, { useState, Fragment } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from "react-redux";
import { post, addNewMarker, deletePost } from "../actions/postAction";
import { requestImg } from "../actions/getPostAction";
import {
  setSelectedPost,
  windowOpen,
  windowClose,
  postWindowOpen,
  postWindowClose
} from "../actions/windowAction";

import PropTypes from "prop-types";

//CSS
import "./css/mapComponent.css";

//image
import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/components/img/uploadIcon.png";
import postMarker from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/components/img/iconfinder_Location_728975.png";
import addMarker from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/components/img/iconfinder_Marker_red_1891013.png";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const MapComponent = props => {
  const {
    userLat,
    userLng,
    isAuth,
    allPost,
    loadAllPost,
    img,
    selectedPost,
    openInfo,
    postOpenInfo,
    markerLat,
    markerLng,
    loadingImg,
    offBondOffset,

    //functions
    post,
    requestImg,
    windowOpen,
    windowClose,
    postWindowOpen,
    postWindowClose,
    setSelectedPost,
    addNewMarker,
    deletePost
  } = props;

  const [addPost, setAddPost] = useState({
    title: "",
    text: "",
    postId: null,
    lat: null,
    lng: null,
    myImg: null,
    prevImgUrl: null
  });

  const { title, text, prevImgUrl } = addPost;

  const imgChange = e => {
    if (e.target.type === "file") {
      try {
        setAddPost({
          ...addPost,
          myImg: e.target.files[0],
          prevImgUrl: URL.createObjectURL(e.target.files[0])
        });
      } catch (err) {
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
    fullscreenControl: false,
    clickableIcons: false,
    miniZoom: 10,
    maxZoom: 15
  };

  const submitPost = e => {
    e.preventDefault();
    post(addPost);
    windowClose();
    setAddPost({
      title: "",
      text: "",
      lat: "",
      lng: "",
      myImg: null,
      prevImgUrl: null
    });
  };

  const activateDeletePost = filename => {
    deletePost(filename);
  };

  //map bounds

  const bounds = new window.google.maps.LatLngBounds();

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={
        loadAllPost
          ? { lat: markerLat, lng: markerLng }
          : { lat: userLat, lng: userLng }
      }
      ref={
        loadAllPost && isAuth && offBondOffset
          ? map => map && map.fitBounds(bounds)
          : null
      }
      defaultOptions={defaultMapOptions}
      onClick={isAuth ? e => addNewMarker(e) : null}
    >
      {isAuth ? (
        <Marker
          position={{ lat: markerLat, lng: markerLng }}
          onClick={() => postWindowOpen()}
          icon={{
            url: `${postMarker}`,
            scaledSize: new window.google.maps.Size(50, 50)
          }}
        >
          {postOpenInfo && (
            <InfoWindow
              id="infoWindowStyle"
              position={{
                lat: markerLat,
                lng: markerLng
              }}
              onCloseClick={() => postWindowClose()}
            >
              <Fragment>
                <div className="inputWrapper">
                  <Form onSubmit={e => submitPost(e)}>
                    <Image
                      src={
                        prevImgUrl === null || prevImgUrl === ""
                          ? sampleImage
                          : prevImgUrl
                      }
                      className="imagePreview"
                    />
                    <InputGroup className="mb-3">
                      <FormControl
                        type="file"
                        name="myImg"
                        onChange={e => imgChange(e)}
                        required
                      />
                      <p className="fileUploadLabel">
                        PNG file or JPEG file only. Maximum data size 1MB
                      </p>
                    </InputGroup>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="headline">Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => imgChange(e)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label className="headline">Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={e => imgChange(e)}
                        rows="3"
                        name="text"
                        value={text}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="float-right"
                      variant="info"
                    >
                      Post
                    </Button>
                  </Form>
                </div>
              </Fragment>
            </InfoWindow>
          )}
        </Marker>
      ) : null}
      {loadAllPost && isAuth
        ? allPost.map(post => {
            const fLat = parseFloat(post.metadata.position.lat);
            const fLng = parseFloat(post.metadata.position.lng);
            const filename = post.filename;

            const latLng = new window.google.maps.LatLng(fLat, fLng);
            bounds.extend(latLng);

            //time setting
            const timeOptions = {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour12: true,
              hour: "2-digit",
              minute: "2-digit"
            };

            const time = new Date(post.uploadDate).toLocaleTimeString(
              "en-US",
              timeOptions
            );
            const localTime = JSON.stringify(time);

            const getImg = filename => {
              windowOpen();
              setSelectedPost(filename);
              if (Object.keys(sessionStorage).includes(filename)) {
                return null;
              } else {
                requestImg(filename);
              }
            };

            const closeInfoWind = () => {
              setSelectedPost(null);
              windowClose();
            };

            return (
              <Marker
                key={post._id}
                position={{ lat: fLat, lng: fLng }}
                onClick={() => getImg(filename)}
                defaultAnimation="2"
                icon={{
                  url: `${addMarker}`,
                  scaledSize: new window.google.maps.Size(50, 50)
                }}
              >
                {selectedPost === post.filename && openInfo && (
                  <InfoWindow
                    key={post.filename}
                    position={{
                      lat: fLat,
                      lng: fLng
                    }}
                    onCloseClick={() => {
                      closeInfoWind();
                    }}
                  >
                    <div>
                      <Fragment>
                        <center>
                          <h1>{post.metadata.title}</h1>
                          <p>{localTime}</p>
                        </center>
                        <div className="postForm">
                          <center>
                            {loadingImg ? (
                              <img
                                // src={`data:image/;base64, ${sessionStorage.getItem(
                                //   filename
                                // )}`}
                                src={`data:image;base64,
                                ${img}
                              `}
                                className="imgStyle"
                                alt={img}
                                fluid
                              />
                            ) : (
                              <Spinner animation="border" variant="info" />
                            )}
                          </center>
                          <div>
                            <h5 className="textDisplay">
                              {post.metadata.text}
                            </h5>
                          </div>

                          <div>
                            <center>
                              <Button
                                variant="danger"
                                type="button"
                                className="float-right"
                                onClick={() => activateDeletePost(filename)}
                              >
                                Delete
                              </Button>
                            </center>
                          </div>
                        </div>
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
  userLng: PropTypes.number.isRequired,
  userLat: PropTypes.number.isRequired,
  allPost: PropTypes.array.isRequired,
  loadAllPost: PropTypes.bool.isRequired,
  windowOpen: PropTypes.func.isRequired,
  widowClose: PropTypes.func,
  setSelectedPost: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  addNewMarker: PropTypes.func.isRequired,
  loadingImg: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userLat: state.userReducer.userLat,
  userLng: state.userReducer.userLng,
  isAuth: state.userReducer.isAuth,
  allPost: state.getPostReducer.allPost,
  loadAllPost: state.getPostReducer.loadAllPost,
  img: state.getPostReducer.img,
  selectedPost: state.windowReducer.selectedPost,
  openInfo: state.windowReducer.openInfo,
  postOpenInfo: state.windowReducer.postOpenInfo,
  markerLat: state.postReducer.position.markerLat,
  markerLng: state.postReducer.position.markerLng,
  loadingImg: state.getPostReducer.loadingImg,
  offBondOffset: state.getPostReducer.offBondOffset
});

export default connect(
  mapStateToProps,
  {
    post,
    requestImg,
    windowOpen,
    windowClose,
    postWindowOpen,
    postWindowClose,
    setSelectedPost,
    addNewMarker,
    deletePost
  }
)(MapComponent);
