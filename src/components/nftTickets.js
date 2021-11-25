import React, { useEffect, useState } from 'react'

import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

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
import abiNonEth from './abis/ETHDubaiTicketsERC20.json'
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
  const [openDesc1, setOpenDesc1] = useState(false)
  const [openDesc2, setOpenDesc2] = useState(false)
  const [ethersProvider, setEthersProvider] = useState()
  const [oneDayTicket, setOneDayTicket] = useState(0)
  const [threeDayTicket, setThreeDayTicket] = useState(0)
  const [includeHotel, setIncludeHotel] = useState(false)
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
  useEffect(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    console.log('params', params)
    if (params.tokenid) {
      let paramsArray = params.tokenid.split(',')
      const url =
        `https://svg.ethdubaiconf.org/token?tokenid=${paramsArray[0]}` +
        `&network=${paramsArray[1]}&contract=${paramsArray[2]}`
      console.log('lllll', url)
      const response = await fetch(url)
      const data = await response.text()
      console.log('llllllllllllllll', data)
      const json = Buffer.from(data.substring(29), 'base64').toString()
      console.log(json)
      const obj = JSON.parse(json)
      console.log(obj)
      const svg = Buffer.from(obj.image.substring(26), 'base64').toString()
      console.log('hihihi', svg)
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
              Minting transaction in progress, please wait... 🔗
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
  const networks = [
    {
      contract: '',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      networkShare: 'mainnet',
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
      contract: '',
      abi: abiNonEth.abi,
      web3Network: 'matic',
      networkShare: 'polygon',
      marketplaceName: 'opensea',
      marketplace: 'https://opensea.io/assets/matic/',
      exchangeUrl: 'https://www.quickswap.finance/#/swap',
      exchangeName: 'QuickSwap',
      tokenSymbol: 'WETH',
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
      contract: '',
      abi: abiNonEth.abi,
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
      contract: '0xB5d182B69194aF495685E71cA739EEE41E218F60',
      abi: abi.abi,
      token: '',
      exchangeUrl: 'https://app.uniswap.org',
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
      contract: '0xE345546Cc2616DBC51b51933FC32D5708d90BF75',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      web3Name: 'Rinkeby',
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
      contract: '0xbb4C52e21b2f7a7b620253560c3DeDB7fc67D806',
      abi: abiNonEth.abi,
      marketplaceName: 'opensea',
      marketplace: 'https://testnets.opensea.io/assets/matic',
      token: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
      exchangeUrl: 'https://www.quickswap.finance/#/swap',
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
      contract: '0x8339E55273a11c80f75c22Ce0ed647984319B6B0',
      abi: abiNonEth.abi,
      token: '0x6244D7f9245ad590490338db2fbEd815c2358034',
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
      contract: '0x7a5B24D02C60cc1A25Ff632a43299E139c98a909',
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
      contract: '0xE345546Cc2616DBC51b51933FC32D5708d90BF75',
      token: '',
      abi: abi.abi,
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Arbitrum Rinkeby',
      networkShare: 'notworking',
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
      contract: '0xf4B146FbA71F41E0592668ffbF264F1D186b2Ca8',
      abi: abi.abi,
      token: '',
      exchangeUrl: 'https://app.uniswap.org',
      exchangeName: 'UniSwap',
      tokenSymbol: 'ETH',
      web3Name: 'Hardhat',
      networkShare: 'hardhat',
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
  console.log(abi)
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
      console.log('nnnnnn', n, i, x, network)
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
        <a href={networks[currentNetwork].exchangeUrl}>
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
      try {
        let balance = await tokenContract.balanceOf(account)
        const newTokenBalance = ethers.utils.formatEther(balance)

        setTokenBalance('' + parseFloat(newTokenBalance).toFixed(3))
        return balance
      } catch (error) {
        return 0
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
          data.append('ticketOption', pdfTix[i].ticketOption)
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
  const handleBuyButton = async (e) => {
    e.preventDefault()
    console.log('all', attendeeInfos)
    const form = document.getElementById('attendeeForm')
    setValidated(true)
    if (form.checkValidity() === false) {
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
    return EthCrypto.cipher.stringify(encryptedString)
  }
  const prepareTickets = async () => {
    let finalPdfTickets = attendeeInfos.map((tix) => {
      let ticketOption = getTicketOption(
        tix.includeWorkshopsAndPreParty,
        tix.includeHotelExtra,
        tix.workshop
      )
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
                tix.includeHotelExtra
              )
          ),
        },
        ticketOption: ticketOption,
        specialStatus: '',
      }
      return pdfTix
    })
    console.log('FINAL TIX', finalPdfTickets)
    let finalTickets = await Promise.all(
      attendeeInfos.map(async (a) => {
        let email = await encryptStr(a.email || '_')
        let fname = await encryptStr(a.fname || '_')
        let lname = await encryptStr(a.lname || '_')
        let twitter = await encryptStr(a.twitter || '_')
        let bio = await encryptStr(a.bio || '_')
        let job = await encryptStr(a.job || '0')
        let company = await encryptStr(a.company || '')
        let workshop = a.workshop || '_'
        let tshirt = a.tshirt || '_'
        let telegram = a.telegram || '_'
        let ticketOption = getTicketOption(
          a.includeWorkshopsAndPreParty,
          a.includeHotelExtra,
          a.workshop
        )
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
          ticketCode: await encryptStr(a.ticketCode),
          resellable: {
            isResellable: false,
            price: ethers.utils.parseEther(
              '' +
                getTicketPrice(
                  !a.includeWorkshopsAndPreParty,
                  a.includeWorkshopsAndPreParty,
                  a.includeHotelExtra
                )
            ),
          },
          ticketOption: ticketOption,
          specialStatus: '',
        }
        return finalTicket
      })
    )
    return [finalTickets, finalPdfTickets]
  }
  const getTicketOption = (workshopsAndPreParty, hotelExtra, workshop) => {
    if (!workshop) {
      workshop = ''
    }
    if (!workshopsAndPreParty && !hotelExtra) {
      return 'conference'
    } else if (!workshopsAndPreParty && hotelExtra) {
      return 'hotelConference'
    } else if (workshopsAndPreParty && !hotelExtra) {
      console.log('wwwwwwwwwww', `workshop${workshop}AndPreParty`)
      return `workshop${workshop}AndPreParty`
    } else if (workshopsAndPreParty && hotelExtra) {
      return `hotelWorkshops${workshop}AndPreParty`
    }
    return 'conference'
  }
  const getTicketOptionPrice = (ticketOption) => {
    switch (ticketOption) {
      case 'conference':
        return '0.1'
        break
      case 'hotelConference':
        return '0.2'
        break
      case 'workshopAndPreParty':
        return '0.2'
        break
      case 'workshop1AndPreParty':
        return '0.2'
        break
      case 'workshop2AndPreParty':
        return '0.2'
        break
      case 'workshop3AndPreParty':
        return '0.2'
        break
      case 'hotelWorkshopsAndPreParty':
        return '0.4'
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
      default:
        break
    }
  }
  const getSvgTickets = async (owned) => {
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
          private QR {svgTickets.length > 1 ? 'codes have' : 'code has'} been
          sent to your email to access the event,{' '}
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
    setWarning('')
    setDisableCheckout(true)
    setOngoingTxText({ txText: 'connect' })
    setCheckoutButtonText('Waiting for transaction confirmation')
    //const provider = await web3Modal.connect()
    //const newProvider = new ethers.providers.Web3Provider(provider)
    const newProvider = ethersProvider

    //setEthersProvider(newProvider)
    const signer = newProvider.getSigner()
    const network = await newProvider.getNetwork()
    console.log('chainiddddd', network)
    setChainId(network.chainId)
    console.log('currenttttttttt', networks)
    console.log('currentttttttttNET', currentNetwork)
    let contract = new ethers.Contract(
      networks[currentNetwork].contract,
      networks[currentNetwork].abi,
      signer
    )
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
    const account = signer.getAddress()
    console.log('okkkkkkkkkk')
    console.log(finalTickets)
    try {
      const txTotalPrice = await contract.totalPrice(finalTickets)

      console.log('okkkkkkkkkk2')
      const balance = await getCurrentNetworkBalance(currentNetwork)

      console.log('okkkkkkkkkk3')
      console.log('txtotal xxxxxxxx', txTotalPrice)
      console.log('tokenBalance xxxxxxxx', balance)
      if (balance.lt(txTotalPrice)) {
        showWarning({ message: 'balance' })
        return
      }
      setOngoingTxText({ txText: 'Please accept the transaction' })
      console.log('totalPriceTXXX', txTotalPrice)
      if (networks[currentNetwork].token !== '') {
        let tokenContract = new ethers.Contract(
          networks[currentNetwork].token,
          erc20abi,
          signer
        )
        console.log('tokenContract TXXXXX', tokenContract)

        try {
          const allowance = await tokenContract.allowance(
            account,
            networks[currentNetwork].contract
          )

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
            manageBuyTx(finalPdfTickets, finalTickets, contract, {})
          }
        } catch (error) {
          showWarning(error)
          return
        }
      } else {
        manageBuyTx(finalPdfTickets, finalTickets, contract, {
          value: txTotalPrice.toHexString(),
        })
      }
    } catch (error) {
      showWarning(error)
      console.log(error)
    }
  }
  const manageBuyTx = async (
    finalPdfTickets,
    finalTickets,
    contract,
    value
  ) => {
    try {
      const tx = await contract.mintItem(finalTickets, value)
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
          await getSvgTickets(ownedids)
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
  const getTicketPrice = (oneDay, threeDay, hotel) => {
    if (oneDay && !hotel) {
      return 0.1
    }
    if (oneDay && hotel) {
      return 0.2
    }
    if (threeDay && !hotel) {
      return 0.2
    }
    if (threeDay && hotel) {
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
        ai.includeHotelExtra
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
        pft.workshop
      )
      return { ...pft, ...{ ticketOption: ticketOption } }
    })
    return getFinalTicketsPrice(pre)
  }
  const getFinalTicketsPrice = (finalTickets) => {
    let total = []
    finalTickets.map((ft) => {
      total.push(getTicketOptionPrice(ft.ticketOption))
    })
    const totalBN = total.map((t) => {
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
    const oneDayPrice = ethers.BigNumber.from('10').pow(17)
    const threeDayPrice = ethers.BigNumber.from('10').pow(17).mul(2)
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
    for (let i = 0; i < oneDayTicket; i++) {
      tickets.push({
        attendeeInfo,
        ticketCode:
          typeof crypto['randomUUID'] !== 'undefined'
            ? crypto.randomUUID()
            : uuidv4(),
        resellable: {
          isResellable: false,
          price: getTicketPrice(false, false, includeHotel),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: false,
        includeHotelExtra,
      })
    }
    for (let i = 0; i < threeDayTicket; i++) {
      tickets.push({
        attendeeInfo,
        ticketCode:
          typeof crypto['randomUUID'] !== 'undefined'
            ? crypto.randomUUID()
            : uuidv4(),
        resellable: {
          isResellable: false,
          price: getTicketPrice(false, true, includeHotel),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: true,
        includeHotelExtra,
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
                  <li>Conference Ticket (March 30th)</li>
                  <li>Pre-Conference Party (March 29th)</li>
                </ul>
                <strong>Unit Price: 0.1 ETH</strong>
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
                    contritors from the DeFi and Ethereum community on March
                    30th. Great party on the night before on March 29th.
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
                  <li>Conference Ticket (March 30th)</li>
                  <li>Pre-Conference Party (March 29th)</li>
                  <li>All-day Workshops and Hackathon (March 29th)</li>
                  <li>Special Yacht Meet and Greet Pre-Party (March 28th)</li>
                </ul>
                <strong>Unit Price: 0.2 ETH</strong>
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
                    contritors from the DeFi and Ethereum community on March
                    30th. Great party on the night before on March 29th.
                    <br />
                    On March 29th, full day workshops with some of the best
                    instructors from the DeFi and Ethereum world and a hackathon
                    with more than DAI 10k cash in prize. On the 28th, you will
                    be invited to an exclusive yacht party with bbq and jetski
                    animation in Dubai Marina.
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
                <button
                  className="addHotel"
                  onClick={() => {
                    setIncludeHotel(!includeHotel)
                  }}
                >
                  {includeHotel ? 'remove hotel' : 'include hotel'}
                </button>
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
                    <div className="checkout-full-modal">
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
                                      <Form.Check
                                        type="checkbox"
                                        label="Include Hotel"
                                        onClick={handleAttendeeInfoCheck}
                                        name="includeHotelExtra"
                                        checked={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].includeHotelExtra
                                        }
                                      />
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Row>
                                    <Col xs="12" sm="6">
                                      <Form.Check
                                        type="checkbox"
                                        label="Include Workshop and pre-party"
                                        onClick={handleAttendeeInfoCheck}
                                        name="includeWorkshopsAndPreParty"
                                        checked={
                                          attendeeInfos[
                                            currentAttendeeInfoIndex
                                          ].includeWorkshopsAndPreParty
                                        }
                                      />
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
                                          <option>Select a workshop</option>
                                          <option value="1">
                                            Web3 &amp; Graph Protocol workshop
                                            with Nader Dabit
                                          </option>
                                          <option value="2">
                                            Yearn strategies workshop with Facu
                                            Ameal
                                          </option>
                                          <option value="3">
                                            Web3 workshop with Metamask team
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
                                          .includeHotelExtra
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
                                    {ethersProvider && tokenBalance ? (
                                      <span>
                                        {' | '} Current balance:{' '}
                                        {networks[currentNetwork].tokenSymbol}{' '}
                                        {tokenBalance} on{' '}
                                        {networks[currentNetwork].web3Name}
                                      </span>
                                    ) : null}
                                  </div>
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
                        {tix.ticketOption
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
