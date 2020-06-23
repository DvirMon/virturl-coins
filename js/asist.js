// javascript file for asist and global functions
"use strict";

// global function for data request

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    $("#spinner").empty();
  }
}
// end of function

// global function for coins cards
const setCard = item => {
  const card = `  
  <div class="card card-coin col-xl-3 col-lg-3 col-md-4 col-sm-6 px-0" id="${item.symbol.toUpperCase()}">
    <label class="switch switch-card">
      <input type="checkbox" class="checkboxes" coin="${item.symbol.toUpperCase()}" id="togCard_${
    item.id
  }">
      <span class="slider round"></span>
    </label>
    <div class="card-body">
      <h5 class="card-title">${item.symbol.toUpperCase()}</h5>
      <p class="card-text">${item.id}</p>
       <button class="btn btn-dark collapsed mb-2" data-toggle="collapse" aria-controls="collapse_${
         item.id
       }"
        data-target="#collapse_${item.id}">More Info 
      </button>
      <div class="collapse" id="collapse_${item.id}">
        <div class="row mb-2">
          <div class="col-lg-7 col-sm-4 pr-0" id="info-${item.id}"></div>
          <div class="col-lg-5 col-sm-4"></div>
        </div>
      </div>
      </div>
  </div>`;
  return card;
};
// end of function

// global function for presenting the cards
const appendCard = response => {
  $(".row-main").empty();

  const cards = response.map(item => setCard(item)).join(" ");
  $(".row-main").append(cards);

  // add functionalties
  moreInfo(coinId => updateRequest(coinId));
  toggle();
  togSelectedCoins(true);
  hoverAffect(".card-coin");
  spinner(false)
};
// end of function

// function for spinner
const spinner = loading => {
  loading
    ? $(`#spinner`).html(`
    <div class="spinner-border spinner-main">
    <span class="sr-only">Loading...</span>
    </div>`)
    : $(`#spinner`).empty();
};
// end of function

// globl function for modal message
const modalMessage = (title, text, button) => {
  $("#myModal").modal("show");
  $(".row-modal").empty();
  $(`.modal-title`).html(`${title}`);
  $(`#content`).html(`${text}`);
  $(`.btn-modal`).val(`${button}`);
};
// end of function

// global function for css properties when entering any page
function updateStyle(selector) {
  $(selector).addClass("active");
  $(selector)
    .siblings()
    .removeClass("active");

  $(selector).attr("active", true);
  $(selector)
    .siblings()
    .attr("active", false);

  spinner(true);
  $(`#deleteCoins-button`).hide();
  $(`.row-main`).css("top", "1vh");

  // clear messages
  $("#search-input").val("");
  $("#search-error").empty();
}
// end of function

//global function that sort the selected coins string and return it as an array
function sortCoins() {
  let str = $("#selectedCoins").html();
  if (str.length === 0) {
    return;
  } else {
    str = str.split(" ").filter(word => word !== "");
  }
  return str;
}
// end of function

// global function that checked chosen cards when re-entreing home page
const togSelectedCoins = prop => {
  if (togData.idArray.length > 0) {
    togData.idArray.map(coin => $(`#togCard_${coin}`).prop(`checked`, prop));
  }
};
// end of function

// function for hover affect of the cards
const hoverAffect = selector => {
  $(selector).hover(
    function() {
      $(this).animate({ marginTop: "-1%" }, 200);
    },
    function() {
      $(this).animate({ marginTop: "0%" }, 200);
    }
  );
};
// end of function
