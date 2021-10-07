import React from 'react'

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:title"
            content="ETHDubai - The Dev Conference for everything DeFi, Web3, EVM and more"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.ethdubai.xyz" />
          <meta
            property="og:image"
            content="https://www.ethdubai.xyz/images/ethdubailogo.png"
          />
          <meta
            property="og:description"
            content="ETHDubai is the conference by passionate devs and for passionate devs and contributors to everything Ethereum, DeFi, NFTs, EVM, Gaming on the EVM and more!. Expect great speakers, talks, workshops and tons of great social events you will not forget. Dubai is one of the easiest place on Earth to get to without a visa wherever you are from, with beautiful prestine sand beaches, great weather, affordable accomodation and endless entertainment for all."
          />
          {this.props.headComponents}
          <link
            href="/img/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link href="/img/favicon.ico" rel="icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="images/logo_icon.png?x=4"
          />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
