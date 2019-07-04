const socket = io();

//Elements Message input
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");

//Element get location
const $locationButton = document.querySelector("#send-location");

const $messages = document.querySelector("#messages");
const $locationUrl = document.querySelector("#locationUrl");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#locationMessage-template"
).innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//Receiving message
socket.on("message", message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("MMM DD h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", generateLocation => {
  console.log(generateLocation);
  const html = Mustache.render(locationMessageTemplate, {
    url: generateLocation.url,
    createdAt: moment(generateLocation.createdAt).format("MMM DD h:mm a")
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

//Send message from message input
$messageForm.addEventListener("submit", e => {
  e.preventDefault();

  //disable
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, err => {
    //enable
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (err) {
      return console.log(err);
    }

    console.log("message sent");
  });
});

//get location data from browser
document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolovation is no supported by your browser");
  }
  $locationButton.setAttribute("disabled", "disabled");
  $locationButton.focus();

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      cb => {
        console.log("location shared");
        $locationButton.removeAttribute("disabled");
      }
    );
  });
});

socket.emit("join", { username, room });
