
# Intro
This Repo contains source code for Wyre landing pages for partners. If the partner uses a web3 wallet, each page is designed to connect to the corresponding wallet to allow its users a rapid, easy way to buy crypto directly into their wallet. 

# Adding Your Partner page
Any Wyre partner can create a sendwyre landing page with a simple pull request. Please let the Wyre team know that you intend to create a landing page, and make a pull request following these steps:

Uploads: 
1) Add the background image for your landing page as a .png file in `/src/Assets/PartnerBackgrounds` following the naming convention: `partner-name-background.png`.
2) Add your logo as a `.png` or `.svg` file in `/src/Assets/PartnerLogos` following the naming convention: `partner-name-logo.[png/svg]`.
3) Add your favicon as a `.ico` file in `/src/Assets/PartnerFavicons` following the naming convention: `partner-name-favicon.ico`. We generally recommend creating this `.ico` file by uploading a transparent logo to the [favicon.io converter](https://favicon.io/favicon-converter/).

Config: 

4) Import your background, logo, and favicon into `/src/config.js` as instructed in the file comments.
5) Add your url as a config object with your preferred configurations, following the example available in the config file.

Connecting a wallet (web3 wallet partners only):

6) Update `/Components/Connectors.js` to include a [web3-react](https://noahzinsmeister.gitbook.io/web3-react/v/latest/connectors) connector for your project. If a connector does not exist for your project, see documentation on [writing a custom web3-react connector](https://noahzinsmeister.gitbook.io/web3-react/v/latest/custom-connectors) (and consider making a pull request on web3-react to add it to the official list!).

Deployment:

7) Finally, confirm with the Wyre team who will review your pull request. Once your pull request is merged, your landing page will be live at https://partners.sendwyre.com/#[your-landing-page].

# Using query parameters
Optionally, query parameters can be passed into any landing page, and the widget will autopopulate with the query parameters as long as:
- The query parameters do not attempt to override a default setting of the landing page
- The query parameters do not attempt to override a user web3 wallet connected to the landing page

The following query parameters are accepted:
- `sourceAmount`: Populates the "Buy Amount" field in the widget
- `destCurrency`: populates the cryptocurrency to buy field in the widget
- `dest`: populates the destination address of the currency to purchase
- `paymentMethod`: populates the payment method. You may use `apple-pay` or `google-pay`
- `redirectUrl`: the redirect Url to receive updates on the payment status

Note - query parameters must come *before* the anchor tag in the url

# Currently Live Pages

Currently live pages can be found at: `https://partners.sendwyre.com/#`
- metamask
- trustwallet
- portis
- fortmatic
- binance
- lolli
- compound-finance
- celsius