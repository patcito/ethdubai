import React, { useEffect, useState } from 'react'

import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import LZString from 'lz-string'
import { ethers } from 'ethers'
import {
  Container,
  Modal,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Collapse,
  Badge,
} from 'react-bootstrap'
import abi from './abis/ETHDubaiTickets.json'
import mainnetAbi from './abis/ETHDubaiTicketsMainnet.json'
import abiNonEth from './abis/ETHDubaiTicketsERC20.json'
import abiArbi from './abis/ETHDubaiTicketsArbi.json'
import abiMetis from './abis/ETHDubaiTicketsMetis.json'
import erc20abi from './abis/erc20.json'
import EthCrypto from 'eth-crypto'
import { Buffer } from 'buffer'
import html2pdf from 'html2pdf.js'
import QRCode from 'qrcode-svg'
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
export default function NFTTicketsSection() {
  //const [message, setMessage] = React.useState({ message: '', status: 'error' })
  const [hackathon, setHackathon] = useState(false)
  const [openDesc1, setOpenDesc1] = useState(false)
  const [openDesc1pp, setOpenDesc1pp] = useState(false)
  const [openDesc2, setOpenDesc2] = useState(false)
  const [ethersProvider, setEthersProvider] = useState()
  const [currentAddress, setCurrentAddress] = useState()
  const [oneDayTicket, setOneDayTicket] = useState(0)
  const [threeDayTicket, setThreeDayTicket] = useState(0)
  const [includeHotel, setIncludeHotel] = useState(false)
  const [includeHotel2, setIncludeHotel2] = useState(false)
  const [successPurchase, setSuccessPurchase] = useState(false)
  const [ownerIds, setOwnerIds] = useState([])
  const [showCheckout, setShowCheckout] = React.useState(false)
  const [attendeeInfos, setAttendeeInfos] = React.useState([])
  const [pdfTickets, setPdfTickets] = React.useState([])
  const [svgTickets, setSvgTickets] = React.useState([])
  const [validated, setValidated] = React.useState(false)
  const [buyTx, setBuyTx] = React.useState({})
  const [chainId, setChainId] = React.useState(1)
  const [disableCheckout, setDisableCheckout] = React.useState(false)
  const [checkoutButtonText, setCheckoutButtonText] = React.useState('Checkout')
  const [onGoingTx, setOngoingTx] = React.useState()
  const [onGoingTxText, setOngoingTxText] = React.useState({ txText: '' })
  const [currentNetwork, setCurrentNetwork] = React.useState(0)
  const [warning, setWarning] = React.useState('')
  const [tokenBalance, setTokenBalance] = React.useState(0)
  const [walletNetwork, setWalletNetwork] = React.useState({})
  const [showSharedTicket, setShowSharedTicket] = React.useState(false)
  const [currentAttendeeInfoIndex, setCurrentAttendeeInfoIndex] =
    React.useState(0)
  const [sharedSVG, setSharedSVG] = useState('')
  const getSVG = async (tokenid, network, contract) => {
    let url =
      `https://svg.ethdubaiconf.org/token?tokenid=${tokenid}` +
      `&network=${network}&contract=${contract}`
    //url =
    //  `http://localhost:8082/token?tokenid=${tokenid}` +
    //  `&network=${network}&contract=${contract}`

    const response = await fetch(url)
    const data = await response.text()
    console.log('lllll', data)
    const json = Buffer.from(data.substring(29), 'base64').toString()
    console.log(json)
    const obj = JSON.parse(json)
    console.log(obj)
    const svg = Buffer.from(obj.image.substring(26), 'base64').toString()
    console.log('svg', svg)
    return obj
  }
  useEffect(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    console.log('params', params)
    if (params.tokenid) {
      let paramsArray = params.tokenid.split(',')
      const obj = await getSVG(paramsArray[0], paramsArray[1], paramsArray[2])
      setSharedSVG(obj.image.substring(26))
      setShowSharedTicket(true)
      //var xhr = new XMLHttpRequest()
      //xhr.open('get', url, true) //Post the Data URI to php Script to save to server
      //xhr.send()
    }
  }, [])
  const SharedSvg = () => {
    return sharedSVG
  }
  const OnGoingTxTextMessage = () => {
    switch (onGoingTxText.txText) {
      case 'connect':
        return (
          <h2 style={{ padding: '25px' }}>
            Please connect your wallet and accept the transaction.
          </h2>
        )
      case 'approve':
        return (
          <h2 style={{ padding: '25px' }}>
            <a
              href={`${networks[currentNetwork].networkInfo.blockExplorerUrls[0]}tx/${onGoingTxText.tx.hash}`}
              target="_blank"
            >
              Approve transaction in progress, please wait... 🔗
            </a>
          </h2>
        )

      case 'mint':
        return (
          <h2 style={{ padding: '25px' }}>
            <a
              href={`${networks[currentNetwork].networkInfo.blockExplorerUrls[0]}tx/${onGoingTxText.tx.hash}`}
              target="_blank"
            >
              {isCurrentNetworkMainnetContract() ? (
                <span>Buying transaction in progress, please wait... 🔗</span>
              ) : (
                <span>Minting transaction in progress, please wait... 🔗</span>
              )}
            </a>
          </h2>
        )
      case 'acceptMinting':
        return (
          <Button onClick={buy} style={{ margin: '25px' }}>
            <h2>You can now mint your ticket by clicking here</h2>
          </Button>
        )

      default:
        return <h2 style={{ padding: '25px' }}>{onGoingTxText.txText}</h2>
    }
  }
  const networksTest = [
    {
      contract: '0x8e8ed4DB7486C70b5334c275A9dc8828a13619c3',
      token: '',
      abi: mainnetAbi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      web3Name: 'mainnet',
      networkShare: 'mainnet',
      tokenSymbol: 'ETH',
      hasNoNft: true,
      marketplace: 'https://opensea.io/assets/',
      marketplaceName: 'opensea',
      web3Network: 'mainnet',
      networkInfo: {
        chainId: '0x1',
        chainName: 'Ethereum',

        blockExplorerUrls: ['https://etherscan.io/'],
      },
    },
    {
      contract: '0x8339E55273a11c80f75c22Ce0ed647984319B6B0',
      token: '0x420000000000000000000000000000000000000A',
      abi: abiMetis.abi,
      exchangeUrl: 'https://netswap.io/#/home',
      exchangeName: 'NetSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Metis Andromeda',
      networkShare: 'metis-andromeda',
      networkInfo: {
        chainId: '0x440',
        chainName: 'Metis Andromeda',
        rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
        nativeCurrency: {
          name: 'METIS',
          symbol: 'METIS',
          decimals: 18,
        },
        blockExplorerUrls: ['https://andromeda-explorer.metis.io/'],
      },
    },
    {
      contract: '0xfb0b3E0f27a2a858cc6656627E662B0D3cd5b19b',
      token: '',
      abi: abi.abi,
      hasNoNft: false,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Optimism',
      networkShare: 'optimism',
      networkInfo: {
        chainId: '0xA',
        chainName: 'Optimism',
        rpcUrls: ['https://mainnet.optimism.io'],
        nativeCurrency: {
          name: 'ETHER',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://optimistic.etherscan.io/'],
      },
    },
    {
      contract: '0x7a5B24D02C60cc1A25Ff632a43299E139c98a909',
      token: '',
      abi: abiArbi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Arbitrum',
      networkShare: 'arbitrum',
      networkInfo: {
        chainId: '0xA4B1',
        chainName: 'Arbitrum',
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        nativeCurrency: {
          name: 'ETHER',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://arbiscan.io/'],
      },
    },

    {
      contract: '0x9ed6fe2964f0468f180382470025cb3dbe946d1a',
      token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      abi: abiNonEth.abi,
      web3Network: 'matic',
      networkShare: 'polygon',
      marketplaceName: 'opensea',
      marketplace: 'https://opensea.io/assets/matic/',
      exchangeUrl: 'https://quickswap.exchange/',
      exchangeName: 'QuickSwap',
      tokenSymbol: 'WETH',
      hasNoNft: false,
      networkInfo: {
        chainId: ethers.BigNumber.from('137').toHexString(),
        chainName: 'Polygon',
        rpcUrls: ['https://polygon-rpc.com'],
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
    },
    {
      contract: '0x9ab1130cdfcE397aB6283e681fDaa2B1D49e7CBD',
      token: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
      abi: abiMetis.abi,
      marketplaceName: '',
      marketplace: '',
      networkShare: 'xdai',
      exchangeUrl: 'https://app.sushi.com',
      exchangeName: 'SushiSwap',
      web3Name: 'xDai',
      tokenSymbol: 'WETH',
      networkInfo: {
        chainId: '0x64',
        chainName: 'Gnosis Chain',
        rpcUrls: ['https://rpc.xdaichain.com'],
        nativeCurrency: {
          name: 'xDai',
          symbol: 'XDAI',
          decimals: 18,
        },
        blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
      },
    },
    {
      contract: '0x59B53E086f3c8f002B67A1f945C9e895f013a30f',
      token: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      abi: abiMetis.abi,
      marketplaceName: 'artion',
      marketplace: 'https://artion.io/explore',
      networkShare: 'ftm',
      exchangeUrl:
        'https://swap.spiritswap.finance/#/exchange/swap/0x74b23882a30290451A17c44f4F05243b6b58C76d',
      exchangeName: 'SpiritSwap',
      web3Name: 'Fantom',
      tokenSymbol: 'WETH',
      networkInfo: {
        chainId: ethers.BigNumber.from('250').toHexString(),
        chainName: 'Fantom',
        rpcUrls: ['https://rpc.ftm.tools'],
        nativeCurrency: {
          name: 'Fantom',
          symbol: 'FTM',
          decimals: 18,
        },
        blockExplorerUrls: ['https://ftmscan.com/'],
      },
    },
    {
      ///      contract: '0xB5d182B69194aF495685E71cA739EEE41E218F60',
      contract: '0xa32DBcB19C870e40C9FC7d14E25171313d21C3E0',
      abi: abi.abi,
      token: '',
      exchangeUrl: 'https://app.uniswap.org',
      hasNoNft: false,
      exchangeName: 'UniSwap',
      networkShare: 'ropsten',
      web3Name: 'Ropsten',
      tokenSymbol: 'ETH',
      networkInfo: {
        chainId: '0x3',
        chainName: 'Ethereum Ropsten',

        blockExplorerUrls: ['https://ropsten.etherscan.io/'],
      },
    },
    {
      // /     contract: '0xE345546Cc2616DBC51b51933FC32D5708d90BF75',
      contract: '0x9ab1130cdfcE397aB6283e681fDaa2B1D49e7CBD',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      web3Name: 'Rinkeby',

      hasNoNft: true,
      networkShare: 'rinkeby',
      marketplaceName: 'opensea',
      marketplace: 'https://testnets.opensea.io/assets/',
      token: '',
      tokenSymbol: 'ETH',
      networkInfo: {
        chainId: '0x4',
        chainName: 'Ethereum Rinkeby',

        networkInfo: {
          chainId: '0x4',
          chainName: 'Ethereum Rinkeby',
        },
        blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
      },
    },
    {
      contract: '0x5294c67B1B189ceDcCC4d5eE5155AC49e8a3151B',
      abi: abiNonEth.abi,
      marketplaceName: 'opensea',
      marketplace: 'https://testnets.opensea.io/assets/matic',
      token: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
      exchangeUrl: 'https://quickswap.exchange/',
      exchangeName: 'QuickSwap',
      web3Name: 'Polygon Mumbai',
      networkShare: 'polygon-mumbai',
      tokenSymbol: 'WETH',
      networkInfo: {
        chainId: '0x13881',
        chainName: 'Polygon Mumbai',
        rpcUrls: ['https://rpc-endpoints.superfluid.dev/mumbai'],
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      },
    },
    {
      contract: '0x5eF5758B47b7fdb01e5a35197d046131db9281F0',
      abi: abiMetis.abi,
      token: '0x5B98ffed5FC15BeE1D3A4e6190c3504620d75c5F',
      exchangeUrl:
        'https://swap.spiritswap.finance/#/exchange/swap/0x74b23882a30290451A17c44f4F05243b6b58C76d',
      exchangeName: 'SpiritSwap',
      marketplaceName: 'artion',
      marketplace: 'https://artion.io/explore',

      tokenSymbol: 'WETH',
      web3Name: 'Fantom Testnet',
      networkShare: 'ftm-test',
      networkInfo: {
        chainId: '0xFA2',
        chainName: 'Fantom Testnet',
        rpcUrls: ['https://rpc.testnet.fantom.network'],
        nativeCurrency: {
          name: 'Fantom',
          symbol: 'FTM',
          decimals: 18,
        },
        blockExplorerUrls: ['https://testnet.ftmscan.com/'],
      },
    },
    {
      contract: '0x2C445DAaa70fc39B14cF7a37d9501aD65DbD24a8',
      token: '0x6244D7f9245ad590490338db2fbEd815c2358034',
      abi: abiMetis.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Metis Stardust',
      networkShare: 'metis-stardust',
      networkInfo: {
        chainId: '0x24C',
        chainName: 'Metis Stardust',
        rpcUrls: ['https://stardust.metis.io/?owner=588'],
        nativeCurrency: {
          name: 'METIS',
          symbol: 'METIS',
          decimals: 18,
        },
        blockExplorerUrls: ['https://stardust-explorer.metis.io/'],
      },
    },
    {
      contract: '0x9ab1130cdfcE397aB6283e681fDaa2B1D49e7CBD',
      token: '',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Optimism Kovan',
      networkShare: 'optimism-kovan',
      networkInfo: {
        chainId: '0x45',
        chainName: 'Optimism Kovan',
        rpcUrls: ['https://kovan.optimism.io/'],
        nativeCurrency: {
          name: 'ETHER',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://kovan-optimistic.etherscan.io/'],
      },
    },
    {
      //      contract: '0xfd4222BAE1eDe996387C47EE384d57D246Ae3F1B',
      contract: '0x7a5B24D02C60cc1A25Ff632a43299E139c98a909',
      token: '',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Arbitrum Rinkeby',
      networkShare: 'arbitrum-rinkeby',
      networkInfo: {
        chainId: '0x66EEB',
        chainName: 'Arbitrum Testnet Rinkeby',
        rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
        nativeCurrency: {
          name: 'ETHER',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://testnet.arbiscan.io/'],
      },
    },
    {
      //contract: '0x976C214741b4657bd99DFD38a5c0E3ac5C99D903',
      //contract: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55',
      contract: '0x821f3361D454cc98b7555221A06Be563a7E2E0A6',
      //token: '0x01E21d7B8c39dc4C764c19b308Bd8b14B1ba139E',
      abi: mainnetAbi.abi,
      token: '', //'0x7A9Ec1d04904907De0ED7b6839CcdD59c3716AC9',
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Hardhat',
      networkShare: 'hardhat',
      hasNoNft: true,

      networkInfo: {
        chainId: '0x7A69',
        chainName: 'hardhat',
        rpcUrls: ['http://localhost:8545'],
        nativeCurrency: {
          name: 'ETHER',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorerUrls: ['https://testnet.arbiscan.io/'],
      },
    },
  ]
  const networks = networksTest.slice(0, 7)
  //console.log(abi)
  const PUB_KEY =
    '01e32ab579d8a368f879b67a8487bd65093dc6c750a2418c169a146579486f68e08965eab5b00d7dc7349a1374bd9866c895f8997ffdb1d667d143bc555b7854'
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: '753e543666274e8f9ab27ff3a082c75c', // required
      },
    },
  }
  const initWeb3Modal = async () => {
    setShowCheckout(false)

    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false,
    })
    try {
      const provider = await web3Modal.connect()
      provider.on('accountsChanged', async (accounts) => {
        await initWeb3Modal()
        setTokenBalance(null)
      })

      // Subscribe to chainId change
      provider.on('chainChanged', async (chainId) => {
        await initWeb3Modal()
        setTokenBalance(null)
      })
      const newProvider = new ethers.providers.Web3Provider(provider)
      console.log('ethersprovider', newProvider)
      setEthersProvider(newProvider)
      setShowCheckout(true)
      const network = await getWalletNetwork(newProvider)
      setCurrentNetworkBasedOnWallet(network)
      const signer = newProvider.getSigner()
      const addr = await signer.getAddress()
      console.log('signer', addr)

      setCurrentAddress(addr || '')
      return newProvider
    } catch (error) {
      console.log(error)
      setShowCheckout(true)
      return {}
    }
    return {}
  }
  const setCurrentNetworkBasedOnWallet = (network) => {
    networks.map((n, i) => {
      let x = parseInt(n.networkInfo.chainId, 16)
      if (x === network.chainId) {
        setCurrentNetwork(i)
      }
    })
  }
  const handleNetwork = async (e) => {
    let value = e.target.value
    //    const newProvider = new ethers.providers.Web3Provider(ethersProvider)
    //    const provider = await web3Modal.connect()

    console.log(value)
    if (window.ethereum) {
      if (
        networks[value].networkInfo.chainName === 'Ethereum Ropsten' ||
        networks[value].networkInfo.chainName === 'hardhat' ||
        networks[value].networkInfo.chainName === 'Ethereum Rinkeby' ||
        networks[value].networkInfo.chainName === 'Optimism Kovan' ||
        networks[value].networkInfo.chainName === 'Ethereum'
      ) {
        await window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [
              { chainId: networks[value].networkInfo.chainId },
              '0x05A2C738cff019c405D7c5e8a4488e34D82be161',
            ],
          })
          .then(async (result) => {
            console.log(value)
            setCurrentNetwork(value)
            const web3Modal = new Web3Modal({
              providerOptions, // required
            })
            const provider = await web3Modal.connect()
            const newProvider = new ethers.providers.Web3Provider(provider)
            setEthersProvider(newProvider)

            await getEthBalance(newProvider)
          })
      } else {
        await window.ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [
              networks[value].networkInfo,
              '0x05A2C738cff019c405D7c5e8a4488e34D82be161',
            ],
          })
          .then(async (result) => {
            console.log(value)
            const web3Modal = new Web3Modal({
              providerOptions, // required
            })
            const provider = await web3Modal.connect()
            const newProvider = new ethers.providers.Web3Provider(provider)
            setEthersProvider(newProvider)

            setCurrentNetwork(value)
            await getTokenBalance(value)
          })
      }
    } else {
      if (
        networks[value].networkInfo.chainName === 'Ethereum Ropsten' ||
        networks[value].networkInfo.chainName === 'hardhat' ||
        networks[value].networkInfo.chainName === 'Ethereum Rinkeby' ||
        networks[value].networkInfo.chainName === 'Ethereum'
      ) {
        const web3Modal = new Web3Modal({
          providerOptions, // required
        })
        const provider = await web3Modal.connect()
        const newProvider = new ethers.providers.Web3Provider(provider)
        setEthersProvider(newProvider)

        setCurrentNetwork(value)
        await getEthBalance(provider)
      } else {
        const web3Modal = new Web3Modal({
          providerOptions, // required
        })
        const provider = await web3Modal.connect()
        const newProvider = new ethers.providers.Web3Provider(provider)
        setEthersProvider(newProvider)

        setCurrentNetwork(value)
        await getTokenBalance(value)
      }
    }
  }
  const getWalletNetwork = async (newProvider) => {
    let p = ethersProvider || newProvider
    if (p) {
      const network = await p.getNetwork()
      console.log('wawawaw', network)
      setWalletNetwork(network)
      return network
    }
    return {}
  }
  const getEthBalance = async (newProvider) => {
    //    const newProvider = new ethers.providers.Web3Provider(provider)

    const signer = newProvider.getSigner()
    const account = signer.getAddress()
    try {
      let balance = await newProvider.getBalance(account)
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance)
      setTokenBalance(parseFloat(balanceInEth).toFixed(3))
      console.log(`balance: ${balanceInEth} ETH`)
      return balance
    } catch (error) {
      return 0
    }
  }
  const showHtmlWarning = () => {
    return (
      <p>
        You do not have enough {networks[currentNetwork].tokenSymbol}. You need
        to get some on an exchange such as{' '}
        <a href={networks[currentNetwork].exchangeUrl} target="_blank">
          {networks[currentNetwork].exchangeName}
        </a>
      </p>
    )
  }
  const getTokenBalance = async (networkIndex) => {
    //const provider = await web3Modal.connect()
    //const newProvider = new ethers.providers.Web3Provider(provider)
    const web3Modal = new Web3Modal({
      providerOptions, // required
    })
    const provider = await web3Modal.connect()
    const newProvider = new ethers.providers.Web3Provider(provider)
    setEthersProvider(newProvider)

    const signer = newProvider.getSigner()
    const account = signer.getAddress()

    if (networks[networkIndex].token !== '') {
      let tokenContract = new ethers.Contract(
        networks[networkIndex].token,
        erc20abi,
        signer
      )
      console.log('tokencontract', tokenContract)
      try {
        let balance = await tokenContract.balanceOf(account)
        const newTokenBalance = ethers.utils.formatEther(balance)

        setTokenBalance('' + parseFloat(newTokenBalance).toFixed(3))
        console.log('failbalanceok')
        return balance
      } catch (error) {
        console.log('failbalance', error)
        return ethers.utils.formatEther(0)
      }
    }
  }

  const getCurrentNetworkBalance = async () => {
    if (networks[currentNetwork].token !== '') {
      return await getTokenBalance(currentNetwork)
    }
    return await getEthBalance(ethersProvider)
  }
  const handleIncludeHotel = () => {
    let attendeeInfosTmp = [...attendeeInfos]

    attendeeInfosTmp = attendeeInfosTmp.map((a) => {
      a.includeHotelExtra = true
      return a
    })
    setAttendeeInfos((attendeeInfos) => [...attendeeInfosTmp])
  }
  const handleIncludeHotel2 = () => {
    let attendeeInfosTmp = [...attendeeInfos]

    attendeeInfosTmp = attendeeInfosTmp.map((a) => {
      a.includeHotel2Extra = true
      return a
    })
    setAttendeeInfos((attendeeInfos) => [...attendeeInfosTmp])
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const generateTicketPdfs = async (tx, pdfTix) => {
    if (!tx) tx = buyTx
    if (!pdfTix) pdfTix = pdfTickets
    let element = document.getElementById('pdf-tickets')
    let elements = document.getElementsByClassName('ticket-qr')
    let fileName = `ethdubai-ticket-${tx.to}-${tx.txHash}.pdf`
    let opt = {
      margin: 1,
      filename: fileName,
      pagebreak: { mode: 'legacy' },
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    html2pdf().from(element).set(opt).save()
    let tickets = [...elements]
    tickets.map((tix, i) => {
      let fileName = `ethdubai-ticket-${tx.to}-${tx.txHash}-${pdfTix[i].attendeeInfo.email}-${i}.pdf`
      let opt = {
        margin: 1,
        filename: fileName,
        pagebreak: { mode: 'legacy' },
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }
      html2pdf()
        .from(tix)
        .set(opt)
        .toPdf()
        .output('datauristring')
        .then(function (pdfAsString) {
          // The PDF has been converted to a Data URI string and passed to this function.
          // Use pdfAsString however you like (send as email, etc)!
          var arr = pdfAsString.split(',')
          pdfAsString = arr[1]
          console.log('buyTX', buyTx)
          var data = new FormData()
          data.append('fileName', fileName)
          data.append('data', pdfAsString)
          data.append('email', pdfTix[i].attendeeInfo.email)
          data.append('fname', pdfTix[i].attendeeInfo.fname)
          data.append('lname', pdfTix[i].attendeeInfo.lname)
          data.append(
            'ticketOption',
            getTicketOptionString(pdfTix[i].ticketOption)
          )
          var xhr = new XMLHttpRequest()
          xhr.open('post', 'https://email.ethdubaiconf.org/upload', true) //Post the Data URI to php Script to save to server
          xhr.send(data)
        })
    })
  }
  const getOwnerTickets = async () => {
    const provider = await web3Modal.connect()
    const newProvider = new ethers.providers.Web3Provider(provider)
    const signer = newProvider.getSigner()
    let contract = new ethers.Contract(
      networks[currentNetwork].contract,
      networks[currentNetwork].abi,
      signer
    )

    const account = await signer.getAddress()
    const token = contract
    console.log('token', token)
    const name = await token.name()
    console.error(name, 'tokens owned by', account)
    const sentLogs = await token.queryFilter(
      token.filters.Transfer(account, null)
    )
    const receivedLogs = await token.queryFilter(
      token.filters.Transfer(null, account)
    )

    const logs = sentLogs
      .concat(receivedLogs)
      .sort(
        (a, b) =>
          a.blockNumber - b.blockNumber ||
          a.transactionIndex - b.TransactionIndex
      )

    const owned = new Set()

    for (const log of logs) {
      const { from, to, tokenId } = log.args

      if (to === account) {
        owned.add(tokenId.toString())
      } else if (from === account) {
        owned.delete(tokenId.toString())
      }
    }
    setOwnerIds(owned)
    setSuccessPurchase(true)
    console.log([...owned].join('\n'))
    return owned
  }

  const currentAttendeeInfoAtt = (att) => {
    return attendeeInfos[currentAttendeeInfoIndex][att]
  }
  const currentAttendeeInfoIsNotLast = () => {
    return currentAttendeeInfoIndex < attendeeInfos.length - 1
  }

  const handleAttendeeInfoCheck = (e) => {
    let attendeeInfosTmp = [...attendeeInfos]

    console.log(attendeeInfosTmp[currentAttendeeInfoIndex][e.target.name])
    attendeeInfosTmp[currentAttendeeInfoIndex][e.target.name] =
      !attendeeInfosTmp[currentAttendeeInfoIndex][e.target.name]
    setAttendeeInfos((attendeeInfos) => [...attendeeInfosTmp])
  }

  const handleAttendeeInfo = (e) => {
    console.log(e, e.target.value, e.target.name)
    let attendeeInfosTmp = [...attendeeInfos]
    console.log(currentAttendeeInfoAtt(e.target.name))
    console.log(attendeeInfosTmp)
    attendeeInfosTmp[currentAttendeeInfoIndex][e.target.name] = e.target.value
    console.log(attendeeInfosTmp)
    console.log('index', currentAttendeeInfoIndex)
    setAttendeeInfos((attendeeInfos) => [...attendeeInfosTmp])
  }
  const handleBackBuyButton = (e) => {
    if (currentAttendeeInfoIndex !== 0)
      setCurrentAttendeeInfoIndex(currentAttendeeInfoIndex - 1)
    console.log(currentAttendeeInfoIndex)
    e.preventDefault()
  }
  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
  const checkWorkshop = () => {
    if (attendeeInfos[currentAttendeeInfoIndex].includeWorkshopsAndPreParty) {
      if (
        attendeeInfos[currentAttendeeInfoIndex].workshop ===
          'Select a workshop' ||
        attendeeInfos[currentAttendeeInfoIndex].workshop === undefined ||
        typeof attendeeInfos[currentAttendeeInfoIndex].workshop === 'undefined'
      ) {
        showWarning({ message: 'Please select a workshop' })

        return true
      }
    }
    return false
  }
  const handleBuyButton = async (e) => {
    e.preventDefault()
    console.log('all', attendeeInfos)
    const form = document.getElementById('attendeeForm')
    setValidated(true)

    if (form.checkValidity() === false || checkWorkshop()) {
      return
    } else {
      setValidated(false)
    }

    if (currentAttendeeInfoIsNotLast()) {
      setCurrentAttendeeInfoIndex(currentAttendeeInfoIndex + 1)
    } else {
      if (ethersProvider) {
        buy(e)
      } else {
        await initWeb3Modal()
      }
    }
    console.log(currentAttendeeInfoIndex)
    e.preventDefault()
  }
  const encryptStr = async (str) => {
    const encryptedString = await EthCrypto.encryptWithPublicKey(PUB_KEY, str)
    return LZString.compressToUTF16(EthCrypto.cipher.stringify(encryptedString))
  }
  const prepareTickets = async () => {
    let finalPdfTickets = attendeeInfos.map((tix) => {
      let ticketOption = getTicketOption(
        tix.includeWorkshopsAndPreParty,
        tix.includeHotelExtra,
        tix.workshop,
        tix.includeHotel2Extra,
        tix.hackathon,
        tix.hackathonAndPreParty
      )
      let addToCode = JSON.stringify(tix) + ticketOption

      let pdfTix = {
        attendeeInfo: {
          email: tix.email,
          fname: tix.fname,
          lname: tix.lname,
          twitter: tix.twitter,
          bio: tix.bio,
          job: tix.job,
          company: tix.company,
          workshop: tix.workshop,
          tshirt: tix.tshirt,
          telegram: tix.telegram,
        },
        ticketCode: tix.ticketCode,
        resellable: {
          isResellable: false,
          price: ethers.utils.parseEther(
            '' +
              getTicketPrice(
                !tix.includeWorkshopsAndPreParty,
                tix.includeWorkshopsAndPreParty,
                tix.includeHotelExtra,
                tix.includeHotel2Extra,
                tix.hackathon,
                tix.hackathonAndPreParty
              )
          ),
        },
        ticketOption: getTicketOptionOnChainFormat(ticketOption),
        specialStatus: '',
      }
      return pdfTix
    })
    console.log('FINAL TIX', finalPdfTickets)
    let finalTickets = await Promise.all(
      attendeeInfos.map(async (a) => {
        let ticketOption = getTicketOption(
          a.includeWorkshopsAndPreParty,
          a.includeHotelExtra,
          a.workshop,
          a.includeHotel2Extra,
          a.hackathon,
          a.hackathonAndPreParty
        )

        let addToCode = JSON.stringify(a) + ticketOption
        if (!isCurrentNetworkMainnetContract()) {
          addToCode = ''
        }
        if (a.telegram) {
          a.telegram = a.telegram.replace('@', '')
        }
        let email = await encryptStr(a.email || '_')
        let fname = await encryptStr(a.fname || '_')
        let lname = await encryptStr(a.lname || '_')
        let twitter = await encryptStr(a.twitter || '_')
        let bio = await encryptStr(a.bio || '_')
        let job = await encryptStr(a.job || '0')
        let company = await encryptStr(a.company || '')
        let workshop = a.workshop || '_'
        let tshirt = a.tshirt || '_'
        let telegram = a.telegram || 'anon'
        console.log('OPTIONSS', ticketOption)
        let finalTicket = {
          attendeeInfo: {
            email: email,
            fname: fname,
            lname: lname,
            twitter: twitter,
            bio: bio,
            job: job,
            company: company,
            workshop: workshop,
            tshirt: tshirt,
            telegram: telegram,
          },
          ticketCode: await encryptStr(a.ticketCode + addToCode),
          resellable: {
            isResellable: false,
            price: ethers.utils.parseEther(
              '' +
                getTicketPrice(
                  !a.includeWorkshopsAndPreParty,
                  a.includeWorkshopsAndPreParty,
                  a.includeHotelExtra,
                  a.includeHotel2Extra
                )
            ),
          },
          ticketOption: getTicketOptionOnChainFormat(ticketOption),
          specialStatus: '',
        }
        return finalTicket
      })
    )
    return [finalTickets, finalPdfTickets]
  }
  const getTicketOption = (
    workshopsAndPreParty,
    hotelExtra,
    workshop,
    hotel2Extra,
    ihackathon,
    hackathonAndPreParty
  ) => {
    if (!workshop) {
      workshop = ''
    }
    if (!workshopsAndPreParty && !hotelExtra && !hotel2Extra) {
      if (ihackathon) {
        return 'hackathonAndConferenceOnly'
      }
      return 'conference'
    } else if (!workshopsAndPreParty && hotelExtra && !hotel2Extra) {
      if (ihackathon) {
        return 'hotelhackathonAndConferenceOnly'
      }
      return 'hotelConference'
    } else if (!workshopsAndPreParty && hotel2Extra && !hotelExtra) {
      if (ihackathon) {
        return 'hotel2hackathonAndConferenceOnly'
      }
      return 'hotel2Conference'
    } else if (workshopsAndPreParty && !hotelExtra && !hotel2Extra) {
      console.log('wwwwwwwwwww', `workshop${workshop}AndPreParty`)
      if (workshop == 5) {
        return `hackathonAndPreParty`
      }
      if (workshop == 22) {
        return `workshop5AndPreParty`
      }
      if (workshop == 25) {
        return `workshop6AndPreParty`
      }
      return `workshop${workshop}AndPreParty`
    } else if (workshopsAndPreParty && hotelExtra && !hotel2Extra) {
      if (workshop == 5) {
        return `hotelhackathonAndPreParty`
      }
      return `hotelWorkshops${workshop}AndPreParty`
    } else if (workshopsAndPreParty && hotel2Extra && !hotelExtra) {
      if (workshop == 5) {
        return `hotel2hackathonAndPreParty`
      }
      return `hotel2Workshops${workshop}AndPreParty`
    } else if (hackathonAndPreParty && hotelExtra && !hotel2Extra) {
      return `hotelhackathonAndPreParty`
    } else if (hackathonAndPreParty && hotel2Extra && !hotelExtra) {
      return `hotel2hackathonAndPreParty`
    } else if ('hackathonAndPreParty') {
      return 'hackathonAndPreParty'
    }

    return 'conference'
  }

  const isCurrentNetworkMainnetContract = () => {
    if (networks[currentNetwork].hasNoNft) {
      return true
    }
    return false
  }

  const getHotelInfo = (attendee) => {
    if (attendee.includeWorkshopsAndPreParty) {
      return { in: '28' }
    }
    return { in: '30' }
  }
  const getTicketOptionString = (ticketOption) => {
    if (!isCurrentNetworkMainnetContract()) {
      return ticketOption
    }
    switch (ticketOption) {
      case 0:
        return 'conference'
        break

      case 1:
        return 'hotelConference'
        break

      case 2:
        return 'workshop1AndPreParty'
        break

      case 3:
        return 'workshop2AndPreParty'
        break

      case 4:
        return 'workshop3AndPreParty'
        break

      case 5:
        return 'hotelWorkshopsAndPreParty'
        break

      case 6:
        return 'hotelWorkshops1AndPreParty'
        break

      case 7:
        return 'hotelWorkshops2AndPreParty'
        break

      case 8:
        return 'hotelWorkshops3AndPreParty'
        break
      case 9:
        return 'hotel2Workshops1AndPreParty'
        break
      case 10:
        return 'hotel2Workshops2AndPreParty'
        break
      case 11:
        return 'hotel2Workshops3AndPreParty'
        break
      case 12:
        return 'hotel2Conference'
        break
      case 13:
        return 'workshop4AndPreParty'
        break
      case 14:
        return 'hotelWorkshops4AndPreParty'
        break
      case 15:
        return 'hotel2Workshops4AndPreParty'
        break
      case 16:
        return 'hackathonAndConferenceOnly'
        break
      case 17:
        return 'hotelhackathonAndConferenceOnly'
        break
      case 18:
        return 'hotel2hackathonAndConferenceOnly'
        break
      case 19:
        return 'hackathonAndPreParty'
        break
      case 20:
        return 'hotelhackathonAndPreParty'
        break
      case 21:
        return 'hotel2hackathonAndPreParty'
        break
      case 22:
        return 'workshop5AndPreParty'
        break
      case 25:
        return 'workshop6AndPreParty'
        break
      default:
        console.log('totalBN fail', ticketOption)
        return 23
        break
    }
  }
  const getTicketOptionOnChainFormat = (ticketOption) => {
    console.log('is mainnet?', isCurrentNetworkMainnetContract())
    if (!isCurrentNetworkMainnetContract()) {
      return ticketOption
    }
    switch (ticketOption) {
      case 'conference':
        return 0
        break
      case 'hotelConference':
        return 1
        break
      case 'workshop1AndPreParty':
        return 2
        break
      case 'workshop2AndPreParty':
        return 3
        break
      case 'workshop3AndPreParty':
        return 4
        break
      case 'hotelWorkshops1AndPreParty':
        return 6
        break
      case 'hotelWorkshops2AndPreParty':
        return 7
        break
      case 'hotelWorkshops3AndPreParty':
        return 8
        break
      case 'hotel2Workshops1AndPreParty':
        return 9
        break
      case 'hotel2Workshops2AndPreParty':
        return 10
        break
      case 'hotel2Workshops3AndPreParty':
        return 11
        break
      case 'hotel2Conference':
        return 12
        break
      case 'workshop4AndPreParty':
        return 13
        break
      case 'hotelWorkshops4AndPreParty':
        return 14
        break
      case 'hotel2Workshops4AndPreParty':
        return 15
        break
      case 'hackathonAndConferenceOnly':
        return 16
      case 'hotelhackathonAndConferenceOnly':
        return 17
      case 'hotel2hackathonAndConferenceOnly':
        return 18
      case 'hackathonAndPreParty':
        return 19
      case 'hotelhackathonAndPreParty':
        return 20
      case 'hotel2hackathonAndPreParty':
        return 21
      case 'workshop5AndPreParty':
        return 22
      case 'workshop6AndPreParty':
        return 25
      default:
        return 23
        break
    }
  }

  const getTicketOptionTitle = (ticketOption) => {
    console.log('is mainnet?', isCurrentNetworkMainnetContract())
    switch (ticketOption) {
      case 'conference':
        return 'conference'
        break
      case 'hotelConference':
        return 'hotelConference'
        break
      case 'workshop1AndPreParty':
        return 1
        break
      case 'workshop2AndPreParty':
        return 3
        break
      case 'workshop3AndPreParty':
        return 4
        break
      case 'hotelWorkshops1AndPreParty':
        return 6
        break
      case 'hotelWorkshops2AndPreParty':
        return 7
        break
      case 'hotelWorkshops3AndPreParty':
        return 8
        break
      case 'hotel2Workshops1AndPreParty':
        return 9
        break
      case 'hotel2Workshops2AndPreParty':
        return 10
        break
      case 'hotel2Workshops3AndPreParty':
        return 11
        break
      case 'hotel2Conference':
        return 12
        break
      case 'workshop4AndPreParty':
        return 13
        break
      case 'hotelWorkshops4AndPreParty':
        return 14
        break
      case 'hotel2Workshops4AndPreParty':
        return 15
        break
      case 'hackathonAndConferenceOnly':
        return 16
      case 'hotelhackathonAndConferenceOnly':
        return 17
      case 'hotel2hackathonAndConferenceOnly':
        return 18
      case 'hackathonAndPreParty':
        return 19
      case 'hotelhackathonAndPreParty':
        return 20
      case 'hotel2hackathonAndPreParty':
        return 21
      case 'workshop5AndPreParty':
        return 22
      case 'workshop6AndPreParty':
        return 25
      default:
        return 23
        break
    }
  }

  const getTicketOptionPrice = (ticketOption) => {
    console.log('ticketOption yes eth', ticketOption)
    switch (ticketOption) {
      case 'conference':
        return '0.07'
        break
      case 'hotelConference':
        return '0.2'
        break
      case 'hotel2Conference':
        return '0.3'
        break
      case 'workshop1AndPreParty':
        return '0.12'
        break
      case 'workshop2AndPreParty':
        return '0.12'
        break
      case 'workshop3AndPreParty':
        return '0.12'
        break
      case 'workshop4AndPreParty':
        return '0.12'
        break
      case 'hotelWorkshops1AndPreParty':
        return '0.4'
        break
      case 'hotelWorkshops2AndPreParty':
        return '0.4'
        break
      case 'hotelWorkshops3AndPreParty':
        return '0.4'
        break
      case 'hotelWorkshops4AndPreParty':
        return '0.4'
        break
      case 'hotel2Workshops1AndPreParty':
        return '0.5'
        break
      case 'hotel2Workshops2AndPreParty':
        return '0.5'
        break
      case 'hotel2Workshops3AndPreParty':
        return '0.5'
        break
      case 'hotel2Workshops4AndPreParty':
        return '0.5'
      case 'hackathonAndConferenceOnly':
        return '0.10'
      case 'hotelhackathonAndConferenceOnly':
        return '0.3'
      case 'hotel2hackathonAndConferenceOnly':
        return '0.4'
      case 'hackathonAndPreParty':
        return '0.12'
      case 'hotelhackathonAndPreParty':
        return '0.4'
      case 'hotel2hackathonAndPreParty':
        return '0.5'
      case 'workshop5AndPreParty':
        return '0.12'
    }
    if (
      attendeeInfos[currentAttendeeInfoIndex].includeHotelExtra &&
      attendeeInfos[currentAttendeeInfoIndex].includeWorkshopsAndPreParty
    )
      return '0.4'
    if (
      attendeeInfos[currentAttendeeInfoIndex].includeHotel2Extra &&
      attendeeInfos[currentAttendeeInfoIndex].includeWorkshopsAndPreParty
    )
      return '0.5'
    if (attendeeInfos[currentAttendeeInfoIndex].includeWorkshopsAndPreParty)
      return '0.12'
    if (attendeeInfos[currentAttendeeInfoIndex].includeHotel2Extra) return '0.3'
    if (attendeeInfos[currentAttendeeInfoIndex].includeHotel1Extra) return '0.2'
    return '0.07'
  }
  const getSvgTickets = async (owned) => {
    let ownedIdsArr = [...ownerIds]
    if (owned) {
      ownedIdsArr = [...owned]
    }
    const svgs = Promise.all(
      ownedIdsArr.map(async (id) => {
        let obj = await getSVG(
          id,
          networks[currentNetwork].networkShare,
          networks[currentNetwork].contract
        )
        //setSvgTickets(svgTickets.push(svg))

        return obj.image
      })
    )
    svgs.then((results) => {
      setSvgTickets([...results])
    })
    console.log('hohoho', svgs)
    return svgs
  }
  const getOldSvgTickets = async (owned) => {
    let ownedIdsArr = [...ownerIds]
    if (owned) {
      ownedIdsArr = [...owned]
    }
    //const provider = await web3Modal.connect()
    //const newProvider = new ethers.providers.Web3Provider(provider)

    const newProvider = ethersProvider
    setEthersProvider(newProvider)
    const signer = newProvider.getSigner()
    let contract = new ethers.Contract(
      networks[currentNetwork].contract,
      networks[currentNetwork].abi,
      signer
    )
    const svgs = Promise.all(
      ownedIdsArr.map(async (id) => {
        let data = await contract.tokenURI(id)

        const json = Buffer.from(data.substring(29), 'base64').toString()
        console.log(json)
        const obj = JSON.parse(json)
        console.log(obj)
        const svg = Buffer.from(obj.image.substring(26), 'base64').toString()
        console.log('hihihi', svg)
        //setSvgTickets(svgTickets.push(svg))

        return obj.image
      })
    )
    svgs.then((results) => {
      setSvgTickets([...results])
    })
    console.log('hohoho', svgs)
    return svgs
  }
  const RenderTickets = () => {
    console.log()
    return (
      <>
        {isCurrentNetworkMainnetContract() ? (
          <>
            <h3>
              Here {svgTickets.length > 1 ? 'are' : 'is'} your QR code below
              this modal {svgTickets.length > 1 ? 'tickets' : 'ticket'} to get
              to the event.{' '}
              <a
                href={
                  `https://twitter.com/intent/tweet?url=https://www.ethdubaiconf.org/` +
                  `&text=I just bought my Ticket to ETHDubai 2022 Conference, get yours too!&via=ETHDubaiConf&original_referer=https://www.ethdubaiconf.org`
                }
                target="_blank"
              >
                You can tell the world to join us on Twitter!
              </a>
              {svgTickets.length > 1 ? 'Private ' : ' The Private '}
              QR {svgTickets.length > 1 ? 'codes have' : 'code has'} also been
              sent to your email,{' '}
              <a
                href="#tickets"
                onClick={() => generateTicketPdfs(buyTx, pdfTickets)}
              >
                {' '}
                you can also download your QR code here.
              </a>
              <p>
                Bonus: you will soon receive and NFT on another chain, we'll
                alert you by email.
              </p>
            </h3>
            <div style={{ overflowY: 'scroll' }}>
              {svgTickets.map((svg, i) => (
                <div>
                  {networks[currentNetwork].marketplaceName !== '' ? (
                    <>
                      View your NFT ticket{' '}
                      <a
                        href={`${networks[currentNetwork].marketplace}/${networks[currentNetwork].contract}/${ownerIds[i]}`}
                        target="_blank"
                      >
                        on {networks[currentNetwork].marketplaceName}
                      </a>
                    </>
                  ) : null}

                  <img style={{ width: '100%' }} src={`${svg}`} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>
              Here {svgTickets.length > 1 ? 'are' : 'is'} the NFT{' '}
              {svgTickets.length > 1 ? 'tickets' : 'ticket'}{' '}
              <a
                href={
                  `https://twitter.com/intent/tweet?url=https://www.ethdubaiconf.org/?tokenid=` +
                  `${ownerIds[0]},${networks[currentNetwork].networkShare}` +
                  `,${networks[currentNetwork].contract}` +
                  `&text=I just bought my NFT Ticket to ETHDubai 2022 Conference, get yours too!&via=ETHDubaiConf&original_referer=https://www.ethdubaiconf.org`
                }
                target="_blank"
              >
                you can publicly share it on Twitter
              </a>
              , {svgTickets.length > 1 ? null : 'a '}
              private QR {svgTickets.length > 1
                ? 'codes have'
                : 'code has'}{' '}
              been sent to your email to access the event,{' '}
              <a
                href="#tickets"
                onClick={() => generateTicketPdfs(buyTx, pdfTickets)}
              >
                {' '}
                you can also download your QR code here
              </a>
              .
            </h3>
            {svgTickets.map((svg, i) => (
              <div>
                View your NFT ticket{' '}
                <a
                  href={`${networks[currentNetwork].marketplace}/${networks[currentNetwork].contract}/${ownerIds[i]}`}
                  target="_blank"
                >
                  on {networks[currentNetwork].marketplaceName}
                </a>
                <img style={{ width: '100%' }} src={`${svg}`} />
              </div>
            ))}
          </>
        )}
      </>
    )
  }
  const showWarning = (error) => {
    setDisableCheckout(false)
    console.log('errorrrrr', error)
    let message = error.message
    if (error.data?.message) {
      message += error.data.message
    }
    setWarning(message)
    setCheckoutButtonText('Checkout')
  }

  const buy = async (e) => {
    e.preventDefault()
    console.log(111)
    if (networks[currentNetwork].token !== '') {
      let tokenContract = new ethers.Contract(
        networks[currentNetwork].token,
        erc20abi,
        signer
      )
      console.log(tokenContract)
    }
    setWarning('')
    setDisableCheckout(true)
    setOngoingTxText({ txText: 'connect' })
    setCheckoutButtonText('Waiting for transaction confirmation')
    //const provider = await web3Modal.connect()
    //const newProvider = new ethers.providers.Web3Provider(provider)
    const newProvider = ethersProvider
    console.log(11122222)

    //setEthersProvider(newProvider)
    const signer = newProvider.getSigner()
    const network = await newProvider.getNetwork()
    console.log('chainiddddd', network)
    setChainId(network.chainId)
    console.log('currenttttttttt', networks)
    console.log('currentttttttttNET', currentNetwork)
    console.log(
      networks[currentNetwork].contract,
      networks[currentNetwork].abi,
      signer
    )

    console.log(1113333)
    let contract = new ethers.Contract(
      networks[currentNetwork].contract,
      networks[currentNetwork].abi,
      signer
    )
    console.log(111444444)

    console.log('contract', contract)
    console.log('attendeeInfos', attendeeInfos)
    let [finalTickets, finalPdfTickets] = await prepareTickets()
    console.log('final broken', finalTickets)
    console.log('final', finalTickets)
    //setAttendeeInfos(finalTickets)
    console.log('final price', getFinalTicketsPrice(finalTickets))
    console.log('final price', getFinalTicketsPrice(finalTickets).toHexString())
    console.log('final price', getFinalTicketsPrice(finalTickets).toString())
    console.log(
      'final ethers price',
      ethers.utils.parseEther('0.1').toHexString()
    )
    //const feFinalTicketPrice = getFinalTicketsPrice(finalTickets)
    const feFinalTicketPrice = getPreFinalTicketsPrice(attendeeInfos)

    const account = signer.getAddress()
    console.log('okkkkkkkkkk')
    console.log(finalTickets)
    console.log(JSON.stringify(finalTickets))
    console.log(111555555)

    if (networks[currentNetwork].web3Name === 'iimainnet') {
      const tx = signer.sendTransaction({
        to: '0x992dac69827A200BA112A0303Fe8F79F03c37D9d',
        value: ethers.utils.parseEther('0.1'),
        data: ethers.utils.toUtf8Bytes(JSON.stringify(finalTickets)),
      })
      await signer.sendTransaction(tx)
    } else {
      try {
        console.log('okkkkkkkkkk1')
        console.log(1116666666)
        try {
          console.log('asking total price', finalTickets)
          const txTotalPrice = await contract.totalPrice(finalTickets)
          console.log(111777777, txTotalPrice, finalTickets)

          console.log('okkkkkkkkkk2')
          try {
            const balance = await getCurrentNetworkBalance(currentNetwork)
            console.log(111888888)
            console.log('okkkkkkkkkk3')
            console.log('txtotal xxxxxxxx', txTotalPrice)
            console.log('tokenBalance xxxxxxxx', balance)
            if (balance.lt(txTotalPrice)) {
              showWarning({ message: 'balance' })
              return
            }
            setOngoingTxText({ txText: 'Please accept the transaction' })
            console.log(111999999)

            console.log('totalPriceTXXX', txTotalPrice)
            console.log('yes token?')

            if (networks[currentNetwork].token !== '') {
              console.log('111aaaaaaa')

              console.log('yes token')
              let tokenContract = new ethers.Contract(
                networks[currentNetwork].token,
                erc20abi,
                signer
              )
              console.log('111bbbbb')

              console.log('tokenContract TXXXXX', tokenContract)

              try {
                const allowance = await tokenContract.allowance(
                  account,
                  networks[currentNetwork].contract
                )
                console.log('111cccccc')

                console.log('aaaaaaaaaaaaaaallTXXX', allowance)
                if (allowance.lt(txTotalPrice)) {
                  try {
                    const approveTx = await tokenContract.approve(
                      networks[currentNetwork].contract,
                      txTotalPrice
                    )
                    setOngoingTxText({ txText: 'approve', tx: approveTx })
                    try {
                      const approveReceipt = await approveTx.wait()
                      setOngoingTxText({
                        txText: 'acceptMinting',
                      })
                      return
                    } catch (error) {
                      showWarning(error)
                      console.log(error)
                    }
                  } catch (error) {
                    showWarning(error)
                    return
                  }
                } else {
                  manageBuyTx(
                    finalPdfTickets,
                    finalTickets,
                    contract,
                    feFinalTicketPrice.gt(txTotalPrice),
                    null
                  )
                }
              } catch (error) {
                console.log('allowance')
                showWarning(error)
                return
              }
            } else {
              console.log('yes eth? fe', feFinalTicketPrice)
              console.log('yes eth? tx', txTotalPrice)
              manageBuyTx(
                finalPdfTickets,
                finalTickets,
                contract,
                feFinalTicketPrice.gt(txTotalPrice),

                {
                  value: txTotalPrice.toHexString(),
                }
              )
            }
          } catch (error) {
            console.log('current balance')

            showWarning(error)
            console.log(error)
          }
        } catch (error) {
          showWarning(error)
          console.log(error)
        }
      } catch (error) {
        showWarning(error)
        console.log(error)
      }
    }
  }
  const manageBuyTx = async (
    finalPdfTickets,
    finalTickets,
    contract,
    hasDiscount,
    value
  ) => {
    try {
      console.log('hasiscount', hasDiscount)
      let tx
      if (value !== null) {
        if (hasDiscount) {
          tx = await contract.mintItem(finalTickets, value)
        } else {
          tx = await contract.mintItemNoDiscount(finalTickets, value)
        }
      } else {
        if (networks[currentNetwork].web3Name === 'Metis Andromeda') {
          tx = await contract.mintItem(finalTickets)
        } else {
          tx = await contract.mintItem(finalTickets)
        }
      }
      console.log('txiiiiiiiiiii', tx)
      setOngoingTx(tx.hash)
      setOngoingTxText({ txText: 'mint', tx: tx })
      try {
        const receipt = await tx.wait()
        setDisableCheckout(false)
        setCheckoutButtonText('Checkout')
        console.log('receipt', receipt)
        setBuyTx({ to: receipt.to, txHash: receipt.transactionHash })
        //    const ownedids = await getOwnerTickets()
        let ownedids = []
        receipt.events.map((event) => {
          if (event.args?.tokenId) {
            ownedids.push(event.args.tokenId.toString())
          }
        })
        console.log('ownedids', ownedids)
        setOwnerIds(ownedids)
        setSuccessPurchase(true)
        try {
          try {
            await getSvgTickets(ownedids)
          } catch (error) {
            console.log('failed svg', error)
          }
          setShowCheckout(true)
          setSuccessPurchase(true)
          finalPdfTickets = finalPdfTickets.map((ft) => {
            return { ...ft, ...{ tx: receipt.transactionHash } }
          })
          console.log('fffffffffff', finalPdfTickets)
          setPdfTickets(finalPdfTickets)
          generateTicketPdfs(
            { to: receipt.to, txHash: receipt.transactionHash },
            finalPdfTickets
          )
        } catch (error) {
          showWarning(error)
          console.log(error)
        }
      } catch (error) {
        showWarning(error)
        console.log(error)
      }
    } catch (error) {
      showWarning(error)

      console.log(error)
    }
  }
  const getTicketPrice = (
    oneDay,
    threeDay,
    hotel,
    hotel2,
    ihackathon,
    hackathonAndPreParty
  ) => {
    if (oneDay && !hotel && !hotel2) {
      if (ihackathon) {
        return 0.1
      }
      return 0.07
    }
    if (oneDay && hotel && !hotel2) {
      if (ihackathon) {
        return 0.3
      }
      return 0.2
    }
    if (threeDay && !hotel && !hotel2) {
      return 0.12
    }
    if (threeDay && hotel && !hotel2) {
      return 0.4
    }
    if (oneDay && !hotel && hotel2) {
      if (ihackathon) {
        return 0.4
      }
      return 0.3
    }
    if (threeDay && !hotel && hotel2) {
      return 0.5
    }
    if (hackathonAndPreParty && !hotel && hotel2) {
      return 0.5
    }

    if (hackathonAndPreParty && !hotel && !hotel2) {
      return 0.12
    }
    if (hackathonAndPreParty && hotel && !hotel2) {
      return 0.4
    }
  }
  const getAllTicketsPrices = () => {
    let total = ethers.utils.parseEther('0.0')
    let totalFinal = ethers.utils.parseEther('0.0')

    attendeeInfos.map((ai) => {
      let price = getTicketPrice(
        !ai.includeWorkshopsAndPreParty,
        ai.includeWorkshopsAndPreParty,
        ai.includeHotelExtra,
        ai.includeHotel2Extra,
        ai.hackathon,
        ai.hackathonAndPreParty
      )
      let priceBN = ethers.utils.parseEther(price + '')
      console.log('ppppppppp', priceBN)
      totalFinal = total.add(priceBN)
      console.log('ppppppppp total', totalFinal)
    })
    return totalFinal.toString() / 10 ** 18
  }
  const getPreFinalTicketsPrice = (finalTickets) => {
    const pre = finalTickets.map((pft) => {
      let ticketOption = getTicketOption(
        pft.includeWorkshopsAndPreParty,
        pft.includeHotelExtra,
        pft.workshop,
        pft.includeHotel2Extra,
        pft.hackathon,
        pft.hackathonAndPreParty
      )
      return { ...pft, ...{ ticketOption: ticketOption } }
    })
    return getFinalTicketsPrice(pre)
  }
  const getFinalTicketsPrice = (finalTickets) => {
    let total = []
    finalTickets.map((ft) => {
      console.log('calling yes eth ticketoption', ft.ticketOption)
      total.push(getTicketOptionPrice(ft.ticketOption))
    })
    const totalBN = total.map((t) => {
      console.log('totalBN', t)
      return ethers.utils.parseEther(t + '')
    })
    let totalFinal = ethers.utils.parseEther('0.0')
    totalBN.map((t) => {
      totalFinal = totalFinal.add(t + '')
    })
    console.log('totalFinal', totalFinal)

    return totalFinal
  }
  const total = () => {
    const oneDayPrice = ethers.BigNumber.from('10').pow(16).mul(7)
    const threeDayPrice = ethers.BigNumber.from('10').pow(16).mul(12)
    let hotelPrice = ethers.BigNumber.from('10').pow(16).mul(5)
    let hasOneDayHotel = 1
    let hasThreeDayHotel = 1
    if (oneDayTicket <= 0 || !includeHotel) {
      hasOneDayHotel = 0
    }
    if (threeDayTicket <= 0 || !includeHotel) {
      hasThreeDayHotel = 0
    }
    let hotelTotalOneDay = hotelPrice.mul(2 * oneDayTicket * hasOneDayHotel)
    let hotelTotalThreeDay = hotelPrice.mul(
      4 * threeDayTicket * hasThreeDayHotel
    )
    let oneDayTotal = oneDayPrice.mul(oneDayTicket)
    let threeDayTotal = threeDayPrice.mul(threeDayTicket)
    let t = oneDayTotal
      .add(threeDayTotal)
      .add(hotelTotalOneDay)
      .add(hotelTotalThreeDay)
      .toString()
    return t / 10 ** 18
  }
  const handleCheckout = () => {
    console.log('hotelll', includeHotel)
    setValidated(false)
    setDisableCheckout(false)
    setCheckoutButtonText('Checkout')
    setShowCheckout(true)
    let tickets = []
    let attendeeInfo = {
      email: '',
      fname: '',
      lname: '',
      twitter: '',
      bio: '',
      job: '',
      company: '',
      workshop: '',
      tshirt: '',
      telegram: '',
    }

    let includeWorkshops = false
    let includeHotelExtra = includeHotel
    let includeHotel2Extra = includeHotel2
    for (let i = 0; i < oneDayTicket; i++) {
      const rand =
        typeof crypto['randomUUID'] !== 'undefined'
          ? crypto.randomUUID()
          : uuidv4()
      tickets.push({
        attendeeInfo,
        ticketCode: rand,
        resellable: {
          isResellable: false,
          price: getTicketPrice(false, false, includeHotel, includeHotel2),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: false,
        includeHotelExtra,
        includeHotel2Extra,
      })
    }
    for (let i = 0; i < threeDayTicket; i++) {
      const rand =
        typeof crypto['randomUUID'] !== 'undefined'
          ? crypto.randomUUID()
          : uuidv4()
      tickets.push({
        attendeeInfo,
        ticketCode: rand,
        resellable: {
          isResellable: false,
          price: getTicketPrice(false, true, includeHotel, includeHotel2),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: true,
        includeHotelExtra,
        includeHotel2Extra,
      })
    }
    if (threeDayTicket === 0 && oneDayTicket === 0) {
      tickets = []
    }

    console.log(tickets)
    setAttendeeInfos(tickets)
    setCurrentAttendeeInfoIndex(0)
  }

  return (
    <>
      <section className="nft-checkout-section">
        <div style={{ textAlign: 'left' }}>
          <ul class="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              <div>
                <strong>Conference Only Ticket:</strong>
                <ul>
                  <li>Conference Ticket (March 31st)</li>
                  <li>Pre-Conference Party (March 30th)</li>
                </ul>
                <strong>Unit Price: 0.07 ETH</strong>
                <div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenDesc1(!openDesc1)
                    }}
                    aria-controls="open-ticket-description"
                    aria-expanded={openDesc1}
                  >
                    read more
                  </a>
                </div>
                <Collapse in={openDesc1}>
                  <div className="hidden">
                    Full day of insightful keynotes with the best innovators and
                    contributors from the DeFi and Ethereum community on March
                    31st. Great party on the night before on March 30th.
                  </div>
                </Collapse>
              </div>
              <span>
                <select
                  onChange={(e, v) => {
                    console.log(e, v)
                    setOneDayTicket(e.target.value)
                    console.log('currentValue', e.target.value)
                    if (e.target.value <= 0 && threeDayTicket <= 0) {
                      setIncludeHotel(false)
                    }
                  }}
                  value={oneDayTicket}
                >
                  <>
                    {Array.apply(null, { length: 20 }).map((e, i) => {
                      return <option value={i}>{i}</option>
                    })}
                  </>
                </select>
              </span>
            </li>
            <li
              style={{ borderTop: '1px solid black' }}
              className="list-group-item d-flex justify-content-between align-items-center alignb"
            >
              <div>
                <strong> Combo Ticket:</strong>
                <ul>
                  <li>Conference Ticket (March 31st all-day)</li>
                  <li>Pre-Conference Party (March 30th night)</li>
                  <li>All-day Workshops and Hackathon (March 30th)</li>
                  <li>Special Yacht Meet and Greet Party (March 29th)</li>
                </ul>
                <strong>Unit Price: 0.12 ETH</strong>
                <div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenDesc2(!openDesc2)
                    }}
                    aria-controls="open-ticket-description"
                    aria-expanded={openDesc2}
                  >
                    read more
                  </a>
                </div>
                <Collapse in={openDesc2}>
                  <div className="hidden">
                    Full day of insightful keynotes with the best innovators and
                    contributors from the DeFi and Ethereum community on March
                    31th. Great party on the night before on March 30th.
                    <br />
                    <br />
                    On March 30th, a day full of half-day workshops and
                    hackathon with some of the best instructors from the DeFi
                    and Ethereum world. The hackathon will come with a big prize
                    given cash in DAI, it will start remotely on March 26th to
                    give participants time to build a great app.
                    <br />
                    <br />
                    On the 29th, you will be invited to an exclusive yacht party
                    to hack and network with bbq and jetski animation in Dubai
                    Marina.
                  </div>
                </Collapse>
              </div>
              <span>
                <select
                  onChange={(e, v) => {
                    console.log(e, v)
                    setThreeDayTicket(e.target.value)
                    console.log('currentValue', e.target.value)
                    if (e.target.value <= 0 && oneDayTicket <= 0) {
                      setIncludeHotel(false)
                    }
                  }}
                  value={threeDayTicket}
                >
                  <>
                    {Array.apply(null, { length: 20 }).map((e, i) => {
                      return <option value={i}>{i}</option>
                    })}
                  </>
                </select>
              </span>
            </li>
            <li
              style={{ borderTop: '1px solid black' }}
              className="list-group-item d-flex justify-content-between align-items-center alignb"
            >
              <strong>Total</strong>
              <span>
                <strong> {total()} ETH</strong>
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              <span />
              <span>
                <Button
                  disabled={threeDayTicket == 0 && oneDayTicket == 0}
                  onClick={(e) => {
                    handleCheckout()
                    setSuccessPurchase(false)
                  }}
                  style={{ marginTop: '1em' }}
                >
                  Checkout
                </Button>
              </span>
            </li>{' '}
          </ul>
        </div>
        {pdfTickets.length > 0 && (
          <Button
            style={{ margin: '1em' }}
            onClick={async () => {
              //          const provider = await web3Modal.connect()
              //        const newProvider = new ethers.providers.Web3Provider(provider)

              const newProvider = ethersProvider
              //              setEthersProvider(newProvider)
              console.log(newProvider)
              const signer = newProvider.getSigner()
              let contract = new ethers.Contract(
                networks[currentNetwork].contract,
                networks[currentNetwork].abi,
                signer
              )
              generateTicketPdfs(buyTx, pdfTickets)
            }}
          >
            Download Tickets
          </Button>
        )}
        <Modal
          keyboard={false}
          backdrop="static"
          show={showCheckout}
          onHide={() => {
            setShowCheckout(false)
            if (window) history.pushState(null, null, null)
          }}
          id="checkout_popup"
          autoFocus={true}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => {
                    let ok = confirm('Are you sure you want to close?')
                    if (ok) {
                      setShowCheckout(false)
                      if (window) history.pushState(null, null, '/')
                    }
                  }}
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {successPurchase ? (
                  <>
                    <div
                      className="checkout-full-modal"
                      style={{ overflowY: 'scroll', height: '625px' }}
                    >
                      <RenderTickets />
                    </div>
                  </>
                ) : disableCheckout ? (
                  <OnGoingTxTextMessage />
                ) : (
                  <div className="">
                    <div className="checkout-full-modal">
                      <h3>
                        Attendee info for ticket{' '}
                        <strong>
                          {currentAttendeeInfoIndex + 1} of{' '}
                          {attendeeInfos.length}
                        </strong>
                      </h3>
                      {attendeeInfos.length > 0
                        ? attendeeInfos.map((attendee, index) =>
                            index === currentAttendeeInfoIndex ? (
                              //true ? (
                              <Form
                                key={index}
                                noValidate
                                validated={validated}
                                id="attendeeForm"
                              >
                                {warning !== '' ? (
                                  <Alert
                                    variant="warning"
                                    dismissible
                                    onClose={() => setWarning('')}
                                  >
                                    {warning === 'balance'
                                      ? showHtmlWarning()
                                      : warning}
                                  </Alert>
                                ) : null}
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        required
                                        placeholder="First name*"
                                        name="fname"
                                        value={attendeeInfos[index].fname}
                                        onChange={handleAttendeeInfo}
                                        maxlength="30"
                                      />
                                    </Col>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        required="true"
                                        placeholder="Last name*"
                                        onChange={handleAttendeeInfo}
                                        name="lname"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].lname
                                        }
                                        onChange={handleAttendeeInfo}
                                        maxlength="30"
                                      />
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        required="true"
                                        placeholder="Email*"
                                        onChange={handleAttendeeInfo}
                                        name="email"
                                        type="email"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].email
                                        }
                                        maxlength="60"
                                      />
                                    </Col>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        placeholder="ENS or telegram (saved in clear on chain)"
                                        onChange={handleAttendeeInfo}
                                        name="telegram"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].telegram
                                        }
                                        maxlength="20"
                                      />
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        placeholder="Company (will be featured on badge)"
                                        onChange={handleAttendeeInfo}
                                        name="company"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].company
                                        }
                                        maxlength="20"
                                      />
                                    </Col>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        as="select"
                                        aria-label="Job"
                                        onChange={handleAttendeeInfo}
                                        name="job"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].job
                                        }
                                      >
                                        <option value="0">
                                          Solidity/Vyper Developer
                                        </option>
                                        <option value="1">
                                          Frontend Web3 Developer
                                        </option>
                                        <option value="2">
                                          Fullstack Developer
                                        </option>
                                        <option value="3">
                                          Backend Developer
                                        </option>
                                        <option value="5">
                                          Project Manager
                                        </option>
                                        <option value="6">CTO</option>
                                        <option value="7">CEO</option>
                                        <option value="8">HR</option>
                                        <option value="9">Marketing</option>
                                        <option value="10">Investor</option>
                                        <option value="11">Trader</option>
                                        <option value="12">Other</option>
                                      </Form.Control>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      <Form.Control
                                        placeholder="Short bio (will be featured on badge)*"
                                        onChange={handleAttendeeInfo}
                                        name="bio"
                                        value={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].bio
                                        }
                                        maxlength={30}
                                      />
                                    </Col>
                                    <Col xs="12" sm="6">
                                      {/* <span>Do you want to include hotel?</span>
                                      {!attendeeInfos[currentAttendeeInfoIndex]
                                        .includeHotel2Extra ? (
                                        <Form.Check
                                          type="checkbox"
                                          label="single room"
                                          onClick={handleAttendeeInfoCheck}
                                          name="includeHotelExtra"
                                          checked={
                                            attendeeInfos[
                                              currentAttendeeInfoIndex
                                            ].includeHotelExtra
                                          }
                                        />
                                      ) : null}
                                      {!attendeeInfos[currentAttendeeInfoIndex]
                                        .includeHotelExtra ? (
                                        <Form.Check
                                          type="checkbox"
                                          label="double room"
                                          onClick={handleAttendeeInfoCheck}
                                          name="includeHotel2Extra"
                                          checked={
                                            attendeeInfos[
                                              currentAttendeeInfoIndex
                                            ].includeHotel2Extra
                                          }
                                        />
                                      ) : null}

                                      {attendeeInfos[currentAttendeeInfoIndex]
                                        .includeHotelExtra ||
                                      attendeeInfos[currentAttendeeInfoIndex]
                                        .includeHotel2Extra ? (
                                        <span>
                                          Checkin:{' '}
                                          {
                                            getHotelInfo(
                                              attendeeInfos[
                                                currentAttendeeInfoIndex
                                              ]
                                            ).in
                                          }
                                          th | Checkout: April 1st
                                        </span>
                                      ) : null}
                      */}
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      {attendeeInfos[currentAttendeeInfoIndex]
                                        .hackathon ? null : (
                                        <Form.Check
                                          type="checkbox"
                                          label="Include Workshop, hackathon and parties (yacht March 29th and pre-conference March 30th)"
                                          onClick={handleAttendeeInfoCheck}
                                          name="includeWorkshopsAndPreParty"
                                          checked={
                                            attendeeInfos[
                                              currentAttendeeInfoIndex
                                            ].includeWorkshopsAndPreParty
                                          }
                                        />
                                      )}
                                      {attendeeInfos[currentAttendeeInfoIndex]
                                        .includeWorkshopsAndPreParty ? null : (
                                        <Form.Check
                                          type="checkbox"
                                          label="Include Hackathon only (March 30th) and pre-conference party (March 30th)"
                                          onClick={handleAttendeeInfoCheck}
                                          name="hackathon"
                                          checked={
                                            attendeeInfos[
                                              currentAttendeeInfoIndex
                                            ].hackathon
                                          }
                                        />
                                      )}
                                    </Col>
                                    {attendeeInfos[currentAttendeeInfoIndex]
                                      .includeWorkshopsAndPreParty ? (
                                      <Col xs="12" sm="6">
                                        <Form.Control
                                          as="select"
                                          aria-label="Workshop"
                                          onChange={handleAttendeeInfo}
                                          name="workshop"
                                          required
                                          value={
                                            attendeeInfos[
                                              currentAttendeeInfoIndex
                                            ].workshop
                                          }
                                        >
                                          <option value={null}>
                                            Select a workshop
                                          </option>
                                          <option value="3">
                                            Web3 workshop for frontend devs with
                                            the MetaMask Team
                                          </option>
                                          <option value="1">
                                            Web3 &amp; Graph Protocol workshop
                                            with Nader Dabit
                                          </option>
                                          <option value="22">
                                            Yearn strategies workshop (Afternoon
                                            Session){' '}
                                          </option>
                                          <option value="4">
                                            BentoBox workshop with Sushi Core
                                            Trident Dev Sarang Parikh
                                          </option>
                                          <option value="25">
                                            Build your first blockchain
                                            application in Python with The
                                            Blockchain OS
                                          </option>
                                          <option value="5">
                                            Hackathon Only
                                          </option>
                                        </Form.Control>
                                      </Col>
                                    ) : null}
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12">
                                      <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleBackBuyButton}
                                        disabled={
                                          currentAttendeeInfoIndex === 0 ||
                                          disableCheckout
                                        }
                                      >
                                        Back
                                      </Button>
                                      {'  '}
                                      {}
                                      <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleBuyButton}
                                        disabled={disableCheckout}
                                      >
                                        {attendeeInfos.length > 1 &&
                                        currentAttendeeInfoIsNotLast()
                                          ? 'Next Ticket'
                                          : ethersProvider
                                          ? checkoutButtonText
                                          : 'Connect'}
                                      </Button>
                                      {!currentAttendeeInfoIsNotLast() &&
                                      ethersProvider ? (
                                        <Form.Control
                                          as="select"
                                          aria-label="Network"
                                          onChange={handleNetwork}
                                          name="network"
                                          style={{
                                            display: 'inline',
                                            width: 'auto',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            marginBottom: '10px',
                                          }}
                                          value={currentNetwork}
                                        >
                                          {networks.map((network, i) => (
                                            <option value={i}>
                                              {network.networkInfo.chainName}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      ) : null}
                                      {currentAddress ? (
                                        <Button
                                          variant="secondary"
                                          onClick={(e) => {
                                            setEthersProvider(null)
                                            setCurrentAddress(null)
                                            localStorage.clear()
                                            e.preventDefault()
                                          }}
                                        >
                                          disconnect{' '}
                                          {currentAddress.slice(0, 7)}
                                        </Button>
                                      ) : null}
                                    </Col>
                                  </Form.Row>
                                </Form.Group>

                                <Form.Group>
                                  <div>
                                    <span>
                                      {' '}
                                      Current ticket price: ETH{' '}
                                      {getTicketPrice(
                                        !attendeeInfos[currentAttendeeInfoIndex]
                                          .includeWorkshopsAndPreParty,
                                        attendeeInfos[currentAttendeeInfoIndex]
                                          .includeWorkshopsAndPreParty,
                                        attendeeInfos[currentAttendeeInfoIndex]
                                          .includeHotelExtra,
                                        attendeeInfos[currentAttendeeInfoIndex]
                                          .includeHotel2Extra,
                                        attendeeInfos[currentAttendeeInfoIndex]
                                          .hackathon,
                                        attendeeInfos[currentAttendeeInfoIndex]
                                          .hackathonAndPreParty
                                      )}
                                    </span>
                                    <span>
                                      {' | '}
                                      Total price: ETH{' '}
                                      {JSON.stringify(
                                        getPreFinalTicketsPrice(
                                          attendeeInfos
                                        ).toString() /
                                          10 ** 18
                                      )}
                                    </span>
                                    <span>
                                      {' | '}
                                      <a
                                        href="https://ramp.network/buy/"
                                        target="_blank"
                                      >
                                        Buy ETH here
                                      </a>
                                    </span>
                                  </div>
                                  <div>
                                    Privacy policy: your data is not for sale
                                    and is not shared with sponsors/external
                                    partners.{' '}
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setOpenDesc1pp(!openDesc1pp)
                                      }}
                                      aria-controls="open-ticket-description"
                                      aria-expanded={openDesc1pp}
                                    >
                                      [more]
                                    </a>
                                  </div>
                                  <Collapse in={openDesc1pp}>
                                    <div className="hidden">
                                      We only use email to send you tickets and
                                      event info as well as any prize you may
                                      win through the event. You only need to
                                      provide a real name if you include the
                                      hotel option. All the data is encrypted
                                      before sent on chain except for your
                                      ENS/telegram which is optional.
                                    </div>
                                  </Collapse>
                                  <div></div>
                                </Form.Group>
                              </Form>
                            ) : null
                          )
                        : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={showSharedTicket}
          onHide={() => {
            if (window) history.pushState(null, null, null)
          }}
          id="checkout_popup"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => {
                    setShowSharedTicket(false)
                    if (window) history.pushState(null, null, '/')
                  }}
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ padding: '25px' }}>
                <h2>
                  Here is your friend's NFT ticket to ETHDubai,{' '}
                  <a href="#tickets" onClick={() => setShowSharedTicket(false)}>
                    get yours here!
                  </a>
                </h2>
                <img
                  style={{ width: '100%' }}
                  src={`data:image/svg+xml;base64,${sharedSVG}`}
                />
              </div>
            </div>
          </div>
        </Modal>

        <div id="pdf-tickets">
          {pdfTickets.map((tix, i) => (
            <>
              <div
                className="ticket-qr html2pdf__page-break"
                style={{
                  border: '1px solid black',
                  marginBottom: '30px',
                  pageBreakAfter: 'always',
                }}
              >
                <Container>
                  <Row>
                    <Col>
                      <img
                        src={`data:image/svg+xml;base64,${btoa(
                          new QRCode(
                            JSON.stringify({
                              ticketCode: tix.ticketCode,
                              tx: `tx ${tix.tx}`,
                              chainId: chainId,
                            })
                          ).svg()
                        )}`}
                      />

                      <p>
                        Do not share this QR code on social media or someone can
                        use your ticket
                      </p>
                    </Col>
                    <Col>
                      <p style={{ paddingTop: '20px' }}>
                        <h1>Your ETHDubai Ticket</h1>
                        <h2>
                          {tix.attendeeInfo.fname} {tix.attendeeInfo.lname}
                        </h2>
                      </p>
                      <p>{tix.attendeeInfo.email}</p>
                      <p>
                        {getTicketOptionString(tix.ticketOption)
                          .replace(/([a-z])([A-Z])/g, '$1 $2')
                          .split(' ')
                          .map((w) => {
                            return (
                              <Badge
                                pill
                                variant="primary"
                                style={{ marginRight: '5px' }}
                              >
                                {w}
                              </Badge>
                            )
                          })}
                      </p>
                      <p>{tix.attendeeInfo.bio}</p>
                      <p>{tix.attendeeInfo.company}</p>
                      <p>{tix.attendeeInfo.telegram}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ fontSize: '9px' }}>
                        {networks[currentNetwork].web3Name} {tix.tx}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div class="newBoxBefore1">&nbsp;</div>
              <div class="newBoxBefore2">&nbsp;</div>
            </>
          ))}
        </div>
      </section>
    </>
  )
}
