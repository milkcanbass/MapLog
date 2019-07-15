import React, { useState, Fragment, useEffect, useRef } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";
import { post } from "../actions/postAction";
import PropTypes from "prop-types";

//Since react-maps-react library doesn't support to attach event handler to InforWindow dynamic content.
//To solve this, render InfoWindow children into a DOM node in order to prevent losing React Context.

import InfoWindowEx from "./layout/InfoWindowEx";
import sampleImage from "/Users/shincat/webDevelopment/NodeStudy/SocketPractice/client/src/img/frontend.png";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

//css
import "./css/mapComponent.css";
import { log } from "util";

//Get lat and lng by clicking map

const MapContainer = props => {
  const [markerState, setMakerState] = useState({
    title: "",
    text: "",
    myImg: null,
    lat: null,
    lng: null
  });
  const { title, text, img, lat, lng } = markerState;

  const [infoWindowState, setInfoWindowState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  });

  const onMarkerClick = (props, marker, e) => {
    setInfoWindowState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  //Add marker
  const onMapClicked = (props, map, clickEvent) => {
    console.log(props);
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log({ lat, lng });
    setMakerState({
      ...markerState,
      lat,
      lng
    });
    if (infoWindowState.showingInfoWindow) {
      setInfoWindowState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  const imgChange = e => {
    setMakerState({
      ...markerState,
      myImg: e.target.files[0]
    });
  };

  const titleRef = useRef();
  const textRef = useRef();
  const imgRef = useRef();

  const submitPost = e => {
    e.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;
    const myImg = markerState.myImg;
    const lat = markerState.lat;
    const lng = markerState.lng;

    props.post({ title, text, myImg, lat, lng });

    // const image = document.getElementsByName("myImg");
    // console.log(image);
    // console.log(imgRef);
  };

  useEffect(() => {
    console.log(props.allPost);
    if (props.loadAllPost) {
      props.allPost.map((post, i) => {
        console.log(post.metadata.title);
      });
    } else {
      console.log("bad request");
    }
  });

  return (
    <Fragment>
      <Map
        className={"map"}
        google={props.google}
        zoom={14}
        id="mapStyles"
        onClick={onMapClicked}
        initialCenter={{
          lat: props.latitude,
          lng: props.longitude
        }}
        center={{
          lat: props.latitude,
          lng: props.longitude
        }}
      >
        <Marker
          position={{ lat: markerState.lat, lng: markerState.lng }}
          name={markerState.name}
          title={markerState.title}
          onClick={onMarkerClick}
        />
        {props.loadAllPost
          ? props.allPost.map((post, i) => {
              const lat = post.metadata.lat;
              const lng = post.metadata.lng;
              const title = post.metadata.title;
              const text = post.metadata.text;

              console.log(lat);

              return (
                <Marker
                  index={i}
                  position={{ lat: lat, lng: lng }}
                  title={title}
                  text={text}
                  onClick={onMarkerClick}
                />
              );
            })
          : null}
        <InfoWindowEx
          marker={infoWindowState.activeMarker}
          visible={infoWindowState.showingInfoWindow}
        >
          <div className="infoWindowStyle">
            {props.isAuth ? (
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
            ) : (
              <Fragment>
                <center>
                  <h1>{markerState.title}</h1>
                  <p>updated:2019 12/12</p>
                  <div>
                    <p>
                      <img src={img} className="img" className="imgStyle" />
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </p>
                  </div>

                  <Button type="button">
                    <a href={`mailto:${markerState.name}`}>Send mail</a>
                  </Button>
                </center>
              </Fragment>
            )}
          </div>
        </InfoWindowEx>
      </Map>
    </Fragment>
  );
};

MapContainer.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  postStatus: PropTypes.bool.isRequired,
  allPost: PropTypes.array.isRequired,
  loadAllPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  latitude: state.userReducer.latitude,
  longitude: state.userReducer.longitude,
  postStatus: state.userReducer.postStatus,
  isAuth: state.userReducer.isAuth,
  allPost: state.getPostReducer.allPost,
  loadAllPost: state.getPostReducer.loadAllPost
});

export default connect(
  mapStateToProps,
  { post }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDKUUexAAJ4p0Mb7zTp-zxpWiwmyiEr-H4"
  })(MapContainer)
);
