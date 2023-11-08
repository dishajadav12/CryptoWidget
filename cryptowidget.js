const widgetContainer = document.getElementById("coin-widget");

// Get the token name and currency type from the data attributes
const tokenName = widgetContainer.getAttribute("token-name");
const currencyType = widgetContainer.getAttribute("data-stats");

// Get additional attributes for conditional display
const showRank = widgetContainer.getAttribute("data-rank") === "true";
const showMarketCap = widgetContainer.getAttribute("data-marketcap") === "true";
const showVolume = widgetContainer.getAttribute("data-volume") === "true";

// CoinGecko API URL for the specified token
const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;

// Fetch data from CoinGecko API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Extract the relevant information from the response
    const name = data.name;
    const market_cap_rank = data.market_cap_rank;
    const market_cap = data.market_data.market_cap[currencyType.toLowerCase()];
    const current_price =
      data.market_data.current_price[currencyType.toLowerCase()];
    const total_volume =
      data.market_data.total_volume[currencyType.toLowerCase()];
    const market_cap_fdv_ratio = data.market_data.market_cap_fdv_ratio;
    const icon = data.image.small;

    // Create the HTML structure dynamically
    const widgetHTML = `
      <div class="coingecko-token-widget">
        <div class="section-1">
          <div class="sub-sec-11">
            <img src="${icon}" alt="${name}" />
          </div>
          <div class="sub-sec-12">
            <div class='coin-name'>${name}</div>
            <div>
              <b>${current_price}</b>
              <span class='currency-type'>${currencyType}</span>
              <span style="color: #3eac94; font-size: 15px">
                <b>(${market_cap_fdv_ratio}%)</b>
              </span>
            </div>
          </div>
        </div>
        <div class="section-2">
          ${
            showRank
              ? `<div class="sub-section-1">RANK <br /><span class='sub-sec-value'>${market_cap_rank}</span></div>`
              : ""
          }
          ${
            showMarketCap
              ? `<div class="sub-section">MARKET CAP <br /><span class='sub-sec-value'>$${market_cap.toLocaleString()}</span><span class='currency-type'>${currencyType}</span></div>`
              : ""
          }
          ${
            showVolume
              ? `<div class="sub-section-2">VOLUME <br /><span class='sub-sec-value'>$${total_volume.toLocaleString()}</span><span class='currency-type'>${currencyType}</span></div>`
              : ""
          }
        </div>
        <div class="section-3">
          Powered by CoinGecko
        </div>
      </div>
      <p style="color: rgb(150, 148, 148);"> Website Widget
      </p>
     
      <div class="scriptlink-container">
  <pre>&lt;script <span style="color: red;">type</span>=<span style="color: blue;">"text/javascript"</span> <span style="color: red;">src</span>=<span style="color: blue;">"cryptowidget.js" </span> async defer&gt;&lt;/script&gt;
&lt;div <span style="color: red;">id</span>=<span style="color: blue;">"coin-widget" </span> <span style="color: red;">token-name</span>=<span style="color: blue;">"${name.toLowerCase()}"</span> <span style="color: red;">data-stats</span>=<span style="color: blue;">"${currencyType}" </span> <span style="color: red;">data-rank</span>=<span style="color: blue;">"true"  </span>
<span style="color: red;">data-marketcap</span>=<span style="color: blue;">"true"</span> <span style="color: red;">data-volume</span>=<span style="color: blue;">"true"</span>&gt;&lt;/div&gt;
  </pre>
</div>

    `;

    // Set the widget container's innerHTML to the generated content
    widgetContainer.innerHTML = widgetHTML;
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error fetching data:", error);
  });
