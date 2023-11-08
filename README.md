# CryptoWidget
 Created a JavaScript widget script for CoinGecko tokens that dynamically fetches and displays token details, including name, market cap, price, and volume, when embedded in a web page using a script tag.

# Add the following code into HTML file to use the script:
     <!-- Custom widget element with attributes for conditional display -->
    <div id="coin-widget" token-name="bitcoin" data-stats="usd" data-rank="true" data-marketcap="true" data-volume="true" >
    </div>
    <!-- Include your JavaScript file -->
    <script src="cryptowidget.js" async defer></script>
