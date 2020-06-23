// javascript file for home page

"use strict";

$(async function () {
  // Plugin for model
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });
  // end of plugin

  // a local array that store the data from the json request
  let DataResponse = new Array();

  // show spinner
  spinner(true);

  // show coins when first entering

  const response = await getData(`https://api.coingecko.com/api/v3/coins`);
  ajaxResponse(response);

  // button for returning to home page
  $("#home").click(function () {
    // validation for first click
    if ($(this).attr("active") === "true") {
      return;
    }

    const selectedCoins = sortCoins();
    spinner(true);

    // css properties
    updateStyle("#home");

    //  ajaxResponse() is in setTimeout otherwise we cant see the css affects
    setTimeout(() => {
      ajaxResponse(DataResponse);

      if (selectedCoins.length >= 1) {
        $(`#deleteCoins-button`).show();
        $(`.row-main`).css("top", "-10.8vh");
      }
    }, 0);
  });
  // end of home button functionalities

  // main callback function
  function ajaxResponse(response) {
    DataResponse = response;
    appendCard(DataResponse);
    coinBySearch(DataResponse);
  }
  // end of collBack

  // button to remove all selected coins
  $(`#deleteCoins-button`).click(() => {
    const answer = window.confirm("Delete selected coins?");
    if (!answer) {
      return;
    }
    // css properties
    $("#selectedCoins").empty();
    $(`.row-main`).css("top", "2vh");
    $(`#deleteCoins-button`).hide();
    togSelectedCoins(false);
    togData.idArray = [];
  });
  // end of button

  // visibility of top button in correlation to the user position in the page
  $("body").scroll(function () {
    if ($("body").scrollTop() > 700) {
      $("#scrollTop-button").css("opacity", 0.95);
      $("#scrollTop-button").click(function () {
        $("body").scrollTop(600);
      });
    } else {
      $("#scrollTop-button").css("opacity", 0);
    }
  });
  // end of button
});
