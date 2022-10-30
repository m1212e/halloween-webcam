export function getMedia(constraints?: MediaStreamConstraints) {
  try {
    return navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
  } catch (err) {
    alert("Could not get webcam");
    throw "Could not get webcam";
  }
}

export function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}