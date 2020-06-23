// javascript file for the chart

"use strict";

$(function() {
  // start live report function
  $("#liveReports").click(async function() {
    let coinsArray = sortCoins();

    // first validation that coins have been chosen
    if (!coinsArray) {
      modalMessage(
        `No coin wore chosen!`,
        `Please choose up to 5 coins`,
        `Countinue`
      );
      return;
    }

    spinner(true);

    // an array for chart data objects
    let data = new Array();

    // first data request
    const response = await getData(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsArray}&tsyms=USD`
    );
    getChartInfo(response);

    // main callback function hor handling the data
    function getChartInfo(response) {
      // validation for response
      if (response.Response === "Error" || jQuery.isEmptyObject(response)) {
        modalMessage(
          `Please choose another coin!`,
          response.Response === "Error"
            ? `${response.Message}`
            : `This coin dosen't have any data`,
          `Countinue`
        );
        spinner(false);
        return;
      } else {
        // update css properties
        updateStyle("#liveReports");

        // an array for coins that coins that were chosen but did`nt returned data
        let coinsWithoutInfo = coinsArray;

        // get first date
        const date = new Date();

        for (const item in response) {
          // filter all coins that were chosen but did`nt returned data
          coinsWithoutInfo = coinsWithoutInfo.filter(word => word !== item);

          // an object that contain the chart points data
          let coin = {
            name: item,
            type: "line",
            xValueFormatString: "HH:mm:ss",
            showInLegend: true,
            dataPoints: [{ x: date, y: response[item].USD }]
          };

          data.push(coin);
        }

        try {
          setChart(coinsWithoutInfo);
        } catch (err) {
          modalMessage(`Error!`, `${err.message}`, `Continue`);
        } finally {
          spinner(false)
        }
      }
    }

    // function to build the chart
    function setChart(coinsWithoutInfo) {
      $(".row-main").html(
        `<div id="coinsWithoutInfo"></div>
            <div id="chartContainer"></div>`
      );

      if (coinsWithoutInfo.length > 0) {
        $(`#coinsWithoutInfo`).html(
          `The following coins were chosen but no data was received: ${coinsWithoutInfo}`
        );
      }

      let chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,

        title: {
          text: "Real-Time Crypto-Coins Currencies in USD$"
        },
        axisY: {
          title: "Coins Value (USD)",
          suffix: "$",
          includeZero: true,
          minimum: 0
        },
        axisX: {
          valueFormatString: "HH:mm:ss"
        },
        legend: {
          cursor: "pointer",
          fontSize: 16
        },
        toolTip: {
          shared: true
        },

        data
      });

      chart.render();
      updateChart(chart);
    }
    // end of function

    // function to sent data request every 2 secondes
    function updateChart(chart) {
      const updateInterval = 2000;
      const updateChart = setInterval(async () => {
        // send another data request
        const response = await getData(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsArray}&tsyms=USD`
        );
        updatePoints(response, chart);
      }, updateInterval);

      $("#home").click(() => {
        clearInterval(updateChart);
      });

      $("#about").click(() => {
        clearInterval(updateChart);
      });

      $("#btn-search").click(() => {
        clearInterval(updateChart);
      });
    }
    // end of function

    // callback function to update the data of the chart
    function updatePoints(response, chart) {
      // limit of dates data-points
      const dataLength = 12;
      // get new date
      const date = new Date();

      data.map(item => {
        if (item.dataPoints.length === dataLength) {
          item.dataPoints.shift();
        }

        // update new date in the chart
        item.dataPoints.push({ x: date, y: response[item.name].USD });
      });
      chart.render();
    }
    // end of function
  });
  // end of click
});
