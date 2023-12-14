import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../Calculator.css";
import HImg from "./hist1.png";
import Timg from "./trash.jpg";
let historyLi = [];
const customStyles = {
  content: {
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    backgroundColor: "#202020",
    animation: "slideUp 0.3s ease-out",
    marginTop: "70%",
    height: "50%",
    border: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(24, 24, 24, 0.2)",
  },
};

Modal.setAppElement("#root");

export default function Calculator() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [num, setNum] = useState("0");
  const [calc, setCalc] = useState("⠀");
  const [, setRender] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //useEffect to return the function
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //useEffect to check for screenwidth
  useEffect(() => {
    if (screenWidth > 600) {
      setIsOpen(false);
    }
  }, [screenWidth]);

  //Modal win (open) state setter
  function openModal() {
    setIsOpen(true);
  }
  //Modal win (open) state setter
  function closeModal() {
    setIsOpen(false);
  }
  //trimming unwanted decimal zeros for values accross the app
  function trimDecimalZeros(number) {
    const str = number.toString();
    const trimmedStr = str.replace(/(\.[0-9]*[1-9])0+$/, "$1");
    console.log(historyLi.length);
    console.log(historyLi);
    return parseFloat(trimmedStr);
  }
  //history delete function
  function trashClick() {
    historyLi = [];
    setRender((render) => !render);
  }
  //function to check if the value has floating point
  function isDecimal(number) {
    return number !== Math.floor(number);
  }
  //any arithmatic or exponential operation button calls this function
  function operation(e) {
    if (num === "0" && calc === "⠀") {
      setCalc("⠀");
    } else if (num !== "0" && calc === "⠀") {
      setCalc(num + e.target.textContent);
    } else if (
      num === "0" &&
      (calc.charAt(calc.length - 1) === "+" ||
        calc.charAt(calc.length - 1) === "-" ||
        calc.charAt(calc.length - 1) === "x" ||
        calc.charAt(calc.length - 1) === "%" ||
        calc.charAt(calc.length - 1) === "÷")
    ) {
      setCalc(calc.slice(0, -1) + e.target.textContent);
    } else if (num !== "0" && calc !== "⠀") {
      const calpre = +calc.slice(0, -1);
      let result;
      switch (calc.charAt(calc.length - 1)) {
        case "+":
          result = calpre + +num;
          setCalc(Math.ceil(result * 1000) / 1000 + e.target.textContent);
          setNum("0");
          break;
        case "-":
          result = calpre - +num;
          setCalc(Math.ceil(result * 1000) / 1000 + e.target.textContent);
          setNum("0");
          break;
        case "x":
          result = calpre * +num;
          setCalc(Math.ceil(result * 1000) / 1000 + e.target.textContent);
          setNum("0");
          break;
        case "÷":
          result = calpre / +num;
          setCalc(Math.ceil(result * 1000) / 1000 + e.target.textContent);
          setNum("0");
          break;
        case "%":
          result = calpre % +num;
          setCalc(Math.ceil(result * 1000) / 1000 + e.target.textContent);
          setNum("0");
          break;
        default:
          break;
      }
    }
    setNum("0");
  }
  //num state setter function
  function numberSet(e) {
    num === "0"
      ? setNum(e.target.textContent + "")
      : setNum(num + e.target.textContent + "");
  }
  return (
    <div className="grid-container">
      <div className="item it1">
        <img
          alt="History"
          onClick={openModal}
          className="hImg it1Child"
          src={HImg}
        ></img>
        <p className="it1Child">{calc}</p>
        <p className="it1Child">{num + ""}</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {historyLi.length !== 0 ? (
          <img
            alt="Trash"
            onClick={trashClick}
            style={{ position: "fixed", left: "10px", marginTop: "10px" }}
            src={Timg}
            width="30px"
            height="30px"
          ></img>
        ) : (
          <h4 style={{ color: "#f0f0f0" }}>No history</h4>
        )}
        {historyLi.map((item, index) => (
          <div className="modal-his" key={index}>
            <p style={{ color: "#8f8f8f" }} className="modal-text">
              {item.calc}
            </p>
            <p style={{ fontSize: "25px" }} className="modal-text">
              {item.num}
            </p>
          </div>
        ))}
      </Modal>
      <div className="item it2">
        {historyLi.length !== 0 ? (
          <img
            alt="Trash"
            onClick={trashClick}
            style={{ position: "fixed" }}
            src={Timg}
            width="30px"
            height="30px"
          ></img>
        ) : (
          <h4 style={{ color: "#f0f0f0" }}>No history</h4>
        )}
        {historyLi.map((item, index) => (
          <div className="histList" key={index}>
            <p style={{ color: "#8f8f8f" }}>{item.calc}</p>
            <p style={{ fontSize: "35px" }}>{item.num}</p>
          </div>
        ))}
      </div>
      <div className="item it3">
        <div onClick={operation} className="btns btn1 op">
          %
        </div>
        <div onClick={() => setNum("0")} className="btns btn2 op">
          CE
        </div>
        <div
          onClick={(e) => {
            setNum("0");
            setCalc("⠀");
          }}
          className="btns btn3 op"
        >
          C
        </div>
        <div
          onClick={() => setNum(num.slice(0, -1) + "" || "0")}
          className="btns btn4 op"
        >
          ←
        </div>
        <div
          onClick={() => {
            const result = trimDecimalZeros((1 / +num).toFixed(3));
            historyLi.unshift({
              calc: "(1/" + num + ")=",
              num: result + "",
            });
            setNum(result + "");
          }}
          className="btns btn5 op"
        >
          1/x
        </div>
        <div
          onClick={() => {
            const result = trimDecimalZeros((+num * +num).toFixed(3));
            historyLi.unshift({
              calc: "(" + num + ")²=",
              num: result + "",
            });
            setNum(result + "");
          }}
          className="btns btn6 op"
        >
          x²
        </div>
        <div
          onClick={() => {
            const result = trimDecimalZeros(Math.sqrt(+num).toFixed(3));
            historyLi.unshift({
              calc: "√(" + num + ")=",
              num: result + "",
            });
            setNum(result + "");
          }}
          className="btns btn7 op"
        >
          √x
        </div>
        <div onClick={operation} className="btns btn8 op op1">
          ÷
        </div>
        <div onClick={numberSet} className="btns btn9">
          7
        </div>
        <div onClick={numberSet} className="btns btn10">
          8
        </div>
        <div onClick={numberSet} className="btns btn11">
          9
        </div>
        <div onClick={operation} className="btns btn12 op op1">
          x
        </div>
        <div onClick={numberSet} className="btns btn13">
          4
        </div>
        <div onClick={numberSet} className="btns btn14">
          5
        </div>
        <div onClick={numberSet} className="btns btn15">
          6
        </div>
        <div onClick={operation} className="btns btn16 op op1">
          -
        </div>
        <div onClick={numberSet} className="btns btn17">
          1
        </div>
        <div onClick={numberSet} className="btns btn18">
          2
        </div>
        <div onClick={numberSet} className="btns btn19">
          3
        </div>
        <div onClick={operation} className="btns btn20 op op1">
          +
        </div>
        <div
          onClick={() => {
            if (+num < 0) {
              setNum(-+num + "");
            } else {
              setNum(-+num + "");
            }
          }}
          className="btns btn21"
        >
          +/-
        </div>
        <div onClick={numberSet} className="btns btn22">
          0
        </div>
        <div
          onClick={(e) =>
            !num.includes(".") ? setNum(num + e.target.textContent + "") : ""
          }
          className="btns btn23"
        >
          .
        </div>
        <div
          onClick={(e) => {
            if (num !== "0" && calc !== "⠀") {
              const calpre = +calc.slice(0, -1);
              let result;
              switch (calc.charAt(calc.length - 1)) {
                case "+":
                  result = calpre + +num;
                  isDecimal(result)
                    ? setNum(trimDecimalZeros(result.toFixed(3)) + "")
                    : setNum(result + "");
                  historyLi.unshift({
                    calc: calc + num + "=",
                    num: trimDecimalZeros(result.toFixed(3)) + "",
                  });
                  setCalc("⠀");
                  break;
                case "-":
                  result = calpre - +num;
                  isDecimal(result)
                    ? setNum(trimDecimalZeros(result.toFixed(3)) + "")
                    : setNum(result + "");
                  historyLi.unshift({
                    calc: calc + num + "=",
                    num: trimDecimalZeros(result.toFixed(3)) + "",
                  });
                  setCalc("⠀");
                  break;
                case "x":
                  result = calpre * +num;
                  isDecimal(result)
                    ? setNum(trimDecimalZeros(result.toFixed(3)) + "")
                    : setNum(result + "");
                  historyLi.unshift({
                    calc: calc + num + "=",
                    num: trimDecimalZeros(result.toFixed(3)) + "",
                  });
                  setCalc("⠀");
                  break;
                case "÷":
                  result = calpre / +num;
                  isDecimal(result)
                    ? setNum(trimDecimalZeros(result.toFixed(3)) + "")
                    : setNum(num + "");
                  historyLi.unshift({
                    calc: calc + num + "=",
                    num: trimDecimalZeros(result.toFixed(3)) + "",
                  });
                  setCalc("⠀");
                  break;
                case "%":
                  result = calpre % +num;
                  isDecimal(result)
                    ? setNum(trimDecimalZeros(result.toFixed(3)) + "")
                    : setNum(result + "");
                  historyLi.unshift({
                    calc: calc + num + "=",
                    num: trimDecimalZeros(result.toFixed(3)) + "",
                  });
                  setCalc("⠀");
                  break;
                default:
                  break;
              }
            }
            console.log(historyLi);
          }}
          className="btns btn24 op1"
        >
          =
        </div>
      </div>
    </div>
  );
}
