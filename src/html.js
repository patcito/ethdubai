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
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@ETHDubaiConf" />
          <meta property="twitter:creator" content="@ETHDubaiConf" />
          <meta property="twitter:creator" content="@ETHDubaiConf" />
          <meta property="twitter:title" content="ETHDubai" />
          <meta
            property="twitter:description"
            content="The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!"
          />
          <meta
            property="twitter:image"
            content="https://www.ethdubaiconf.org/images/mosaic.png"
          />
          <meta
            property="og:title"
            content="ETHDubai - The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.ethdubaiconf.org" />
          <meta
            property="og:image"
            content="https://www.ethdubaiconf.org/images/mosaic.png"
          />
          <meta
            property="og:description"
            content="ETHDubai is the conference by passionate devs and for passionate devs and contributors to everything Ethereum, DeFi, NFTs, EVM, Gaming on the EVM and more!. Expect great speakers, talks, workshops and tons of great social events you will not forget. Dubai is one of the easiest place on Earth to get to without a visa wherever you are from, with beautiful prestine sand beaches, great weather, affordable accommodation and endless entertainment for all."
          />
          {this.props.headComponents}
          <link
            href="/img/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="images/logo_icon.png"
          />
          <span
            dangerouslySetInnerHTML={{
              __html: `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FCGJL10P2M"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FCGJL10P2M');
</script>`,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T6DRXBD');</script>
<!-- End Google Tag Manager -->`,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '436995354447065');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=436995354447065&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
`,
            }}
          />
        </head>
        <body>
          <span
            dangerouslySetInnerHTML={{
              __html: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T6DRXBD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
            }}
          />
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
