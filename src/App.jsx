import { useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useWallets as useSolanaWallets } from '@privy-io/react-auth/solana'
import './holdx.css'
import { initHoldx } from './holdxApp.js'
import { supabase } from './supabase.js'
import { HELIUS_RPC, ALCHEMY_RPC } from './config.js'

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
    // base64 görseli Supabase Storage'a yükle, URL döndür (DB şişmesin, hızlı olsun)
    const uploadImage = async (dataUrl, wallet, kind) => {
      if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl  // zaten URL ise dokunma
      try {
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        const ext = (blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
        const path = `${wallet}/${kind}.${ext}`
        const { error } = await supabase.storage.from('avatars').upload(path, blob, { upsert: true, contentType: blob.type, cacheControl: '3600' })
        if (error) { console.log('yukleme hatasi', error); return dataUrl }
        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        return data.publicUrl + '?v=' + Date.now()
      } catch (e) { console.log('gorsel hatasi', e); return dataUrl }
    }
    window.__holdxSaveProfile = async (p) => {
      const out = { ...p }
      if (p.avatar) out.avatar = await uploadImage(p.avatar, p.wallet, 'avatar')
      if (p.cover) out.cover = await uploadImage(p.cover, p.wallet, 'cover')
      await supabase.from('profiles').upsert(out, { onConflict: 'wallet' })
      // yerel görüntüyü de URL'e çevir
      if (window.__holdxApplyOwnProfileUrls) window.__holdxApplyOwnProfileUrls(out.avatar, out.cover)
    }
    // KURUCU KİLOMETRE TAŞI BONUSU: oda her 100 üyede kurucuya 10 puan (her eşik 1 kez)
    window.__holdxAwardCreatorMilestone = async (ticker, creator, milestone) => {
      try {
        // bu oda için daha önce ödüllenmiş en yüksek eşiği points_meta'da tut
        const key = 'milestone:' + ticker
        const { data: meta } = await supabase.from('points_meta').select('value').eq('wallet', creator).eq('key', key).maybeSingle()
        const prev = meta ? parseInt(meta.value) || 0 : 0
        if (milestone <= prev) return
        const gained = (milestone - prev) * 10   // her yeni 100 için 10 puan
        // puanı ekle
        const { data: p } = await supabase.from('points').select('total').eq('wallet', creator).maybeSingle()
        const cur = (p && p.total) || 0
        await supabase.from('points').upsert({ wallet: creator, total: cur + gained, updated_at: new Date().toISOString() }, { onConflict: 'wallet' })
        // eşiği kaydet
        await supabase.from('points_meta').upsert({ wallet: creator, key, value: String(milestone) }, { onConflict: 'wallet,key' })
      } catch (e) { console.log('milestone hatasi', e) }
    }

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
    window.__holdxSavePost = async (p, tempId) => {
      const { data } = await supabase.from('posts').insert(p).select().single()
      // geçici id'yi gerçek uuid ile değiştir (yorum/beğeni hemen çalışsın)
      if (data && tempId != null && window.__holdxFixPostId) window.__holdxFixPostId(tempId, data.id, data.created_at)
    }
    window.__holdxDeletePost = async (id) => { await supabase.from('posts').delete().eq('id', id) }
    // ETKILESIMLER
    window.__holdxToggleLike = async (postId, wallet, on) => {
      if (on) await supabase.from('likes').upsert({ post_id: postId, wallet }, { onConflict: 'post_id,wallet' })
      else await supabase.from('likes').delete().eq('post_id', postId).eq('wallet', wallet)
    }
    window.__holdxToggleRepost = async (postId, wallet, on) => {
      if (on) await supabase.from('reposts').upsert({ post_id: postId, wallet }, { onConflict: 'post_id,wallet' })
      else await supabase.from('reposts').delete().eq('post_id', postId).eq('wallet', wallet)
    }
    window.__holdxSaveComment = async (c) => { await supabase.from('comments').insert(c) }
    window.__holdxToggleCommentLike = async (commentId, wallet, on) => {
      if (on) await supabase.from('comment_likes').upsert({ comment_id: commentId, wallet }, { onConflict: 'comment_id,wallet' })
      else await supabase.from('comment_likes').delete().eq('comment_id', commentId).eq('wallet', wallet)
    }

    // TOKEN HOLDER SAYISI (Helius, sadece Solana)
    const holderCache = {}
    window.__holdxLoadHolders = async (ticker, mint) => {
      if (!mint || mint.startsWith('0x')) return
      if (holderCache[ticker] !== undefined) { if (window.__holdxApplyHolders) window.__holdxApplyHolders({ [ticker]: holderCache[ticker] }); return }
      try {
        let total = 0, page = 1
        while (page <= 3) {
          const r = await fetch(HELIUS_RPC, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getTokenAccounts', params: { mint, limit: 1000, page } })
          })
          const j = await r.json()
          const arr = (j.result && j.result.token_accounts) || []
          total += arr.filter(a => a.amount && Number(a.amount) > 0).length
          if (arr.length < 1000) break
          page++
        }
        holderCache[ticker] = total
        if (window.__holdxApplyHolders) window.__holdxApplyHolders({ [ticker]: total })
      } catch (e) { console.log('holder hatasi', e) }
    }

    // BILDIRIMLER
    window.__holdxNotify = async (n) => { await supabase.from('notifications').insert(n) }
    window.__holdxLoadNotifications = async () => {
      const me = window.__holdxMyAddress
      if (!me) return
      const { data } = await supabase.from('notifications').select('*').eq('wallet', me).order('created_at', { ascending: false }).limit(50)
      if (data && window.__holdxApplyNotifications) {
        window.__holdxApplyNotifications(data)
        const fw = [...new Set(data.map(n => n.from_wallet))]
        if (fw.length) { loadNamesFor(fw); loadAvatarsFor(fw) }
      }
    }
    window.__holdxMarkNotifRead = async () => {
      const me = window.__holdxMyAddress
      if (!me) return
      await supabase.from('notifications').update({ read: true }).eq('wallet', me).eq('read', false)
    }

    // TAKIP
    window.__holdxToggleFollow = async (me, target, on) => {
      if (on) await supabase.from('follows').upsert({ follower: me, following: target }, { onConflict: 'follower,following' })
      else await supabase.from('follows').delete().eq('follower', me).eq('following', target)
    }
    window.__holdxLoadFollows = async (me) => {
      const { data } = await supabase.from('follows').select('follower,following')
      if (!data) return
      const following = [], followerCounts = {}, followingCounts = {}
      data.forEach(r => {
        followerCounts[r.following] = (followerCounts[r.following] || 0) + 1
        followingCounts[r.follower] = (followingCounts[r.follower] || 0) + 1
        if (me && r.follower === me) following.push(r.following)
      })
      if (window.__holdxApplyFollows) window.__holdxApplyFollows({ following, followerCounts, followingCounts })
    }
    let lastPostIds = []
    const refreshInteractions = () => { if (lastPostIds.length) loadInteractions(lastPostIds) }
    const loadInteractions = async (postIds) => {
      lastPostIds = postIds
      if (!postIds.length) return
      const me = window.__holdxMyAddress
      const [lk, rp, cm] = await Promise.all([
        supabase.from('likes').select('post_id,wallet').in('post_id', postIds),
        supabase.from('reposts').select('post_id,wallet').in('post_id', postIds),
        supabase.from('comments').select('id,post_id,wallet,text,parent_id,created_at').in('post_id', postIds).order('created_at', { ascending: true })
      ])
      const likes = {}, myLikes = [], reposts = {}, myReposts = [], comments = {}
      ;(lk.data || []).forEach(r => { const k = String(r.post_id); likes[k] = (likes[k] || 0) + 1; if (me && r.wallet === me) myLikes.push(k) })
      ;(rp.data || []).forEach(r => { const k = String(r.post_id); reposts[k] = (reposts[k] || 0) + 1; if (me && r.wallet === me) myReposts.push(k) })
      ;(cm.data || []).forEach(r => { const k = String(r.post_id); (comments[k] = comments[k] || []).push({ id: r.id, wallet: r.wallet, text: r.text, created_at: r.created_at, parent_id: r.parent_id }) })
      // yorum begenileri
      const cids = (cm.data || []).map(r => r.id)
      if (cids.length) {
        const { data: cl } = await supabase.from('comment_likes').select('comment_id,wallet').in('comment_id', cids)
        const clCount = {}, myCl = []
        ;(cl || []).forEach(r => { const k = String(r.comment_id); clCount[k] = (clCount[k] || 0) + 1; if (me && r.wallet === me) myCl.push(k) })
        Object.keys(comments).forEach(pk => {
          comments[pk] = comments[pk].map(c => ({ ...c, likes: clCount[String(c.id)] || 0, liked: myCl.indexOf(String(c.id)) >= 0 }))
        })
      }
      if (window.__holdxApplyInteractions) window.__holdxApplyInteractions({ likes, myLikes, reposts, myReposts, comments })
      // yorum yazanlarin avatar/isimleri
      const cw = [...new Set((cm.data || []).map(r => r.wallet))]
      if (cw.length) { loadNamesFor(cw); loadAvatarsFor(cw) }
    }
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
      const holdings = {}
      // ETH adresi (0x) → Alchemy
      if (address.startsWith('0x')) {
        try {
          const r = await fetch(ALCHEMY_RPC, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getBalance', params: [address, 'latest'] })
          })
          const j = await r.json()
          const eth = j.result ? parseInt(j.result, 16) / 1e18 : 0
          holdings['ETH'] = { amount: eth, mint: null, name: 'Ethereum' }
          // ERC-20 tokenler
          try {
            const tRes = await fetch(ALCHEMY_RPC, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'alchemy_getTokenBalances', params: [address] })
            })
            const tJson = await tRes.json()
            const balances = (tJson.result && tJson.result.tokenBalances) || []
            const nonZero = balances.filter(tb => tb.tokenBalance && parseInt(tb.tokenBalance, 16) > 0).slice(0, 30)
            for (const tb of nonZero) {
              try {
                const mRes = await fetch(ALCHEMY_RPC, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'alchemy_getTokenMetadata', params: [tb.contractAddress] })
                })
                const mJson = await mRes.json()
                const meta = mJson.result || {}
                const sym = (meta.symbol || '').toUpperCase()
                if (sym) {
                  const amt = parseInt(tb.tokenBalance, 16) / Math.pow(10, meta.decimals || 18)
                  if (amt > 0) holdings[sym] = { amount: amt, mint: tb.contractAddress, name: meta.name || '' }
                }
              } catch (e) {}
            }
          } catch (e) {}
          if (window.__holdxApplyBalances) window.__holdxApplyBalances({ sol: eth, solSymbol: 'ETH', holdings })
        } catch (e) { console.log('eth bakiye hatasi', e) }
        return
      }
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
    window.__holdxSendDM = async (m) => {
      await supabase.from('dms').insert(m)
      await supabase.from('notifications').insert({ wallet: m.to_wallet, type: 'dm', from_wallet: m.from_wallet, text: m.text })
    }
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
      // son 50 mesaj (en yeniler), eskiye dogru sirala
      const { data } = await supabase.from('messages').select('*').eq('ticker', ticker).order('created_at', { ascending: false }).limit(50)
      if (data) data.reverse()
      if (data && window.__holdxSetMessages) window.__holdxSetMessages(ticker, data)
    }

    // GERCEK ZAMANLI (DAR): sadece ACIK olan odanin mesajlari
    let roomMsgChannel = null
    window.__holdxSubscribeRoom = (ticker) => {
      if (roomMsgChannel) { supabase.removeChannel(roomMsgChannel); roomMsgChannel = null }
      if (!ticker) return
      roomMsgChannel = supabase
        .channel('room-msg-' + ticker)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'ticker=eq.' + ticker }, (payload) => {
          if (window.__holdxAddMessage) window.__holdxAddMessage(payload.new)
        })
        .subscribe()
    }

    // GERCEK ZAMANLI: odalar (yeni oda, silme, uye sayisi degisimi)
    // DM: sadece BANA gelenler — cüzdan bağlanınca kurulur
    let dmChannel = null
    window.__holdxSubscribeDM = (me) => {
      if (dmChannel) { supabase.removeChannel(dmChannel); dmChannel = null }
      if (!me) return
      dmChannel = supabase
        .channel('dms-me-' + me.slice(0, 8))
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dms', filter: 'to_wallet=eq.' + me }, (payload) => {
          if (window.__holdxAddDM) window.__holdxAddDM(payload.new)
        })
        .subscribe()
    }

    let notifChannel = null
    window.__holdxSubscribeNotif = (me) => {
      if (notifChannel) { supabase.removeChannel(notifChannel); notifChannel = null }
      if (!me) return
      notifChannel = supabase
        .channel('notif-me-' + me.slice(0, 8))
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: 'wallet=eq.' + me }, (payload) => {
          if (window.__holdxAddNotification) window.__holdxAddNotification(payload.new)
        })
        .subscribe()
    }

    // etkilesimler gercek zamanli (begeni/yorum/rt)
    // Etkileşimler: her olayda sorgu atmak yerine 3 sn'de bir toplu yenile
    let interTimer = null
    const throttledRefresh = () => {
      if (interTimer) return
      interTimer = setTimeout(() => { interTimer = null; refreshInteractions() }, 3000)
    }
    const interChannel = supabase
      .channel('inter-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'likes' }, throttledRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, throttledRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reposts' }, throttledRefresh)
      .subscribe()

    let roomTimer = null
    const roomChannel = supabase
      .channel('rooms-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new && window.__holdxPushActivity) {
          window.__holdxPushActivity({ type: 'create', token: payload.new.ticker, chain: payload.new.chain || 'solana', wallet: (payload.new.creator || '').slice(0, 6) })
        }
        if (roomTimer) return
        roomTimer = setTimeout(() => { roomTimer = null; loadRooms() }, 3000)
      })
      .subscribe()

    // uyelik: katilim aktivitesi
    const memberChannel = supabase
      .channel('members-all')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'room_members' }, (payload) => {
        if (payload.new) {
          if (window.__holdxPushActivity) window.__holdxPushActivity({ type: 'join', token: payload.new.ticker, chain: 'solana', wallet: (payload.new.wallet || '').slice(0, 6) })
          if (window.__holdxUpdateMemberCount) window.__holdxUpdateMemberCount(payload.new.ticker, 1)
        }
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'room_members' }, (payload) => {
        if (payload.old && window.__holdxUpdateMemberCount) window.__holdxUpdateMemberCount(payload.old.ticker, -1)
      })
      .subscribe()

    const loadNamesFor = async (walletList) => {
      if (!walletList.length) return
      const { data } = await supabase.from('profiles').select('wallet,display_name,avatar').in('wallet', walletList)
      if (data) {
        const map = {}, avaMap = {}
        data.forEach(r => { if (r.display_name) map[r.wallet] = r.display_name; if (r.avatar) avaMap[r.wallet] = r.avatar })
        if (window.__holdxApplyNames) window.__holdxApplyNames(map)
        if (window.__holdxApplyAvatars) window.__holdxApplyAvatars(avaMap)
      }
    }
    const loadAvatarsFor = async (walletList) => {
      if (!walletList.length) return
      const { data } = await supabase.from('profiles').select('wallet,avatar').in('wallet', walletList)
      if (data && window.__holdxApplyAvatars) {
        const avaMap = {}
        data.forEach(r => { if (r.avatar) avaMap[r.wallet] = r.avatar })
        window.__holdxApplyAvatars(avaMap)
      }
    }
    // Bir kullanicinin kendi paylasimlarini cek (profil sayfasi icin)
    window.__holdxLoadUserPosts = async (wallet) => {
      const { data } = await supabase.from('posts').select('*').eq('wallet', wallet).order('created_at', { ascending: false }).limit(50)
      if (data && data.length && window.__holdxApplyPosts) {
        window.__holdxApplyPosts(data)
        loadInteractions(data.map(p => p.id))
      }
    }
    let postOffset = 0
    const PAGE = 20
    window.__holdxLoadMorePosts = async () => {
      postOffset += PAGE
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).range(postOffset, postOffset + PAGE - 1)
      if (data && data.length && window.__holdxApplyPosts) {
        window.__holdxApplyPosts(data)
        const ws = [...new Set(data.map(p => p.wallet))]
        loadNamesFor(ws); loadAvatarsFor(ws)
        loadInteractions(data.map(p => p.id))
      }
      if (window.__holdxSetMoreState) window.__holdxSetMoreState(!!(data && data.length === PAGE))
    }
    const loadPosts = async () => {
      postOffset = 0
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(PAGE)
      if (data && window.__holdxApplyPosts) {
        window.__holdxApplyPosts(data)
        const ws = [...new Set(data.map(p => p.wallet))]
        loadNamesFor(ws)
        loadAvatarsFor(ws)
        loadInteractions(data.map(p => p.id))
        if (window.__holdxSetMoreState) window.__holdxSetMoreState(data.length === PAGE)
      }
    }
    const loadRooms = async () => {
      const { data } = await supabase.from('rooms').select('*').order('created_at', { ascending: false })
      if (!data) return
      // gercek uye sayisini room_members'tan hesapla
      const { data: mem } = await supabase.from('room_members').select('ticker')
      const counts = {}
      ;(mem || []).forEach(m => { counts[m.ticker] = (counts[m.ticker] || 0) + 1 })
      const fixed = data.map(r => ({ ...r, members: counts[r.ticker] || 0 }))
      if (window.__holdxApplyRooms) window.__holdxApplyRooms(fixed)
      // kurucu isimleri (oda aramasında isimle bulunabilsin)
      const creators = [...new Set(fixed.map(r => r.creator).filter(Boolean))]
      if (creators.length) { loadNamesFor(creators); loadAvatarsFor(creators) }
    }
    loadPosts()
    loadRooms()

    return () => { if (roomMsgChannel) supabase.removeChannel(roomMsgChannel); if (dmChannel) supabase.removeChannel(dmChannel); if (notifChannel) supabase.removeChannel(notifChannel); supabase.removeChannel(roomChannel); supabase.removeChannel(memberChannel); supabase.removeChannel(interChannel) }
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
      if (window.__holdxSubscribeDM) window.__holdxSubscribeDM(address)
      if (window.__holdxSubscribeNotif) window.__holdxSubscribeNotif(address)
      if (window.__holdxSetWallet) window.__holdxSetWallet(address)
      supabase.from('room_members').select('ticker').eq('wallet', address).then(({ data }) => {
        if (data && window.__holdxApplyMemberships) window.__holdxApplyMemberships(data.map(r => r.ticker))
      })
      if (window.__holdxLoadPoints) window.__holdxLoadPoints(address)
      if (window.__holdxLoadFollows) window.__holdxLoadFollows(address)
      if (window.__holdxLoadNotifications) window.__holdxLoadNotifications()
      // admin ise siralamayi yukle (fonksiyon: tekrar cagrilabilir)
      if (address === 'AFdRQtXzEqomxVbT21aXb8JoYpc93q6tFYnWmUkS8EQx') {
        window.__holdxLoadLeaderboard = async () => {
          const { data } = await supabase.from('points').select('wallet,total').order('total', { ascending: false }).limit(100)
          if (data && window.__holdxApplyLeaderboard) {
            window.__holdxApplyLeaderboard(data)
            const ws = data.map(r => r.wallet)
            if (ws.length) {
              const { data: profs } = await supabase.from('profiles').select('wallet,display_name,avatar').in('wallet', ws)
              if (profs) {
                const map = {}, av = {}
                profs.forEach(p => { if (p.display_name) map[p.wallet] = p.display_name; if (p.avatar) av[p.wallet] = p.avatar })
                if (window.__holdxApplyNames) window.__holdxApplyNames(map)
                if (window.__holdxApplyAvatars) window.__holdxApplyAvatars(av)
              }
            }
          }
        }
        window.__holdxLoadLeaderboard()
        // puanlar degistikce anlik guncelle (kanal bir kez kurulur)
        if (!window.__lbChannelSet) {
          window.__lbChannelSet = true
          supabase
            .channel('points-lb')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'points' }, () => {
              if (window.__holdxLoadLeaderboard) window.__holdxLoadLeaderboard()
            })
            .subscribe()
        }
      }
    } else if (!authenticated) {
      if (window.__holdxSetWallet) window.__holdxSetWallet(null)
    }
  }, [ready, authenticated, wallets, solWallets, user])

  return <div id="app" className="hx"></div>
}
