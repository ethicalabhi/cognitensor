import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import Form from "./Form";
import "../src/styles.css";

const App = () => {
  const [firstLine, setFirstLine] = useState("good");
  const [secondLine, setSecondLine] = useState("better");
  const [thirdLine, setThirdLine] = useState("best");
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  // const [line3, setLine3] = useState([]);
  function reset(val = "") {
    if (val === "line1") {
      setLine2([]);
      //    setLine3([]);
    } else if (val === "line2") {
      setLine1([]);
      //   setLine3([]);
    } else if (val === "line3") {
      setLine1([]);
      setLine2([]);
    } else {
      setLine1([]);
      setLine2([]);
      //   setLine3([]);
    }
  }
  function shuffle() {
    let array = [];
    for (var i = 0; i < 9; ++i) array[i] = i;
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  }
  useEffect(() => {
    if (firstLine !== "good") {
      setLine1(shuffle());
      reset("line1");
    } else {
      reset();
    }
  }, [firstLine]);
  useEffect(() => {
    if (secondLine !== "better") {
      setLine2(shuffle());
      reset("line2");
    } else {
      reset();
    }
  }, [secondLine]);
  // useEffect(() => {
  //   if (thirdLine !== "best") {
  //     setLine3(shuffle());
  //     reset("line3");
  //   } else {
  //     reset();
  //   }
  // }, [thirdLine]);
  console.log(line1, line2);
  const getOption = () => {
    const option = {
      title: {
        text: "Vehicle - Realtime Analytics",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}"
      },
      legend: {
        left: "left",
        data: ["A", "B"]
      },
      xAxis: {
        type: "category",
        name: "x",
        splitLine: { show: false },
        data: [
          "SUNDAY",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY"
        ]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      yAxis: {
        type: "log",
        name: "y",
        minorTick: {
          show: true
        },
        minorSplitLine: {
          show: true
        }
      },
      series: [
        {
          name: firstLine,
          type: "line",
          data: line1
        },
        {
          name: secondLine,
          type: "line",
          data: line2
        }
        // {
        //   name: thirdLine,
        //   type: "line",
        //   data: line3
        // }
      ]
    };
    return option;
  };
  return (
    <div>
      <Form
        setFirstLine={setFirstLine}
        setSecondLine={setSecondLine}
        setThirdLine={setThirdLine}
      />
      <ReactEcharts
        option={getOption()}
        style={{ height: "500px", width: "60%", marginTop: "10px" }}
        className="App"
      />
    </div>
  );
};

export default App;
