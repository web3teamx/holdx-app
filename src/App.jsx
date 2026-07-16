import { useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useWallets as useSolanaWallets } from '@privy-io/react-auth/solana'
import './holdx.css'
import { initHoldx } from './holdxApp.js'
import { supabase } from './supabase.js'
import { HELIUS_RPC } from './config.js'

export default function App() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()
  const { wallets: solWallets } = useSolanaWallets()

  useEffect(() => { initHoldx() }, [])

  useEffect(() => {
    window.__privyLogin = login
    window.__privyLogout = logout

    window.__holdxLoadProfile = async (wallet) => {
      const { data } = await supabase.from('profiles').select('*').eq('wallet', wallet).maybeSingle()
      return data
    }
    window.__holdxSaveProfile = async (p) => { await supabase.from('profiles').upsert(p, { onConflict: 'wallet' }) }
    // PUANLAR
    window.__holdxAddPoints = async (wallet, val) => {
      // mevcut puani al, uzerine ekle
      const { data } = await supabase.from('points').select('total').eq('wallet', wallet).maybeSingle()
      const current = (data && data.total) || 0
      await supabase.from('points').upsert({ wallet, total: current + val, updated_at: new Date().toISOString() }, { onConflict: 'wallet' })
    }
    window.__holdxLoadPoints = async (wallet) => {
      const { data } = await supabase.from('points').select('total').eq('wallet', wallet).maybeSingle()
      if (data && window.__holdxSetPoints) window.__holdxSetPoints(data.total || 0)
    }

    window.__holdxSearchProfiles = async (q) => {
      const term = (q || '').trim()
      if (term.length < 2) return []
      // isim veya cuzdan adresinde ara
      const { data } = await supabase.from('profiles').select('wallet,display_name,avatar')
        .or('display_name.ilike.%' + term + '%,wallet.ilike.%' + term + '%').limit(6)
      return data || []
    }
    window.__holdxSavePost = async (p) => { await supabase.from('posts').insert(p) }
    window.__holdxSaveRoom = async (r) => { await supabase.from('rooms').upsert(r, { onConflict: 'ticker' }) }
    window.__holdxDeleteRoom = async (ticker) => {
      await supabase.from('rooms').delete().eq('ticker', ticker)
      await supabase.from('room_members').delete().eq('ticker', ticker)
      await supabase.from('messages').delete().eq('ticker', ticker)
    }
    window.__holdxUpdateRoom = async (ticker, fields) => { await supabase.from('rooms').update(fields).eq('ticker', ticker) }

    window.__holdxJoinRoom = async (ticker, wallet, memberCount) => {
      await supabase.from('room_members').upsert({ ticker, wallet }, { onConflict: 'ticker,wallet' })
      await supabase.from('rooms').update({ members: memberCount }).eq('ticker', ticker)
    }
    window.__holdxLeaveRoom = async (ticker, wallet, memberCount) => {
      await supabase.from('room_members').delete().eq('ticker', ticker).eq('wallet', wallet)
      await supabase.from('rooms').update({ members: memberCount }).eq('ticker', ticker)
    }

    // GERCEK CUZDAN BAKIYESI (Solana - Helius). ETH sonra Alchemy key ile eklenecek.
    window.__holdxLoadBalances = async (address) => {
      // ETH adresi (0x) ise simdilik bakiye cekme (sonra Alchemy ile)
      if (address.startsWith('0x')) return
      const holdings = {}
      try {
        const solRes = await fetch(HELIUS_RPC, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBalance', params: [address] })
        })
        const solJson = await solRes.json()
        const sol = solJson.result ? solJson.result.value / 1e9 : 0
        try {
          const aRes = await fetch(HELIUS_RPC, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getAssetsByOwner',
              params: { ownerAddress: address, page: 1, limit: 100, displayOptions: { showFungible: true } } })
          })
          const aJson = await aRes.json()
          const items = (aJson.result && aJson.result.items) || []
          items.forEach(it => {
            if (it.interface === 'FungibleToken' || it.interface === 'FungibleAsset') {
              const info = it.token_info || {}
              const sym = (info.symbol || '').toUpperCase()
              if (sym && info.balance) {
                const amt = info.balance / Math.pow(10, info.decimals || 0)
                if (amt > 0) holdings[sym] = { amount: amt, mint: it.id, name: (it.content && it.content.metadata && it.content.metadata.name) || '' }
              }
            }
          })
        } catch (e) {}
        holdings['SOL'] = { amount: sol, mint: null, name: 'Solana' }
        if (window.__holdxApplyBalances) window.__holdxApplyBalances({ sol, solSymbol: 'SOL', holdings })
      } catch (e) { console.log('bakiye hatasi', e) }
    }
    // MESAJLAR
    window.__holdxSendMessage = async (m) => { await supabase.from('messages').insert(m) }
    // DM
    window.__holdxSendDM = async (m) => { await supabase.from('dms').insert(m) }
    window.__holdxLoadThreads = async () => {
      const me = window.__holdxMyAddress
      if (!me) return
      const { data } = await supabase.from('dms').select('*')
        .or('from_wallet.eq.' + me + ',to_wallet.eq.' + me)
        .order('created_at', { ascending: false }).limit(500)
      if (!data) return
      const seen = {}
      const threads = []
      data.forEach(m => {
        const peer = m.from_wallet === me ? m.to_wallet : m.from_wallet
        if (!seen[peer]) { seen[peer] = true; threads.push({ peer, last: m.text || '' }) }
      })
      if (window.__holdxApplyThreads) window.__holdxApplyThreads(threads)
      // isimleri de yukle
      const ws = threads.map(t => t.peer)
      if (ws.length) {
        const { data: profs } = await supabase.from('profiles').select('wallet,display_name').in('wallet', ws)
        if (profs && window.__holdxApplyNames) {
          const map = {}; profs.forEach(p => { if (p.display_name) map[p.wallet] = p.display_name }); window.__holdxApplyNames(map)
        }
      }
    }
    window.__holdxLoadDMs = async (peer) => {
      const me = window.__holdxMyAddress
      if (!me) return
      const { data } = await supabase.from('dms').select('*')
        .or('and(from_wallet.eq.' + me + ',to_wallet.eq.' + peer + '),and(from_wallet.eq.' + peer + ',to_wallet.eq.' + me + ')')
        .order('created_at', { ascending: true }).limit(200)
      if (data && window.__holdxApplyDMs) window.__holdxApplyDMs(peer, data)
    }
    window.__holdxLoadMessages = async (ticker) => {
      const { data } = await supabase.from('messages').select('*').eq('ticker', ticker).order('created_at', { ascending: true }).limit(500)
      if (data && window.__holdxSetMessages) window.__holdxSetMessages(ticker, data)
    }

    // GERCEK ZAMANLI: yeni mesajlari dinle
    const msgChannel = supabase
      .channel('messages-all')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        if (window.__holdxAddMessage) window.__holdxAddMessage(payload.new)
      })
      .subscribe()

    // GERCEK ZAMANLI: odalar (yeni oda, silme, uye sayisi degisimi)
    const dmChannel = supabase
      .channel('dms-all')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dms' }, (payload) => {
        if (window.__holdxAddDM) window.__holdxAddDM(payload.new)
      })
      .subscribe()

    const roomChannel = supabase
      .channel('rooms-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new && window.__holdxPushActivity) {
          window.__holdxPushActivity({ type: 'create', token: payload.new.ticker, chain: payload.new.chain || 'solana', wallet: (payload.new.creator || '').slice(0, 6) })
        }
        supabase.from('rooms').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && window.__holdxApplyRooms) window.__holdxApplyRooms(data)
        })
      })
      .subscribe()

    // uyelik: katilim aktivitesi
    const memberChannel = supabase
      .channel('members-all')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'room_members' }, (payload) => {
        if (payload.new && window.__holdxPushActivity) {
          window.__holdxPushActivity({ type: 'join', token: payload.new.ticker, chain: 'solana', wallet: (payload.new.wallet || '').slice(0, 6) })
        }
      })
      .subscribe()

    const loadNamesFor = async (walletList) => {
      if (!walletList.length) return
      const { data } = await supabase.from('profiles').select('wallet,display_name').in('wallet', walletList)
      if (data && window.__holdxApplyNames) {
        const map = {}
        data.forEach(r => { if (r.display_name) map[r.wallet] = r.display_name })
        window.__holdxApplyNames(map)
      }
    }
    const loadPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(100)
      if (data && window.__holdxApplyPosts) {
        window.__holdxApplyPosts(data)
        loadNamesFor([...new Set(data.map(p => p.wallet))])
      }
    }
    const loadRooms = async () => {
      const { data } = await supabase.from('rooms').select('*').order('created_at', { ascending: false })
      if (data && window.__holdxApplyRooms) window.__holdxApplyRooms(data)
    }
    loadPosts()
    loadRooms()

    return () => { supabase.removeChannel(msgChannel); supabase.removeChannel(roomChannel); supabase.removeChannel(memberChannel); supabase.removeChannel(dmChannel) }
  }, [login, logout])

  useEffect(() => {
    if (!ready) return
    // adresi once Solana cuzdanindan, yoksa EVM'den, yoksa user.wallet'tan al
    let address = null
    if (solWallets && solWallets.length > 0) address = solWallets[0].address
    else if (wallets && wallets.length > 0) address = wallets[0].address
    else if (user && user.wallet && user.wallet.address) address = user.wallet.address

    if (authenticated && address) {
      window.__holdxMyAddress = address
      if (window.__holdxSetWallet) window.__holdxSetWallet(address)
      supabase.from('room_members').select('ticker').eq('wallet', address).then(({ data }) => {
        if (data && window.__holdxApplyMemberships) window.__holdxApplyMemberships(data.map(r => r.ticker))
      })
      if (window.__holdxLoadPoints) window.__holdxLoadPoints(address)
      // admin ise siralamayi yukle
      if (address === 'AFdRQtXzEqomxVbT21aXb8JoYpc93q6tFYnWmUkS8EQx') {
        supabase.from('points').select('wallet,total').order('total', { ascending: false }).limit(100).then(({ data }) => {
          if (data && window.__holdxApplyLeaderboard) {
            window.__holdxApplyLeaderboard(data)
            // isimleri de yukle
            const ws = data.map(r => r.wallet)
            if (ws.length) supabase.from('profiles').select('wallet,display_name').in('wallet', ws).then(({ data: profs }) => {
              if (profs && window.__holdxApplyNames) {
                const map = {}
                profs.forEach(p => { if (p.display_name) map[p.wallet] = p.display_name })
                window.__holdxApplyNames(map)
              }
            })
          }
        })
      }
    } else if (!authenticated) {
      if (window.__holdxSetWallet) window.__holdxSetWallet(null)
    }
  }, [ready, authenticated, wallets, solWallets, user])

  return <div id="app" className="hx"></div>
}
