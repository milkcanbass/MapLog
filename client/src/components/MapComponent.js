import React, { Component, useState, Fragment, useEffect, useRef } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { connect } from "react-redux";
import { post } from "../actions/postAction";
import PropTypes from "prop-types";

//CSS
import "./css/mapComponent.css";
import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/samaple.png";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const MapTest = props => {
  const { loadAllPost, lat, lng, allPost, isAuth } = props;

  const [selectedPost, setSelectedPost] = useState(null);

  const [addPost, setAddPost] = useState({
    title: null,
    text: null,
    lat: null,
    lng: null,
    myImg: null,
    openInfo: true
  });

  const addNewMarker = e => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setAddPost({
      ...addPost,
      lat,
      lng
    });
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
    setAddPost({
      ...addPost,
      myImg: e.target.files[0]
    });
  };
  const defaultMapOptions = {
    fullscreenControl: false
  };

  const titleRef = useRef();
  const textRef = useRef();
  const imgRef = useRef();

  const submitPost = e => {
    e.preventDefault();
    setAddPost({
      ...addPost,
      title: titleRef.current.value,
      text: textRef.current.value
    });

    console.log(addPost);

    // props.post({ title, text, myImg, lat, lng });
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
                <Form.Group controlId="exampleForm.ControlInput1" fluid>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    ref={titleRef}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1" fluid>
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    ref={textRef}
                    rows="3"
                    name="text"
                  />
                </Form.Group>
                <InputGroup className="mb-3">
                  <FormControl
                    type="file"
                    ref={imgRef}
                    name="myImg"
                    onChange={e => imgChange(e)}
                  />
                </InputGroup>
                <Button type="submit">Set Location</Button>
                <Image
                  src={sampleImage}
                  ref={imgRef}
                  className="imagePreview"
                  fluid
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
            console.log(post.metadata.uploadDate);

            return (
              <Marker
                key={post._id}
                position={{ lat: fLat, lng: fLng }}
                onClick={() => setSelectedPost(post._id)}
                defaultAnimation="2"
              >
                {selectedPost === post._id && (
                  <InfoWindow
                    key={post._id}
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
                            <Image
                              src={sampleImage}
                              className="imgStyle"
                              fluid
                            />
                            <p>{post.metadata.text}</p>
                          </div>

                          <Button
                            type="button"
                            onClick={() => console.log("hi")}
                          >
                            Send mail
                          </Button>
                        </center>
                      </Fragment>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })
        : null}
      {/* {selectedPost && (
        <InfoWindow
          position={{
            lat: selectedPost.lat,
            lng: selectedPost.lng
          }}
        >
          <div>
            <h1>{selectedPost.title}</h1>
          </div>
        </InfoWindow>
      )} */}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(MapTest));

MapTest.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  allPost: PropTypes.array.isRequired,
  loadAllPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  lat: state.userReducer.lat,
  lng: state.userReducer.lng,
  isAuth: state.userReducer.isAuth,
  allPost: state.getPostReducer.allPost,
  loadAllPost: state.getPostReducer.loadAllPost
});

export default connect(
  mapStateToProps,
  { post }
)(MapTest);

// export default connect(
//   mapStateToProps,
//   { post }
// )(
//   GoogleApiWrapper({
//     apiKey: "AIzaSyDKUUexAAJ4p0Mb7zTp-zxpWiwmyiEr-H4"
//   })(MapTest)
// );
