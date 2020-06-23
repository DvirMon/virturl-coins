// javascript file for the toggale

"use strict";

// global object for the tog 

let togData = {
  id: "",
  name: "",
  coins: [],
  idArray: []
};


// main global function for toggle functionalties
function toggle() {
  $(`.checkboxes`).click(function() {
    togData.id = $(this).prop("id").split("_")[1];
    togData.name = $(this).attr("coin");
    togData.coins = sortCoins()

    if ($(this).prop("checked") === false) {
      setChosenCoins(togData);

      const IndexToDelete = togData.idArray.findIndex(
        item => item === togData.id
      );
      togData.idArray.splice(IndexToDelete, 1);

      if (togData.idArray.length === 0) {
        $(`#deleteCoins-button`).hide();
        $(`.row-main`).css("top", "2vh");
      }
    } else if (togData.idArray.length === 5) {
      $(this).prop("checked", false);
      modal(togData);
      return;
    } else if ($(this).prop("checked")) {

      $("#selectedCoins").append(`${togData.name} `);
      togData.idArray.push(togData.id);

      if (togData.idArray.length > 0) {
        $(`#deleteCoins-button`).show();
        $(`.row-main`).css("top", "-10.8vh");
      }
    }
  });
  // end of function

  // function for the modal
  function modal(togData) {
    $(".row-modal").empty();
    let toglist = "";

    for (let i = 0; i < togData.coins.length; i++) {
      const tog = `<div class="card card-modal">
        <div class="card-body">
        <h6 class="card-title">${togData.coins[i]}</h6>
        <label class="switch switch-modal">
        <input type="checkbox" id="togModal_${togData.idArray[i]}" coin="${togData.coins[i]}" checked class="checkboxes modal-checkboxes">
        <span class="slider round"></span>
        </label>
        </div>
        </div>`;
      toglist += tog;
    }

    modalMessage(
      `You can only choose up to 5 coins`,
      `To add <b>${togData.name}</b> you must <u>unselect</u> one of the following:`,
      `Keep Current Selection`
    );

    $(`#content`).append(
      `<div class="row row-modal justify-content-around"></div>`
    );

    $(".row-modal").append(toglist);

    modalToggle(togData, () => $("#myModal").modal("hide"));
  }
  // end of function

  // function for the toggle in the modal
  function modalToggle(togData, callback) {

    $(".modal-checkboxes").click(function() {
     togData.name = $(this).attr("coin");
      setChosenCoins(togData);

      // unmark the coin chosen from modal in the main page
      const modalCardId = $(this)
        .prop("id")
        .split("_");

      const IndexToDelete = togData.idArray.findIndex(item => item === modalCardId[1]);
      togData.idArray.splice(IndexToDelete, 1);

      $(`#togCard_${modalCardId[1]}`).prop("checked", false);

      //mark new coin of choise in the main page
      $(`#togCard_${togData.id}`).prop("checked", true);
      togData.name = $(`#togCard_${togData.id}`).attr("coin");

      togData.idArray.push(togData.id);
      $("#selectedCoins").append(`${togData.name} `);

      // i dont want to close the modal immediately
      setTimeout(() => callback(), 500);
    });
  }
  // end of function

  // function appending the chosen coins collection in the DOM
  function setChosenCoins(obj) {
    $("#selectedCoins").empty();
    // remove chosen coin
    const IndexToDelete = obj.coins.findIndex(item => item === obj.name);
    obj.coins.splice(IndexToDelete, 1);
    // append again selected coins
    obj.coins.map(item => $("#selectedCoins").append(`${item} `));
  }
  // end of function
}
// end of toggle functionalties
