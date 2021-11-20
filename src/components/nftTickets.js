import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Img from 'gatsby-image'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
  Container,
  Modal,
  Form,
  Row,
  Col,
  Button,
  Alert,
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
  const [currentAttendeeInfoIndex, setCurrentAttendeeInfoIndex] =
    React.useState(0)

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
              href={`https://ropsten.etherscan.io/tx/${onGoingTxText.tx.hash}`}
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
      marketplace: 'https://opensea.io/assets/',
      networkInfo: {
        chainId: '0x1',
        chainName: 'Ethereum',

        blockExplorerUrls: ['https://etherscan.io/'],
      },
    },
    {
      contract: '',
      abi: abiNonEth.abi,
      marketplace: 'https://opensea.io/assets/matic/',
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
      marketplace: 'https://artion.io/explore/',
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
      contract: '0x1a0403e116aE61eAaA013a77779af72e073F674C',
      abi: abi.abi,
      token: '',
      networkInfo: {
        chainId: '0x3',
        chainName: 'Ethereum Ropsten',

        blockExplorerUrls: ['https://ropsten.etherscan.io/'],
      },
    },
    {
      contract: '0x1246799ccd360C668CBFBD992978692417B70a9A',
      abi: abi.abi,
      marketplace: 'https://testnets.opensea.io/assets/',
      token: '',
      networkInfo: { chainId: '0x4', chainName: 'Ethereum Rinkeby' },
    },
    {
      contract: '0x2C445DAaa70fc39B14cF7a37d9501aD65DbD24a8',
      abi: abiNonEth.abi,
      marketplace: 'https://testnets.opensea.io/assets/matic',
      token: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
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
      contract: '0x9769bdE6d1832a0Ba9b8eBe4Da81fC3Cbd82f577',
      abi: abiNonEth.abi,
      token: '0x6244D7f9245ad590490338db2fbEd815c2358034',
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
      contract: '0x2D65069FA23dBC7B54C6BbF0Dbef6cd1823d8E35',
      token: '',
      abi: abi.abi,
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
      contract: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      abi: abi.abi,
      token: '',
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
  const handleNetwork = async (e) => {
    let value = e.target.value
    const provider = await web3Modal.connect()
    const newProvider = new ethers.providers.Web3Provider(provider)
    const signer = newProvider.getSigner()
    const account = signer.getAddress()

    console.log(value)
    if (
      networks[value].networkInfo.chainName === 'Ethereum Ropsten' ||
      networks[value].networkInfo.chainName === 'hardhat' ||
      networks[value].networkInfo.chainName === 'Ethereum Rinkeby' ||
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
        .then((result) => {
          console.log(value)
          setCurrentNetwork(value)
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
        .then((result) => {
          console.log(value)
          setCurrentNetwork(value)
        })
    }
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
  const handleBuyButton = (e) => {
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
      buy(e)
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
        tix.includeHotelExtra
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
          diet: tix.diet,
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
        let diet = a.diet || '_'
        let tshirt = a.tshirt || '_'
        let telegram = a.telegram || '_'
        let ticketOption = getTicketOption(
          a.includeWorkshopsAndPreParty,
          a.includeHotelExtra
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
            diet: diet,
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
  const getTicketOption = (workshopsAndPreParty, hotelExtra) => {
    if (!workshopsAndPreParty && !hotelExtra) {
      return 'conference'
    } else if (!workshopsAndPreParty && hotelExtra) {
      return 'hotelConference'
    } else if (workshopsAndPreParty && !hotelExtra) {
      return 'workshopAndPreParty'
    } else if (workshopsAndPreParty && hotelExtra) {
      return 'hotelWorkshopsAndPreParty'
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
      case 'hotelWorkshopsAndPreParty':
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
    const provider = await web3Modal.connect()
    const newProvider = new ethers.providers.Web3Provider(provider)
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
          Here {svgTickets.length > 1 ? 'are' : 'is'} the NFT
          {svgTickets.length > 1 ? 'tickets' : 'ticket'} you can publicaly
          share, {svgTickets.length > 1 ? null : 'a '}
          private QR {svgTickets.length > 1 ? 'codes have' : 'code has'} been
          sent to your email to access the event,{' '}
          <a href="#tickets" onClick={generateTicketPdfs}>
            {' '}
            you can also download your QR code here
          </a>
          .
        </h3>
        {svgTickets.map((svg, i) => (
          <div>
            Your ticket NFT,{' '}
            <a
              href={`${networks[currentNetwork].marketplace}/${networks[currentNetwork].contract}/${ownerIds[i]}`}
              target="_blank"
            >
              view it on opensea
            </a>
            <img src={`${svg}`} />
          </div>
        ))}
      </>
    )
  }
  const showWarning = (error) => {
    setDisableCheckout(false)
    console.log('errorrrrr', error)
    setWarning(error.message)
    setCheckoutButtonText('Checkout')
  }

  const buy = async (e) => {
    e.preventDefault()
    setWarning('')
    setDisableCheckout(true)
    setOngoingTxText({ txText: 'connect' })
    setCheckoutButtonText('Waiting for transaction confirmation')
    const provider = await web3Modal.connect()
    const newProvider = new ethers.providers.Web3Provider(provider)
    setEthersProvider(newProvider)
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

    const txTotalPrice = await contract.totalPrice(finalTickets)

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
      diet: '',
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
  const providerOptions = {
    /* See Provider Options Section */
  }

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  })

  return (
    <>
      <section>
        <div style={{ textAlign: 'left' }}>
          <ul class="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              Conference Ticket (March 30th) 0.1 ETH + Pre-Conference Beach
              Party (March 29th)
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
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              [Conference (March 30th)] + [Workshop + Pre-Conference Beach Party
              (March 29th)] + [Special Yacht Pre-Party, Meet and Greet,
              Networking Event (March 28th)] 0.2 ETH
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
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              Total
              <span>
                <button
                  className="addHotel"
                  onClick={() => {
                    setIncludeHotel(!includeHotel)
                  }}
                >
                  {includeHotel ? 'remove hotel' : 'include hotel'}
                </button>
                {total()} ETH
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center alignb">
              <span />
              <span>
                <button
                  disabled={threeDayTicket == 0 && oneDayTicket == 0}
                  onClick={(e) => {
                    handleCheckout()
                    setSuccessPurchase(false)
                  }}
                >
                  Checkout
                </button>
              </span>
            </li>{' '}
          </ul>
        </div>
        {pdfTickets.length > 0 && (
          <button
            onClick={async () => {
              const provider = await web3Modal.connect()
              const newProvider = new ethers.providers.Web3Provider(provider)
              setEthersProvider(newProvider)
              console.log(newProvider)
              const signer = newProvider.getSigner()
              let contract = new ethers.Contract(
                networks[currentNetwork].contract,
                networks[currentNetwork].abi,
                signer
              )
              generateTicketPdfs()
            }}
          >
            Download Tickets
          </button>
        )}
        <Modal
          show={showCheckout}
          onHide={() => {
            setShowCheckout(false)
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
                    setShowCheckout(false)
                    if (window) history.pushState(null, null, '/')
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
                      className="speaker-bio-full-modal"
                      style={{ padding: '45px' }}
                    >
                      <RenderTickets />
                    </div>
                  </>
                ) : disableCheckout ? (
                  <OnGoingTxTextMessage />
                ) : (
                  <div className="">
                    <div
                      className="speaker-bio-full-modal"
                      style={{ padding: '45px' }}
                    >
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
                                    {warning}
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
                                      <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleBuyButton}
                                        disabled={disableCheckout}
                                      >
                                        {attendeeInfos.length > 1 &&
                                        currentAttendeeInfoIsNotLast()
                                          ? 'Next Ticket'
                                          : checkoutButtonText}
                                      </Button>
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
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                  <div>
                                    <span>
                                      {' '}
                                      Current ticket price: $ ETH{' '}
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
                                      Total price: $ ETH {total()}
                                    </span>
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
                      <p>{tix.ticketOption}</p>
                      <p>{tix.attendeeInfo.bio}</p>
                      <p>{tix.attendeeInfo.company}</p>
                      <p>{tix.attendeeInfo.telegram}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ fontSize: '9px' }}>
                        {networks[currentNetwork].name} {tix.tx}
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
