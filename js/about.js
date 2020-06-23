// javascript file for the about section

"strict code";

$(() => {
  $(`#about`).click(function() {
    if ($(this).attr("active") === "true") {
      return;
    }
    // css properties
    updateStyle("#about");

    setTimeout(() => {
      $(`.row-main`).html(`
      <div id="about-text">
      <div id="aboutMe">
      <h3>About The Author:</h3>
    <ul>
    <li>Name: Dvir Monajem</li>
    <li>Contact: dmenajem@gmail.com</li>
    </ul>
    <br>
    <div id="profileImage" >  
    <img src="/img/profilejpg.jpg" alt="author_photo">
    </div>
    </div>
    <div id="aboutTheProject">
    <h3>About this project:</h3>
    This is my second project in this course. <br>
    Some of the features that can be found in here: <br>
    - A SPA design <br>
    - Expandable information per coin. <br>
    - Selecting coin of interest by using a toggle switch. <br>
    - Real time cryptoCurrency updates in graph format. <br>
    - Search capabilities. <br>
    - 3 APIs used for information retrieval: <br>
    - for the main coins information - <a href="https://api.coingecko.com/api/v3/coins/list" target="_blank">https://api.coingecko.com/api/v3/coins/list</a> <br>
    - for the search option - <a href="https://api.coingecko.com/api/v3/coins{id}" target="_blank">https://api.coingecko.com/api/v3/coins{id}</a> <br>
    - for the chart - <a href="https://www.cryptocompare.com/api/#-api-data-price" target="_blank">https://www.cryptocompare.com/api/#-api-data-price</a> <br>
    <br>
    This projected was created using: HTML, CSS3, JAVASCRIPT, JQUERY, AJAX, CANVAS JS & BOOTSTRAP.
    </div>
    </div> `);
      spinner(false);
    }, 0);
  });
});
