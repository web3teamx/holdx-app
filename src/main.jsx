import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'
import './index.css'
import App from './App.jsx'

const solanaConnectors = toSolanaWalletConnectors()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId="cmrl6tfiv003k0cjw7ljyd1l1"
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#34E39A',
          walletChainType: 'ethereum-and-solana',
          walletList: ['phantom', 'metamask', 'solflare', 'detected_ethereum_wallets', 'detected_solana_wallets'],
        },
        externalWallets: { solana: { connectors: solanaConnectors } },
        embeddedWallets: { createOnLogin: 'off' },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
