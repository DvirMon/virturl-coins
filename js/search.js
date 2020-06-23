// javascript file for specific coin search
"use strict";

// main global function for search 
function coinBySearch(responseData) {
  let coinsCollection = new Array();
  let coinsModal = new Array();

  // an array of coins symbols for the autocomplete method

  responseData.map(item => coinsCollection.push(item.symbol.toUpperCase()));

  // auto complete method from jquery for search menu
  $("#search-input").autocomplete({
    source: function(request, response) {
      let matches = $.map(coinsCollection, function(coin) {
        if (coin.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
          return coin;
        }
      });
      response(matches);
      coinsModal = matches;
    },
    autoFocus: true,
    // present messages to user
    response: function(event, ui) {
      // set message
      if (ui.content.length === 0) {
        $("#search-error").text("No results found");
      } else {
        $("#search-error").html(
          ` ${ui.content.length} results have been found`
        );

        // set menu height
        if (ui.content.length > 10) {
          $(`.ui-autocomplete`).css("height", "40vh");
        } else {
          $(`.ui-autocomplete`).css("height", "auto");
        }
      }
    }
  });
  // end of autocomplete method

  // clear error message
  $("#search-input").keyup(function() {
    let searchValue = $(this).val();
    if (searchValue.length === 0) {
      $("#search-error").empty();
    }
  });
  // end of function

  //  present card of selected coin when clicking the search button
  $("#btn-search").click(() => {
    spinner(true);
    $(`#home`).attr("active", false);
    const searchInput = $("#search-input")
    .val()
    .toLowerCase();
    if (searchInput.length === 0) {
      modalMessage(
        `No search value has been asked !`,
        `To find a coin please enter a value`,
        `Continue`
        );
        spinner(false);
        return;
      } else if (responseData.find(item => item.symbol === searchInput)) {
        $("#search-error").empty();
      const result = responseData.filter(item => item.symbol === searchInput);
      appendCard(result);
      return;
    } else {
      modalMessage(
        `The System could not find a matching coin for <b>${searchInput}</b>`,
        coinsModal.length <= 10 && coinsModal.length > 0
          ? `Did you int one of the following options? 
        <br> ${coinsModal}`
          : `Please enter a complete coin name`,
        `Continue`
      );
      spinner(false);
    }
  });
  // end of function
}
// end of search 
