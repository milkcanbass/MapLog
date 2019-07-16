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

  //   useEffect(() => {
  //     console.log(allPost);
  //   }, [allPost]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    isMarkerShown: false,
    markerPosition: null
  });
  console.log(GoogleMap.onMapClick);

  const [addPost, setAddPost] = useState({
    lat: null,

    lng: null
  });

  const mapRef = useRef();

  const addNewMarker = e => {
    console.log(e.latLng.lat);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(lat, lng);

    setAddPost({
      ...addPost,
      lat,
      lng
    });
  };
  console.log(addPost);

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 43.653908, lng: -79.384293 }}
      onClick={e => addNewMarker(e)}
      ref={mapRef}
    >
      <Marker position={{ lat: addPost.lat, lng: addPost.lng }}>
        <InfoWindow
          position={{
            lat: addPost.lat,
            lng: addPost.lng
          }}
        >
          <Fragment>
            <h1>Hello</h1>
          </Fragment>
        </InfoWindow>
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
