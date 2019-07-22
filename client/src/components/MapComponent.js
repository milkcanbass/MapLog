import React, { useState, Fragment, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from "react-redux";
import { post, addNewMarker } from "../actions/postAction";
import { requestImg } from "../actions/getPostAction";
import {
  setSelectedPost,
  offSelectedPost,
  windowOpen,
  windowClose,
  postWindowOpen,
  postWindowClose
} from "../actions/windowAction";
import { moveToCurrentLoc } from "../actions/userAction";

import PropTypes from "prop-types";

//CSS
import "./css/mapComponent.css";

//image
import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/uploadIcon.png";
import postMarker from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/iconfinder_Location_728975.png";
import addMarker from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/iconfinder_Marker_red_1891013.png";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const MapComponent = props => {
  const { loadAllPost, allPost, isAuth } = props;

  const [addPost, setAddPost] = useState({
    title: "",
    text: "",
    lat: 43.653908,
    lng: -79.384293,
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
    fullscreenControl: false,
    clickableIcons: false,
    miniZoom: 10,
    maxZoom: 15
  };

  const submitPost = e => {
    e.preventDefault();
    props.post(addPost);
    props.windowClose();
    setAddPost({
      title: "",
      text: "",
      lat: "",
      lng: "",
      myImg: null,
      prevImgUrl: null
    });
  };

  //map bounds

  const bounds = new window.google.maps.LatLngBounds();

  useEffect(() => {
    props.moveToCurrentLoc();
  }, [props]);

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: props.markerLat, lng: props.markerLng }}
      ref={
        loadAllPost && isAuth && props.boundFlag
          ? map => map && map.fitBounds(bounds)
          : null
      }
      defaultOptions={defaultMapOptions}
      onClick={isAuth ? e => props.addNewMarker(e) : null}
    >
      {isAuth ? (
        <Marker
          position={{ lat: props.markerLat, lng: props.markerLng }}
          onClick={() => props.postWindowOpen()}
          icon={{
            url: `${postMarker}`,
            scaledSize: new window.google.maps.Size(50, 50)
          }}
        >
          {props.postOpenInfo && (
            <InfoWindow
              id="infoWindowStyle"
              position={{
                lat: props.markerLat,
                lng: props.markerLng
              }}
              maxWidth="10"
              onCloseClick={() => props.postWindowClose()}
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
                      required
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
                    fluid
                  />
                </Form>
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

            const getImg = filename => {
              console.log("openInfoWind clicked");
              props.windowOpen();
              props.setSelectedPost(filename);
              if (Object.keys(sessionStorage).includes(filename)) {
                console.log("not call");
                return null;
              } else {
                console.log("call");
                props.requestImg(filename);
              }
            };

            const closeInfoWind = () => {
              console.log("closeInfoWind clicked");

              setSelectedPost(null);
              props.windowClose();
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
                {props.selectedPost === post.filename && props.openInfo && (
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
                          <h1>{post.metadata.uploadDate}</h1>
                          <div>
                            <img
                              src={`data:image/;base64, ${sessionStorage.getItem(
                                filename
                              )}`}
                              className="imgStyle"
                              alt={props.img}
                            />
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
  userLat: PropTypes.number.isRequired,
  userLng: PropTypes.number.isRequired,
  allPost: PropTypes.array.isRequired,
  loadAllPost: PropTypes.bool.isRequired,
  windowOpen: PropTypes.func.isRequired,
  widowClose: PropTypes.func.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  offSelectedPost: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  addNewMarker: PropTypes.func.isRequired
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
  boundFlag: state.getPostReducer.boundFlag
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
    offSelectedPost,
    addNewMarker,
    moveToCurrentLoc
  }
)(MapComponent);
