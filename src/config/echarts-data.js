import * as echarts from "echarts";

const voltageData = {
  color: ["#6649C4"],
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  yAxis: {
    show: false,
    type: "value",
    max: 4.2,
    min: 0.1
  },
  grid: { top: 22, bottom: 0, left: 26, right: 26 },
  series: [
    {
      data: [1.3, 1.7, 3.3, 4, 2.0, 2.9],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      label: {
        show: true,
        position: "top",
        formatter: "{c}v"
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(102, 73, 196, 0.9019607843137254)"
          },
          {
            offset: 1,
            color: "rgba(102, 73, 196, 0)"
          }
        ])
      }
    }
  ]
};

export { voltageData };
