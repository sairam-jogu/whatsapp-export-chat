import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userSwap from "../images/userSwap3.png";

const Chat = () => {
  const location = useLocation();
  let res = location.state;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [check, setCheck] = useState(false);

  const getData = () => {
    if (res.length !== 0) {
      console.log(res);
      let i = 0;
      for (; i < res.length - 1 && res[i].match(/-.*:/) == null; i++);
      console.log(i);
      let n = res[i].match(/-.*:/).toString();
      
      console.log(n.toString().substring(1, n.length - 1));
      setName(n.substring(1, n.length - 1));

      for (
        ;
        i < res.length - 1 &&
        (res[i].match(/-.*:/) == null || res[i].match(/-.*:/).toString() === n);
        i++
      );
      console.log(i);
      let m = res[i].match(/-.*:/).toString();
      if(m == null){
        setOtherName("No USer")
      }
      console.log(m.substring(1, m.length - 1));
      setOtherName(m.substring(1, m.length - 1));
    } else {
      alert("Upload The File First!!");
      navigate("/");
    }
  };

  const swapUsers = () => {
    setName(otherName);
    setOtherName(name);
  };

  const  Date = (date) =>{
    console.log(date)
    return <div className="date">{date}</div>;
  }

  const ChatBody = () => {
    let date = null;
    let box = document.getElementsByClassName("chat-body")[0];

    return (
      <>
        {res.map((line, index) => {
          setCheck(false);
          let currentDate = line.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/);
          if (currentDate == null) {
            setCheck(true);
            return <div className={check ? "user-message" : "chatbot-message"}>{line}</div>;
          } else {
            currentDate = currentDate.toString();
            
            if (date == null || currentDate != date) {
              date = currentDate;
              console.log(date);
              return <div className="date">{date}</div>;
                // return <Date date = {date} />
            }

            let msg = line.match(/: .*/);

            console.log(msg)

            if (msg == null) {
              let middle = line.match(/-.*/);
              console.log(middle)
              return <div className="date">{middle}</div>;
            } else {
              let time = line.match(/[0-9]{1,2}\:[0-9]{2}/).toString();
              console.log(time);

              if (time == null) {
                return <h4>{msg.toString().substring(2)}</h4>;
              }
              if (line.includes(`-${otherName}:`)) {
                return (
                    <>
                {/* {date == null || currentDate != date ? <div className="date">{date || null}</div> : null} */}
                  <div className="user-message">
                    <p>
                      {msg.toString().substring(2) + "\n"}
                      <span>{time}</span>
                    </p>
                  </div>
                  </>
                );
              } else {
                return (
                  <div className="chatbot-message">
                    <p>
                      {msg.toString().substring(2) + "\n"}
                      <span>{time}</span>
                    </p>
                  </div>
                );
              }
            }
          }
        })}
      </>
    );
  };

  const getBack = () => {
    navigate("/");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid chatClass text-center">
      <div className="row fill">
        <div className="col-4 left">
          <div className="chat-header">
            <h3>Swap Users</h3>
          </div>
          <h3 className="my-2 text-white py-2">UserName - {otherName}</h3>
          <div className="imgDiv">
            <img
              src={userSwap}
              onClick={swapUsers}
              className="swapImage "
              alt="img"
            />
          </div>
          <button className="btn btn-dark p-2 myBtn " onClick={getBack}>
            Go Back
          </button>
        </div>
        <div className="col-8">
          <h3 className="chat-header">{name}</h3>
          <div className="chat-body">
            <ChatBody />
          </div>
          <div className="chatbody-input">
            <i class="fa-regular fa-face-smile"></i>
            <i class="fa-solid fa-paperclip-vertical"></i>
            <input type="text" placeholder="Type message"></input>
            <i class="fa-solid fa-microphone"></i>
          </div>
        </div>
      </div>
      {/* <h1>{name}</h1>
    <h2>{otherName}</h2> */}
    </div>
  );
};

export default Chat;
