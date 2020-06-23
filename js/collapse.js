// javascript file for the collapse

"use strict";

// global array for collapse response for the 2 minutes periode
// let collapseData.responseArray = [];

let collapseData = {
  id: "",
  updateIntravel: 120000,
  responseArray: []
};

//main global function collapse 
function moreInfo(callback) {
  $(`.collapse`).on(`show.bs.collapse`, async function() {
    // get the collapse id
    collapseData.id = $(this).prop("id").split("_")[1];

    // validate first click
    const coin = collapseData.responseArray.find(
      coin => coin.id === collapseData.id
    );

    // if it is the first time User clicked on the button send request
    if (coin === undefined) {
      spinner(true);

      const response = await getData(`https://api.coingecko.com/api/v3/coins/${collapseData.id}`);
      collapseData.responseArray.push(response);
      setCollapseInfo(response);

      // after giving time (in this case 2 minutes) allow another request
      setTimeout(() => {
        callback(collapseData.id);
      }, collapseData.updateIntravel);
    }
    // else present information from a global array
    else {
      setCollapseInfo(coin);
    }
  });

  // when the collapse is closed empty collapse info
  $(`.collapse`).on(`hidden.bs.collapse`, function() {
    $(this)
      .children()
      .children()
      .empty();
  });

  // a function for handling the collapse data
  const setCollapseInfo = response => {
    let list = "";
    for (const item in response.market_data.current_price) {
      if (item === "usd") {
        list += `${item.toUpperCase()}: ${
          response.market_data.current_price[item]
        } $ `;
      } else if (item === "eur") {
        list += `${item.toUpperCase()}: ${
          response.market_data.current_price[item]
        } € <br>`;
      } else if (item === "ils") {
        list += `${item.toUpperCase()}: ${
          response.market_data.current_price[item]
        } ₪ <br>`;
      }
    }
    appendCollapseInfo(list, response);
  };
  // end of function

  // a function to append the data to the DOM
  const appendCollapseInfo = (list, coin) => {
    $(`#info-${coin.id}`).append(`<h6 class="card-text">Currencies:</h6> ${list}`
    );
    $(`#info-${coin.id}`)
      .next().append(`<img src="${coin.image.large}" class="card-img" alt="${coin.name}_logo">`
      );
    setTimeout(() => {
      spinner(false)
    }, 0);
  };
  // end of function
}
// end of collapse 

// callback function that firing after 2 minutes
function updateRequest(coinId) {
  const IndexToDelete = collapseData.responseArray.findIndex(item => item.id !== coinId);
  collapseData.responseArray.splice(IndexToDelete, 1);
  $(`#collapse_${coinId}`).collapse("hide");
}
// end of function
