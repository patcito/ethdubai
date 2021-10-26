module.exports = {
  siteMetadata: {
    title:
      'ETHDubai - The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!',
    description:
      'ETHDubai - The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!',
    siteUrl: 'https://www.ethdubaiconf.org',
    author: 'ETHDubai',
    twitter: 'ETHDubai',
    'og:title':
      'ETHDubai - The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!',
    'og:type': 'website',
    'og:image': 'https://www.ethdubaiconf.org/images/ethdubai.png',
    'twitter:card': 'summary_large_image',
    'twitter:site': '@ETHDubaiConf',
    'twitter:creator': '@ETHDubaiConf',
    'twitter:creator': '@ETHDubaiConf',
    'twitter:title': 'ETHDubai',
    'twitter:description':
      'The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!',
    'twitter:image': 'https://www.ethdubaiconf.org/images/mosaic.png',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images/`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-remark-lazy-load`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-FCGJL10P2M',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'Eventlama',
        // This is the field under which it's accessible
        fieldName: 'eventlama',
        // URL to query from
        url: 'https://api.eventlama.com/gql',
        refetchInterval: 60,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'ETHDubai',
        short_name: 'ETHDubai',
        description:
          'The Dev Conference for everything DeFi, Web3, NFTs, Smart Contracts, scaling , EVM and more!',
        homepage_url: 'https://www.ethdubaiconf.org',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        icons: [
          {
            src: '/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        whitelist: [
          '.headroom',
          '.headroom--unfixed header',
          '.headroom--unfixed header.desktop_header',
          '.headroom--unfixed header.desktop_header',
          'header.fixed-header',
          'header.fixed-header a.nav-link',
          'header.fixed-header li.nav-item.active a.nav-link',
          'alert-info',
          'alert-warning',
          'allert-success',
          'alert-danger',
          '.alert-info',
          '.alert-warning',
          '.allert-success',
          '.alert-danger',
        ], // Don't remove this selector
        ignore: ['style.scss'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
  ],
}
