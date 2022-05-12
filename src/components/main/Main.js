import { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";
import speechImg from "./speechImg.png";
import closeImg from "./closeImg.png";

export const Main = ({ verificationCode, uid }) => {
  const [schedule, setSchedule] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //info to send to manager
  const [coords, setCoords] = useState([]);
  const [text, setText] = useState([]);
  //

  useEffect(() => {
    axios
      .post("https://elderpalmira.herokuapp.com/api/auth/getSchedule", { uid })
      .then((res) => {
        setSchedule(res.data.schedule);
      });
  }, []);

  useEffect(() => {
    if (schedule !== {}) {
      setIsLoading(false);
    }
  }, [schedule]);

  useEffect(() => {
    if (text.length > 5 && coords.length === 2) {
      axios
        .post("https://elderpalmira.herokuapp.com/api/auth/postInfo", {
          uid,
          text,
          coords,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [text, coords, uid]);

  //get cords
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000,
  };

  const success = (pos) => {
    let crd = pos.coords;

    setCoords([crd.latitude, crd.longitude]);
  };

  const error = (err) => {
    console.warn("ERROR(" + err.code + "): " + err.message);
  };

  //get cords

  const speak = () => {
    if (schedule) {
      navigator.geolocation.getCurrentPosition(success, error, options);

      let day = new Date().getDay();
      let hour = new Date().getHours();
      let minutes = new Date().getMinutes();

      let textToSpeak = Object.entries(schedule[Object.keys(schedule)[day]])[
        hour + 1
      ][1];

      let voice = new SpeechSynthesisUtterance(
        `${
          hour < 7
            ? "buenas noches"
            : hour < 13
            ? "buenos dias"
            : hour < 21
            ? "buenas tardes"
            : "buenas noches"
        }, hoy es ${
          day === 0
            ? "Domingo"
            : day === 1
            ? "Lunes"
            : day === 2
            ? "Martes"
            : day === 3
            ? "Miercoles"
            : day === 4
            ? "Jueves"
            : day === 5
            ? "Viernes"
            : "Sabado"
        } , son las ${hour} horas y ${minutes} minutos, a las ${hour + 1} ${
          textToSpeak ? textToSpeak : "haz lo que te apetezca"
        } `
      );
      speechSynthesis.speak(voice);
      setText(voice.text);
    }
  };

  return (
    <div className="main">
      {isLoading ? (
        <h1>Loading</h1>
      ) : schedule ? (
        <>
          <button className="speak-btn" onClick={speak}>
            <img alt="" src={speechImg} />
          </button>
          <button className="close-btn" onClick={speak}>
            <img alt="" src={closeImg} />
          </button>
        </>
      ) : (
        <h1>Encara no s'ha planificat</h1>
      )}
      <p>Codi de verificació: {verificationCode}</p>
    </div>
  );
};
