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
          // Solana: phantom + solflare (acik), Ethereum: metamask + tespit edilen EVM cuzdanlari
          // 'detected_solana_wallets' kaldirildi -> MetaMask artik Solana olarak gorunmuyor
          walletList: ['phantom', 'solflare', 'metamask', 'coinbase_wallet', 'rainbow', 'detected_ethereum_wallets'],
        },
        externalWallets: { solana: { connectors: solanaConnectors } },
        embeddedWallets: { createOnLogin: 'off' },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
