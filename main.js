const ctx = document.getElementById("mychart").getContext("2d");

let delayed;

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,0.3)");

const labels = ["2016", "2017", "2018", "2019", "2021"];

const data = {
  labels,
  datasets: [
    {
      data: [45, 64.4, 63, 83, 735, 1172],
      label: "Tesla Stock Price",
      fill: true,
      backgroundColor: gradient,
      borderColor: "#fff",
      pointBackgroundColor: "rgba(189, 195, 199)",
      tension: 0.4,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    radius: 3,
    hitRadius: 15,
    hoverRadius: 5,
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.dataIndex + 100;
        }
        return delay;
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
