import React, {useState, useEffect } from 'react'
import { useWeb3Context } from 'web3-react';
import {getIdFromPartner} from './../config'
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import {useScript} from './../Hooks'

function App() {
    const verifyScriptUrl = 'https://verify.sendwyre.com/js/verify-module-init-beta.js'

    const[id, setId] = useState({})
    const context = useWeb3Context()
    const [loaded, error] = useScript(
        verifyScriptUrl
    );

    let accountId
    if (id.accountID !== undefined) {
        accountId = id.accountId
    } else {
        accountId = 'AC_HH3W2H9UV6D'
    }

    let filter
    if (id.blurred) {
        filter = 'blur(5px) brightness(0.9)'
    }

    // If they're using wallet connect
    if (context.active && context.connectorName === "WalletConnect") {
        if (!context.account) {
        WalletConnectQRCodeModal.open(
            context.connector.walletConnector.uri,
            () => {}
        );
        } else {
            try {
                WalletConnectQRCodeModal.close();
            } catch {}
        }
    }

    // Detect partner based on URL Fragment
    const url = window.location.href
    const query = new URLSearchParams(window.location.search)
    useEffect(() => {
        let checkLocalHostStart = url.indexOf('/') + 2
        let checkLocalHostEnd = checkLocalHostStart + 9
        let partner
        let hash = new URL(url).hash
        
        if (hash === '' && url.substring(checkLocalHostStart, checkLocalHostEnd) === 'localhost') {
            partner = 'localhost'
        } else {   
            partner = hash.substring(1, hash.length)
        }
        let res = getIdFromPartner(partner)
        setId(res)
    }, [id])

    // Connect to partner's preferred web3 wallet
    useEffect(() => {
        if (!context.active && !context.error) {
            context.setConnector(id.connector, { suppressAndThrowErrors: true }).catch(() => {})
        }
    }, [id])

    // Instantiate the widget and partner-branded page
    useEffect(() => {
        // Set favicon
        let link = document.querySelector('link[rel="shortcut icon"]') ||
        document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.id = 'favicon';
            link.rel = 'shortcut icon';
            document.head.appendChild(link);
        }
        link.href = id.favicon


        // Adding support for query parameters
        let dest
        context.active ? dest = context.account : dest = query.get('dest')

        let destCurrency
        console.log(id.destCurrency)
        id.destCurrency !== undefined ? destCurrency = id.destCurrency : destCurrency = query.get('destCurrency')

        let sourceAmount
        id.sourceAmount !== undefined ? sourceAmount = id.sourceAmount : sourceAmount = query.get('sourceAmount')

        let paymentMethod
        id.paymentMethod !== undefined ? paymentMethod = id.paymentMethod : paymentMethod = query.get('paymentMethod')

        // Set page title
        if (document.title !== id.name) {
            document.title = id.name;
        }

        // Instantiate widget
        let widget = null
        function init() {
            // debit card
            if (window.Wyre !== undefined) {
                widget = new window.Wyre({
                    accountId: accountId,
                    env: 'prod',
                    operation: {
                        type: 'debitcard',
                        dest: dest,
                        destCurrency: destCurrency,
                        sourceAmount: sourceAmount,
                        paymentMethod: paymentMethod
                    }
                });
        
                widget.on('ready', function(e) {
                    widget.open();
                })
        
                widget.on('close', function(e) {
                    init()
                })
            }
        }
        init()
    }, [loaded, error, context])

    // **HERE - trying to get the logo into the widget** 
    const classes = {
        'widget-header': {
            display: 'flex',
            backgroundColor: '#fff !important',
            backgroundImage: 'none !important',
        },
        '.text-white': {
            display: 'flex',
            color: 'transparent !important',
            background: 'url(' + id.logo + ') !important',
            backgroundRepeat: 'no-repeat !important',
            backgroundPosition: 'center !important',
            width: '100% !important'
        },
        'widget-body': {
            backgroundColor: '#fff !important'
        }
    }
    const selectedClasses = `${classes['widget-header']} ${classes['text-white']} ${classes['widget-body']}`

    return (  
        <>
            <div 
                className="App"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    overflow: 'hidden',
                    alignItems: 'center',
                    backgroundImage: 'url(' + id.background + ')',
                    filter: filter,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top'
                }}
            >        
            </div>

            {/* widget */}
            <div 
                id="wyre-dropin-widget-container"
                className={selectedClasses}
            >
            </div>
        </>
    );
}

export default App;
