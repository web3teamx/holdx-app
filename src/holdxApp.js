// PODCTO uygulaması — React icin sarmalanmis surum
// Bu dosya, calisir prototipin tam JavaScript kodunu icerir.
export function initHoldx(){
  if (window.__holdx_inited) return;
  window.__holdx_inited = true;

const BRAND="PODCTO", TAGLINE="The social layer for crypto intelligence";
const FEEDBACK_EMAIL="feedback@holdx.app"; // ← gerçek e-posta adresinle değiştir
// Oda kapasite kademeleri: [kapasite, toplam fiyat $]. 100 bedava.
const CAP_TIERS=[
 {cap:100,   price:0},
 {cap:500,   price:3},
 {cap:1000,  price:5},
 {cap:5000,  price:10},
 {cap:10000, price:30},
 {cap:20000, price:60},
 {cap:30000, price:100},
 {cap:Infinity, price:250}, // unlimited — members sınırı yok
];
function capLabel(n){return n===Infinity?"∞":n>=1000?(n/1000)+"K":(""+n);}
function capName(n){return n===Infinity?"Unlimited":capLabel(n);}
function tierForCap(cap){return CAP_TIERS.find(t=>t.cap===cap)||CAP_TIERS[0];}
function nextTiers(cap){return CAP_TIERS.filter(t=>t.cap>cap);} // yükseltme seçenekleri

const I={
 home:'<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
 trend:'<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
 waves:'<svg viewBox="0 0 24 24"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
 wallet:'<svg viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h3v-4z"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
 heartf:'<svg viewBox="0 0 24 24" style="fill:currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
 reply:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-4-1L3 21l1.1-4.9a8.4 8.4 0 0 1 4-11.6 8.4 8.4 0 0 1 12.9 7.1z"/></svg>',
 repost:'<svg viewBox="0 0 24 24"><path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 23-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
 badge:'<svg viewBox="0 0 24 24"><path d="M12 2 9.8 4.2 6.7 4l-.9 3-2.7 1.5L4.5 12l-1.4 3.5 2.7 1.5.9 3 3.1-.2L12 22l2.2-2.2 3.1.2.9-3 2.7-1.5L21.5 12l1.4-3.5-2.7-1.5-.9-3-3.1.2z"/><path d="m9 12 2 2 4-4"/></svg>',
 lock:'<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
 globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
 up:'<svg viewBox="0 0 24 24"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
 down:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
 copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
 sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 smile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>',
 image:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
 gif:'<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M7 9v6M7 9h-.5M11 9v6M15 9h2M15 12h1.5M15 9v6"/></svg>',
 x:'<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
 user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
 camera:'<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
 edit:'<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
 gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
 share:'<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
 twitter:'<svg viewBox="0 0 24 24"><path d="M18 2h3l-7.5 8.5L22 22h-6.8l-5-6.5L4 22H1l8-9L2 2h6.8l4.5 6z"/></svg>',
 dots:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>',
 exit:'<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
 trash:'<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>',
};

function tokColor(t){let h=0;for(let i=0;i<t.length;i++)h=(h*37+t.charCodeAt(i))%360;return`hsl(${h} 72% 58%)`;}

/* Artık statik "top 50" listesi YOK. Tokenlar uygulamaya ancak arayıp seçilince/oda kurulunca girer.
   Her kayıt live veri kaynağından gelir → gerçek fiyat + contract address taşır (adresle fiyat %100 doğru çekilir).
   Aşağısı sadece DEMO cüzdan bakiyesinin gösterilebilmesi için ekilmiş birkaç örnek token. */
const TOKREG={
 SOL:{t:"SOL",name:"Solana",price:0,chg:0,mc:"—",color:tokColor("SOL"),address:"So11111111111111111111111111111111111111112",chain:"solana",cgId:"solana",official:true},
 BTC:{t:"BTC",name:"Bitcoin",price:0,chg:0,mc:"—",color:tokColor("BTC"),chain:"bitcoin",cgId:"bitcoin",official:true},
 BNB:{t:"BNB",name:"BNB",price:0,chg:0,mc:"—",color:tokColor("BNB"),chain:"bsc",cgId:"binancecoin",official:true},
 XRP:{t:"XRP",name:"XRP",price:0,chg:0,mc:"—",color:tokColor("XRP"),chain:"xrp",cgId:"ripple",official:true},
 BONK:{t:"BONK",name:"Bonk",price:0.0000231,chg:8.1,mc:"1.6B",color:tokColor("BONK"),address:"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",chain:"solana"},
 POPCAT:{t:"POPCAT",name:"Popcat",price:0.91,chg:12.7,mc:"894M",color:tokColor("POPCAT"),address:"7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",chain:"solana"},
 ETH:{t:"ETH",name:"Ethereum",price:0,chg:0,mc:"—",color:tokColor("ETH"),chain:"ethereum",address:"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",source:"dex",cgId:"ethereum",official:true},
};

const MY_HOLDINGS={
 SOL:{amount:14.2,buyAvg:151.0},
 BONK:{amount:38000000,buyAvg:0.0000198},
 POPCAT:{amount:210,buyAvg:1.04},
};

const S={
 connected:false, wallet:null, view:{name:"feed",token:null}, tick:0, filter:"ALL",
 feedDrop:false, feedSearch:"",
 posts:[],
 customRooms:[],
 chat:{},
 copied:false, modal:null, livePrices:{}, hideWhale:false, theme:"dark", entered:false,
 topSearch:"", topSearchOpen:false, topResults:[], topProfiles:[], topSearching:false, shareOpen:null, postMenu:null, leaderboard:[], dms:{}, dmText:"", dmThreads:[], unreadDM:0, unreadPeers:{}, notifications:[], unreadNotif:0, copiedAddr:null, rtMenu:null, quoting:null, replyTo:null, holderCounts:{}, walletMenu:false, hasMorePosts:false, loadingMore:false, chainFilter:"all",
 commentText:"", prevView:null, roomMenu:null, leaveConfirm:null, deleteConfirm:null, sharePostId:null, lightbox:null,
 profile:{name:"", bio:"", avatar:null, cover:null, joined:new Date().toLocaleString("en-US",{month:"short",year:"numeric"})}, crop:null,
 following:{}, followers:0, followerCounts:{}, followingCounts:{}, editProfile:false, profileTab:"posts",
 pts:0, ptsLog:{}, ptsDay:{}, ptsDayKey:"",
 hideValue:false, hideActivity:false, privateProfile:false, docOpen:null, feedbackOpen:false,
 emojiFor:null, postMedia:null, chatMedia:null, gifQuery:"", gifFor:null, gifResults:[], composerText:"", chatText:"", names:{}, avatars:{},
 activity:[],
 joined:{}, roomSearch:"",
 roomTab:"browse", createTicker:"", createDone:null, createCap:100, upgradeOpen:null, createHoldError:false,
 searchResults:[], searching:false, searchErr:false, picked:null,
 feedResults:[], feedSearching:false,
 exploreSearch:"", exploreResults:[], exploreSearching:false,
 postSearchOpen:false, postSearch:"", postResults:[], postSearching:false, postToken:null,
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const OFFICIAL_WALLET="8KcP9QU7Kxb7BoGWGRPxpt5HwhjP8YVbwG1FG7AeS8Qy";
const short=a=>a===OFFICIAL_WALLET?"PODCTO":(a?a.slice(0,4)+"…"+a.slice(-4):"");
function genAddr(){const c="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";let s="";for(let i=0;i<44;i++)s+=c[Math.floor(Math.random()*c.length)];return s;}
function fprice(p){if(p>=1000)return"$"+p.toLocaleString(undefined,{maximumFractionDigits:0});if(p<0.000001)return"$"+p.toFixed(9);if(p<0.001)return"$"+p.toFixed(7);if(p<1)return"$"+p.toFixed(4);return"$"+p.toFixed(2);}
function avatar(seed){let h=0;for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))%360;return`background:conic-gradient(from ${h}deg,hsl(${h} 70% 55%),hsl(${(h+90)%360} 70% 50%),hsl(${(h+200)%360} 70% 55%))`;}
function tokenBy(t){return TOKREG[t];}
function allTokens(){return Object.values(TOKREG);}
function upsertToken(r){ // arama sonucunu registry'ye ekle/güncelle
 const sym=(r.symbol||r.t||"").toUpperCase(); const prev=TOKREG[sym]||{};
 TOKREG[sym]={t:sym,name:r.name,price:r.price,chg:+(+(r.chg||0)).toFixed(1),mc:typeof r.mc==="number"?fmtMc(r.mc):(r.mc||"—"),color:tokColor(sym),address:r.address||prev.address,chain:r.chain||prev.chain||"solana",source:r.source||prev.source,cgId:r.cgId||prev.cgId};
 return TOKREG[sym];
}
function holds(t){return S.connected&&!!S.wallet.holdings[t];}
function myTag(){return short(S.wallet.address).replace("…","");}
// görünen ad: profilinde isim koyduysan onu, koymadıysan cüzdan adresini göster
function isMyWallet(w,mine){return mine||(S.connected&&w===myTag());}
function timeAgo(iso){
 if(!iso)return "";
 const d=new Date(iso), now=new Date(), sec=Math.floor((now-d)/1000);
 if(sec<60)return sec+"s";
 const m=Math.floor(sec/60); if(m<60)return m+"m";
 const h=Math.floor(m/60); if(h<24)return h+"h";
 const gun=Math.floor(h/24); if(gun<7)return gun+"d";
 const hf=Math.floor(gun/7); if(gun<30)return hf+"w";
 const ay=Math.floor(gun/30); if(ay<12)return ay+"mo";
 return Math.floor(ay/12)+"y";
}
function displayName(w,mine){
 if(!w)return "";
 if(w===OFFICIAL_WALLET)return "PODCTO";
 if(isMyWallet(w,mine)&&S.profile&&S.profile.name&&S.profile.name.trim())return S.profile.name.trim();
 if(S.names&&S.names[w]&&S.names[w].trim())return S.names[w].trim();
 return short(w);
}
function nameCls(w,mine){
 if(isMyWallet(w,mine)&&S.profile&&S.profile.name&&S.profile.name.trim())return "";
 if(S.names&&S.names[w]&&S.names[w].trim())return "";
 return "mono";
}
// Baska cuzdanlarin profil isimleri (Supabase'den) burada tutulur
window.__avatarCache=window.__avatarCache||{};
window.__holdxApplyFollows=function(data){
 // data: {following:[wallet], followerCounts:{wallet:count}, followingCounts:{wallet:count}}
 S.following={};
 (data.following||[]).forEach(function(w){ S.following[w]=true; });
 S.followerCounts=data.followerCounts||{};
 S.followingCounts=data.followingCounts||{};
 S.followers=(S.wallet&&S.followerCounts[S.wallet.address])||0;
 render();
};
window.__holdxApplyHolders=function(map){
 S.holderCounts=Object.assign(S.holderCounts||{}, map||{});
 render();
};
window.__holdxApplyOwnProfileUrls=function(avatarUrl,coverUrl){
 if(avatarUrl){ S.profile.avatar=avatarUrl; if(S.wallet){ window.__avatarCache=window.__avatarCache||{}; window.__avatarCache[S.wallet.address]=avatarUrl; } }
 if(coverUrl)S.profile.cover=coverUrl;
 render();
};
window.__holdxApplyAvatars=function(map){
 Object.assign(window.__avatarCache, map||{});
 render();
};
window.__holdxApplyNames=function(map){
 S.names=Object.assign(S.names||{}, map||{});
 render();
};
function chart(seed){let s=0;for(let i=0;i<seed.length;i++)s+=seed.charCodeAt(i);const o=[];let v=40;for(let i=0;i<40;i++){s=(s*9301+49297)%233280;v=Math.max(12,Math.min(96,v+((s/233280)-0.42)*26));o.push(v);}return o;}
function livePrice(t){if(!S.livePrices[t]){const tk=tokenBy(t);S.livePrices[t]={price:(tk&&tk.price)||0,dir:0};}return S.livePrices[t];}
const OFFICIAL_ROOMS=["BTC","ETH","SOL","BNB","XRP"];
function isOfficialRoom(t){return OFFICIAL_ROOMS.includes((t||"").toUpperCase());}
function isCustomRoom(t){return S.customRooms.some(r=>r.ticker===t);}
function isJoined(t){return !!S.joined[t];}
function roomFull(t){return false;} // odalar unlimited, hiç dolmaz
const MIN_HOLD_USD=10; // odaya katilmak icin o tokenden en az bu kadar $ tutma sarti
function holdsEnough(t){
  // zaten uyeyse tekrar kontrol etme
  if(S.joined[t]) return true;
  const hv=holdingUsd(t);
  return hv.usd>=MIN_HOLD_USD;
}
function canJoin(t){
  if(roomFull(t) && !S.joined[t]) return false; // sadece "dolu" kontrolü kaldı
  return true; // public — holder şartı yok
}

/* Usernın bir tokenden elindeki ANLIK dolar değeri.
   Gerçek sürümde: cüzdan bakiyesi (RPC) × live fiyat.
   Fiyat sürekli değiştiği için her çağrıda güncel fiyatla hesaplanır → kural fiyata uyum sağlar.
   Prototipte cüzdan bakiyesi simüle edilir (gerçek holdings varsa onu, yoksa deterministik demo). */
function holdingUsd(sym,priceHint){
 const price=priceHint||(tokenBy(sym)||{}).price||0;
 if(S.wallet&&S.wallet.holdings[sym]){
   const amt=S.wallet.holdings[sym].amount;
   return {amount:amt, usd:amt*price, real:true};
 }
 // Gerçek cüzdan bağlıysa ve o token cüzdanda yoksa → 0 (demo yok)
 if(S.connected){ return {amount:0, usd:0, real:true}; }
 // Bağlı değilken demo simülasyonu
 let h=0;for(let i=0;i<sym.length;i++)h=(h*131+sym.charCodeAt(i))>>>0;
 const usd=h%60;
 return {amount:price>0?usd/price:0, usd, real:false};
}
function fmtAmt(n){if(n>=1e6)return(n/1e6).toFixed(2)+"M";if(n>=1e3)return(n/1e3).toFixed(1)+"K";if(n>=1)return n.toFixed(2);return n.toPrecision(3);}

/* Holder kademesi: tutulan tokenin ANLIK $ değerine göre renk + etiket.
   $10 altı holder sayılmaz (oda/rozet yok). Mahremiyet: kullanıcı gizlerse hep en alt kademe görünür. */
const TIERS=[
 {min:100000, key:"whale",  label:"whale",       emoji:"🐋", color:"#F5A623"},
 {min:10000,  key:"shark",  label:"whale candidate", emoji:"",   color:"#9B6BFF"},
 {min:1000,   key:"big",    label:"big holder", emoji:"",   color:"#4DA2FF"},
 {min:10,     key:"holder", label:"holder",       emoji:"",   color:"#34E39A"},
];
function tierFor(usd){for(const t of TIERS){if(usd>=t.min)return t;}return null;}
// başkalarına görünen kademe (kendi hide badgemişse en alta indirilir)
function shownTier(usd,isMe){
 const t=tierFor(usd); if(!t)return null;
 if(isMe&&S.hideWhale) return TIERS[TIERS.length-1]; // hidden → sadece "holder"
 return t;
}
// kademe etiketi (renk noktası + isim)
function tierBadge(tier){
 if(!tier)return "";
 return `<span class="tierbadge" style="color:${tier.color};background:${tier.color}1a">${I.badge} ${tier.label}${tier.emoji?" "+tier.emoji:""}</span>`;
}
// kademe renginde halkalı avatar
function ringAvatar(seed,tier,cls,wallet){
 const ring=tier?`box-shadow:0 0 0 2px var(--bg),0 0 0 3.5px ${tier.color};`:"";
 let pic=wallet&&window.__avatarCache&&window.__avatarCache[wallet];
 if(wallet&&S.wallet&&wallet===S.wallet.address&&S.profile&&S.profile.avatar){
   pic=S.profile.avatar;
   window.__avatarCache[wallet]=pic;
 }
 if(pic){ return `<span class="av ${cls||""}" style="background-image:url('${pic}');background-size:cover;background-position:center;background-repeat:no-repeat;display:inline-block;${ring}"></span>`; }
 // foto yoksa: X-tarzi bos gri default avatar
 return `<span class="av avdef ${cls||""}" style="${ring}"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" fill="currentColor"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/></svg></span>`;
}
// "time ago"
function ago(ts){const s=Math.floor((Date.now()-ts)/1000);
 if(s<60)return "just now"; const m=Math.floor(s/60); if(m<60)return m+"d ago";
 const h=Math.floor(m/60); if(h<24)return h+"h ago"; return Math.floor(h/24)+"d ago";}
// sağdaki live room activity feed
function activityPanel(){
 const items=S.activity.slice(0,14).map(a=>{
   const isCreate=a.type==="create"; const mine=a.mine;
   return `<button class="act-row ${mine?"mine":""}" data-act="openRoom" data-token="${esc(a.token)}">
     <span class="av xs" style="${avatar(a.wallet+a.token)}"></span>
     <div class="act-body">
       <div class="act-line"><span class="mono act-w">${esc(a.wallet)}</span> ${isCreate?"created a room":"joined"}</div>
       <div class="act-sub"><span class="act-verb ${isCreate?"create":"join"}">${isCreate?I.plus:I.check}${isCreate?"created":"joined"}</span>
         <span class="mono act-tk">$${esc(a.token)}</span>${chainBadge(a.chain)}
         <span class="act-time">· ${ago(a.t)}</span></div>
     </div></button>`;
 }).join("");
 return `<aside class="side-rail">
   <section class="card actcard">
     <div class="card-h">${I.waves} Room activity <span class="live"><span class="pulse"></span>live</span></div>
     <div class="actlist" id="actList">${items}</div>
   </section>
 </aside>`;
}
// aktivite ekle (kendi işlemin feedn başına)
function pushActivity(type,token,chain){
 S.activity.unshift({type,token,chain:chain||"solana",wallet:myTag(),t:Date.now(),mine:true});
 if(S.hideActivity)S.activity.shift(); // hiddenyse kendi aktiviteni akışa koyma
 if(S.activity.length>40)S.activity.length=40;
}

/*/* ---------------- live veri kaynağı ----------------
   Arama: /latest/dex/search?q=  → tüm ağ havuzları, likiditeye göre sıralı
   Fiyat: /tokens/v1/solana/{adres} → anlık priceUsd, 24s değişim, mcap
   API key GEREKMEZ. Yeni çıkan meme coin'ler dahil zincirdeki her token görünür. */
const DEX_BASE="https://api.dexscreener.com";
const CG_BASE="https://api.coingecko.com/api/v3";
// Önizleme sandbox'ı doğrudan çağrıyı bloklarsa CORS proxy'lere düşer.
// Kendi domaininde doğrudan çağrı çalışır; proxy'ler sadece bu önizleme içindir.
const PROXIES=[
  u=>u,
  u=>"https://corsproxy.io/?url="+encodeURIComponent(u),
  u=>"https://api.allorigins.win/raw?url="+encodeURIComponent(u),
];
let _proxyIdx=0;
async function apiFetch(url){
  const order=[...PROXIES.slice(_proxyIdx),...PROXIES.slice(0,_proxyIdx)];
  let lastErr;
  for(let k=0;k<order.length;k++){
    const wrap=order[k];
    try{
      const ctl=new AbortController();
      const tid=setTimeout(()=>ctl.abort(),4000);
      const r=await fetch(wrap(url),{headers:{Accept:"application/json"},signal:ctl.signal});
      clearTimeout(tid);
      if(!r.ok)throw new Error("http "+r.status);
      const j=await r.json();
      _proxyIdx=PROXIES.indexOf(wrap);
      return j;
    }catch(e){lastErr=e;}
  }
  throw lastErr||new Error("fetch failed");
}
const dexFetch=path=>apiFetch(DEX_BASE+path);
let _cgFailUntil=0;
const cgFetch=async path=>{
  if(Date.now()<_cgFailUntil) throw new Error("cg-cooldown");
  try{ return await apiFetch(CG_BASE+path); }
  catch(e){ _cgFailUntil=Date.now()+600000; throw e; } // 10 dk sessiz kal
};

// CoinGecko arama: borsa coinlerini (TIA, APT, SUI...) bulur. /search fiyat vermez → /simple/price ile çekilir.
const cgCache={};
async function cgSearch(q){
 const ck=q.trim().toLowerCase();
 if(cgCache[ck]&&Date.now()-cgCache[ck].t<300000) return cgCache[ck].v; // 5 dk onbellek
 const d=await cgFetch(`/search?query=${encodeURIComponent(q)}`);
 window._cgOk=true; // CoinGecko erişilebiliyor
 const coins=(d.coins||[]).slice(0,10); // {id,name,symbol,market_cap_rank,thumb}
 if(!coins.length)return [];
 const ids=coins.map(c=>c.id).join(",");
 let prices={};
 try{ prices=await cgFetch(`/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);}catch(e){}
 const out=coins.map(c=>{
   const p=prices[c.id]||{};
   return {source:"cg", cgId:c.id, symbol:(c.symbol||"").toUpperCase(), name:c.name,
     price:p.usd!=null?p.usd:null, chg:p.usd_24h_change||0, mc:p.usd_market_cap||0,
     rank:c.market_cap_rank||9999, chain:"cex", address:null};
 }).filter(x=>x.price!=null);
 cgCache[ck]={t:Date.now(),v:out};
 return out;
}
const CHAINS={
 solana:{label:"SOL",color:"#14F195"}, ethereum:{label:"ETH",color:"#627EEA"},
 base:{label:"BASE",color:"#0052FF"}, bsc:{label:"BNB",color:"#F0B90B"},
 arbitrum:{label:"ARB",color:"#28A0F0"}, polygon:{label:"POL",color:"#8247E5"},
 avalanche:{label:"AVAX",color:"#E84142"}, optimism:{label:"OP",color:"#FF0420"},
 sui:{label:"SUI",color:"#4DA2FF"}, ton:{label:"TON",color:"#0098EA"},
 pulsechain:{label:"PLS",color:"#00CFB4"}, blast:{label:"BLAST",color:"#FCFC03"},
 // Robinhood Chain — Arbitrum tabanlı L2, 1 Tem 2026'da açıldı (memecoin trendi)
 robinhood:{label:"RH",color:"#00C805"},
 // DexScreener'da aktif diğer ağlar (eksik kalmasın)
 hyperliquid:{label:"HYPE",color:"#97FCE4"}, hyperevm:{label:"HYPE",color:"#97FCE4"},
 monad:{label:"MONAD",color:"#836EF9"}, megaeth:{label:"MEGA",color:"#3B82F6"},
 xrpl:{label:"XRPL",color:"#23292F"}, tron:{label:"TRON",color:"#EF0027"},
 sonic:{label:"SONIC",color:"#1E90FF"}, abstract:{label:"ABS",color:"#00D26A"},
 cronos:{label:"CRO",color:"#0B1426"}, worldchain:{label:"WLD",color:"#000000"},
 hedera:{label:"HBAR",color:"#222222"}, near:{label:"NEAR",color:"#00EC97"},
 ink:{label:"INK",color:"#7132F5"}, multiversx:{label:"EGLD",color:"#23F7DD"},
 linea:{label:"LINEA",color:"#61DFFF"}, plasma:{label:"PLASMA",color:"#00D395"},
 berachain:{label:"BERA",color:"#814625"}, mantle:{label:"MNT",color:"#000000"},
 seiv2:{label:"SEI",color:"#9E1F19"}, sei:{label:"SEI",color:"#9E1F19"},
 aptos:{label:"APT",color:"#06F7F7"}, zksync:{label:"ZK",color:"#8C8DFC"},
 fantom:{label:"FTM",color:"#1969FF"}, soniclabs:{label:"SONIC",color:"#1E90FF"},
 cardano:{label:"ADA",color:"#0033AD"}, celo:{label:"CELO",color:"#FCFF52"},
 katana:{label:"KAT",color:"#FF5A5F"}, soneium:{label:"SONE",color:"#000000"},
 unichain:{label:"UNI",color:"#FF007A"}, starknet:{label:"STRK",color:"#EC796B"},
 apechain:{label:"APE",color:"#0054FA"}, flare:{label:"FLR",color:"#E62058"},
 scroll:{label:"SCRL",color:"#FFEEDA"}, mode:{label:"MODE",color:"#DFFE00"},
 movement:{label:"MOVE",color:"#FFDA34"}, injective:{label:"INJ",color:"#00F2FE"},
 fogo:{label:"FOGO",color:"#FF6B35"}, story:{label:"IP",color:"#000000"},
 manta:{label:"MANTA",color:"#00B0FF"}, kava:{label:"KAVA",color:"#FF564F"},
 cex:{label:"BORSA",color:"#8A8A96"},
};
function chainMeta(c){return CHAINS[c]||{label:(c||"?").slice(0,4).toUpperCase(),color:"#8A8A96"};}
function chainBadge(c){const m=chainMeta(c);return`<span class="chainbadge" style="color:${m.color};border-color:${m.color}44">${m.label}</span>`;}
async function dexSearch(q){
 const d=await dexFetch(`/latest/dex/search?q=${encodeURIComponent(q)}`);
 const pairs=(d.pairs||[]).filter(p=>{
   if(!p.priceUsd||!p.baseToken)return false;
   const bsym=p.baseToken.symbol||"", bname=p.baseToken.name||"";
   if(bsym.length>15||bname.length>45)return false;              // spam/çöp isimli token
   const bs=bsym.toUpperCase(), qs=(p.quoteToken&&p.quoteToken.symbol||"").toUpperCase();
   // türev çift: karşı taraf, tokenin stake/sarmalanmış hali ise USD fiyatı anlamsız çıkar
   if(bs&&qs&&bs!==qs&&(qs==="S"+bs||qs==="ST"+bs||qs==="W"+bs||qs==="X"+bs||bs==="S"+qs||bs==="ST"+qs||bs==="W"+qs||bs==="X"+qs))return false;
   if((p.marketCap||0)>=1e12||(p.fdv||0)>=1e13)return false;      // absürt değer
   return true;
 });
 // Her token (ağ+adres) için EN LİKİT havuz esas alınır — fiyat ve mcap oradan gelir.
 const byToken={};
 for(const p of pairs){
   const key=p.chainId+":"+p.baseToken.address, liq=(p.liquidity&&p.liquidity.usd)||0;
   if(byToken[key]&&liq<=byToken[key]._liq)continue;
   byToken[key]={
     source:"dex", address:p.baseToken.address, chain:p.chainId,
     symbol:p.baseToken.symbol, name:p.baseToken.name,
     price:parseFloat(p.priceUsd), chg:(p.priceChange&&p.priceChange.h24)||0,
     mc:p.marketCap||p.fdv||0, _liq:liq
   };
 }
 return Object.values(byToken);
}
function looksLikeAddress(q){
 const t=(q||"").trim();
 if(/^0x[a-fA-F0-9]{40}$/.test(t))return true;              // EVM
 if(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(t))return true;     // Solana base58
 return false;
}
async function tokenSearch(q){
 const ql=q.trim().toLowerCase();
 // KONTRAT ADRESİ ile arama → doğrudan o token
 if(looksLikeAddress(q)){
   const addr=q.trim(); const addrL=addr.toLowerCase();
   const chains=/^0x/.test(addr)?["ethereum","base","bsc","arbitrum","polygon","robinhood"]:["solana"];
   for(const ch of chains){
     try{
       const arr=await dexFetch(`/tokens/v1/${ch}/${addr}`);
       if(!arr||!arr.length)continue;
       const own=arr.filter(p=>p.baseToken&&(p.baseToken.address||"").toLowerCase()===addrL);
       if(!own.length)continue;
       const sym=own[0].baseToken.symbol||"";
       const nm=own[0].baseToken.name||"";
       // Sembolü isim aramasının aynı hattından geçir → fiyat/mcap birebir aynı olur
       let list=[];
       try{ list=await dexSearch(sym); }catch(e){}
       const sameSym=list.filter(t=>(t.symbol||"").toUpperCase()===sym.toUpperCase());
       // önce bu adrese ait kayıt, yoksa sembolün ana kaydı
       let hit=sameSym.find(t=>(t.address||"").toLowerCase()===addrL);
       if(!hit)hit=sameSym.slice().sort((a,b)=>(b._liq||0)-(a._liq||0))[0];
       if(hit)return [hit];
       // isim araması başarısızsa: adresin en likit havuzundan ham veri
       const best=own.filter(p=>p.priceUsd).sort((a,b)=>((b.liquidity&&b.liquidity.usd)||0)-((a.liquidity&&a.liquidity.usd)||0))[0];
       if(!best)continue;
       let mc=best.marketCap||0; if(mc>1e12)mc=0;
       return [{source:"dex", address:best.baseToken.address, chain:best.chainId||ch,
         symbol:sym, name:nm, price:parseFloat(best.priceUsd),
         chg:(best.priceChange&&best.priceChange.h24)||0, mc:mc,
         _liq:(best.liquidity&&best.liquidity.usd)||0}];
     }catch(e){}
   }
   return [];
 }
 const cgTimeout=new Promise(res=>setTimeout(()=>res([]),1500));
 const [dex,cg]=await Promise.allSettled([dexSearch(q),Promise.race([cgSearch(q),cgTimeout])]);
 let dexArr=dex.status==="fulfilled"?dex.value:[];
 const cgArr=cg.status==="fulfilled"?cg.value:[];

 // CoinGecko sonuçları mcap sırasıyla gelir → sembolü tam eşleşen en üstteki "gerçek" token'dır.
 // Eğer bir sembol için CoinGecko'da köklü (yüksek mcap) bir token varsa, DexScreener'daki
 // aynı sembollü DÜŞÜK likiditeli copyrı ele — çünkü onlar sahte/impostor olma ihtimali yüksek.
 const cgBySym={};
 for(const c of cgArr){const k=(c.symbol||"").toUpperCase(); if(!cgBySym[k])cgBySym[k]=c;}
 dexArr=dexArr.filter(d=>{
   const k=(d.symbol||"").toUpperCase(); const canon=cgBySym[k];
   if(canon && (canon.mc||0)>2_000_000 && (d._liq||0)<10000 && (d.mc||0)<1_000_000) return false; // köklü coin var + bu kopya çok sığ → ele
   return true;
 });

 // birleştir; aynı sembol iki kaynakta varsa DEX olanı tut (contract address → holder mantığına uygun)
 const seen=new Set(dexArr.map(t=>(t.symbol||"").toUpperCase()));
 let merged=[...dexArr];
 for(const c of cgArr){ if(!seen.has((c.symbol||"").toUpperCase())){merged.push(c);seen.add((c.symbol||"").toUpperCase());} }

 // sıralama: tam sembol/isim eşleşmesi öne; sonra piyasa büyüklüğü (mcap) + likidite.
 const score=t=>{const sym=(t.symbol||"").toLowerCase(),nm=(t.name||"").toLowerCase();
   if(sym===ql)return 2; if(sym.startsWith(ql)||nm===ql)return 1; return 0;};
 // CoinGecko'da market_cap_rank'i olan tokenlar KÖKLÜ/GERÇEK'tir (sahteler listelenmez).
 // Bir DEX sonucu, CoinGecko'da aynı sembolle köklü bir coin varsa, onun mcap'ini "gerçek" kabul et.
 const cgRankBySym={};
 for(const c of cgArr){const k=(c.symbol||"").toUpperCase(); if(c.rank && c.rank<9999 && (!cgRankBySym[k]||c.rank<cgRankBySym[k].rank)) cgRankBySym[k]={rank:c.rank,mc:c.mc||0};}
 // Her tokene "trust score": CoinGecko rank'i varsa yüksek; yoksa likiditeye bak.
 // Sahte token imzası: mcap kocaman ama likidite yok denecek kadar az.
 const suspicious=t=>{
   const liq=t._liq||0, mc=t.mc||0;
   if(t.source==="cg")return false;
   if(mc>1e6 && liq<mc/500) return true;   // mcap/likidite oranı absürt
   if(mc>1e9 && liq<1e6) return true;      // milyar dolarlık mcap ama <1M likidite
   return false;
 };
 const trust=t=>{
   const k=(t.symbol||"").toUpperCase();
   const cg=cgRankBySym[k];
   // CoinGecko'da listelenen köklü coinler en üstte (sahteler CoinGecko'ya giremez)
   if(t.source==="cg" && t.rank && t.rank<9999) return 1e14 - t.rank*1e8;
   // DEX sonucu + CoinGecko'da aynı sembolde köklü coin var + mcap tutarlı → gerçek
   if(cg && t.mc>0 && t.mc>=cg.mc*0.5 && t.mc<=cg.mc*2) return 1e14 - cg.rank*1e8 - 1;
   // şüpheli olanları en dibe at
   if(t._cgVerified) return 1e13 + (t._liq||0);
   if(suspicious(t)) return (t._liq||0);
   // kalanlar: likidite ana ölçüt (gerçek para orada), mcap ikincil
   return ((t._liq||0)*100) + Math.min(t.mc||0, 5e9);
 };
 // CoinGecko'da köklü karşılığı olan DEX kayıtlarının fiyat/mcap'ini CoinGecko ile düzelt
 const cgFix={};
 for(const c of cgArr){const k=(c.symbol||"").toUpperCase(); if(c.rank&&c.rank<9999&&(!cgFix[k]||c.rank<cgFix[k].rank))cgFix[k]=c;}
 merged.forEach(function(t){
   if(t.source==="dex"){
     const c=cgFix[(t.symbol||"").toUpperCase()];
     // sadece likiditesi anlamlı olan gerçek token'a uygula (sahte kopyaya değil)
     if(c && (t._liq||0)>50000){ t.price=c.price; t.mc=c.mc||t.mc; t.chg=c.chg; t._cgVerified=true; }
   }
 });
 merged.sort((x,y)=>{const w=trust(y)-trust(x); if(w!==0)return w; return score(y)-score(x);});

 // AĞ FİLTRESİ (kullanıcı bir ağ seçtiyse)
 if(S.chainFilter&&S.chainFilter!=="all"){
   const cf=S.chainFilter.toLowerCase();
   const filtered=merged.filter(t=>{
     const c=(t.chain||"").toLowerCase();
     return c===cf;
   });
   return filtered.slice(0,14);
 }
 const exact=merged.filter(t=>(t.symbol||"").toLowerCase()===ql);
 if(exact.length)merged=exact;
 // AYNI SEMBOL TEK KAYIT: token kendi ana ağında görünsün (köprülenmiş copyr gizlensin)
 const seenSym={}, unique=[];
 for(const t of merged){
   const k=(t.symbol||"").toUpperCase();
   if(!k){unique.push(t);continue;}
   if(seenSym[k]){
     if(!seenSym[k].mc && t.mc) seenSym[k].mc=t.mc;
     continue;
   }
   seenSym[k]=t; unique.push(t);
 }
 return unique.slice(0,14);
}
async function dexPrice(address,chain){
 // adres formatına göre doğru ağ (chain yanlış/eksikse düzelt)
 const isEvm=/^0x[a-fA-F0-9]{40}$/.test(address||"");
 let ch=chain;
 if(isEvm && (!ch||ch==="solana")) ch="ethereum";
 if(!isEvm && (!ch||/^(ethereum|base|bsc|arbitrum|polygon|optimism|robinhood)$/.test(ch))) ch="solana";
 const arr=await dexFetch(`/tokens/v1/${ch||"solana"}/${address}`);
 if(!arr||!arr.length)return null;
 const addrL=(address||"").toLowerCase();
 const mine=arr.filter(p=>{
   if(!p.priceUsd||!p.baseToken)return false;
   if((p.baseToken.address||"").toLowerCase()!==addrL)return false;
   const bs=(p.baseToken.symbol||"").toUpperCase(), qs=(p.quoteToken&&p.quoteToken.symbol||"").toUpperCase();
   if(bs&&qs&&bs!==qs&&(qs==="S"+bs||qs==="ST"+bs||qs==="W"+bs||qs==="X"+bs||bs==="S"+qs||bs==="ST"+qs||bs==="W"+qs||bs==="X"+qs))return false; // türev çift
   if((p.marketCap||0)>=1e12||(p.fdv||0)>=1e13)return false;
   return true;
 });
 if(!mine.length)return null;
 const best=mine.sort((a,b)=>((b.liquidity&&b.liquidity.usd)||0)-((a.liquidity&&a.liquidity.usd)||0))[0];
 return {price:parseFloat(best.priceUsd), chg:(best.priceChange&&best.priceChange.h24)||0, mc:best.marketCap||best.fdv||0};
}
function fmtMc(n){if(!n)return"—";if(n>=1e9)return"$"+(n/1e9).toFixed(2)+"B";if(n>=1e6)return"$"+(n/1e6).toFixed(1)+"M";if(n>=1e3)return"$"+(n/1e3).toFixed(0)+"K";return"$"+n.toFixed(0);}
let _searchTimer=null;
function scheduleSearch(q){
 clearTimeout(_searchTimer);
 if(!q||q.trim().length<2){S.searchResults=[];S.searching=false;renderCreateResults();return;}
 S.searching=true; renderCreateResults();
 _searchTimer=setTimeout(async()=>{
   const my=q;
   try{const res=await tokenSearch(q);
     if(S.createTicker===my){S.searchResults=res;S.searching=false;renderCreateResults();}
   }catch(e){if(S.createTicker===my){S.searchResults=[];S.searching=false;S.searchErr=true;renderCreateResults();}}
 },350);
}
// sadece sonuç bölgesini güncelle — input focus'unu bozmamak için tüm sayfayı render etmiyoruz
function renderCreateResults(){
 const box=document.getElementById("searchResults");
 if(box)box.innerHTML=createResultsHtml();
}

// --- akış filtresi için live arama (tüm ağlardaki tokenlar) ---
let _feedTimer=null;
function scheduleFeedSearch(q){
 clearTimeout(_feedTimer);
 if(!q||q.trim().length<2){S.feedResults=[];S.feedSearching=false;renderFeedDropList();return;}
 S.feedSearching=true;renderFeedDropList();
 _feedTimer=setTimeout(async()=>{
   const my=q;
   try{const res=await tokenSearch(q);
     if(S.feedSearch===my){S.feedResults=res;S.feedSearching=false;renderFeedDropList();}
   }catch(e){if(S.feedSearch===my){S.feedResults=[];S.feedSearching=false;renderFeedDropList();}}
 },350);
}
function renderFeedDropList(){
 const box=document.getElementById("feedDropList");
 if(!box)return;
 // feedDropdown'ı yeniden üretmek yerine sadece liste kısmını güncelle
 const tmp=document.createElement("div");
 tmp.innerHTML=feedDropdown();
 const fresh=tmp.querySelector("#feedDropList");
 if(fresh)box.innerHTML=fresh.innerHTML;
}
let _exploreTimer=null;
function scheduleExploreSearch(q){
 clearTimeout(_exploreTimer);
 if(!q||q.trim().length<2){S.exploreResults=[];S.exploreSearching=false;renderExploreResults();return;}
 S.exploreSearching=true;renderExploreResults();
 _exploreTimer=setTimeout(async()=>{
   const my=q;
   try{const res=await tokenSearch(q);
     if(S.exploreSearch===my){S.exploreResults=res;S.exploreSearching=false;renderExploreResults();}
   }catch(e){if(S.exploreSearch===my){S.exploreResults=[];S.exploreSearching=false;renderExploreResults();}}
 },350);
}
function renderExploreResults(){
 const box=document.getElementById("exploreResults");
 if(box)box.innerHTML=exploreResultsHtml();
}
// --- posta token ekleme araması (tüm ağlar) ---
function postSearchResultsHtml(){
 const q=(S.postSearch||"").trim();
 if(q.length<2)return `<p class="searchhint">Type 2+ letters — search a token to mention.</p>`;
 if(S.postSearching)return `<div class="searchstate">${I.search} searching…</div>`;
 if(!S.postResults.length)return `<p class="searchhint">"${esc(q)}" no results.</p>`;
 return `<div class="resultlist">${S.postResults.map((r,i)=>`
   <button class="resultrow" data-act="pickPostToken" data-i="${i}">
     <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
     <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}${S.customRooms.find(x=>x.ticker.toUpperCase()===(r.symbol||"").toUpperCase())?`<span class="rr-hasroom">● has room</span>`:""}</span><span class="rr-name">${esc(r.name)}${r.mc?` · mcap ${typeof r.mc==="number"?fmtMc(r.mc):r.mc}`:""}${r._liq?` · likidite ${fmtMc(r._liq)}`:""}${r.address?` · <span class="mono rr-ca">${r.address.slice(0,5)}…${r.address.slice(-4)}</span>`:""}</span></div>
     <span class="mono rr-price ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span>
   </button>`).join("")}</div>`;
}
let _postTimer=null;
function schedulePostSearch(q){
 clearTimeout(_postTimer);
 if(!q||q.trim().length<2){S.postResults=[];S.postSearching=false;renderPostResults();return;}
 S.postSearching=true;renderPostResults();
 _postTimer=setTimeout(async()=>{
   const my=q;
   try{const res=await tokenSearch(q);
     if(S.postSearch===my){S.postResults=res;S.postSearching=false;renderPostResults();}
   }catch(e){if(S.postSearch===my){S.postResults=[];S.postSearching=false;renderPostResults();}}
 },350);
}
function renderPostResults(){
 const box=document.getElementById("postSearchResults");
 if(box)box.innerHTML=postSearchResultsHtml();
}

// --- Registry'deki tokenların GERÇEK anlık fiyatı ---
// Adresi olanlar DexScreener'dan adresle (kesin) çekilir; adresi olmayan demo tokenlar sembolle denenir.
async function refreshTokenPrices(){
 const targets=Object.values(TOKREG);
 for(let i=0;i<targets.length;i+=4){
   const group=targets.slice(i,i+4);
   await Promise.all(group.map(async tok=>{
     try{
       let d=null;
       // 1) MERKEZİ ÖNBELLEK: 10 sn tazeyse doğrudan kullan (DexScreener'a gitme)
       if(window.__holdxGetCachedPrice){
         const c=await window.__holdxGetCachedPrice(tok.t);
         if(c&&c.fresh&&c.price>0){ d={price:c.price,chg:c.chg,mc:c.mc}; }
       }
       // 2) Önbellek eski/yoksa live çek
       if(!d){
         if(tok.address){ d=await dexPrice(tok.address,tok.chain); }
         else if(tok.cgId){ try{const pr=await cgFetch(`/simple/price?ids=${encodeURIComponent(tok.cgId)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);const o=pr[tok.cgId];if(o&&o.usd!=null)d={price:o.usd,chg:o.usd_24h_change||0,mc:o.usd_market_cap||0};}catch(e){} }
         else { const res=await dexSearch(tok.t); const ex=res.find(r=>r.symbol.toUpperCase()===tok.t.toUpperCase())||res[0]; if(ex)d={price:ex.price,chg:ex.chg,mc:ex.mc}; }
         // taze veriyi önbelleğe yaz (herkes 10 sn buradan okur)
         if(d&&d.price>0&&window.__holdxSetCachedPrice){ window.__holdxSetCachedPrice(tok.t,d.price,+(+d.chg).toFixed(1),d.mc||0,tok.address||null,tok.chain||null); }
       }
       if(d===null&&tok.address){ tok.price=0; tok.mc="—"; }
       if(d&&d.price>0){
         tok.price=d.price; tok.chg=+(+d.chg).toFixed(1); if(d.mc)tok.mc=fmtMc(d.mc);
         if(S.livePrices[tok.t])S.livePrices[tok.t].price=d.price; else S.livePrices[tok.t]={price:d.price,dir:0};
       }
     }catch(e){}
   }));
 }
 if(["tokens","feed","rooms","portfolio"].includes(S.view.name))render();
}
const NAV=[["feed","Feed","home"],["profile","Profile","user"],["portfolio","Portfolio","wallet"],["rooms","Rooms","chat"],["myrooms","My Rooms","badge"],["messages","Messages","send"],["notifications","Notifications","bell"],["leaderboard","Leaderboard","trend"],["settings","Settings","gear"]];

// --- emoji seti (X benzeri bol seçenek, kategorili) ---
const EMOJI={
 "Frequent":["😂","🤣","🔥","🚀","💎","🙌","👀","❤️","💯","🐋","📈","📉","🤝","🥹","🫡","😍","😅","🤔","👍","🙏"],
 "Suratlar":["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🫣","🤭","🫢","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖"],
 "El & jest":["👍","👎","👊","✊","🤛","🤜","🤞","✌️","🫰","🤟","🤘","👌","🤌","🤏","👈","👉","👆","👇","☝️","✋","🤚","🖐️","🖖","👋","🤙","💪","🙏","🤝","🙌","👏","🫶","🤲","👐","🙋","🤦","🤷","💅","👀","👁️","🧠","🫀","🩸"],
 "Kripto & para":["🚀","🌙","💎","🙌","📈","📉","🐂","🐻","🐋","🐳","💰","💸","💵","💴","💶","💷","🪙","🏦","💳","⚡","🔥","💥","🤑","📊","🎯","🧨","🏆","🥇","⛏️","🔑","🗝️","🧧","💹"],
 "Kalp":["❤️","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💔","❤️‍🔥","❤️‍🩹","💖","💗","💓","💞","💕","💟","❣️","💌","💋","💯","✨","⭐","🌟","💫"],
 "Hayvan":["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐢","🐍","🐙","🦑","🦐","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🐘","🦏","🐪","🦒","🐄","🐎","🐖","🐏","🐑","🐐","🦌","🐕","🐩","🐈","🐓","🦃","🕊️","🐇","🐁","🐀","🐿️","🦔"],
 "Yemek":["🍎","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🍆","🥔","🥕","🌽","🌶️","🫑","🥒","🥬","🥦","🧄","🧅","🍄","🥜","🌰","🍞","🥐","🥖","🥨","🧀","🥚","🍳","🧈","🥞","🧇","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🥙","🍜","🍝","🍣","🍱","🍛","🍤","🍙","🍚","🍘","🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥛","☕","🍵","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🧉","🍾"],
 "Aktivite":["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🏒","🏑","🥍","🏏","🥅","⛳","🪁","🎯","🎳","🎮","🎰","🎲","🧩","🎭","🎨","🎬","🎤","🎧","🎼","🎹","🥁","🎷","🎺","🎸","🪕","🎻","🏆","🥇","🥈","🥉","🏅","🎖️","🎗️","🎟️","🎫"],
 "Seyahat":["🚗","🚕","🚙","🚌","🏎️","🚓","🚑","🚒","🚐","🚚","🚛","🏍️","🛵","🚲","✈️","🚀","🛸","🚁","⛵","🚤","🛥️","🚢","🗺️","🗽","🗼","🏰","🎡","🎢","🎠","⛲","🏖️","🏝️","🏔️","🌋","🗻","🏕️","🏞️","🌅","🌄","🌆","🌇","🌉","🌌","🎇","🎆","🌈"],
 "Nesne":["⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","💾","💿","📷","📸","🎥","📺","📻","⏰","⏳","📡","🔋","🔌","💡","🔦","🕯️","🧯","🛢️","💰","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","🧱","⛓️","🧲","🔫","💣","🧨","🪓","🔪","🗡️","⚔️","🛡️","🚬","⚰️","🔮","📿","🧿","💊","💉","🩸","🔑","🗝️","🚪","🛏️","🛋️","🚽","🚿","🛁"],
 "Semboller":["✅","❌","❗","❓","‼️","⁉️","💢","♨️","🚫","💯","🔞","📵","🔅","🔆","〽️","⚠️","🚸","🔱","⚜️","🔰","♻️","✳️","❇️","✴️","🆚","💠","🌀","➕","➖","➗","✖️","🟰","♾️","💲","💱","™️","©️","®️","👁️‍🗨️","🔚","🔙","🔛","🔝","🔜","✔️","☑️","🔘","⚪","⚫","🔴","🟠","🟡","🟢","🔵","🟣","🟤","🔺","🔻","🔸","🔹","🔶","🔷","🔳","🔲","▪️","▫️","⭐","🌟","✨","⚡","🔥","💥","💫"],
};
function emojiPicker(target){
 return `<div class="emojipop" data-emoji-pop>
   ${Object.entries(EMOJI).map(([cat,list])=>`<div class="emoji-cat">${cat}</div><div class="emoji-grid">${list.map(e=>`<button class="emoji-b" data-act="pickEmoji" data-emoji="${e}" data-target="${target}">${e}</button>`).join("")}</div>`).join("")}
 </div>`;
}
// GIF: gerçek servis (GIPHY/Tenor) altyapı aşamasında bağlanacak — şimdilik hazır etiketli görsel kutuları
const DEMO_GIFS=["🎉","🚀","💎","🐋","📈","🔥","😂","🤯","🙌","💰","🌙","⚡"];
const GIPHY_KEY="GlVGYHkr3WSBnllca54iNt0yFbjz7L65"; // GIPHY public beta anahtari
async function searchGifs(q){
 try{
   const url=q?`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(q)}&limit=24&rating=pg-13`
             :`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=24&rating=pg-13`;
   const r=await fetch(url); const j=await r.json();
   S.gifResults=(j.data||[]).map(function(g){ return {url:g.images.fixed_height.url, prev:g.images.fixed_height_small.url||g.images.fixed_height.url}; });
 }catch(e){ S.gifResults=[]; }
 const box=document.querySelector(".gif-grid");
 if(box&&S.gifFor){ const tmp=document.createElement("div"); tmp.innerHTML=gifPicker(S.gifFor); const fresh=tmp.querySelector(".gif-grid"); if(fresh)box.innerHTML=fresh.innerHTML; }
}
let gifTimer=null;
function scheduleGifSearch(q){ clearTimeout(gifTimer); gifTimer=setTimeout(function(){ searchGifs(q); },350); }
function gifPicker(target){
 const res=S.gifResults||[];
 return `<div class="gifpop" data-emoji-pop>
   <div class="gif-search">${I.search}<input id="gifSearch" placeholder="GIF ara…" value="${esc(S.gifQuery)}" autocomplete="off"></div>
   <div class="gif-grid">${res.length?res.map(function(g,i){
     return `<button class="gif-b real" data-act="pickGif" data-gif="${esc(g.url)}" data-i="${i}" data-target="${target}"><img src="${esc(g.prev)}" alt="" loading="lazy"></button>`;
   }).join(""):`<div class="gif-loading">Loading GIF…</div>`}</div>
 </div>`;
}

function postTier(p){
 if(!p.token)return null;
 if(p.mine||(S.connected&&p.wallet===myTag())){
   const usd=holdingUsd(p.token).usd;
   return usd>=10?shownTier(usd,true):null;
 }
 // başkası: gerçek zincir bakiyesini iste + göster
 requestHolderCheck(p.wallet,p.token);
 return realTierFor(p.wallet,p.token);
}
window.__holderBalances=window.__holderBalances||{}; // {wallet:{mint:usd}}
window.__holdxApplyHolderBalance=function(wallet,mint,usd){
 window.__holderBalances[wallet]=window.__holderBalances[wallet]||{};
 window.__holderBalances[wallet][mint]=usd;
 render();
};
function realTierFor(wallet,ticker){
 const tk=tokenBy(ticker);
 if(!tk||!tk.address)return undefined;
 const b=window.__holderBalances[wallet];
 if(!b||b[tk.address]===undefined)return undefined; // henüz sorgulanmadı
 const usd=b[tk.address];
 return usd>=10?shownTier(usd,false):null; // null = holder değil (rozet yok)
}
function requestHolderCheck(wallet,ticker){
 const tk=tokenBy(ticker);
 if(!tk||!tk.address||!window.__holdxCheckHolder)return;
 const b=window.__holderBalances[wallet];
 if(b&&b[tk.address]!==undefined)return; // zaten var
 window.__holdxCheckHolder(wallet,tk.address,tk.chain,tk.price||0);
}
function msgTier(m,ticker){
 if(m.mine||(S.connected&&m.wallet===myTag()))return shownTier(holdingUsd(ticker).usd,true);
 // başkası: gerçek zincir bakiyesini iste + göster
 requestHolderCheck(m.wallet,ticker);
 return realTierFor(m.wallet,ticker); // undefined=henüz yok, null=holder değil, tier=holder
}
function refreshPostActions(id){
 // tüm sayfayı değil, sadece o postun aksiyon barını güncelle (hız)
 const p=S.posts.find(function(x){return String(x.id)===String(id);});
 if(!p)return;
 const card=document.querySelector('.post-card[data-pid="'+id+'"]');
 if(!card){ render(); return; }
 const bar=card.querySelector('.post-actions');
 if(!bar){ render(); return; }
 // sadece sayaç ve renkleri güncelle
 const likeBtn=bar.querySelector('[data-act="like"]');
 if(likeBtn){ likeBtn.classList.toggle('liked',!!p.liked); likeBtn.innerHTML=(p.liked?I.heartf:I.heart)+' '+(p.likes||0); }
 const rtBtn=bar.querySelector('[data-act="rtMenu"]');
 if(rtBtn){ rtBtn.classList.toggle('reposted',!!p.reposted); rtBtn.innerHTML=I.repost+' '+(p.reposts||0); }
}
function fmtText(t){
 // önce güvenli kaçış
 let h=esc(t||"");
 // podcto oda linkleri: iç yönlendirme (odaya git)
 h=h.replace(/https?:\/\/(?:www\.)?podcto\.com\/room\/([A-Za-z0-9]+)/g,function(m,tk){
   return '<a class="link-in" data-act="gotoRoomLink" data-token="'+tk.toUpperCase()+'" href="#">'+m+'</a>';
 });
 // podcto post linkleri: iç yönlendirme
 h=h.replace(/https?:\/\/(?:www\.)?podcto\.com\/post\/([A-Za-z0-9\-]+)/g,function(m,pid){
   return '<a class="link-in" data-act="gotoPostLink" data-id="'+pid+'" href="#">'+m+'</a>';
 });
 // diğer düz URL'ler: yeni sekmede aç (zaten işaretlenmiş linkleri atla)
 h=h.replace(/(^|[^"'>])((https?:\/\/[^\s<]+))/g,function(m,pre,url){
   if(pre==='"'||pre==="'"||pre===">")return m;
   return pre+'<a class="link-ext" href="'+url+'" target="_blank" rel="noopener">'+url+'</a>';
 });
 // @isim ve $TOKEN vurgusu
 h=h.replace(/@([^\s@]{1,24})/g,'<span class="mention-tag" data-act="openMentionProfile" data-name="$1">@$1</span>');
 h=h.replace(/\$([A-Za-z0-9]{2,15})\b/g,'<span class="cashtag">$$$1</span>');
 return h;
}
function renderPostText(p){
  let raw=(p.text||"");
  // 2'den fazla ardışık boş satırı en fazla 2'ye indir (spam engelle)
  raw=raw.replace(/\n{3,}/g,"\n\n");
  const lines=raw.split("\n");
  const tooLong=raw.length>280||lines.length>10;
  const expanded=S.expandedPosts&&S.expandedPosts[p.id];
  if(tooLong&&!expanded){
    // ilk ~200 karakter veya ilk 8 satır (hangisi önce biterse)
    let cut=raw.slice(0,220);
    const cutLines=cut.split("\n").slice(0,8).join("\n");
    if(cutLines.length<cut.length)cut=cutLines;
    return `<p class="post-text">${fmtText(cut)}<span class="post-more">… </span><button class="show-more" data-act="expandPost" data-id="${p.id}">Show more</button></p>`;
  }
  return `<p class="post-text">${fmtText(raw)}</p>`;
}
function postCard(p){
 const tk=tokenBy(p.token)||{color:"#8A8A96"};
 const tier=postTier(p);
 return `${p._isRepost?`<div class="rt-head">${I.repost}<span>${(S.wallet&&p._repostedBy===S.wallet.address)?"You reposted":esc(displayName(p._repostedBy))+" reposted"}</span></div>`:""}<article class="post-card${p._isRepost?" is-rt":""}" data-pid="${p.id}"><button class="pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${ringAvatar(p.wallet+(p.token||""),tier,"",p.wallet)}</button>
  <div class="post-body"><div class="post-head">
   <button class="${nameCls(p.wallet,p.mine)} post-wallet pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${esc(displayName(p.wallet,p.mine))}</button>
   ${tier?tierBadge(tier):""}
   ${p.token?`<button class="post-token" style="color:${tk.color}" data-act="filterToken" data-token="${p.token}">$${p.token}</button>`:""}
   <span class="post-time">· ${p.time||timeAgo(p.created_at)||""}</span>
   <div class="pa-more-wrap">
     <button class="pa-more" data-act="postMenu" data-id="${p.id}">···</button>
     ${String(S.postMenu)===String(p.id)?`<div class="post-menu" data-emoji-pop>
       <button class="post-menu-item" data-act="sharePost" data-id="${p.id}">${I.share} Share</button>
       ${(S.connected&&S.wallet&&p.wallet===S.wallet.address)?`<button class="post-menu-item danger" data-act="deletePost" data-id="${p.id}">${I.trash} Delete</button>`:""}
     </div>`:""}
   </div>
  </div>${renderPostText(p)}
  ${p.quoted?`<div class="quoted-post" data-act="openPost" data-id="${p.quoted.id}">
    <div class="qp-head">${ringAvatar(p.quoted.wallet,null,"xs",p.quoted.wallet)}<span class="qp-name">${esc(displayName(p.quoted.wallet))}</span></div>
    <div class="qp-text">${esc((p.quoted.text||"").slice(0,180))}</div>
    ${p.quoted.media?`<img class="qp-media" src="${p.quoted.media}" alt="">`:""}
  </div>`:""}
  ${p.media?`<img class="post-media zoomable" src="${p.media}" alt="" data-act="zoom" data-src="${p.media}">`:""}
  <div class="post-actions">
   <button data-act="openPost" data-id="${p.id}">${I.reply} ${p.replies||0}</button>
   <div class="rt-wrap">
     <button class="${p.reposted?"reposted":""}" data-act="rtMenu" data-id="${p.id}">${I.repost} ${p.reposts||0}</button>
     ${String(S.rtMenu)===String(p.id)?`<div class="rt-menu" data-emoji-pop>
       <button class="rt-item" data-act="repost" data-id="${p.id}">${I.repost} ${p.reposted?"Undo repost":"Repost"}</button>
       <button class="rt-item" data-act="quotePost" data-id="${p.id}">${I.reply} Quote</button>
     </div>`:""}
   </div>
   <button class="${p.liked?"liked":""}" data-act="like" data-id="${p.id}">${p.liked?I.heartf:I.heart} ${p.likes||0}</button>
  </div></div></article>`;
}
// tek bir postun detay + yorumlar görünümü
function postDetailView(id){
 const p=S.posts.find(x=>String(x.id)===String(id));
 if(!p){
   if(window.__holdxFetchSinglePost){ window.__holdxFetchSinglePost(id); }
   return `<button class="back" data-act="nav" data-view="feed">← Feed</button><p class="empty">Loading…</p>`;
 }
 const tk=tokenBy(p.token)||{color:"#8A8A96"};
 const tier=postTier(p);
 const comments=p.comments||[];
 return `<button class="back" data-act="back">← Back</button>
  <article class="post-card detail">
   <button class="pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${ringAvatar(p.wallet+(p.token||""),tier,"",p.wallet)}</button>
   <div class="post-body"><div class="post-head">
     <button class="${nameCls(p.wallet,p.mine)} post-wallet pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${esc(displayName(p.wallet,p.mine))}</button>
     ${tier?tierBadge(tier):""}
     ${p.token?`<button class="post-token" style="color:${tk.color}" data-act="filterToken" data-token="${p.token}">$${p.token}</button>`:""}
     <span class="post-time">· ${p.time||timeAgo(p.created_at)||""}</span>
   </div><p class="post-text big">${esc(p.text)}</p>
   ${p.media?`<img class="post-media zoomable" src="${p.media}" alt="" data-act="zoom" data-src="${p.media}">`:""}
   <div class="post-actions">
     <button>${I.reply} ${p.replies||0}</button>
     <div class="rt-wrap">
     <button class="${p.reposted?"reposted":""}" data-act="rtMenu" data-id="${p.id}">${I.repost} ${p.reposts||0}</button>
     ${String(S.rtMenu)===String(p.id)?`<div class="rt-menu" data-emoji-pop>
       <button class="rt-item" data-act="repost" data-id="${p.id}">${I.repost} ${p.reposted?"Undo repost":"Repost"}</button>
       <button class="rt-item" data-act="quotePost" data-id="${p.id}">${I.reply} Quote</button>
     </div>`:""}
   </div>
     <button class="${p.liked?"liked":""}" data-act="like" data-id="${p.id}">${p.liked?I.heartf:I.heart} ${p.likes||0}</button>
     <button class="pa-share" data-act="sharePost" data-id="${p.id}">${I.share}</button>
   </div></div>
  </article>
  ${S.connected?`<div class="commentbox">
    ${ringAvatar(S.wallet.address,null,"",S.wallet.address)}
    <input id="commentInput" class="comment-input" placeholder="Write your comment…" value="${esc(S.commentText||"")}" data-id="${p.id}">
    <button class="tool-b ${S.emojiFor==="comment"?"on":""}" data-act="toggleEmoji" data-target="comment" title="Emoji">${I.smile}</button>
    <button class="comment-send" data-act="sendComment" data-id="${p.id}">${I.send}</button>
    ${S.emojiFor==="comment"?`<div class="tool-pop comment-emoji">${emojiPicker("comment")}</div>`:""}
  </div>`:`<div class="commentbox locked"><button class="connect" data-act="connect">Connect wallet to comment</button></div>`}
  <div class="section-label">${comments.length} ${comments.length===1?"comment":"comments"}</div>
  <div class="comments">${(function(){
    const roots=comments.filter(function(c){return !c.parent_id;});
    const kids=function(pid){return comments.filter(function(c){return String(c.parent_id)===String(pid);});};
    const renderC=function(c,depth){
    const ctier=c.tier||null;
    return `<div class="comment-thread${depth===1?" nested":""}"><div class="comment">${ringAvatar(c.wallet+"c",ctier,"sm",c.wallet)}
      <div class="comment-body"><button class="${nameCls(c.wallet)} comment-w pf-link" data-act="openProfile" data-wallet="${esc(c.wallet)}">${esc(displayName(c.wallet))}</button>${ctier?tierBadge(ctier):""}<span class="comment-time">· ${c.time||timeAgo(c.created_at)}</span>
      <p class="ctext-link" data-act="openComment" data-cid="${c.id||""}" data-post="${p.id}">${esc(c.text)}</p>
      <div class="comment-actions">
        <button data-act="openComment" data-cid="${c.id||""}" data-post="${p.id}">${I.reply} ${kids(c.id).length}</button>
        <button class="${c.reposted?"reposted":""}" data-act="repostComment" data-cid="${c.id||""}">${I.repost} ${c.reposts||0}</button>
        <button class="${c.liked?"liked":""}" data-act="likeComment" data-cid="${c.id||""}">${c.liked?I.heartf:I.heart} ${c.likes||0}</button>
      </div></div></div></div>`;
    };
    return roots.length?roots.map(function(c){return renderC(c,0);}).join(""):`<p class="empty">Be the first to comment.</p>`;
  })()}</div>
  ${S.sharePostId?postShareModal():""}`;
}
function feedDropdown(){
 const q=(S.feedSearch||"").trim();
 let listHtml;
 if(q.length>=2){
   if(S.feedSearching)listHtml=`<div class="searchstate">${I.search} searching…</div>`;
   else if(S.feedResults.length)listHtml=S.feedResults.map((r,i)=>`<button class="ff-opt" data-act="pickFeedToken" data-i="${i}">
       <span class="dot" style="background:${tokColor(r.symbol)}"></span>
       <span class="mono ff-t">$${esc(r.symbol)}</span>${chainBadge(r.chain)}<span class="ff-n">${esc(r.name)}</span>
       <span class="mono ff-p ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span></button>`).join("");
   else listHtml=`<p class="ff-empty">"${esc(q)}" no results</p>`;
 } else {
   // arama boşken: hızlı erişim — bizim bildiğimiz tokenlar
   listHtml=`<button class="ff-opt ${S.filter==="ALL"?"on":""}" data-act="pickFilter" data-token="ALL">
       <span class="ff-alldot">${I.globe}</span><span class="ff-t">All</span><span class="ff-n">entire feed</span></button>
     ${allTokens().map(t=>`<button class="ff-opt ${S.filter===t.t?"on":""}" data-act="pickFilter" data-token="${t.t}">
       <span class="dot" style="background:${t.color}"></span>
       <span class="mono ff-t">$${t.t}</span><span class="ff-n">${t.name}</span>
       <span class="mono ff-p ${t.chg>=0?"up":"down"}">${fprice(t.price)}</span></button>`).join("")}`;
 }
 return `<div class="ff-backdrop" data-act="closeFeedDrop"></div>
  <div class="ff-panel">
   <div class="ff-search">${I.search}<input id="feedSearch" placeholder="search all tokens — name or ticker (ansem, wif…)" value="${esc(S.feedSearch)}" autocomplete="off"></div>
   <div class="ff-list" id="feedDropList">${listHtml}</div></div>`;
}
function feedView(){
 const sel=S.filter==="ALL"?null:(tokenBy(S.filter)||{t:S.filter,name:"",color:tokColor(S.filter)});
 const filtered=(S.filter==="ALL"?S.posts:S.posts.filter(p=>p.token===S.filter)).slice().sort(function(a,b){ return (new Date(b._repostAt||b.created_at||0))-(new Date(a._repostAt||a.created_at||0)); });
 const filterBar=`<div class="feedfilter">
   <button class="ff-btn ${sel?"active":""}" data-act="toggleFeedDrop">
     ${sel?`<span class="dot" style="background:${sel.color}"></span><span class="mono ff-btn-tk">$${sel.t}</span>${sel.chain?chainBadge(sel.chain):""}<span class="ff-btn-name">${sel.name}</span>`
          :`<span class="ff-btn-ico">${I.search}</span><span>Filter by coin</span>`}
     <span class="ff-caret ${S.feedDrop?"up":""}">▾</span>
   </button>
   ${sel?`<span class="ff-count mono">${filtered.length} post</span><button class="ff-clear" data-act="setFilter" data-token="ALL">✕</button>`:""}
   ${S.feedDrop?feedDropdown():""}
 </div>`;
 const attached=S.postToken; // posta bağlı token (opsiyonel)
 const attLp=attached?livePrice(attached.symbol):null;
 const attachBtn=attached
   ? `<button class="attachchip" data-act="clearPostToken"><span class="dot" style="background:${tokColor(attached.symbol)}"></span><span class="mono">$${esc(attached.symbol)}</span>${chainBadge(attached.chain)}<span class="mono attach-price">${fprice(attLp?attLp.price:attached.price)}</span><span class="mono attach-chg ${attached.chg>=0?"up":"down"}">${attached.chg>=0?"+":""}${(+attached.chg).toFixed(1)}%</span><span class="attach-x">✕</span></button>`
   : `<button class="attachbtn" data-act="openPostSearch">${I.plus} Add token</button>`;
 const composer=S.connected?
  `<div class="composer${S.quoting?" quoting":""}">${ringAvatar(S.wallet.address,null,"lg",S.wallet.address)}
   <div class="composer-body"><textarea id="composerText" rows="2" maxlength="280" placeholder="What's on your mind?">${esc(S.composerText||"")}</textarea>
   ${S.mentionOpen&&S.mentionResults&&S.mentionResults.length?`<div class="mention-pop">${S.mentionResults.map(function(u,i){
     return `<button class="mention-item" data-act="pickMention" data-name="${esc(u.name)}" data-wallet="${esc(u.wallet)}">${ringAvatar(u.wallet,null,"sm",u.wallet)}<span class="mention-name">${esc(u.name)}</span><span class="mention-addr mono">${short(u.wallet)}</span></button>`;
   }).join("")}</div>`:""}
   ${S.quoting?`<div class="quote-preview"><div class="qp-head">${ringAvatar(S.quoting.wallet,null,"xs",S.quoting.wallet)}<span class="qp-name">${esc(displayName(S.quoting.wallet))}</span><button class="qp-x" data-act="cancelQuote">✕</button></div><div class="qp-text">${esc((S.quoting.text||"").slice(0,140))}</div></div>`:""}
   ${S.postMedia?`<div class="mediaprev"><img src="${S.postMedia}" alt=""><button class="media-x" data-act="clearPostMedia">${I.x}</button></div>`:""}
   ${S.postSearchOpen?`<div class="postsearchwrap">
     <div class="roomsearch"><span>${I.search}</span><input class="searchinput" id="postSearch" placeholder="search a token to mention (all chains)" value="${esc(S.postSearch)}" autocomplete="off"></div>
     <div id="postSearchResults" class="searchresults">${postSearchResultsHtml()}</div></div>`:""}
   <div class="composer-bar">
     <div class="composer-tools">
       <button class="tool-b ${S.emojiFor==="post"?"on":""}" data-act="toggleEmoji" data-target="post" title="Emoji">${I.smile}</button>
       <button class="tool-b ${S.gifFor==="post"?"on":""}" data-act="toggleGif" data-target="post" title="GIF">${I.gif}</button>
       <button class="tool-b" data-act="pickPhoto" data-target="post" title="Photo">${I.image}</button>
       ${attachBtn}
       <div class="tool-pop">${S.emojiFor==="post"?emojiPicker("post"):""}${S.gifFor==="post"?gifPicker("post"):""}</div>
     </div>
     <span class="char-count ${(S.composerText||"").length>260?"warn":""}">${280-(S.composerText||"").length}</span>
     <button class="post" data-act="publish">Post</button>
   </div></div></div>`
  :`<div class="connectbanner"><div><strong>Connect your wallet, make your voice real.</strong>
    <p>On the token you hold <span class="vinline">${I.badge} verified holder</span> badge. No bots, no fake accounts.</p></div>
    <button class="connect" data-act="connect">Connect wallet</button></div>`;
 return `<h1 class="h1">Feed</h1>${filterBar}${composer}
  <div class="posts">${filtered.length?filtered.map(postCard).join(""):`<p class="empty">$${S.filter} no posts yet. Be the first to post.</p>`}</div>
  ${S.hasMorePosts&&S.filter==="ALL"?`<button class="loadmore" data-act="loadMore">${S.loadingMore?"Loading…":"Show more"}</button>`:""}
  ${S.sharePostId?postShareModal():""}`;
}
const CHAIN_CHIPS=[["all","All"],["ethereum","ETH"],["solana","SOL"],["bsc","BSC"],["robinhood","RH"]];
function chainChips(){
 return `<div class="chainchips">${CHAIN_CHIPS.map(c=>`<button class="chip ${S.chainFilter===c[0]?"on":""}" data-act="setChain" data-chain="${c[0]}">${c[1]}</button>`).join("")}</div>`;
}
function exploreResultsHtml(){
 const q=(S.exploreSearch||"").trim();
 if(q.length>=2){
   if(S.exploreSearching)return `<div class="searchstate">${I.search} searching…</div>`;
   if(!S.exploreResults.length)return `<p class="searchhint">"${esc(q)}" no results.</p>`;
   return `<div class="resultlist">${S.exploreResults.map((r,i)=>`
     <button class="resultrow" data-act="openResult" data-i="${i}">
       <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
       <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}</span><span class="rr-name">${esc(r.name)}</span></div>
       <span class="mono rr-price ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span>
     </button>`).join("")}</div>`;
 }
 // arama boşken: daha önce görülen/oda açılan tokenlar
 const seen=allTokens();
 if(!seen.length)return `<p class="searchhint">Paste the contract address (CA).</p>`;
 return `<p class="searchhint">Paste the contract address (CA).</p>`;
}
function tokensView(){
 return `<h1 class="h1">Token ara</h1>
  <p class="sub">Search any token — across all chains (Solana, Ethereum, Base, BSC & more). Price, page and rooms are live.</p>
  <div class="roomsearch"><span>${I.search}</span>
    <input class="searchinput" id="exploreSearch" placeholder="token name or ticker (e.g. eigen, ansem, wif)" value="${esc(S.exploreSearch)}" autocomplete="off"></div>
  ${chainChips()}
  <div id="exploreResults" class="searchresults">${exploreResultsHtml()}</div>`;
}
function tokenPageView(ticker){
 const t=tokenBy(ticker)||{t:ticker,name:"",price:0,chg:0,mc:"—",color:tokColor(ticker)};
 const tp=S.posts.filter(p=>p.token===ticker), bars=chart(ticker);
 const lp=livePrice(ticker);
 const room=S.customRooms.find(r=>r.ticker===ticker);
 const chain=t.chain;
 const addr=t.address;
 const mcTxt=typeof t.mc==="number"?fmtMc(t.mc):(t.mc||"—");
 return `<button class="back" data-act="nav" data-view="tokens">← Token ara</button>
  <div class="token-hero"><div class="token-ids"><span class="tokenmark" style="background:${t.color}"></span>
   <div><h1 class="mono tokenticker">$${t.t} ${chain?chainBadge(chain):""}</h1><p class="token-full">${t.name||""}</p></div></div>
   <div class="token-livewrap"><span class="lp-live"><span class="pulse"></span>LIVE</span></div></div>
  ${addr?`<button class="token-addr" data-act="copyAddr" data-addr="${esc(addr)}">${I.copy}<span class="mono">${addr.slice(0,8)}…${addr.slice(-8)}</span><span class="ta-copy">${S.copied?"copied":"copy"}</span></button>`:""}
  <div class="token-stats">
    ${stat("fiyat",fprice(lp.price))}${stat("24s",(t.chg>=0?"+":"")+t.chg+"%",t.chg>=0?"up":"down")}
    ${stat("mcap",mcTxt)}${chain?stat("chain",chainMeta(chain).label):""}</div>
  <div class="chart">${bars.map(h=>`<span style="height:${h}%;background:${t.color}"></span>`).join("")}</div>
  ${room
    ? `<button class="roomcta joined" data-act="openRoom" data-token="${t.t}">${I.chat} $${t.t} enter room<span class="rcta-meta">${(room.members||0).toLocaleString()}${(room.cap||100)===Infinity?"":"/"+capLabel(room.cap||100)} members</span></button>`
    : `<button class="roomcta" data-act="openRoom" data-token="${t.t}">${I.plus} $${t.t} create the first room</button>`}
  <div class="section-label">$${t.t} feed ${tp.length?`<span class="sl-count">${tp.length}</span>`:""}</div>
  <div class="posts">${tp.length?tp.map(postCard).join(""):`<p class="empty">Bu token no posts yet. Be the first — by adding $${t.t} from the Feed.</p>`}</div>
  ${S.sharePostId?postShareModal():""}`;
}
function stat(l,v,c){return`<div class="stat"><span class="stat-label">${l}</span><span class="mono stat-value ${c||""}">${v}</span></div>`;}
function portfolioView(){
 if(!S.connected)return gate("see your portfolio");
 const rows=Object.entries(S.wallet.holdings).map(([tk,h])=>{const t=tokenBy(tk)||{price:0,name:h.name||"",color:tokColor(tk)};const price=t.price||0;const now=price*h.amount;const cost=(h.buyAvg||0)*h.amount;const pl=now-cost;return{tk,t,...h,now,pl,plPct:cost>0?(pl/cost)*100:0};});
 const total=rows.reduce((a,r)=>a+r.now,0), totalPl=rows.reduce((a,r)=>a+r.pl,0);
 const mask=v=>S.hideValue?"••••":v;
 return `<h1 class="h1">Portfolio</h1>
  <div class="walletbar">${ringAvatar(S.wallet.address,shownTier(total,true))}
   <span class="mono fulladdr">${short(S.wallet.address)}</span>
   <button class="copy" data-act="copy">${S.copied?I.check:I.copy}${S.copied?"copied":"copy"}</button></div>
  <div class="total"><span class="total-label">total value</span>
   <span class="mono total-value">${S.hideValue?"••••••":"$"+Math.round(total).toLocaleString()}</span>
   <span class="mono total-pl ${totalPl>=0?"up":"down"}">${S.hideValue?"hidden":`${totalPl>=0?"+":""}$${totalPl.toFixed(0)}  total P/L`}</span></div>
  <div class="holdings">${rows.map(r=>{const tier=tierFor(r.now);return `<div class="holding"><span class="dot" style="background:${r.t.color}"></span>
   <span class="hld-name"><span class="mono tk">$${r.tk}</span>${tier?`<span class="holdtier" style="color:${tier.color}" title="${tier.label}">${tier.label}${tier.emoji?" "+tier.emoji:""}</span>`:""}</span><span class="mono hamt">${S.hideValue?"••••":r.amount.toLocaleString()}</span>
   <span class="mono hval">${S.hideValue?"••••":"$"+r.now.toFixed(0)}</span>
   <span class="mono chg ${r.pl>=0?"up":"down"}">${S.hideValue?"••":`${r.pl>=0?"+":""}${r.plPct.toFixed(0)}%`}</span></div>`;}).join("")}</div>
  <div class="tierlegend">
    <span class="tl-title">Tiers</span>
    ${TIERS.slice().reverse().map(t=>`<span class="tl-item"><span class="tl-dot" style="background:${t.color}"></span>${t.label}${t.emoji?" "+t.emoji:""} <span class="tl-range">${t.min>=100000?"$100K+":t.min>=10000?"$10K–100K":t.min>=1000?"$1K–10K":"$10–1K"}</span></span>`).join("")}
  </div>
  <p class="pf-settings-hint">For privacy and badge settings ${I.gear} <button class="inline-link" data-act="nav" data-view="settings">Settings</button></p>`;
}
function roomsView(){
 if(!S.connected)return gate("see rooms");
 const subtabs=`<div class="subtabs">
   <button class="subtab ${S.roomTab!=="create"?"on":""}" data-act="roomTab" data-tab="browse">${I.chat} Explore</button>
   <button class="subtab ${S.roomTab==="create"?"on":""}" data-act="roomTab" data-tab="create">${I.plus} Create room</button>
 </div>`;
 const body=S.roomTab==="create"?createRoomView():browseRoomsView();
 return `<h1 class="h1">Rooms</h1>${subtabs}${body}`;
}
function myRoomsView(){
 const mine=Object.keys(S.joined).filter(k=>S.joined[k]);
 if(!mine.length)return `<div class="norooms">${I.chat}<h3>You haven't joined any room yet</h3><p>Join a room to access it quickly here.</p><button class="norooms-btn" data-act="nav" data-view="rooms">Explore rooms →</button></div>`;
 const cards=mine.map(tk=>{
  const t=tokenBy(tk)||{name:"",color:tokColor(tk)}; const lp=livePrice(tk);
  const custom=isCustomRoom(tk); const room=S.customRooms.find(r=>r.ticker===tk);
  const mineCreator=room&&room.creator===myTag();
  return`<div class="roomcard">
    <div class="rc-click" data-act="openRoom" data-token="${tk}">
      <span class="tokenmark" style="background:${t.color}"></span>
      <div class="rc-body">
        <div class="rc-top"><span class="mono rc-tk">$${esc(tk)}</span>
          ${mineCreator?`<span class="creatorbadge">${I.badge} your room</span>`:custom?`<span class="pubbadge">${I.globe} public</span>`:`<span class="openbadge">${I.badge} holder</span>`}</div>
        <div class="rc-name">${t.name||""}</div>
        <div class="rc-meta"><span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span>${room?` · <span class="mono">${(room.members||0).toLocaleString()}${(room.cap||100)===Infinity?" members · ∞":"/"+capLabel(room.cap||100)+" members"}</span>`:""}</div>
      </div>
    </div>
    <button class="rc-leave" data-act="askLeave" data-token="${tk}" title="Leave room">${I.exit}</button>
  </div>`;
 }).join("");
 return `<div class="section-label">${I.badge} Rooms you joined</div><div class="roomgrid">${cards}</div>
   ${S.leaveConfirm?leaveConfirmModal(S.leaveConfirm):""}`;
}

// en yüksek holder kademesini bul (profilde parlatmak için)
function topHolderTier(){
 let best=null,bestUsd=0;
 for(const[sym,h] of Object.entries(S.wallet?S.wallet.holdings:{})){
   const usd=holdingUsd(sym).usd; if(usd>bestUsd){bestUsd=usd;best={sym,usd,tier:shownTier(usd,true)};}
 }
 return best;
}
function profileView(){
 if(!S.connected)return gate("see your profile");
 const target=S.view.wallet; // başka kullanıcı mı? (undefined ise kendim)
 const isMe=!target||target===myTag();
 if(isMe)return ownProfileView();
 return otherProfileView(target);
}
function ownProfileView(){
 const p=S.profile;
 const name=p.name||myTag();
 window.__quotedCache=window.__quotedCache||{};
 const _rawRts=(S.wallet&&window.__userReposts&&window.__userReposts[S.wallet.address])||[];
 // RT'leri copy (own postlarla aynı nesneyi paylaşmasın); alıntı bağını uygula
 const _myRts=_rawRts.map(function(r){ const c=Object.assign({},r); if(c.quotedId)c.quoted=window.__quotedCache[c.quotedId]||c.quoted; return c; });
 const _myOwn=S.posts.filter(x=>!x._isRepost&&(x.mine||x.wallet===myTag())).map(function(o){ const c=Object.assign({},o); if(c.quotedId)c.quoted=window.__quotedCache[c.quotedId]||c.quoted; return c; });
 function _sortTime(p){ const t=new Date(p._repostAt||p.created_at||0).getTime(); return isNaN(t)?0:t; }
 const myPosts=[..._myOwn,..._myRts].sort(function(a,b){ const d=_sortTime(b)-_sortTime(a); return d!==0?d:0; });
 const myRooms=Object.keys(S.joined).filter(k=>S.joined[k]);
 const createdCount=S.customRooms.filter(r=>r.creator===myTag()).length;
 const followingCount=Object.keys(S.following).filter(k=>S.following[k]).length;
 const top=topHolderTier();
 const avatarEl=p.avatar?`<img class="pf-avatar-img" src="${p.avatar}" alt="">`:`<span class="pf-avatar-gen" style="${avatar(S.wallet.address)}"></span>`;
 const tab=S.profileTab;
 return `<div class="profilewrap">
   <div class="pf-cover" style="${p.cover?`background-image:url('${p.cover}')`:""}">
     <button class="pf-cover-edit" data-act="pickCover">${I.camera}</button>
   </div>
   <div class="pf-top">
     <div class="pf-avatar">${avatarEl}<button class="pf-avatar-edit" data-act="pickAvatar">${I.camera}</button></div>
     <div class="pf-actions-row">
       <button class="pf-edit-btn" data-act="shareProfile" data-wallet="${esc(S.wallet.address)}">${I.share} ${S.profileShared?"Copied!":"Share"}</button>
       <button class="pf-edit-btn" data-act="openEditProfile">${I.edit} Edit profile</button>
     </div>
   </div>
   <div class="pf-info">
     <div class="pf-nameline"><h1 class="pf-name">${esc(name)}</h1>${top&&top.tier?tierBadge(top.tier):""}</div>
     <div class="pf-addr mono">${short(S.wallet.address)} <button class="pf-copy" data-act="copy">${S.copied?I.check:I.copy}</button></div>
     ${p.bio?`<p class="pf-bio">${esc(p.bio)}</p>`:`<p class="pf-bio muted">No bio yet. Add one via "Edit profile".</p>`}
     <div class="pf-meta">${I.badge}<span>Joined ${p.joined}</span></div>
     <div class="pf-follows">
       <button class="pf-follow-stat"><b class="mono">${followingCount}</b> Following</button>
       <button class="pf-follow-stat"><b class="mono">${S.followers}</b> Followers</button>
       <span class="pf-follow-stat"><b class="mono">${myRooms.length}</b> Rooms</span>
       ${createdCount?`<span class="pf-follow-stat"><b class="mono">${createdCount}</b> Created</span>`:""}
     </div>
   </div>
   <div class="subtabs pf-tabs">
     <button class="subtab ${tab==="posts"?"on":""}" data-act="profileTab" data-tab="posts">Posts ${myPosts.length?`<span class="subtab-count">${myPosts.length}</span>`:""}</button>
     <button class="subtab ${tab==="rooms"?"on":""}" data-act="profileTab" data-tab="rooms">Rooms ${myRooms.length?`<span class="subtab-count">${myRooms.length}</span>`:""}</button>
   </div>
   ${tab==="posts"
     ? `<div class="posts">${myPosts.length?myPosts.map(postCard).join(""):`<p class="empty">No posts yet. Make your first post from the Feed.</p>`}</div>`
     : `<div class="roomgrid">${myRooms.length?myRooms.map(tk=>{const t=tokenBy(tk)||{name:"",color:tokColor(tk)};const lp=livePrice(tk);const room=S.customRooms.find(r=>r.ticker===tk);const mineCreator=room&&room.creator===myTag();return`<div class="roomcard" data-act="openRoom" data-token="${tk}"><span class="tokenmark" style="background:${t.color}"></span><div class="rc-body"><div class="rc-top"><span class="mono rc-tk">$${esc(tk)}</span>${mineCreator?`<span class="creatorbadge">${I.badge} your room</span>`:`<span class="pubbadge">${I.globe} members</span>`}</div><div class="rc-name">${t.name||""}</div><div class="rc-meta"><span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span></div></div><span class="rc-go">Enter →</span></div>`;}).join(""):`<p class="empty">You're not in any room yet.</p>`}</div>`}
   ${S.editProfile?editProfileModal():""}
   ${S.crop?cropModal():""}
 </div>`;
}
// başka bir kullanıcının profili (mock veri — gerçek kullanıcılar Supabase ile gelince gerçekleşir)
function commentDetailView(cid,postId){
 const p=S.posts.find(function(x){return String(x.id)===String(postId);});
 if(!p)return `<button class="back" data-act="nav" data-view="feed">← Feed</button><p class="empty">Not found.</p>`;
 const all=p.comments||[];
 const c=all.find(function(x){return String(x.id)===String(cid);});
 if(!c)return `<button class="back" data-act="openPost" data-id="${p.id}">← Post</button><p class="empty">No comments found.</p>`;
 const kids=all.filter(function(x){return String(x.parent_id)===String(cid);});
 const ctier=c.tier||null;
 return `<button class="back" data-act="openPost" data-id="${p.id}">← Back to post</button>
 <div class="cdetail">
   <div class="cd-parent" data-act="openPost" data-id="${p.id}">
     ${ringAvatar(p.wallet,null,"xs",p.wallet)}<span class="qp-name">${esc(displayName(p.wallet))}</span>
     <span class="cd-ptext">${esc((p.text||"").slice(0,90))}</span>
   </div>
   <div class="cd-main">
     <div class="cd-head">${ringAvatar(c.wallet+"c",ctier,"",c.wallet)}
       <div><div class="cd-name">${esc(displayName(c.wallet))}</div>
       <div class="cd-time">${c.time||timeAgo(c.created_at)}</div></div>
     </div>
     <p class="cd-text">${esc(c.text)}</p>
     <div class="comment-actions big">
       <button class="${c.reposted?"reposted":""}" data-act="repostComment" data-cid="${c.id}">${I.repost} ${c.reposts||0}</button>
       <button class="${c.liked?"liked":""}" data-act="likeComment" data-cid="${c.id}">${c.liked?I.heartf:I.heart} ${c.likes||0}</button>
     </div>
   </div>
   ${S.connected?`<div class="commentbox">
     ${ringAvatar(S.wallet.address,null,"",S.wallet.address)}
     <input id="commentInput" class="comment-input" placeholder="Write your reply…" value="${esc(S.commentText||"")}" data-id="${p.id}">
     <button class="tool-b ${S.emojiFor==="comment"?"on":""}" data-act="toggleEmoji" data-target="comment" title="Emoji">${I.smile}</button>
     <button class="comment-send" data-act="sendComment" data-id="${p.id}">${I.send}</button>
   </div>`:`<div class="commentbox locked"><button class="connect" data-act="connect">Connect wallet to reply</button></div>`}
   <div class="section-label">${kids.length} ${kids.length===1?"reply":"replies"}</div>
   <div class="comments">${kids.length?kids.map(function(k){
     const kt=k.tier||null;
     return `<div class="comment"><button class="pf-link" data-act="openProfile" data-wallet="${esc(k.wallet)}">${ringAvatar(k.wallet+"c",kt,"sm",k.wallet)}</button>
       <div class="comment-body"><button class="comment-w pf-link" data-act="openProfile" data-wallet="${esc(k.wallet)}">${esc(displayName(k.wallet))}</button><span class="comment-time">· ${k.time||timeAgo(k.created_at)}</span>
       <p>${esc(k.text)}</p>
       <div class="comment-actions">
         <button data-act="openComment" data-cid="${k.id}" data-post="${p.id}">${I.reply} ${all.filter(function(x){return String(x.parent_id)===String(k.id);}).length}</button>
         <button class="${k.reposted?"reposted":""}" data-act="repostComment" data-cid="${k.id}">${I.repost} ${k.reposts||0}</button>
         <button class="${k.liked?"liked":""}" data-act="likeComment" data-cid="${k.id}">${k.liked?I.heartf:I.heart} ${k.likes||0}</button>
       </div></div></div>`;
   }).join(""):`<p class="empty">Be the first to reply.</p>`}</div>
 </div>`;
}
function notificationsView(){
 if(!S.connected)return gate("see notifications");
 const list=S.notifications||[];
 const label=function(n){
   if(n.type==="like")return "liked your post";
   if(n.type==="comment")return "commented on your post";
   if(n.type==="repost")return "reposted your post";
   if(n.type==="follow")return "followed you";
   if(n.type==="mention")return "mentioned you in a post";
   if(n.type==="dm")return "sent you a message";
   return "";
 };
 const ico=function(n){
   if(n.type==="like")return `<span class="nt-ic like">${I.heartf}</span>`;
   if(n.type==="comment")return `<span class="nt-ic cm">${I.reply}</span>`;
   if(n.type==="repost")return `<span class="nt-ic rp">${I.repost}</span>`;
   if(n.type==="follow")return `<span class="nt-ic fl">${I.user||I.badge}</span>`;
   return `<span class="nt-ic">${I.send}</span>`;
 };
 return `<h1 class="h1">Notifications</h1>
  ${list.length?`<div class="ntlist">${list.map(function(n){
    const nm=S.names&&S.names[n.from_wallet]?S.names[n.from_wallet]:short(n.from_wallet);
    return `<button class="ntitem ${n.read?"":"unread"}" data-act="openNotif" data-id="${n.id}" data-post="${n.post_id||""}" data-wallet="${esc(n.from_wallet)}">
      ${ico(n)}
      ${ringAvatar(n.from_wallet,null,"sm",n.from_wallet)}
      <div class="nt-body"><span class="nt-name">${esc(nm)}</span> <span class="nt-txt">${label(n)}</span>
      ${n.text?`<div class="nt-preview">${esc(n.text.slice(0,60))}</div>`:""}</div>
    </button>`;
  }).join("")}</div>`:`<div class="norooms">${I.bell}<h3>No notifications yet</h3><p>Likes, comments, follows and messages will appear here.</p></div>`}`;
}
window.__holdxApplyNotifications=function(rows){
 S.notifications=rows||[];
 S.unreadNotif=(rows||[]).filter(function(n){return !n.read;}).length;
 render();
};
window.__holdxAddNotification=function(n){
 if(!S.wallet||n.wallet!==S.wallet.address)return;
 S.notifications=[n].concat(S.notifications||[]);
 S.unreadNotif=(S.unreadNotif||0)+1;
 render();
};
function messagesView(){
 if(!S.connected)return gate("see their messages");
 const threads=S.dmThreads||[];
 return `<h1 class="h1">Messages</h1>
   ${threads.length?`<div class="dmlist">${threads.map(function(t){
     const nm=S.names&&S.names[t.peer]?S.names[t.peer]:short(t.peer);
     const unread=S.unreadPeers&&S.unreadPeers[t.peer];
     return `<button class="dmlist-item ${unread?"unread":""}" data-act="openDM" data-wallet="${esc(t.peer)}">
       ${(window.__avatarCache&&window.__avatarCache[t.peer])?`<img class="av md" src="${window.__avatarCache[t.peer]}" alt="">`:`<span class="av md" style="${avatar(t.peer)}"></span>`}
       <div class="dmlist-info"><span class="dmlist-name">${esc(nm)}</span><span class="mono dmlist-addr">${short(t.peer)}</span><span class="dmlist-last">${esc((t.last||"").slice(0,50))}</span></div>
       ${unread?`<span class="dmlist-badge">1</span>`:`<span class="dmlist-arrow">›</span>`}
     </button>`;
   }).join("")}</div>`:`<div class="norooms">${I.send}<h3>No messages yet</h3><p>Go to a user's profile and "Message" to start a chat.</p></div>`}`;
}
window.__holdxApplyThreads=function(threads){ S.dmThreads=threads||[]; render(); };
function dmView(peer){
 if(!S.connected)return gate("messaging");
 const msgs=(S.dms&&S.dms[peer])||[];
 const nm=S.names&&S.names[peer]?S.names[peer]:short(peer);
 return `<div class="dmwrap">
   <div class="dm-head">
     <button class="dm-back" data-act="nav" data-view="messages">${I.back||"←"}</button>
     ${(window.__avatarCache&&window.__avatarCache[peer])?`<img class="av sm" src="${window.__avatarCache[peer]}" alt="">`:`<span class="av sm" style="${avatar(peer)}"></span>`}
     <div class="dm-peer"><span class="dm-name">${esc(nm)}</span><span class="mono dm-addr">${short(peer)}</span></div>
   </div>
   <div class="dm-msgs" id="dmMsgs">
     ${msgs.length?msgs.map(function(m){
       const mine=S.wallet&&m.from_wallet===S.wallet.address;
       return `<div class="dm-msg ${mine?"mine":""}"><span class="dm-bubble">${m.media?`<img class="dm-media" src="${esc(m.media)}" alt="" data-act="zoom" data-src="${esc(m.media)}">`:""}${m.text?`<span class="dm-txt">${esc(m.text)}</span>`:""}</span></div>`;
     }).join(""):`<p class="dm-empty">No messages yet. Send the first one.</p>`}
   </div>
   ${S.dmMedia?`<div class="dm-media-prev"><img src="${S.dmMedia}" alt=""><button class="media-x" data-act="clearDmMedia">${I.x}</button></div>`:""}
   <div class="dm-input">
     <button class="dm-photo" data-act="dmPhoto" title="Photo">${I.image}</button>
     <input id="dmInput" placeholder="Type a message…" value="${esc(S.dmText||"")}" data-wallet="${esc(peer)}">
     <button data-act="sendDM" data-wallet="${esc(peer)}">${I.send}</button></div>
 </div>`;
}
// DM realtime/gecmis kopruleri
window.__holdxApplyDMs=function(peer,rows){
 S.dms=S.dms||{}; S.dms[peer]=rows||[]; render();
};
window.__holdxAddDM=function(m){
 if(!S.wallet)return;
 const me=S.wallet.address;
 let peer=null;
 if(m.from_wallet===me)peer=m.to_wallet; else if(m.to_wallet===me)peer=m.from_wallet; else return;
 S.dms=S.dms||{}; const arr=S.dms[peer]||[];
 if(m.id&&arr.find(function(x){return x.id===m.id;}))return;
 arr.push(m); S.dms[peer]=arr;
 // bana gelen mesaj + o sohbet acik degilse okunmamis say
 const inThisDM=(S.view&&S.view.name==="dm"&&S.view.peer===peer);
 if(m.to_wallet===me && !inThisDM){
   S.unreadPeers=S.unreadPeers||{};
   if(!S.unreadPeers[peer]){ S.unreadPeers[peer]=true; S.unreadDM=(S.unreadDM||0)+1; }
 }
 render();
};
function otherProfileView(wallet){
 // bu kullanıcının akıştaki postları
 const _theirRts=(window.__userReposts&&window.__userReposts[wallet])||[];
 const _theirOwn=S.posts.filter(x=>x.wallet===wallet&&!(x.mine));
 const theirPosts=[..._theirOwn,..._theirRts].sort((a,b)=>new Date(b._repostAt||b.created_at||0)-new Date(a._repostAt||a.created_at||0));
 // deterministik "fake but consistent" profil verisi (aynı cüzdan hep aynı görünür)
 let h=0;for(let i=0;i<wallet.length;i++)h=(h*131+wallet.charCodeAt(i))>>>0;
 const followers=(S.followerCounts&&S.followerCounts[wallet])||0;
 const following=(S.followingCounts&&S.followingCounts[wallet])||0;
 const seed=wallet+"seed";
 const isFollowing=!!S.following[wallet];
 // bu kullanıcının en yüksek kademesi (postlarındaki tier'lardan tahmini)
 const anyTier=theirPosts.map(postTier).find(Boolean)||null;
 const bios=["degen & holder","just watching charts","buys early sells late","memecoin hunter","holder gang","living on-chain",""];
 const bio=bios[h%bios.length];
 return `<div class="profilewrap">
   <div class="pf-cover"><!-- diğer kullanıcı, kapak yok --></div>
   <div class="pf-top">
     <div class="pf-avatar">${(window.__avatarCache&&window.__avatarCache[wallet])?`<img class="pf-avatar-img" src="${window.__avatarCache[wallet]}" alt="">`:`<span class="pf-avatar-gen" style="${avatar(seed)}"></span>`}</div>
     <div class="pf-actions">
       <button class="pf-follow-btn ${isFollowing?"following":""}" data-act="toggleFollow" data-wallet="${esc(wallet)}">${isFollowing?"Following":"Follow"}</button>
       ${S.connected?`<button class="pf-follow-btn" data-act="openDM" data-wallet="${esc(wallet)}">${I.send} Message</button>`:""}
     </div>
   </div>
   <div class="pf-info">
     <div class="pf-nameline"><h1 class="pf-name">${esc(displayName(wallet))}</h1>${anyTier?tierBadge(anyTier):""}</div>
     <div class="pf-addr mono">${short(wallet)} <button class="pf-copy" data-act="copyAddr" data-wallet="${esc(wallet)}">${S.copiedAddr===wallet?I.check:I.copy}</button></div>
     ${bio?`<p class="pf-bio">${esc(bio)}</p>`:`<p class="pf-bio muted">This user hasn't added a bio yet.</p>`}
     <div class="pf-meta">${I.badge}<span>PODCTO member</span></div>
     <div class="pf-follows">
       <button class="pf-follow-stat"><b class="mono">${following}</b> Following</button>
       <button class="pf-follow-stat"><b class="mono">${followers+(isFollowing?1:0)}</b> Followers</button>
     </div>
   </div>
   <div class="subtabs pf-tabs">
     <button class="subtab on">Posts ${theirPosts.length?`<span class="subtab-count">${theirPosts.length}</span>`:""}</button>
   </div>
   <div class="posts">${theirPosts.length?theirPosts.map(postCard).join(""):`<p class="empty">This user has no visible posts.</p>`}</div>
 </div>`;
}
function editProfileModal(){
 const p=S.profile;
 return `<div class="overlay" data-act="closeEdit">
   <div class="editcard">
     <div class="edit-h"><strong>Edit profile</strong><button class="edit-x" data-act="closeEdit">${I.x}</button></div>
     <label class="edit-label">Display name</label>
     <input class="edit-input" id="editName" value="${esc(p.name)}" placeholder="${myTag()}" maxlength="30">
     ${S.nameError?`<div class="name-error">${esc(S.nameError)}</div>`:""}
     <label class="edit-label">Bio</label>
     <textarea class="edit-input" id="editBio" rows="3" placeholder="Introduce yourself — are you a degen or a holder?" maxlength="160">${esc(p.bio)}</textarea>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeEdit">Cancel</button>
       <button class="edit-save" data-act="saveProfile">${S.savingProfile?"Saving…":"Save"}</button>
     </div>
   </div>
 </div>`;
}
const ADMIN_WALLETS=["8KcP9QU7Kxb7BoGWGRPxpt5HwhjP8YVbwG1FG7AeS8Qy"];
function isAdmin(){ return S.connected && S.wallet && ADMIN_WALLETS.includes(S.wallet.address); }
function leaderboardView(){
 // ADMIN: gerçek sıralamayı gör
 if(isAdmin()){
   const rows=(S.leaderboard||[]).slice(0,100);
   return `<div class="lbtable-wrap">
     <div class="lbtable-head">
       <div><h1 class="lbadmin-title">Leaderboard <span class="lbadmin-tag">admin</span></h1>
       <p class="lbadmin-sub">Real points ranking · visible only to you · top 100</p></div>
       <button class="lbadmin-export" data-act="exportLeaderboard">${I.wallet} Download CSV</button>
     </div>
     <table class="lbtable">
       <thead><tr><th class="lbt-rank">#</th><th class="lbt-user">User</th><th class="lbt-addr">Wallet</th><th class="lbt-pts">Points</th></tr></thead>
       <tbody>
       ${rows.length?rows.map((r,i)=>{
         const nm=S.names&&S.names[r.wallet]?S.names[r.wallet]:short(r.wallet);
         return `<tr>
           <td class="lbt-rank">${i+1}</td>
           <td class="lbt-user">${esc(nm)}</td>
           <td class="lbt-addr mono">${short(r.wallet)}</td>
           <td class="lbt-pts mono">${r.total.toLocaleString()}</td>
         </tr>`;
       }).join(""):`<tr><td colspan="4" class="lbt-empty">No users have earned points yet.</td></tr>`}
       </tbody>
     </table>
   </div>`;
 }
 return `<div class="lbwrap">
   <div class="lb-hero">
     <div class="lb-badge">${I.trend}</div>
     <h1 class="lb-title">Leaderboard soon</h1>
     <p class="lb-sub">Be active on PODCTO — post, join rooms, create rooms, chat. Your activity is evaluated in the background.</p>
     <div class="lb-teaser">
       <div class="lb-lock">${I.lock}</div>
       <div class="lb-teaser-txt"><strong>Leaderboard is not open yet</strong><p>Early and genuinely active users will stand out. When the leaderboard opens, you'll see your place here.</p></div>
     </div>
     <div class="lb-hints">
       <div class="lb-hint">${I.plus}<span>Create room</span></div>
       <div class="lb-hint">${I.chat}<span>Join rooms & chat</span></div>
       <div class="lb-hint">${I.home}<span>Post</span></div>
       <div class="lb-hint">${I.badge}<span>Be a real holder</span></div>
     </div>
   </div>
 </div>`;
}
function toggleRow(title,desc,on,act){
 return `<div class="setting-row"><div class="setting-txt"><strong>${title}</strong><p>${desc}</p></div>
   <button class="toggle ${on?"on":""}" data-act="${act}"><span class="toggle-knob"></span></button></div>`;
}
// TASLAK hukuki metinler — yayından önce bir avukata kontrol ettirilmeli.
const DOCS={
 terms:{title:"Terms of Use",updated:"Last updated: July 2026",body:[
  ["1. Acceptance","By using PODCTO (the \"Platform\") you accept these Terms of Use. If you do not accept the Terms, do not use the Platform."],
  ["2. Nature of the Platform","PODCTO is a decentralized social platform that brings crypto asset holders together. The Platform is NOT an exchange, wallet provider, or investment advisor. Price and market data shown on the Platform come from third-party sources and accuracy is not guaranteed."],
  ["3. Not investment advice","No content, post, room chat, or data on the Platform constitutes investment advice. Crypto assets are high-risk and can lose value. You are solely responsible for all your decisions. Do your own research before making investment decisions."],
  ["4. Wallet and account","You connect to the Platform with your wallet. You are solely responsible for the security of your wallet, private keys, and transactions. PODCTO can never access or store your private keys."],
  ["5. User content","You are fully responsible for the content you share (text, image, message). Sharing illegal, fraudulent, hate-speech, harassing, or rights-violating content is prohibited. PODCTO reserves the right to remove such content."],
  ["6. Room creation and fees","Creating a room is free and open to everyone."],
  ["7. Points and rewards","Points/reward systems tied to Platform activity are promotional; they carry no guarantee of monetary value. Reward criteria may change without prior notice. Points of accounts found abusing the system can be revoked."],
  ["8. Disclaimer","Platform is provided \"as is\". PODCTO does not guarantee uninterrupted or error-free operation. PODCTO cannot be held liable for any direct or indirect damages arising from use of the Platform."],
  ["9. Changes","These terms may be updated from time to time. Significant changes are announced through the Platform. Continuing to use the Platform after an update means you accept the new terms."],
 ]},
 privacy:{title:"Privacy Policy",updated:"Last updated: July 2026",body:[
  ["1. General","This Privacy Policy explains what data PODCTO processes."],
  ["2. Data we collect","PODCTO works primarily wallet-based. Data that may be processed: your public wallet address, your on-chain transaction/holding data (from the public blockchain), content you create on the Platform (posts, rooms, messages), and your profile info (name, bio, image). We do not require personal information like email, phone, or ID."],
  ["3. Use of data","Your data is used to operate the Platform, verify holders, display badges/tiers, and provide community features. We do not sell your data to third parties without your consent."],
  ["4. On-chain data is public","Your wallet address and blockchain transactions are public by nature. The Platform may display this data. Using the settings we provide (e.g. hide whale badge, hide portfolio value) you can limit the visibility of some information."],
  ["5. Third-party services","We use third-party services for price and market data. Those services have their own privacy policies."],
  ["6. Cookies and local storage","The Platform may use browser storage to remember your preferences (e.g. theme)."],
  ["7. Security","We take reasonable measures to protect your data, but remember that no transmission over the internet is 100% secure. Your wallet security is your responsibility."],
  ["8. Your rights","You may request access to and deletion of content you created. You can disconnect your wallet at any time."],
  ["9. Contact","For privacy questions, you can use the feedback channel on the Platform."],
 ]},
};
function docModal(key){
 const d=DOCS[key]; if(!d)return "";
 return `<div class="overlay" data-act="closeDoc">
   <div class="doccard">
     <div class="doc-h"><div><strong>${d.title}</strong><span class="doc-updated">${d.updated}</span></div><button class="edit-x" data-act="closeDoc">${I.x}</button></div>
     <div class="doc-body">
       ${d.body.map(([h,p])=>`<h4 class="doc-sec">${h}</h4><p class="doc-p">${p}</p>`).join("")}
     </div>
   </div>
 </div>`;
}
function feedbackModal(){
 return `<div class="overlay" data-act="closeFeedback">
   <div class="editcard">
     <div class="edit-h"><strong>Send feedback</strong><button class="edit-x" data-act="closeFeedback">${I.x}</button></div>
     <p class="fb-intro">Have an idea, bug report or suggestion? Write it, it reaches us directly.</p>
     <label class="edit-label">Subject</label>
     <input class="edit-input" id="fbSubject" placeholder="e.g. Room creation error" maxlength="80">
     <label class="edit-label">Your message</label>
     <textarea class="edit-input" id="fbBody" rows="4" placeholder="Write details here…" maxlength="1000"></textarea>${S.feedbackError?`<div class="name-error">${esc(S.feedbackError)}</div>`:""}
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeFeedback">Cancel</button>
       <button class="edit-save" data-act="sendFeedback">${S.feedbackSending?"Sending…":"Send"}</button>
     </div>
   </div>
 </div>`;
}
function settingsView(){
 if(!S.connected)return gate("access settings");
 return `<h1 class="h1">Settings</h1>
   <div class="set-group">
     <div class="set-group-title">Appearance</div>
     <div class="settingcard">
       ${toggleRow("Dark mode","Switch between light and dark theme.",S.theme==="dark","toggleTheme")}
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">Privacy</div>
     <div class="settingcard">
       ${toggleRow("Hide my whale badge","Everyone sees you only as \"holder\"; your whale/big holder tier is hidden.",S.hideWhale,"toggleHideWhale")}
       <div class="set-divider"></div>
       ${toggleRow("Hide my portfolio value","Your total wallet value and holding amounts are hidden on screen.",S.hideValue,"toggleHideValue")}
       <div class="set-divider"></div>
       ${toggleRow("Appear in activity feed","Your room create/join actions won't appear in the live feed on the right.",S.hideActivity,"toggleHideActivity")}
       <div class="set-divider"></div>
       ${toggleRow("Make my profile private","Your profile is hidden from others (you can switch to public mode soon).",S.privateProfile,"togglePrivateProfile")}
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">Wallet</div>
     <div class="settingcard">
       <div class="set-wallet-row">
         <span class="av" style="${avatar(S.wallet.address)}"></span>
         <div class="set-wallet-info"><span class="mono">${short(S.wallet.address)}</span><span class="set-wallet-sub">${S.wallet.sol.toFixed(2)} ${S.wallet.solSymbol||"SOL"} · connected</span></div>
         <button class="set-disconnect" data-act="disconnect">Disconnect</button>
       </div>
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">About</div>
     <div class="settingcard">
       <button class="set-link-row" data-act="openDoc" data-doc="terms"><span>Terms of use</span><span class="set-muted">→</span></button>
       <div class="set-divider"></div>
       <button class="set-link-row" data-act="openDoc" data-doc="privacy"><span>Privacy policy</span><span class="set-muted">→</span></button>
       <div class="set-divider"></div>
       <button class="set-link-row" data-act="openFeedback"><span>Send feedback</span><span class="set-muted">→</span></button>
     </div>
   </div>
   ${S.docOpen?docModal(S.docOpen):""}
   ${S.feedbackOpen?feedbackModal():""}${S.feedbackSent?`<div class="fb-toast">✓ Feedback sent, thank you!</div>`:""}`;
}
function browseRoomsView(){
 const qq=S.roomSearch.trim().toLowerCase();
 const match=(tk)=>{const t=tokenBy(tk)||{};return !qq||tk.toLowerCase().includes(qq)||(t.name||"").toLowerCase().includes(qq);};
 const customRooms=S.customRooms.filter(r=>match(r.ticker));
 const search=`<div class="roomsearch">${I.search}
   <input id="roomSearch" placeholder="search room — token name or ticker" value="${esc(S.roomSearch)}">
   ${S.roomSearch?`<button class="rs-clear" data-act="clearRoomSearch">✕</button>`:""}</div>`;
 const customCards=customRooms.map(r=>{
  const t=tokenBy(r.ticker)||{name:"",color:tokColor(r.ticker)}; const lp=livePrice(r.ticker); const joined=isJoined(r.ticker);
  const cap=r.cap||100; const unlimited=cap===Infinity; const full=!unlimited&&r.members>=cap; const pct=unlimited?0:Math.min(100,Math.round((r.members/cap)*100));
  return`<div class="roomcard" data-act="openRoom" data-token="${r.ticker}">
   <span class="tokenmark" style="background:${t.color}"></span>
   <div class="rc-body">
     <div class="rc-top"><span class="mono rc-tk">$${r.ticker}</span><span class="pubbadge">${I.globe} public</span>${full?`<span class="fulltag">${I.lock} dolu</span>`:""}</div>
     <div class="rc-name">${t.name||""}</div>
     <div class="rc-meta">${r.official||r.creator==="__official__"?"Official":"by "+esc(r.creator)} · <span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span></div>
     <div class="rc-capacity">
       ${unlimited
         ? `<span class="rc-capnum mono">${r.members.toLocaleString()} members · <span class="rc-unlim">∞ unlimited</span></span>`
         : `<div class="rc-capbar"><span class="rc-capfill ${full?"full":pct>=80?"high":""}" style="width:${pct}%"></span></div>
            <span class="rc-capnum mono">${r.members.toLocaleString()}/${capLabel(cap)} members</span>`}
     </div>
   </div>
   ${joined?`<span class="joinedtag">${I.check} joined</span>`:full?`<span class="joinbtn disabled">Dolu</span>`:`<span class="joinbtn">Join</span>`}
  </div>`;
 }).join("");
 const body=customCards
   ? `<div class="section-label">${I.globe} Open rooms — public</div><div class="roomgrid">${customCards}</div>`
   : (S.roomSearch
       ? `<p class="empty">"${esc(S.roomSearch)}" no room found. Be the first to create one.</p>`
       : `<div class="norooms">${I.chat}<h3>No open rooms yet</h3><p>Create the first room — for any token, with live price.</p><button class="norooms-btn" data-act="roomTab" data-tab="create">${I.plus} Create room</button></div>`);
 return `${search}${body}`;
}
function createResultsHtml(){
 const _q=(S.createTicker||"").trim();
 if(_q.length>=2&&!looksLikeAddress(_q)&&!S.picked){
   return `<p class="searchhint">Gecerli bir contract address yapistir (0x... ya da Solana adresi).</p>`;
 }
 const q=(S.createTicker||"").trim();
 if(S.picked){
  const p=S.picked; const exists=isCustomRoom(p.symbol);
  return `<div class="pickedcard">
    <div class="pk-row"><div class="pk-left">
      <span class="tokenmark" style="background:${tokColor(p.symbol)}"></span>
      <div><div class="pk-tk mono">$${esc(p.symbol)} ${chainBadge(p.chain)}</div><div class="pk-name">${esc(p.name)}</div></div>
    </div>
    <div class="pk-price"><div class="mono pk-p">${fprice(p.price)}</div><div class="mono pk-c ${p.chg>=0?"up":"down"}">${p.chg>=0?"+":""}${(+p.chg).toFixed(1)}%</div></div></div>
    <div class="pk-addr mono">${chainMeta(p.chain).label} · ${p.address.slice(0,6)}…${p.address.slice(-6)} · mcap ${fmtMc(p.mc)}</div>
    <button class="pk-change" data-act="unpick">← choose another token</button>
    ${exists?`<p class="mhint" style="color:var(--red)">$${esc(p.symbol)} already has a room.</p>`:""}
  </div>`;
 }
 if(S.searching)return `<div class="searchstate">${I.search} searching…</div>`;
 if(S.searchErr)return `<div class="searchstate err">${I.lock} Search could not connect. The preview window may block the external API — it works when deployed to your own site.</div>`;
 if(q.length<2)return `<p class="searchhint"></p>`;
 if(!S.searchResults.length)return `<p class="searchhint">"${esc(q)}" no results. Check the ticker.</p>`;
 return `<div class="resultlist">${S.searchResults.map((r,i)=>`
   <button class="resultrow" data-act="pickToken" data-i="${i}">
     <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
     <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}${S.customRooms.find(x=>x.ticker.toUpperCase()===(r.symbol||"").toUpperCase())?`<span class="rr-hasroom">● has room</span>`:""}</span><span class="rr-name">${esc(r.name)}${r.mc?` · mcap ${typeof r.mc==="number"?fmtMc(r.mc):r.mc}`:""}${r._liq?` · likidite ${fmtMc(r._liq)}`:""}${r.address?` · <span class="mono rr-ca">${r.address.slice(0,5)}…${r.address.slice(-4)}</span>`:""}</span></div>
     <span class="mono rr-price ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span>
   </button>`).join("")}</div>`;
}
function myRoom(){return S.customRooms.find(r=>r.creator===myTag());}
function createRoomView(){
 // 1 cüzdan = 1 oda: zaten bir odan varsa yeni kuramazsın
 const existing=myRoom();
 if(existing){
   const t=tokenBy(existing.ticker)||{name:"",color:tokColor(existing.ticker)};
   return `<div class="createwrap">
     <div class="already-room">
       <div class="ar-ic">${I.badge}</div>
       <h3 class="ar-title">Zaten bir odan var</h3>
       <p class="ar-txt">Each wallet can only You already have <b>a room</b>. It's below — enter anytime.</p>
       <div class="ar-card">
         <span class="tokenmark" style="background:${t.color}"></span>
         <div class="ar-info"><span class="mono ar-tk">$${esc(existing.ticker)}</span><span class="ar-meta">${(existing.members||0).toLocaleString()}${(existing.cap||100)===Infinity?" members · ∞ unlimited":"/"+capLabel(existing.cap||100)+" members"} · you are the creator</span></div>
         <button class="ar-go" data-act="openRoom" data-token="${esc(existing.ticker)}">Git →</button>
       </div>
     </div>
     ${S.deleteConfirm===existing.ticker?deleteConfirmModal(existing.ticker):""}
   </div>`;
 }
 const picked=S.picked;
 const exists=picked&&isCustomRoom(picked.symbol);
 const sel=tierForCap(S.createCap);
 const capOptions=CAP_TIERS.map(t=>`<button class="cap-opt ${S.createCap===t.cap?"on":""} ${t.cap===Infinity?"unlimited":""}" data-act="pickCap" data-cap="${t.cap}">
    ${t.cap===Infinity?`<span class="cap-num">∞</span><span class="cap-lbl">unlimited</span>`:`<span class="cap-num">${capLabel(t.cap)}</span><span class="cap-lbl">abone</span>`}
    <span class="cap-price ${t.price===0?"free":""}">${t.price===0?"Bedava":"$"+t.price}</span></button>`).join("");
 const canCreate=picked&&!exists;
 const btnLabel=sel.price===0?`Create room — bedava`:`Pay and create — $${sel.price}`;
 return `<div class="createwrap">
  <div class="createhero">
   <div class="ch-ic">${I.plus}</div>
   <div><strong>Create your own room</strong><p>Paste the contract address, create your room. Each wallet can create <b>1 room</b>.</p></div>
  </div>
  <div class="mfield"><label class="mlabel">Which token? <span class="mhint">by contract address (CA)</span></label>
   <div class="roomsearch"><span id="searchIco">${I.search}</span>
     <input class="searchinput" id="createTicker" placeholder="paste contract address (CA)" value="${esc(S.createTicker||"")}" maxlength="64" autocomplete="off" ${picked?"disabled":""}>
   </div>
   <p class="ca-note">Search by contract address (CA) only.</p>
   ${S.officialRoomError?`<p class="official-room-note">${I.globe} BTC, ETH, SOL, BNB and XRP have official PODCTO rooms — you can't create these. Just open them from the Rooms list.</p>`:""}
   <div id="searchResults" class="searchresults">${createResultsHtml()}</div>
  </div>
  ${picked&&!exists?`
  <button class="createsubmit" data-act="payCreate">${I.plus} Create room</button>
  <p class="create-fine">You auto-join when the room is created.</p>
  `:""}
 </div>`;
}
function roomView(ticker){
 const t=tokenBy(ticker)||{t:ticker,name:"",price:0,chg:0,color:tokColor(ticker)};
 const custom=isCustomRoom(ticker);
 if(!S.connected)return gate("$"+ticker+" to enter room");
 // bu token has no room yetsa: kurmaya yönlendir
 if(!custom)return `<button class="back" data-act="nav" data-view="rooms">← Rooms</button>
   <div class="norooms">${I.chat}<h3>$${ticker} has no room yet</h3><p>Be the first to create a room — with live price, public.</p><button class="norooms-btn" data-act="createFor" data-token="${ticker}">${I.plus} $${ticker} create room</button></div>`;
 const room=S.customRooms.find(r=>r.ticker===ticker);
 // katılım ekranı: katılmadan sohbet GÖRÜNMEZ
 if(!isJoined(ticker)){
  const lp=livePrice(ticker);
  const cap=room?room.cap||100:100; const full=room?room.members>=cap:false;
  return `<button class="back" data-act="nav" data-view="rooms">← Rooms</button>
   <div class="joinscreen">
     <span class="tokenmark xl" style="background:${t.color}"></span>
     <h2 class="mono join-tk">$${ticker}</h2>
     <p class="join-name">${t.name||""}</p>
     <div class="join-stats">
       <div><span class="js-v mono">${fprice(lp.price)}</span><span class="js-l">price</span></div>
       <div><span class="js-v mono ${t.chg>=0?"up":"down"}">${t.chg>=0?"+":""}${t.chg}%</span><span class="js-l">24s</span></div>
       <div><span class="js-v mono">${(room?room.members:0).toLocaleString()}${cap===Infinity?"":"/"+capLabel(cap)}</span><span class="js-l">members</span></div>
     </div>
     <div class="join-lockinfo">${I.globe} ${room.official||room.creator==="__official__"?"Official PODCTO room":"Public room · creator "+esc(room.creator)}</div>
     ${(function(){
       if(full) return `<div class="room-fullbox">${I.lock} This room is full (${capLabel(cap)}/${capLabel(cap)}).</div>`;
       return `<button class="joinbig" data-act="joinRoom" data-token="${ticker}">Join room</button>
       <p class="join-hint">Public — you can join.</p>`;
     })()}
   </div>`;
 }
 const msgs=S.chat[ticker]||[];
 const lp=livePrice(ticker);
 return `<div class="roompane"><div class="roomhead"><button class="back" data-act="nav" data-view="rooms">←</button>
   <span class="tokenmark sm" style="background:${t.color}"></span><span class="mono tk">$${ticker}</span>
   <span class="roommeta">${I.globe} ${(room?room.members:0).toLocaleString()}${(room?room.cap:100)===Infinity?" members · ∞":"/"+capLabel(room?room.cap||100:100)+" members"}</span>
   <div class="livepricebox">
     <span class="lp-live"><span class="pulse"></span>LIVE</span>
     <span class="lp-price mono" id="lpPrice">${fprice(lp.price)}</span>
     <span class="lp-chg mono ${t.chg>=0?"up":"down"}" id="lpChg">${t.chg>=0?"+":""}${t.chg}%</span>
   </div>
   <div class="roommenu-wrap">
     <button class="room-share" data-act="toggleRoomMenu" title="More">${I.dots}</button>
     ${S.roomMenu===ticker?`<div class="roommenu" data-emoji-pop>
       <button class="roommenu-item" data-act="shareRoom" data-token="${ticker}">${I.share} Share room</button>
       ${room&&room.creator===myTag()&&nextTiers(room.cap||100).length?`<button class="roommenu-item" data-act="openUpgrade" data-token="${ticker}">${I.trend} Upgrade capacity</button>`:""}
       <button class="roommenu-item danger" data-act="askLeave" data-token="${ticker}">${I.exit} Leave room</button>
     </div>`:""}
   </div>
   </div>
  ${S.leaveConfirm===ticker?leaveConfirmModal(ticker):""}
  ${S.deleteConfirm===ticker?deleteConfirmModal(ticker):""}
  ${S.upgradeOpen===ticker?upgradeModal(ticker):""}
  <div class="messages" id="messages">${msgs.map(m=>{
    const tier=msgTier(m,ticker);
    const rt=m.replyTo;
    return `<div class="msg ${m.mine?"mine":""}" data-mid="${esc(String(m.id||""))}">
   ${ringAvatar(m.wallet+ticker,tier,"sm",m.wallet)}
   <div class="msg-inner"><button class="${nameCls(m.wallet,m.mine)} msgwallet pf-link" data-act="openProfile" data-wallet="${esc(m.wallet)}">${esc(displayName(m.wallet,m.mine))}${tier?tierBadge(tier):""}${m.creator?`<span class="msgcreator">creator</span>`:""}</button>
   ${rt?`<div class="msg-reply-quote" data-act="gotoMsg" data-goto="${esc(String(rt.id||""))}"><span class="mrq-name">${esc(rt.name||displayName(rt.wallet)||"")}</span><span class="mrq-text">${esc((rt.text||"").slice(0,80))}</span></div>`:""}
   ${m.text?`<p>${esc(m.text)}</p>`:""}${m.media?`<img class="msg-media zoomable" src="${m.media}" alt="" data-act="zoom" data-src="${m.media}">`:""}
   ${m.reactions&&m.reactions.length?`<div class="msg-reactions">${m.reactions.map(function(rx){return `<span class="msg-rx">${rx}</span>`;}).join("")}</div>`:""}
   <button class="msg-actbtn" data-act="msgMenu" data-mid="${esc(String(m.id||""))}" title="React or reply">${I.dots}</button>
   ${String(S.msgMenu)===String(m.id)?`<div class="msg-menu" data-emoji-pop>
     <div class="msg-menu-emojis">${["👍","❤️","😂","🔥","🎉","😮"].map(function(e){return `<button class="mm-emoji" data-act="reactMsg" data-mid="${esc(String(m.id))}" data-emoji="${e}">${e}</button>`;}).join("")}</div>
     <button class="msg-menu-item" data-act="replyMsg" data-mid="${esc(String(m.id))}">${I.reply||""} Reply</button>
   </div>`:""}
   </div></div>`;}).join("")}</div>
  ${S.chatMedia?`<div class="chatmediaprev"><img src="${S.chatMedia}" alt=""><button class="media-x" data-act="clearChatMedia">${I.x}</button></div>`:""}
  <div class="chat-tools">
    <button class="tool-b ${S.emojiFor==="chat"?"on":""}" data-act="toggleEmoji" data-target="chat" title="Emoji">${I.smile}</button>
    <button class="tool-b ${S.gifFor==="chat"?"on":""}" data-act="toggleGif" data-target="chat" title="GIF">${I.gif}</button>
    <button class="tool-b" data-act="pickPhoto" data-target="chat" title="Photo">${I.image}</button>
    <div class="tool-pop up">${S.emojiFor==="chat"?emojiPicker("chat"):""}${S.gifFor==="chat"?gifPicker("chat"):""}</div>
  </div>
  ${S.replyingTo?`<div class="reply-banner"><span class="rb-label">Replying to <b>${esc(S.replyingTo.name||displayName(S.replyingTo.wallet)||"")}</b></span><span class="rb-text">${esc((S.replyingTo.text||"").slice(0,60))}</span><button class="rb-x" data-act="cancelReply">${I.x}</button></div>`:""}
  <div class="chatinput"><input id="chatInput" maxlength="280" placeholder="$${ticker} room…" data-token="${ticker}" value="${esc(S.chatText||"")}">
   <button data-act="sendChat" data-token="${ticker}">${I.send}</button></div>
  ${S.shareOpen===ticker?shareModal(ticker):""}</div>`;
}
function gate(what){return`<div class="gate">${I.wallet}<h2>${what} connect your wallet</h2>
 <p>Everything works with your wallet. No password, no email — just your wallet.</p>
 <button class="connect big" data-act="connect">Connect wallet</button></div>`;}

function modalView(){
 if(!S.createDone)return"";
 const tk=S.createDone;
 return`<div class="toast"><span class="toast-ic">${I.check}</span>
   <div class="toast-txt"><strong>$${tk} room created</strong><span>creator badge ready · auto joined</span></div>
   <button class="toast-go" data-act="goNewRoom" data-token="${tk}">Go to room →</button></div>`;
}

function navActive(key){
 if(key==="rooms")return S.view.name==="rooms"||S.view.name==="room";
 return S.view.name===key;
}
function mainView(){
 const v=S.view;
 if(v.name==="feed")return feedView();
 if(v.name==="post")return postDetailView(v.id);
 if(v.name==="tokens")return tokensView();
 if(v.name==="token")return tokenPageView(v.token);
 if(v.name==="portfolio")return portfolioView();
 if(v.name==="comment")return commentDetailView(v.cid,v.postId);
 if(v.name==="notifications")return notificationsView();
 if(v.name==="messages")return messagesView();
 if(v.name==="dm")return dmView(v.peer);
 if(v.name==="profile")return profileView();
 if(v.name==="leaderboard")return leaderboardView();
 if(v.name==="settings")return settingsView();
 if(v.name==="myrooms")return myRoomsPage();
 if(v.name==="rooms")return roomsView();
 if(v.name==="room")return roomView(v.token);
 return"";
}
function myRoomsPage(){
 if(!S.connected)return gate("see their rooms");
 return `<h1 class="h1">My Rooms</h1>
   <p class="sub">Rooms you joined and created are here.</p>
   ${myRoomsView()}`;
}
// postı paylaşma penceresi
function postShareModal(){
 const p=S.posts.find(x=>x.id===S.sharePostId); if(!p)return "";
 const link=`https://podcto.com/post/${p.id}`;
 const who=displayName(p.wallet,p.mine);
 const snippet=(p.text||"").slice(0,80)+((p.text||"").length>80?"…":"");
 const tweet=`${snippet ? '"'+snippet+'" ':""}See it on PODCTO 👉 ${link}`;
 const xUrl=`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
 return `<div class="overlay" data-act="closePostShare">
   <div class="editcard">
     <div class="edit-h"><strong>Share post</strong><button class="edit-x" data-act="closePostShare">${I.x}</button></div>
     <div class="sharepreview"><span class="mono sp-who">${esc(who)}</span><p class="sp-txt">${esc(snippet||"(media)")}</p></div>
     <div class="share-linkbox"><span class="mono share-link">${link}</span><button class="share-copy" data-act="copyPostLink" data-id="${p.id}">${S.copied?I.check:I.copy}${S.copied?" copied":" copy"}</button></div>
     <div class="share-opts">
       <button class="share-opt feed" data-act="repostFromShare" data-id="${p.id}">${I.repost}<span>${p.reposted?"Undo repost":"Repost to feed"}</span></button>
       <a class="share-opt x" href="${xUrl}" target="_blank" rel="noopener">${I.twitter}<span>Share on X</span></a>
     </div>
   </div>
 </div>`;
}
// oda paylaşma penceresi: link copy + Share on X + akışta paylaş
function roomLink(ticker){return `https://podcto.com/room/${encodeURIComponent(ticker)}`;}
function leaveConfirmModal(ticker){
 return `<div class="overlay" data-act="closeLeave">
   <div class="editcard confirm">
     <div class="confirm-ic">${I.exit}</div>
     <strong class="confirm-title">$${esc(ticker)}leave room</strong>
     <p class="confirm-txt">Are you sure you want to leave this room? You can rejoin anytime.</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeLeave">Cancel</button>
       <button class="confirm-leave" data-act="leaveRoom" data-token="${esc(ticker)}">Leave room</button>
     </div>
   </div>
 </div>`;
}
function deleteConfirmModal(ticker){
 return `<div class="overlay" data-act="closeDelete">
   <div class="editcard confirm">
     <div class="confirm-ic">${I.trash}</div>
     <strong class="confirm-title">$${esc(ticker)}delete room</strong>
     <p class="confirm-txt">You are about to permanently delete your room. All chat and members will be lost, this cannot be undone. You can create a new room afterwards.</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeDelete">Cancel</button>
       <button class="confirm-leave" data-act="deleteRoom" data-token="${esc(ticker)}">Delete room</button>
     </div>
   </div>
 </div>`;
}
function upgradeModal(ticker){
 const room=S.customRooms.find(r=>r.ticker===ticker); if(!room)return "";
 const cur=room.cap||100;
 const opts=nextTiers(cur).map(t=>`<button class="cap-opt ${t.cap===Infinity?"unlimited":""}" data-act="doUpgrade" data-token="${esc(ticker)}" data-cap="${t.cap}">
    ${t.cap===Infinity?`<span class="cap-num">∞</span><span class="cap-lbl">unlimited</span>`:`<span class="cap-num">${capLabel(t.cap)}</span><span class="cap-lbl">abone</span>`}
    <span class="cap-price">$${t.price}</span></button>`).join("");
 return `<div class="overlay" data-act="closeUpgrade">
   <div class="editcard">
     <div class="edit-h"><strong>Upgrade capacity</strong><button class="edit-x" data-act="closeUpgrade">${I.x}</button></div>
     <p class="fb-intro">$${esc(ticker)} room is currently <b>${capLabel(cur)}</b> subscriber capacity. Choose a bigger tier:</p>
     <div class="cap-grid">${opts}</div>
     <p class="create-fine" style="margin-top:12px">Confirmed from your wallet. New capacity applies instantly.</p>
   </div>
 </div>`;
}
function shareModal(ticker){
 const t=tokenBy(ticker)||{name:""};
 const link=roomLink(ticker);
 const tweet=`Join the $${ticker} room on PODCTO 👉 ${link}`;
 const xUrl=`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
 return `<div class="overlay" data-act="closeShare">
   <div class="editcard">
     <div class="edit-h"><strong>$${esc(ticker)} share room</strong><button class="edit-x" data-act="closeShare">${I.x}</button></div>
     <p class="fb-intro">Share this room — anyone can join via the link.</p>
     <div class="share-linkbox"><span class="mono share-link">${link}</span><button class="share-copy" data-act="copyRoomLink" data-token="${esc(ticker)}">${S.copied?I.check:I.copy}${S.copied?" copied":" copy"}</button></div>
     <div class="share-opts">
       <a class="share-opt x" href="${xUrl}" target="_blank" rel="noopener">${I.twitter}<span>Share on X</span></a>
       <button class="share-opt feed" data-act="shareToFeed" data-token="${esc(ticker)}">${I.home}<span>Post to Feed</span></button>
     </div>
   </div>
 </div>`;
}


// ==== üst global arama: tokenlar (DexScreener+CoinGecko) + cüzdanlar (mevcut içerikten) ====
function knownWallets(){
 const set=new Set();
 S.posts.forEach(p=>{if(p.wallet)set.add(p.wallet);});
 Object.values(S.chat).forEach(msgs=>msgs.forEach(m=>{if(m.wallet)set.add(m.wallet);}));
 S.activity.forEach(a=>{if(a.wallet)set.add(a.wallet);});
 if(S.connected)set.add(myTag());
 return [...set];
}
let _topTimer=null;
function scheduleTopSearch(q){
 clearTimeout(_topTimer);
 if(!q||q.trim().length<2){S.topResults=[];S.topSearching=false;renderTopDrop();return;}
 S.topSearching=true;renderTopDrop();
 _topTimer=setTimeout(async()=>{
   const my=q;
   // sadece profil (cüzdan/isim) araması — Supabase. Token araması sol menüdeki "Search token" sekmesinde.
   if(window.__holdxSearchProfiles){
     window.__holdxSearchProfiles(q).then(function(profs){
       if(S.topSearch===my){ S.topProfiles=profs||[]; S.topSearching=false; renderTopDrop(); }
     });
   } else { S.topSearching=false; }
   S.topResults=[]; renderTopDrop();
 },350);
}
function renderTopDrop(){
 const box=document.getElementById("topSearchDrop");
 if(box)box.innerHTML=topSearchResultsHtml();
}
function topSearchResultsHtml(){
 const q=(S.topSearch||"").trim();
 if(q.length<2)return `<div class="sd-hint">Type at least 2 letters — search room or wallet.</div>`;
 const ql=q.toLowerCase();
 // gerçek profil eşleşmeleri (Supabase) + mevcut içerikteki cüzdanlar
 const profs=(S.topProfiles||[]).slice(0,4);
 const wallets=knownWallets().filter(w=>w.toLowerCase().includes(ql)).slice(0,3);
 let html="";
 if(profs.length){
   html+=`<div class="sd-cat">Userlar</div>`+profs.map(p=>{
     const nm=(p.display_name&&p.display_name.trim())?p.display_name:short(p.wallet);
     return `<button class="sd-row" data-act="openProfile" data-wallet="${esc(p.wallet)}">
       ${p.avatar?`<img class="av xs" src="${p.avatar}" alt="">`:`<span class="av xs" style="${avatar(p.wallet)}"></span>`}<span class="sd-w">${esc(nm)}</span><span class="mono sd-type">${short(p.wallet)}</span></button>`;
   }).join("");
 }
 if(wallets.length){
   html+=`<div class="sd-cat">Wallets</div>`+wallets.map(w=>`<button class="sd-row" data-act="openProfile" data-wallet="${esc(w)}">
     <span class="av xs" style="${avatar(w+"seed")}"></span><span class="mono sd-w">${esc(w)}</span><span class="sd-type">profil</span></button>`).join("");
 }
 // ODA eşleşmeleri
 // oda: ticker VEYA kurucunun profil ismi ile eşleşsin
 const rooms=S.customRooms.filter(r=>{
   if(r.ticker.toLowerCase().includes(ql))return true;
   const cn=(S.names&&S.names[r.creator])?S.names[r.creator].toLowerCase():"";
   if(cn&&cn.includes(ql))return true;
   if((r.creator||"").toLowerCase().includes(ql))return true;
   return false;
 }).slice(0,5);
 if(rooms.length){
   html+=`<div class="sd-cat">Rooms</div>`+rooms.map(r=>`<button class="sd-row" data-act="openRoom" data-token="${esc(r.ticker)}">
     <span class="tokenmark xs" style="background:${tokColor(r.ticker)}"></span><span class="mono sd-tk">$${esc(r.ticker)}</span><span class="sd-type">${(r.members||0)} members · ${esc(S.names&&S.names[r.creator]?S.names[r.creator]:short(r.creator||""))}</span></button>`).join("");
 }
 if(!html)html=`<div class="sd-hint">"${esc(q)}" no room or user found.</div>`;
 return html;
}
function welcomeScreen(){
 return `<div class="welcome" data-theme="${S.theme}">
   <div class="wc-bg"></div>
   ${window.__LOGO_URL?`<div class="wc-bg-logo" style="background-image:url('${window.__LOGO_URL}')"></div>`:""}
   <button class="wc-theme" data-act="toggleTheme">${S.theme==="dark"?I.sun:I.moon}</button>
   <div class="wc-inner">
     <div class="wc-logo">${window.__LOGO_URL?`<img class="wc-logo-img" src="${window.__LOGO_URL}" alt="PODCTO">`:`<span class="logo lg"></span>`}</div>
     <h1 class="wc-brand">${BRAND}</h1>
     <p class="wc-tag">${TAGLINE}</p>
     <p class="wc-desc">Where holders meet. Connect your wallet, enter rooms for the coins you hold, talk with real holders. No bots, no fake accounts — the social layer for crypto intelligence.</p>
     <div class="wc-actions">
       <button class="wc-connect" data-act="connect">${I.wallet} Connect wallet</button>
       <button class="wc-explore" data-act="enterExplore">Explore first →</button>
     </div>
     <div class="wc-feats">
       <div class="wc-feat">${I.badge}<span>Verified holder badges</span></div>
       <div class="wc-feat">${I.chat}<span>Token-based chat rooms</span></div>
       <div class="wc-feat">${I.globe}<span>All chains — SOL, ETH, Robinhood & more</span></div>
     </div>
     <div class="wc-soon">📱 Mobile app coming soon</div>
   </div>
 </div>`;
}
let _renderQueued=false;
function render(){
 // Art arda gelen render çağrılarını tek karede birleştir (hız)
 if(_renderQueued)return;
 _renderQueued=true;
 requestAnimationFrame(function(){ _renderQueued=false; _renderNow(); });
}
function _renderNow(){
 // adres çubuğunu görünüme göre güncelle
 try{
   const v=S.view||{};
   let want="/";
   if(v.name==="room"&&v.token)want="/room/"+encodeURIComponent(v.token);
   else if(v.name==="post"&&v.id)want="/post/"+encodeURIComponent(v.id);
   else if(v.name==="profile"){ const pw=v.wallet||(S.wallet&&S.wallet.address); if(pw)want="/u/"+encodeURIComponent(pw); }
   else if(v.name==="token"&&v.token)want="/token/"+encodeURIComponent(v.token);
   else if(v.name==="dm"&&v.peer)want="/dm/"+encodeURIComponent(v.peer);
   else if(v.name==="feed")want="/";
   else if(v.name)want="/"+v.name;
   if(window.location.pathname!==want){ window.history.replaceState(null,"",want); }
 }catch(e){}
 var _ae=document.activeElement;
 var _aeId=(_ae&&(_ae.tagName==="INPUT"||_ae.tagName==="TEXTAREA"))?_ae.id:null;
 var _aeSel=null; try{_aeSel=_aeId?_ae.selectionStart:null;}catch(e){}
 const app=document.getElementById("app");
 if(!app)return; // sayfa henüz hazır değilse çökme
 app.setAttribute("data-theme",S.theme);
 // ilk açılış: karşılama ekranı (bir kez, "keşfet" ya da "connect wallet" seçilene kadar)
 if(!S.entered&&!S.connected){app.innerHTML=welcomeScreen();return;}
 app.innerHTML=`
  <header class="top"><button class="brand" data-act="nav" data-view="feed">${window.__LOGO_URL?`<img class="logo-img" src="${window.__LOGO_URL}" alt="PODCTO">`:`<span class="logo"></span><span class="word">${BRAND}</span>`}</button>
   <div class="search"><span class="search-ic">${I.search}</span><input id="topSearch" placeholder="search room or wallet" value="${esc(S.topSearch)}" autocomplete="off">${S.topSearch?`<button class="search-clear" data-act="clearTopSearch">${I.x}</button>`:""}
     ${S.topSearchOpen?`<div class="search-dropdown" id="topSearchDrop">${topSearchResultsHtml()}</div>`:""}
   </div>
   <div class="top-right">
     <button class="themebtn" data-act="toggleTheme" title="${S.theme==="dark"?"Light mode":"Dark mode"}">${S.theme==="dark"?I.sun:I.moon}</button>
     ${S.connected?`<div class="idwrap">
       <button class="idbtn" data-act="walletMenu">${ringAvatar(S.wallet.address,null,"",S.wallet.address)}<span class="mono">${short(S.wallet.address)}</span><span class="solbal">${S.wallet.sol.toFixed(2)} ${S.wallet.solSymbol||"SOL"}</span></button>
       ${S.walletMenu?`<div class="wallet-menu" data-emoji-pop>
         <button class="wallet-menu-item" data-act="nav" data-view="portfolio">${I.wallet} Portfolio</button>
         <button class="wallet-menu-item" data-act="nav" data-view="profile">${I.user||I.badge} Profile</button>
         <button class="wallet-menu-item" data-act="copyAddr" data-wallet="${esc(S.wallet.address)}">${I.copy} ${S.copiedAddr===S.wallet.address?"Copied":"Adresi copy"}</button>
         <button class="wallet-menu-item danger" data-act="disconnect">${I.exit} Disconnect</button>
       </div>`:""}
     </div>`
      :`<button class="connect" data-act="connect">Connect wallet</button>`}
   </div></header>
  <div class="shell">
   <nav class="rail">${NAV.map(n=>`<button class="navbtn ${navActive(n[0])?"on":""}" data-act="nav" data-view="${n[0]}"><span class="icn">${I[n[2]]}</span><span>${n[1]}</span>${n[0]==="messages"&&S.unreadDM>0?`<span class="nav-badge">${S.unreadDM}</span>`:""}${n[0]==="notifications"&&S.unreadNotif>0?`<span class="nav-badge">${S.unreadNotif}</span>`:""}</button>`).join("")}
    <div class="rail-foot"><p class="tag">${TAGLINE}</p></div></nav>
   <main class="main">${mainView()}</main>
   ${activityPanel()}
  </div>
  <nav class="bottom">${NAV.map(n=>`<button class="${navActive(n[0])?"on":""}" data-act="nav" data-view="${n[0]}">${I[n[2]]}${n[0]==="messages"&&S.unreadDM>0?`<span class="nav-badge sm">${S.unreadDM}</span>`:""}</button>`).join("")}</nav>
  ${modalView()}
  ${S.lightbox?`<div class="lightbox" data-act="closeZoom"><button class="lb-close" data-act="closeZoom">${I.x}</button><img src="${S.lightbox}" alt=""></div>`:""}
  <button class="scrolltop" data-act="scrollTop" title="Back to top">↑</button>`;
 const m=document.getElementById("messages"); if(m)m.scrollTop=m.scrollHeight;
 const ct=document.getElementById("createTicker");
 if(ct){ct.focus();ct.setSelectionRange(ct.value.length,ct.value.length);}
 const rsi=document.getElementById("roomSearch");
 if(rsi&&S.roomSearch){rsi.focus();rsi.setSelectionRange(rsi.value.length,rsi.value.length);}
 const fsi=document.getElementById("feedSearch");
 if(fsi){fsi.focus();fsi.setSelectionRange(fsi.value.length,fsi.value.length);}
 const esi=document.getElementById("exploreSearch");
 if(esi&&S.exploreSearch){esi.focus();esi.setSelectionRange(esi.value.length,esi.value.length);}
 const psi=document.getElementById("postSearch");
 if(psi){psi.focus();psi.setSelectionRange(psi.value.length,psi.value.length);}
 if(_aeId){
   var _back=document.getElementById(_aeId);
   if(_back&&document.activeElement!==_back){
     _back.focus();
     try{var _p=(_aeSel!=null?_aeSel:_back.value.length);_back.setSelectionRange(_p,_p);}catch(e){}
   }
 }
 const tsi=document.getElementById("topSearch");
 if(tsi&&S.topSearchOpen&&!_aeId){tsi.focus();tsi.setSelectionRange(tsi.value.length,tsi.value.length);}
 const cmi=document.getElementById("commentInput");
 if(cmi&&S.commentText){cmi.focus();cmi.setSelectionRange(cmi.value.length,cmi.value.length);}
 if(S.crop)setupCropper();
 if(S.dmScrollBottom){ const dm=document.getElementById("dmMsgs"); if(dm)dm.scrollTop=dm.scrollHeight; S.dmScrollBottom=false; }
 if(S.chatScrollBottom&&!S._keepScroll){ const cb=document.getElementById("messages"); if(cb)cb.scrollTop=cb.scrollHeight; S.chatScrollBottom=false; }
 const gsi=document.getElementById("gifSearch");
 if(gsi){gsi.focus();gsi.setSelectionRange(gsi.value.length,gsi.value.length);}
 else { // gif araması açık değilse, metin alanlarına odağı geri ver
   const cta=document.getElementById("composerText");
   if(cta&&S.composerText){cta.focus();cta.setSelectionRange(cta.value.length,cta.value.length);}
   const cin=document.getElementById("chatInput");
   if(cin&&S.chatText){cin.focus();cin.setSelectionRange(cin.value.length,cin.value.length);}
 }
}

function connect(){
  // Zaten bagliysan tekrar login deneme (hata veriyor)
  if(S.connected){ return; }
  if(window.__privyLogin){ window.__privyLogin(); }
  else { console.log("Privy is not ready yet"); }
}
// Privy giriş yapınca React bunu çağırır; gerçek cüzdan adresini PODCTO'e verir
// Supabase'den paylasimlari yukle ve akisa ekle
window.__holdxApplyMemberships=function(tickers){
  if(!tickers) return;
  tickers.forEach(function(t){ S.joined[t]=true; });
  render();
};
window.__holdxUpdateMemberCount=function(ticker,delta){
 const r=S.customRooms.find(function(x){return x.ticker===ticker;});
 if(r){ r.members=Math.max(0,(r.members||0)+delta); render(); }
};
window.__holdxSetMemberCounts=function(counts){
 S.customRooms.forEach(function(r){ if(counts[r.ticker]!==undefined)r.members=counts[r.ticker]; });
 render();
};
window.__holdxApplyRooms=function(rows){
  if(!rows) return;
  const mapped=rows.map(function(r){
    var cap=r.cap; if(cap>=2000000000)cap=Infinity;
    // token registry'de yoksa temel bir kayit olustur (fiyat sonra canli gelir)
    if(!TOKREG[r.ticker]){
      TOKREG[r.ticker]={t:r.ticker,name:"",price:0,chg:0,mc:"—",color:tokColor(r.ticker),address:r.address||null,chain:r.chain||"solana",source:null,cgId:null};
    } else if(r.chain && !TOKREG[r.ticker].chain){ TOKREG[r.ticker].chain=r.chain; }
    // kendi kurdugun odaya otomatik katil
    if(S.wallet && r.creator===S.wallet.address){ S.joined[r.ticker]=true; }
    return {ticker:r.ticker, creator:r.creator, members:r.members||1, cap:cap, address:r.address||null, createdAt:""};
  });
  // resmi odaları (BTC/ETH/SOL/BNB/XRP) her zaman ekle — kurucu gizli, silinemez
  const officialCards=OFFICIAL_ROOMS.map(function(tk){
    const dbRoom=rows.find(function(r){return (r.ticker||"").toUpperCase()===tk;});
    const memberCount=dbRoom?(dbRoom.members||0):0;
    return {ticker:tk, creator:"__official__", members:memberCount, cap:Infinity, address:(TOKREG[tk]&&TOKREG[tk].address)||null, createdAt:"", official:true};
  });
  // DB'den gelen odalardan resmi ticker'lari çıkar (çift olmasın), resmi olanları başa koy
  const nonOfficial=mapped.filter(function(m){return !isOfficialRoom(m.ticker);});
  S.customRooms = officialCards.concat(nonOfficial);
  render();
  // yeni odalarin fiyatlarini hemen cek
  if(typeof refreshTokenPrices==="function"){ refreshTokenPrices(); }
};
window.__holdxApplyInteractions=function(data){
 // data: {likes:{postId:count}, myLikes:[postId], reposts:{postId:count}, myReposts:[postId], comments:{postId:[{wallet,text}]}}
 function _applyOne(p){
   const pid=String(p.id);
   const likes=(data.likes&&data.likes[pid])||0;
   const reposts=(data.reposts&&data.reposts[pid])||0;
   const cms=(data.comments&&data.comments[pid])||[];
   const merged=Object.assign({},p,{
     likes:likes, liked:(data.myLikes||[]).indexOf(pid)>=0,
     reposts:reposts, reposted:(data.myReposts||[]).indexOf(pid)>=0,
     comments:cms, replies:cms.length
   });
   if(p.quotedId&&!merged.quoted&&window.__quotedCache&&window.__quotedCache[p.quotedId])merged.quoted=window.__quotedCache[p.quotedId];
   return merged;
 }
 // RT deposundaki postların sayılarını da güncelle (0 kalmasın)
 if(window.__userReposts){
   Object.keys(window.__userReposts).forEach(function(w){
     window.__userReposts[w]=(window.__userReposts[w]||[]).map(function(rp){
       if(data.likes&&(data.likes[String(rp.id)]!==undefined||data.reposts[String(rp.id)]!==undefined||data.comments[String(rp.id)]!==undefined)){
         const u=_applyOne(rp); u._repostedBy=rp._repostedBy; u._repostAt=rp._repostAt; u._isRepost=true; return u;
       }
       return rp;
     });
   });
 }
 S.posts=S.posts.map(function(p){
   return _applyOne(p);
 });
 render();
};
window.__holdxSetFeedReposts=function(rows){
  window.__feedReposts=window.__feedReposts||{};
  (rows||[]).forEach(function(r){ window.__feedReposts[r.post_id]={id:r.post_id,_repostAt:r.created_at}; });
  applyFeedReposts();
  render();
};
function applyFeedReposts(){
  window.__feedReposts=window.__feedReposts||{};
  const myAddr=S.wallet?S.wallet.address:null;
  if(!myAddr)return;
  // mevcut RT kartlarini temizle, depodan yeniden kur
  S.posts=S.posts.filter(function(p){return !p._isRepost;});
  Object.keys(window.__feedReposts).forEach(function(id){
    const orig=S.posts.find(function(x){return String(x.id)===String(id)&&!x._isRepost;});
    if(orig){
      const rt=Object.assign({},orig,{_isRepost:true,_repostedBy:myAddr,_repostAt:window.__feedReposts[id]._repostAt});
      S.posts.unshift(rt);
    }
  });
  S.posts.sort(function(a,b){ return (new Date(b._repostAt||b.created_at||0))-(new Date(a._repostAt||a.created_at||0)); });
}
window.__holdxFixPostId=function(tempId,realId,createdAt){
 const p=S.posts.find(function(x){return String(x.id)===String(tempId);});
 if(p){ p.id=realId; if(createdAt)p.created_at=createdAt; render(); }
};
window.__holdxSetMoreState=function(has){ S.hasMorePosts=!!has; render(); };
window.__userReposts={}; // {wallet:[post,...]}
window.__holdxSetUserReposts=function(wallet,posts){
 // boş liste eskiyi ezmesin (art arda gelen yüklemelerde RT kaybolmasın)
 if((posts&&posts.length)|| !window.__userReposts[wallet]){
   window.__userReposts[wallet]=posts||[];
 }
 render();
};
window.__holdxGotoProfile=function(wallet){
 if(window.__holdxLoadUserPosts)window.__holdxLoadUserPosts(wallet);
 S.view={name:"profile",token:null,wallet:wallet}; S.profileTab="posts"; render();
};
window.__holdxApplyQuoted=function(posts){
 window.__quotedCache=window.__quotedCache||{};
 (posts||[]).forEach(function(q){ window.__quotedCache[q.id]={id:q.id,wallet:q.wallet,text:q.text,media:q.media}; });
 // mevcut postlara bağla
 S.posts.forEach(function(p){ if(p.quotedId&&window.__quotedCache[p.quotedId])p.quoted=window.__quotedCache[p.quotedId]; });
 render();
};
window.__holdxApplyPosts=function(rows){
  if(!rows || !rows.length) return;
  const mapped=rows.map(function(r){
    // mevcut etkilesim verisi varsa koru (sayilar yanip sonmesin)
    const prev=S.posts.find(function(x){return String(x.id)===String(r.id);})||{};
    return {id:r.id, wallet:r.wallet, mine:(S.wallet&&r.wallet===S.wallet.address), token:r.token||null, verified:false, created_at:r.created_at, time:timeAgo(r.created_at), text:r.text||"", media:r.media||null,
      likes:prev.likes!==undefined?prev.likes:0, replies:prev.replies!==undefined?prev.replies:0, reposts:prev.reposts!==undefined?prev.reposts:0,
      liked:prev.liked||false, reposted:prev.reposted||false, comments:prev.comments||[], quotedId:r.quoted_post_id||null, _repostedBy:r._repostedBy||null, _repostAt:r._repostAt||null};
  });
  // akıştaki kendi RT kartlarımı koru (_isRepost), diğer eski postları değiştir
  const keep=S.posts.filter(function(p){return !p._isRepost && !mapped.find(function(m){return String(m.id)===String(p.id);});});
  S.posts = keep.concat(mapped);
  S.posts.sort(function(a,b){ return (new Date(b.created_at||0))-(new Date(a.created_at||0)); });
  // RT kartlarini depodan yeniden ekle (kaybolmasin)
  applyFeedReposts();
  // alintilanan postlari bagla
  window.__quotedCache=window.__quotedCache||{};
  const missingQ=[];
  S.posts.forEach(function(p){
    if(!p.quotedId)return;
    const q=S.posts.find(function(x){return String(x.id)===String(p.quotedId);});
    if(q){ p.quoted={id:q.id,wallet:q.wallet,text:q.text,media:q.media}; window.__quotedCache[p.quotedId]=p.quoted; }
    else if(window.__quotedCache[p.quotedId]){ p.quoted=window.__quotedCache[p.quotedId]; }
    else { missingQ.push(p.quotedId); }
  });
  // eksik alıntılanan postları DB'den çek
  if(missingQ.length&&window.__holdxFetchQuoted){ window.__holdxFetchQuoted([...new Set(missingQ)]); }
  render();
};
// Helius'tan gelen gercek bakiye + tokenleri uygula
window.__holdxApplyBalances=function(data){
  if(!S.wallet) return;
  if(typeof data.sol==="number") S.wallet.sol=data.sol;
  if(data.solSymbol) S.wallet.solSymbol=data.solSymbol;
  if(data.holdings){
    S.wallet.holdings=data.holdings;
    // token registry'ye ekle ki fiyat/holder mantigi calissin
    Object.keys(data.holdings).forEach(function(sym){
      if(!TOKREG[sym] && data.holdings[sym].mint){
        TOKREG[sym]={t:sym,name:data.holdings[sym].name||"",price:0,chg:0,mc:"—",color:tokColor(sym),address:data.holdings[sym].mint,chain:"solana",source:null,cgId:null};
      }
    });
  }
  render();
  if(typeof refreshTokenPrices==="function"){ refreshTokenPrices(); }
};
window.__holdxSetWallet=function(address){
  if(address){
    S.wallet={address:address,holdings:{},sol:0};
    S.connected=true;
    S.entered=true;
    // kendi kurdugun odalara otomatik katil
    S.customRooms.forEach(function(r){ if(r.creator===address){ S.joined[r.ticker]=true; } });
    // gercek bakiye + tokenleri Helius'tan cek
    if(window.__holdxLoadBalances){ window.__holdxLoadBalances(address); }
    // Bu cuzdanin profilini Supabase'den yukle
    if(window.__holdxLoadProfile){
      window.__holdxLoadProfile(address).then(function(prof){
        if(prof){
          S.profile.name=prof.display_name||"";
          S.profile.bio=prof.bio||"";
          S.profile.avatar=prof.avatar||null;
          S.profile.cover=prof.cover||null;
          if(prof.created_at){ const d=new Date(prof.created_at); S.profile.joined=d.toLocaleString("en-US",{month:"short",year:"numeric"}); }
          // kendi avatarimi cache'e ekle (paylasimlarimda gorunsun)
          if(prof.avatar){ window.__avatarCache=window.__avatarCache||{}; window.__avatarCache[address]=prof.avatar; }
          render();
        }
      });
    }
  } else {
    S.connected=false; S.wallet=null;
    S.profile={name:"", bio:"", avatar:null, cover:null, joined:new Date().toLocaleString("en-US",{month:"short",year:"numeric"})};
  }
  render();
};
// Profilei Supabase'e kaydet (React tarafindan saglanir)
function persistProfile(){
  if(S.connected && S.wallet && window.__holdxSaveProfile){
    window.__holdxSaveProfile({
      wallet:S.wallet.address,
      display_name:S.profile.name||"",
      bio:S.profile.bio||"",
      avatar:S.profile.avatar||null,
      cover:S.profile.cover||null
    });
  }
}
document.addEventListener("click",e=>{
 // üst arama açılır menüsünü dışarı tıklayınca kapat
 // Açık menüleri kapat — tek render, aksiyonu bloklamasın
 let _closed=false;
 if(S.topSearchOpen&&!e.target.closest(".search")){S.topSearchOpen=false;_closed=true;}
 if(S.postMenu&&!e.target.closest(".pa-more-wrap")){S.postMenu=null;_closed=true;}
 if(S.rtMenu&&!e.target.closest(".rt-wrap")){S.rtMenu=null;_closed=true;}
 if(S.walletMenu&&!e.target.closest(".idwrap")){S.walletMenu=false;_closed=true;}
 if(S.roomMenu&&!e.target.closest(".roommenu-wrap")){S.roomMenu=null;_closed=true;}
 if(S.msgMenu&&!e.target.closest(".msg-inner")){S.msgMenu=null;_closed=true;}
 if(_closed&&!e.target.closest("[data-act]")){render();}
 // emoji/gif popover'ı dışarı tıklayınca kapat (araç butonları ve popover içi hariç)
 if((S.emojiFor||S.gifFor)&&!e.target.closest("[data-emoji-pop]")&&!e.target.closest('[data-act="toggleEmoji"]')&&!e.target.closest('[data-act="toggleGif"]')&&!e.target.closest('[data-act="pickEmoji"]')&&!e.target.closest('[data-act="pickGif"]')){S.emojiFor=null;S.gifFor=null;render();}
 const el=e.target.closest("[data-act]"); if(!el)return;
 const a=el.dataset.act;
 // href="#" olan link/buton (iç yönlendirme) sayfayı atlatmasın
 if(el.tagName==="A"&&(el.getAttribute("href")==="#"||a==="gotoRoomLink"||a==="gotoPostLink")){e.preventDefault();}
 if(a==="closeModalBg"&&el!==e.target)return;
 if(a==="connect"){S.entered=true;connect();}
 else if(a==="enterExplore"){S.entered=true;S.view={name:"feed",token:null};render();}
 else if(a==="pickTopToken"){const r=S.topResults[+el.dataset.i];if(r){upsertToken(r);S.view={name:"token",token:(r.symbol||"").toUpperCase()};S.topSearch="";S.topSearchOpen=false;S.topResults=[];}render();}
 else if(a==="openDM"){const w=el.dataset.wallet;S.view={name:"dm",peer:w};if(S.unreadPeers&&S.unreadPeers[w]){delete S.unreadPeers[w];S.unreadDM=Math.max(0,(S.unreadDM||0)-1);}if(window.__holdxLoadDMs){window.__holdxLoadDMs(w);}if(window.__holdxLoadPeerInfo){window.__holdxLoadPeerInfo(w);}render();}
 else if(a==="dmPhoto"){triggerPhoto("dm");}
 else if(a==="openMentionProfile"){const nm=el.dataset.name; if(nm&&window.__holdxOpenByName){window.__holdxOpenByName(nm);}}
 else if(a==="pickMention"){pickMention(el.dataset.name,el.dataset.wallet);}
 else if(a==="clearDmMedia"){S.dmMedia=null;render();}
 else if(a==="sendDM"){sendDM(el.dataset.wallet);}
 else if(a==="exportLeaderboard"){
   const rows=(S.leaderboard||[]).slice(0,100);
   let csv="sira,cuzdan,isim,points\n";
   rows.forEach(function(r,i){ const nm=(S.names&&S.names[r.wallet]?S.names[r.wallet]:"").replace(/,/g," "); csv+=(i+1)+","+r.wallet+","+nm+","+r.total+"\n"; });
   const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
   const url=URL.createObjectURL(blob);
   const a2=document.createElement("a"); a2.href=url; a2.download="podcto-leaderboard.csv";
   document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
   setTimeout(function(){URL.revokeObjectURL(url);},1000);
 }
 else if(a==="clearTopSearch"){S.topSearch="";S.topSearchOpen=false;S.topResults=[];render();}
 else if(a==="shareRoom"){S.shareOpen=el.dataset.token;S.roomMenu=null;render();}
 else if(a==="gotoMsg"){const gid=el.dataset.goto;if(gid){const target=document.querySelector('.msg[data-mid="'+gid+'"]');if(target){target.scrollIntoView({behavior:"smooth",block:"center"});target.classList.add("msg-highlight");setTimeout(function(){target.classList.remove("msg-highlight");},1600);}}}
 else if(a==="msgMenu"){const mid=el.dataset.mid;const _mc=document.getElementById("messages");const _sp=_mc?_mc.scrollTop:0;S._keepScroll=true;S.msgMenu=String(S.msgMenu)===String(mid)?null:mid;render();requestAnimationFrame(function(){const _m=document.getElementById("messages");if(_m)_m.scrollTop=_sp;S._keepScroll=false;});}
 else if(a==="replyMsg"){const mid=el.dataset.mid;const _tk=S.view.token;const _mc=document.getElementById("messages");const _sp=_mc?_mc.scrollTop:0;S._keepScroll=true;const m=((S.chat&&S.chat[_tk])||[]).find(function(x){return String(x.id)===String(mid);});if(m){S.replyingTo={id:m.id,wallet:m.wallet,name:displayName(m.wallet),text:m.text||""};}S.msgMenu=null;render();requestAnimationFrame(function(){const _m=document.getElementById("messages");if(_m)_m.scrollTop=_sp;const ci=document.getElementById("chatInput");if(ci)ci.focus({preventScroll:true});S._keepScroll=false;});}
 else if(a==="cancelReply"){S.replyingTo=null;render();}
 else if(a==="reactMsg"){const mid=el.dataset.mid,emoji=el.dataset.emoji;const _tk2=S.view.token;const _mc=document.getElementById("messages");const _sp=_mc?_mc.scrollTop:0;S._keepScroll=true;const m=((S.chat&&S.chat[_tk2])||[]).find(function(x){return String(x.id)===String(mid);});if(m){m.reactions=m.reactions||[];if(m.reactions.indexOf(emoji)<0)m.reactions.push(emoji);}S.msgMenu=null;render();requestAnimationFrame(function(){const _m=document.getElementById("messages");if(_m)_m.scrollTop=_sp;S._keepScroll=false;});}
 else if(a==="toggleRoomMenu"){S.roomMenu=S.roomMenu?null:(S.view.token);render();}
 else if(a==="askLeave"){S.leaveConfirm=el.dataset.token;S.roomMenu=null;render();}
 else if(a==="openUpgrade"){S.upgradeOpen=el.dataset.token;S.roomMenu=null;render();}
 else if(a==="askDeleteRoom"){S.deleteConfirm=el.dataset.token;S.roomMenu=null;render();}
 else if(a==="closeDelete"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-cancel")){S.deleteConfirm=null;render();}}
 else if(a==="deleteRoom"){const t=el.dataset.token;
   const room=S.customRooms.find(r=>r.ticker===t);
   if(room&&room.creator===myTag()){
     S.customRooms=S.customRooms.filter(r=>r.ticker!==t);
     delete S.joined[t]; delete S.chat[t];
     if(window.__holdxDeleteRoom){ window.__holdxDeleteRoom(t); }
   }
   S.deleteConfirm=null;S.roomMenu=null;
   S.view={name:"rooms",token:null};S.roomTab="create";
   render();}
 else if(a==="closeUpgrade"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.upgradeOpen=null;render();}}
 else if(a==="doUpgrade"){const t=el.dataset.token,cap=+el.dataset.cap;
   const room=S.customRooms.find(r=>r.ticker===t); if(room)room.cap=cap;
   if(window.__holdxUpdateRoom){ window.__holdxUpdateRoom(t,{cap:(cap===Infinity?2000000000:cap)}); }
   S.upgradeOpen=null;render();}
 else if(a==="closeLeave"){if(el.classList.contains("overlay")&&e.target===el||e.target.closest(".edit-cancel")){S.leaveConfirm=null;render();}}
 else if(a==="leaveRoom"){const t=el.dataset.token;
   delete S.joined[t];
   const room=S.customRooms.find(r=>r.ticker===t); if(room&&room.members>0)room.members-=1;
   if(window.__holdxLeaveRoom && S.wallet){ window.__holdxLeaveRoom(t, S.wallet.address, room?room.members:0); }
   S.leaveConfirm=null;S.roomMenu=null;
   S.view={name:"rooms",token:null};S.roomTab="browse";
   render();}
 else if(a==="closeShare"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.shareOpen=null;render();}}
 else if(a==="copyRoomLink"){const link=roomLink(el.dataset.token);
   (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);}).catch(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);});}
 else if(a==="shareToFeed"){const tk=el.dataset.token;
   if(!S.connected){S.shareOpen=null;S.view={name:"feed",token:null};render();return;}
   upsertToken(tokenBy(tk)||{symbol:tk,name:"",price:0,chg:0});
   const _txt=`Join the $${tk} room! 👇 ${roomLink(tk)}`;
   const _id=Date.now();
   S.posts.unshift({id:_id,wallet:(S.wallet?S.wallet.address:myTag()),mine:true,token:tk,verified:holds(tk),created_at:new Date().toISOString(),time:"now",text:_txt,media:null,likes:0,replies:0,reposts:0,liked:false});
   // veritabanına kaydet (kalıcı olsun)
   if(window.__holdxSavePost && S.wallet){ window.__holdxSavePost({ wallet:S.wallet.address, text:_txt, token:tk, media:null, quoted_post_id:null }, _id); }
   S.shareOpen=null;S.view={name:"feed",token:null};render();}
 else if(a==="nav"){const v=el.dataset.view;
   if(v==="rooms"){S.view={name:"rooms",token:null};S.roomTab="browse";}
   else S.view={name:v,token:null};
   if(window.__holdxSubscribeRoom){window.__holdxSubscribeRoom(null);} // oda kanalını bırak
   if(v==="messages"&&window.__holdxLoadThreads){window.__holdxLoadThreads();}
   if(v==="notifications"){ if(window.__holdxLoadNotifications){window.__holdxLoadNotifications();} if(window.__holdxMarkNotifRead){window.__holdxMarkNotifRead();} S.unreadNotif=0; }
   if(v==="leaderboard"&&window.__holdxLoadLeaderboard){window.__holdxLoadLeaderboard();}
   if(v==="profile"&&S.wallet&&window.__holdxLoadUserPosts){window.__holdxLoadUserPosts(S.wallet.address);}
   render();}
 else if(a==="openToken"){const tt=el.dataset.token;S.view={name:"token",token:tt};
   const tk1=tokenBy(tt);
   if(tk1&&tk1.address){
     dexPrice(tk1.address,tk1.chain).then(function(d){ if(d&&d.price>0){ tk1.price=d.price; tk1.chg=+(+d.chg).toFixed(1); if(d.mc)tk1.mc=fmtMc(d.mc); S.livePrices[tk1.t]={price:d.price,dir:0}; render(); } });
     if(window.__holdxLoadHolders){window.__holdxLoadHolders(tt,tk1.address);}
   }
   render();}
 else if(a==="openRoom"){const rt=el.dataset.token;S.view={name:"room",token:rt};S.chatScrollBottom=true;
   if(window.__holdxLoadMessages){window.__holdxLoadMessages(rt);}
   if(window.__holdxSubscribeRoom){window.__holdxSubscribeRoom(rt);}
   const tk0=tokenBy(rt); if(window.__holdxLoadHolders&&tk0&&tk0.address){window.__holdxLoadHolders(rt,tk0.address);}
   render();}
 else if(a==="joinRoom"){const t=el.dataset.token;
   // güvenlik: sadece katılabilecekse (holder ya da topluluk odası)
   if(canJoin(t)&&!S.joined[t]){S.joined[t]=true;
     const room=S.customRooms.find(r=>r.ticker===t); if(room)room.members+=1;
     if(window.__holdxJoinRoom && S.wallet){ window.__holdxJoinRoom(t, S.wallet.address, room?room.members:1); }
     const tk=tokenBy(t); pushActivity("join",t,tk&&tk.chain);
     award("joinRoom",{once:"join:"+t}); // oda başına 1 kez
     // KURUCU BONUSU: oda her 100 membersye ulaştığında kurucuya 10 points
     if(room && S.wallet && room.creator===room.creator){
       const mem=room.members||0;
       const milestone=Math.floor(mem/100); // kaç tam 100'e ulaştı
       if(milestone>0 && window.__holdxAwardCreatorMilestone){
         window.__holdxAwardCreatorMilestone(t, room.creator, milestone);
       }
     }
   }
   render();}
 else if(a==="clearRoomSearch"){S.roomSearch="";render();}
 else if(a==="setFilter"){S.filter=el.dataset.token;S.feedDrop=false;render();}
 else if(a==="toggleFeedDrop"){S.feedDrop=!S.feedDrop;S.feedSearch="";render();}
 else if(a==="closeFeedDrop"){S.feedDrop=false;render();}
 else if(a==="pickFilter"){S.filter=el.dataset.token;S.feedDrop=false;S.feedSearch="";S.feedResults=[];render();}
 else if(a==="pickFeedToken"){const r=S.feedResults[+el.dataset.i];if(r){upsertToken(r);S.filter=r.symbol;S.feedDrop=false;S.feedSearch="";S.feedResults=[];}render();}
 else if(a==="openResult"){const r=S.exploreResults[+el.dataset.i];if(r){upsertToken(r);S.view={name:"token",token:(r.symbol||"").toUpperCase()};S.exploreSearch="";S.exploreResults=[];}render();}
 else if(a==="createFor"){const sym=el.dataset.token;const t=tokenBy(sym);
   S.view={name:"rooms",token:null};S.roomTab="create";
   if(t)S.picked={symbol:t.t,name:t.name,price:t.price,chg:t.chg,mc:t.mc,address:t.address||""};
   S.createTicker="";S.searchResults=[];render();}
 else if(a==="filterToken"){S.filter=el.dataset.token;S.view={name:"feed",token:null};render();}
 else if(a==="like"){const id=el.dataset.id;let becameLiked=false;
   S.posts=S.posts.map(p=>{if(String(p.id)===String(id)){becameLiked=!p.liked;return{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)};}return p;});
   // KALİTE: beğeni ALAN kişi points alır (kendi postunu beğenmek hariç, post başına 1 kez)
   const post=S.posts.find(p=>String(p.id)===String(id));
   if(window.__holdxToggleLike && S.wallet){ window.__holdxToggleLike(id, S.wallet.address, becameLiked);
     if(becameLiked&&post&&post.wallet!==S.wallet.address&&window.__holdxNotify){ window.__holdxNotify({wallet:post.wallet,type:"like",from_wallet:S.wallet.address,post_id:id}); } }
   refreshPostActions(id);}
 else if(a==="openPost"){S.replyTo=null;S.prevView=S.view;S.view={name:"post",id:el.dataset.id,token:null};S.commentText="";render();}
 else if(a==="back"){S.view=S.prevView||{name:"feed",token:null};S.prevView=null;render();}
 else if(a==="zoom"){S.lightbox=el.dataset.src;render();}
 else if(a==="closeZoom"){if(el.classList.contains("lightbox")||el.classList.contains("lb-close")||e.target.closest(".lb-close")){S.lightbox=null;render();}}
 else if(a==="scrollTop"){window.scrollTo({top:0,behavior:"smooth"});const main=document.querySelector(".main");if(main)main.scrollTo({top:0,behavior:"smooth"});}
 else if(a==="setChain"){S.chainFilter=el.dataset.chain;
   render();
   if(S.exploreSearch&&S.exploreSearch.trim().length>=2)scheduleExploreSearch(S.exploreSearch);
   if(S.createTicker&&S.createTicker.trim().length>=2)scheduleSearch(S.createTicker);
   if(S.topSearch&&S.topSearch.trim().length>=2)scheduleTopSearch(S.topSearch);
 }
 else if(a==="loadMore"){ if(S.loadingMore)return; S.loadingMore=true; render();
   if(window.__holdxLoadMorePosts){ window.__holdxLoadMorePosts().then(function(){ S.loadingMore=false; render(); }); }
   else { S.loadingMore=false; }
 }
 else if(a==="walletMenu"){S.walletMenu=!S.walletMenu;render();}
 else if(a==="copyAddr"){const w=el.dataset.wallet||el.dataset.addr;navigator.clipboard.writeText(w);S.copiedAddr=w;S.copied=true;render();setTimeout(function(){S.copiedAddr=null;S.copied=false;render();},1500);}
 else if(a==="openNotif"){const pid=el.dataset.post,w=el.dataset.wallet;
   if(pid){S.prevView=S.view;S.view={name:"post",id:pid,token:null};} else if(w){S.view={name:"profile",wallet:w,token:null};}
   render();}
 else if(a==="openComment"){const cid=el.dataset.cid,pid=el.dataset.post;
   if(!cid)return;
   S.view={name:"comment",cid:cid,postId:pid,token:null};
   S.replyTo=cid; S.commentText="";
   render();}
 else if(a==="likeComment"){const cid=el.dataset.cid; if(!cid||!S.wallet)return;
   let on=false;
   S.posts=S.posts.map(function(p){ if(!p.comments)return p;
     return Object.assign({},p,{comments:p.comments.map(function(c){ if(String(c.id)===String(cid)){ on=!c.liked; return Object.assign({},c,{liked:on,likes:(c.likes||0)+(on?1:-1)}); } return c; })});
   });
   if(window.__holdxToggleCommentLike){ window.__holdxToggleCommentLike(cid,S.wallet.address,on); }
   render();}
 else if(a==="repostComment"){const cid=el.dataset.cid; if(!cid)return;
   S.posts=S.posts.map(function(p){ if(!p.comments)return p;
     return Object.assign({},p,{comments:p.comments.map(function(c){ if(String(c.id)===String(cid)){ const on=!c.reposted; return Object.assign({},c,{reposted:on,reposts:(c.reposts||0)+(on?1:-1)}); } return c; })});
   });
   render();}
 else if(a==="rtMenu"){const id=el.dataset.id;S.rtMenu=(String(S.rtMenu)===String(id))?null:id;render();}
 else if(a==="quotePost"){const id=el.dataset.id;S.quoting=S.posts.find(function(x){return String(x.id)===String(id);})||null;S.rtMenu=null;S.view={name:"feed",token:null};render();
   setTimeout(function(){const c=document.getElementById("composerText");if(c)c.focus();},50);}
 else if(a==="cancelQuote"){S.quoting=null;render();}
 else if(a==="postMenu"){const id=el.dataset.id;S.postMenu=(String(S.postMenu)===String(id))?null:id;render();}
 else if(a==="deletePost"){const id=el.dataset.id;
   if(confirm("Are you sure you want to delete this post?")){
     S.posts=S.posts.filter(p=>String(p.id)!==String(id));
     if(window.__holdxDeletePost){window.__holdxDeletePost(id);}
     render();
   }
 }
 else if(a==="expandPost"){S.expandedPosts=S.expandedPosts||{};S.expandedPosts[el.dataset.id]=true;render();}
 else if(a==="shareProfile"){const w=el.dataset.wallet;const link="https://podcto.com/u/"+w;(navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(function(){S.profileShared=true;render();setTimeout(function(){S.profileShared=false;render();},1600);}).catch(function(){S.profileShared=true;render();setTimeout(function(){S.profileShared=false;render();},1600);});}
 else if(a==="gotoRoomLink"){const tk=el.dataset.token;S.view={name:"room",token:tk};if(isJoined(tk)){S.chatScrollBottom=true;if(window.__holdxSubscribeRoom)window.__holdxSubscribeRoom(tk);}render();}
 else if(a==="gotoPostLink"){const pid=el.dataset.id;S.view={name:"post",id:pid,token:null};render();}
 else if(a==="sharePost"){S.sharePostId=el.dataset.id;render();}
 else if(a==="repostFromShare"){const id=el.dataset.id;
   let on2=false;
   S.posts=S.posts.map(p=>{if(String(p.id)===String(id)){on2=!p.reposted;return{...p,reposted:on2,reposts:(p.reposts||0)+(on2?1:-1)};}return p;});
   if(S.wallet){
     const myAddr=S.wallet.address;
     window.__feedReposts=window.__feedReposts||{};
     if(on2){ window.__feedReposts[id]={id:id,_repostAt:new Date().toISOString()}; } else { delete window.__feedReposts[id]; }
     applyFeedReposts();
   }
   if(window.__holdxToggleRepost && S.wallet){ window.__holdxToggleRepost(id, S.wallet.address, on2);
     const rp=S.posts.find(function(x){return String(x.id)===String(id);});
     if(on2&&rp&&rp.wallet!==S.wallet.address&&window.__holdxNotify){ window.__holdxNotify({wallet:rp.wallet,type:"repost",from_wallet:S.wallet.address,post_id:id}); } }
   S.sharePostId=null; render();}
 else if(a==="copyAddr"){const addr=el.dataset.addr;
   (navigator.clipboard?navigator.clipboard.writeText(addr):Promise.reject()).then(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);}).catch(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);});}
 else if(a==="closePostShare"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.sharePostId=null;render();}}
 else if(a==="copyPostLink"){const link="https://podcto.com/post/"+el.dataset.id;
   (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);}).catch(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);});}
 else if(a==="repost"){const id=el.dataset.id;
   let on2=false;
   S.posts=S.posts.map(p=>{if(String(p.id)===String(id)){on2=!p.reposted;return{...p,reposted:on2,reposts:(p.reposts||0)+(on2?1:-1)};}return p;});
   // akışa RT kartı ekle/çıkar (kendi feed'inde "You reposted" görünsün)
   if(S.wallet){
     const myAddr=S.wallet.address;
     window.__feedReposts=window.__feedReposts||{};
     if(on2){
       const orig=S.posts.find(function(x){return String(x.id)===String(id)&&!x._isRepost;});
       if(orig){ window.__feedReposts[id]={id:id,_repostAt:new Date().toISOString()}; }
     } else {
       delete window.__feedReposts[id];
     }
     applyFeedReposts();
   }
   if(window.__holdxToggleRepost && S.wallet){ window.__holdxToggleRepost(id, S.wallet.address, on2);
     const rp=S.posts.find(function(x){return String(x.id)===String(id);});
     if(on2&&rp&&rp.wallet!==S.wallet.address&&window.__holdxNotify){ window.__holdxNotify({wallet:rp.wallet,type:"repost",from_wallet:S.wallet.address,post_id:id}); } }
   S.rtMenu=null;
   render();}
 else if(a==="sendComment"){const id=el.dataset.id;
   const inp=document.getElementById("commentInput");
   const txt=(inp?inp.value:S.commentText||"").trim(); if(!txt)return;
   const myAddr=S.wallet?S.wallet.address:myTag();
   S.posts=S.posts.map(p=>{if(String(p.id)===String(id)){
     const comments=[...(p.comments||[]),{wallet:myAddr,text:txt,time:"now",parent_id:S.replyTo||null,tier:shownTier(p.token?holdingUsd(p.token).usd:0,true)}];
     return{...p,comments,replies:(p.replies||0)+1};
   }return p;});
   if(window.__holdxSaveComment && S.wallet){ window.__holdxSaveComment({post_id:id, wallet:S.wallet.address, text:txt, parent_id:S.replyTo||null});
     const tp=S.posts.find(function(x){return String(x.id)===String(id);});
     if(tp&&tp.wallet!==S.wallet.address&&window.__holdxNotify){ window.__holdxNotify({wallet:tp.wallet,type:"comment",from_wallet:S.wallet.address,post_id:id,text:txt}); } }
   award("comment",{capKey:"comment"});
   S.commentText="";S.replyTo=null;render();}
 else if(a==="publish"){
  const ta=document.getElementById("composerText");
  const txt=(ta?ta.value:S.composerText||"").trim();
  if(!txt&&!S.postMedia)return; // en az metin veya medya olmalı
  const pt=S.postToken; // opsiyonel bağlı token
  if(pt)upsertToken(pt);
  const newPost={id:Date.now(),created_at:new Date().toISOString(),quoted:S.quoting||null,wallet:(S.wallet?S.wallet.address:myTag()),mine:true,token:pt?pt.symbol:null,verified:pt?holds(pt.symbol):false,time:"now",text:txt,media:S.postMedia,likes:0,replies:0,reposts:0,liked:false};
  S.posts.unshift(newPost);
  // Supabase'e kaydet
  if(window.__holdxSavePost && S.connected && S.wallet){
    // @etiketlenen cüzdanları hazırla (menüden seçilenler en güvenilir)
    const remembered=S.mentionedWallets||{};
    const targets={};
    Object.keys(remembered).forEach(function(nm){ if(txt.indexOf("@"+nm)>=0) targets[nm]=remembered[nm]; });
    const mentionWallets=Object.values(targets);
    // bildirim, post kaydolup GERÇEK id alınca gönderilecek (post_id dolu olsun, tıklayınca gitsin)
    window.__pendingMentions={ wallets:mentionWallets, text:txt };
    window.__holdxSavePost({ wallet:S.wallet.address, text:txt, token:pt?pt.symbol:null, media:S.postMedia||null, quoted_post_id:S.quoting?S.quoting.id:null }, newPost.id);
  }
  award("post",{capKey:"post"}); // günlük tavan
  S.postToken=null;S.postSearchOpen=false;S.postSearch="";S.postResults=[];S.postMedia=null;S.composerText="";S.emojiFor=null;S.gifFor=null;
  render();
 }
 else if(a==="toggleEmoji"){const t=el.dataset.target;S.emojiFor=S.emojiFor===t?null:t;S.gifFor=null;render();}
 else if(a==="toggleGif"){const t=el.dataset.target;S.gifFor=S.gifFor===t?null:t;S.emojiFor=null;S.gifQuery="";S.gifResults=[];render();if(S.gifFor){searchGifs("");}}
 else if(a==="pickEmoji"){const e2=el.dataset.emoji,t=el.dataset.target;
   if(t==="post")S.composerText=(S.composerText||"")+e2; else if(t==="comment"){S.commentText=(S.commentText||"")+e2;S.emojiFor=null;} else S.chatText=(S.chatText||"")+e2;
   render();}
 else if(a==="pickGif"){const t=el.dataset.target,g=el.dataset.gif;
   if(t==="post"){S.postMedia=g;S.gifFor=null;} else {S.chatMedia=g;S.gifFor=null;}
   render();}
 else if(a==="pickPhoto"){triggerPhoto(el.dataset.target);}
 else if(a==="clearPostMedia"){S.postMedia=null;render();}
 else if(a==="clearChatMedia"){S.chatMedia=null;render();}
 else if(a==="openPostSearch"){S.postSearchOpen=true;S.postSearch="";S.postResults=[];render();}
 else if(a==="pickPostToken"){const r=S.postResults[+el.dataset.i];if(r){S.postToken=r;S.postSearchOpen=false;S.postSearch="";S.postResults=[];}render();}
 else if(a==="clearPostToken"){S.postToken=null;render();}
 else if(a==="sendChat"){sendChat(el.dataset.token);}
 else if(a==="copy"){S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1200);}
 else if(a==="toggleHideWhale"){S.hideWhale=!S.hideWhale;render();}
 else if(a==="toggleHideValue"){S.hideValue=!S.hideValue;render();}
 else if(a==="toggleHideActivity"){S.hideActivity=!S.hideActivity;render();}
 else if(a==="togglePrivateProfile"){S.privateProfile=!S.privateProfile;render();}
 else if(a==="disconnect"){S.walletMenu=false;if(window.__privyLogout){window.__privyLogout();}S.connected=false;S.wallet=null;S.view={name:"feed",token:null};render();}
 else if(a==="noop"){/* placeholder link */}
 else if(a==="openDoc"){S.docOpen=el.dataset.doc;render();}
 else if(a==="closeDoc"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.docOpen=null;render();}}
 else if(a==="openFeedback"){S.feedbackOpen=true;render();}
 else if(a==="closeFeedback"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x,.edit-cancel")){S.feedbackOpen=false;render();}}
 else if(a==="sendFeedback"){
   const sub=(document.getElementById("fbSubject")||{}).value||"";
   const body=(document.getElementById("fbBody")||{}).value||"";
   if(!body.trim()){return;}
   const wallet=S.connected?myTag():"not connected";
   S.feedbackSending=true; render();
   fetch("https://api.web3forms.com/submit",{
     method:"POST",
     headers:{"Content-Type":"application/json","Accept":"application/json"},
     body:JSON.stringify({
       access_key:"839e8f0f-f26f-403c-8494-71b5e0c13dd5",
       subject:"[PODCTO] "+(sub||"No subject"),
       from_name:"PODCTO Feedback",
       message:"Subject: "+(sub||"(none)")+"\n\n"+body+"\n\n———\nWallet: "+wallet
     })
   }).then(function(r){return r.json();}).then(function(res){
     S.feedbackSending=false;
     if(res.success){ S.feedbackOpen=false; S.feedbackSent=true; render(); setTimeout(function(){S.feedbackSent=false;render();},3000); }
     else { S.feedbackError="Could not send. Please try again."; render(); }
   }).catch(function(){ S.feedbackSending=false; S.feedbackError="Could not send. Please try again."; render(); });
 }
 else if(a==="toggleTheme"){S.theme=S.theme==="dark"?"light":"dark";render();}
 else if(a==="profileTab"){S.profileTab=el.dataset.tab;render();}
 else if(a==="openProfile"){const _pw=el.dataset.wallet; if(_pw&&window.__holdxLoadUserPosts){window.__holdxLoadUserPosts(_pw);}const w=el.dataset.wallet;S.view={name:"profile",token:null,wallet:w};S.profileTab="posts";render();}
 else if(a==="toggleFollow"){const w=el.dataset.wallet;const on=!S.following[w];S.following[w]=on;
   if(window.__holdxToggleFollow && S.wallet){ window.__holdxToggleFollow(S.wallet.address, w, on);
     if(on&&window.__holdxNotify){ window.__holdxNotify({wallet:w,type:"follow",from_wallet:S.wallet.address}); } }
   render();}
 else if(a==="openEditProfile"){S.editProfile=true;render();}
 else if(a==="closeEdit"){
   // overlay'in kendisine, X butonuna ya da Cancel'e basıldıysa kapat (SVG'ye basılsa da çalışsın)
   const onOverlay=el.classList.contains("overlay")&&e.target===el;
   const onBtn=!!e.target.closest(".edit-x,.edit-cancel");
   if(onOverlay||onBtn){const n=document.getElementById("editName"),b=document.getElementById("editBio");if(n)S.profile.name=n.value.trim();if(b)S.profile.bio=b.value.trim();S.editProfile=false;render();}
 }
 else if(a==="saveProfile"){
   const n=document.getElementById("editName"),b=document.getElementById("editBio");
   const newName=n?n.value.trim():"";
   const newBio=b?b.value.trim():"";
   if(!newName){ S.nameError="Name cannot be empty."; render(); return; }
   S.savingProfile=true; S.nameError=null; render();
   // isim benzersiz mi? (kendi ismin hariç)
   if(window.__holdxCheckNameAvailable){
     window.__holdxCheckNameAvailable(newName, S.wallet?S.wallet.address:"").then(function(available){
       S.savingProfile=false;
       if(!available){ S.nameError="This name is already taken."; render(); return; }
       S.profile.name=newName; S.profile.bio=newBio; S.editProfile=false; S.nameError=null;
       persistProfile(); render();
     });
   } else {
     S.profile.name=newName; S.profile.bio=newBio; S.editProfile=false; S.savingProfile=false;
     persistProfile(); render();
   }
 }
 else if(a==="pickAvatar"){pickProfileImg("avatar");}
 else if(a==="pickCover"){pickProfileImg("cover");}
 else if(a==="closeCrop"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x,.edit-cancel")){S.crop=null;render();}}
 else if(a==="applyCrop"){
   const c=S.crop; if(!c){return;}
   const frame=document.getElementById("cropFrame"); if(!frame){S.crop=null;render();return;}
   const fW=frame.clientWidth, fH=frame.clientHeight;
   const base=Math.max(fW/c.natW, fH/c.natH), ds=base*c.zoom;
   const w=c.natW*ds, h=c.natH*ds;
   const imgLeft=fW/2 - w/2 + c.x, imgTop=fH/2 - h/2 + c.y;
   const sx=(0-imgLeft)/ds, sy=(0-imgTop)/ds, sW=fW/ds, sH=fH/ds;
   const isCover=c.type==="cover";
   const outW=isCover?1200:400, outH=isCover?360:400;
   const canvas=document.createElement("canvas"); canvas.width=outW; canvas.height=outH;
   const ctx=canvas.getContext("2d");
   const im=new Image();
   im.onload=()=>{ try{ctx.drawImage(im,sx,sy,sW,sH,0,0,outW,outH);}catch(err){}
     S.profile[c.type]=canvas.toDataURL("image/jpeg",0.9); S.crop=null; persistProfile(); render(); };
   im.src=c.src;
 }
 else if(a==="roomTab"){S.roomTab=el.dataset.tab;if(el.dataset.tab==="create"){S.createTicker="";S.searchResults=[];S.picked=null;S.searchErr=false;}render();}
 else if(a==="openCreate"){if(!S.connected)connect();S.view={name:"rooms",token:null};S.roomTab="create";S.createTicker="";S.searchResults=[];S.picked=null;render();}
 else if(a==="pickToken"){const r=S.searchResults[+el.dataset.i];if(r){if(isOfficialRoom(r.symbol)){S.officialRoomError=true;S.searchResults=[];render();return;}S.officialRoomError=false;S.picked=r;S.searchResults=[];S.createCap=100;}render();}
 else if(a==="unpick"){S.picked=null;S.createTicker="";S.searchResults=[];render();}
 else if(a==="pickCap"){S.createCap=+el.dataset.cap;render();}
 else if(a==="payCreate"){
  const p=S.picked;
  if(!p||isCustomRoom(p.symbol))return;
  if(isOfficialRoom(p.symbol)){ S.officialRoomError=true; render(); return; } // resmi oda kurulamaz
  if(myRoom())return; // 1 cüzdan = 1 oda kuralı (bu devam ediyor)
  S.createHoldError=false;
  const tier={cap:Infinity,price:0}; // kapasite kaldırıldı, unlimited
  const q=p.symbol;
  upsertToken(p);
  S.livePrices[q]={price:p.price,dir:0};
  // demo başlangıç members sayısı: kapasitenin bir kısmı dolu görünsün (livelık)
  const seedMembers=1;
  S.customRooms.unshift({ticker:q,creator:myTag(),members:seedMembers,cap:tier.cap,createdAt:"now",address:p.address});
  if(window.__holdxSaveRoom && S.connected && S.wallet){
    window.__holdxSaveRoom({ ticker:q, creator:S.wallet.address, members:seedMembers, cap:(tier.cap===Infinity?2000000000:tier.cap), address:p.address||null, chain:p.chain||"solana" });
  }
  S.joined[q]=true;
  pushActivity("create",q,p.chain);
  award("createRoom",{capKey:"createRoom",once:"createroom:"+q});
  if(!(S.chat[q]||[]).length)S.chat[q]=[{wallet:myTag(),verified:holds(q),creator:true,mine:true,text:`Welcome to the $${q} room! 🎉`}];
  S.createTicker="";S.picked=null;S.searchResults=[];S.createDone=q;S.createCap=100;S.roomTab="browse";
  render();
  setTimeout(()=>{S.createDone=null;render();},4200);
 }
 else if(a==="goNewRoom"){const t=el.dataset.token;S.createDone=null;S.view={name:"room",token:t};render();}
});
document.addEventListener("input",e=>{
 if(e.target.id==="createTicker"){S.createTicker=e.target.value;S.searchErr=false;scheduleSearch(e.target.value);}
 if(e.target.id==="roomSearch"){S.roomSearch=e.target.value;render();}
 if(e.target.id==="feedSearch"){S.feedSearch=e.target.value;scheduleFeedSearch(e.target.value);}
 if(e.target.id==="exploreSearch"){S.exploreSearch=e.target.value;scheduleExploreSearch(e.target.value);}
 if(e.target.id==="postSearch"){S.postSearch=e.target.value;schedulePostSearch(e.target.value);}
 if(e.target.id==="composerText"){
   S.composerText=e.target.value;
   // @ mention tespiti: imleçten geriye doğru @kelime yakala
   const val=e.target.value, pos=e.target.selectionStart;
   const before=val.slice(0,pos);
   const m=before.match(/@([A-Za-z0-9_]{1,20})$/);
   if(m){ S.mentionQuery=m[1]; S.mentionOpen=true; scheduleMentionSearch(m[1]); }
   else if(S.mentionOpen){ S.mentionOpen=false; S.mentionResults=[]; render(); }
 }
 if(e.target.id==="chatInput"){S.chatText=e.target.value;}
 if(e.target.id==="dmInput"){S.dmText=e.target.value;}
 if(e.target.id==="gifSearch"){S.gifQuery=e.target.value;scheduleGifSearch(e.target.value);}
 if(e.target.id==="editName"){S.profile.name=e.target.value;}
 if(e.target.id==="editBio"){S.profile.bio=e.target.value;}
 if(e.target.id==="topSearch"){const wasOpen=S.topSearchOpen;S.topSearch=e.target.value;S.topSearchOpen=true;if(!wasOpen){render();}scheduleTopSearch(e.target.value);}
 if(e.target.id==="commentInput"){S.commentText=e.target.value;}
});
let _mentionTimer=null;
function scheduleMentionSearch(q){
 clearTimeout(_mentionTimer);
 _mentionTimer=setTimeout(function(){
   if(window.__holdxSearchProfiles){
     window.__holdxSearchProfiles(q).then(function(profs){
       S.mentionResults=(profs||[]).slice(0,5).map(function(p){return {name:p.display_name||short(p.wallet),wallet:p.wallet};});
       render();
     });
   }
 },200);
}
function pickMention(name,wallet){
 const ta=document.getElementById("composerText");
 if(!ta)return;
 const val=ta.value, pos=ta.selectionStart;
 const before=val.slice(0,pos).replace(/@([A-Za-z0-9_]{1,20})$/,"@"+name+" ");
 const after=val.slice(pos);
 S.composerText=before+after;
 // etiketlenen cüzdanı hatırla (bildirim için isim eşleştirmeye güvenme)
 S.mentionedWallets=S.mentionedWallets||{}; if(wallet)S.mentionedWallets[name]=wallet;
 S.mentionOpen=false; S.mentionResults=[];
 render();
 setTimeout(function(){const t=document.getElementById("composerText");if(t){t.focus();const p=before.length;t.setSelectionRange(p,p);}},30);
}
function sendDM(peer){
 const inp=document.getElementById("dmInput"); const txt=(inp?inp.value:S.dmText||"").trim();
 const media=S.dmMedia||null;
 if((!txt&&!media)||!S.wallet)return;
 S.dms=S.dms||{}; S.dms[peer]=[...(S.dms[peer]||[]),{from_wallet:S.wallet.address,to_wallet:peer,text:txt,media:media,created_at:new Date().toISOString()}];
 if(window.__holdxSendDM){ window.__holdxSendDM({from_wallet:S.wallet.address,to_wallet:peer,text:txt||null,media:media}); }
 S.dmText=""; S.dmMedia=null; S.dmScrollBottom=true; render();
}
function sendChat(ticker){
 const inp=document.getElementById("chatInput"); const txt=(inp?inp.value:S.chatText||"").trim();
 if(!txt&&!S.chatMedia)return;
 const room=S.customRooms.find(r=>r.ticker===ticker);
 // Supabase'e yaz (gercek zamanli olarak herkese gider, kendimize de geri doner)
 const replyInfo=S.replyingTo?{id:S.replyingTo.id,wallet:S.replyingTo.wallet,name:S.replyingTo.name,text:S.replyingTo.text}:null;
 if(window.__holdxSendMessage && S.wallet){
   window.__holdxSendMessage({ ticker:ticker, wallet:S.wallet.address, text:txt||null, media:S.chatMedia||null, replyTo:replyInfo });
 } else {
   // baglanti yoksa yerel goster
   S.chat[ticker]=[...(S.chat[ticker]||[]),{wallet:myTag(),verified:holds(ticker),creator:room&&room.creator===myTag(),text:txt,media:S.chatMedia,mine:true}];
 }
 award("comment",{capKey:"comment"});
 S.chatText="";S.chatMedia=null;S.emojiFor=null;S.gifFor=null;S.replyingTo=null;
 render();
}
// Supabase'den gelen mesaji akisa ekle (gercek zamanli veya gecmis)
window.__holdxAddMessage=function(m){
 const arr=S.chat[m.ticker]||[];
 // ayni id varsa ekleme (cift onleme)
 if(m.id && arr.find(function(x){return x.id===m.id;})) return;
 const room=S.customRooms.find(function(r){return r.ticker===m.ticker;});
 arr.push({ id:m.id, wallet:m.wallet, verified:false, creator:room&&room.creator===m.wallet, text:m.text||"", media:m.media||null, mine:(S.wallet&&m.wallet===S.wallet.address), replyTo:m.replyTo||null, reactions:m.reactions||[] });

 S.chat[m.ticker]=arr;
 if(S.view&&S.view.name==="room"&&S.view.token===m.ticker)S.chatScrollBottom=true;
 render();
};
window.__holdxSetMessages=function(ticker,rows){
 if(!rows) return;
 const room=S.customRooms.find(function(r){return r.ticker===ticker;});
 S.chat[ticker]=rows.map(function(m){
   return { id:m.id, wallet:m.wallet, verified:false, creator:room&&room.creator===m.wallet, text:m.text||"", media:m.media||null, mine:(S.wallet&&m.wallet===S.wallet.address), replyTo:m.reply_to||m.replyTo||null, reactions:m.reactions||[] };
 });
 S.chatScrollBottom=true;
 render();
};
// ============ SESSİZ PUAN MOTORU (airdrop için) ============
// Değerler GİZLİ (kullanıcı görmez), dengeli + suistimal korumalı.
// Kurallar:
//  - Her eylemin pointsı farklı; günlük tavan + tek-seferlik + kalite bonusu var.
//  - Points kazanmak için holder olmak (en az $10 değerinde token) gerekir → sybil zorlaşır.
//  - Hiçbir görsel geri bildirim yok; toplam S.pts'te sessizce birikir.
const PTS={
 createRoom:10,   // oda kur (değerli ama günde sınırlı)
 joinRoom:1,      // odaya katıl (oda başına 1 kez)
 post:1,          // post (günlük tavan)
 comment:1,       // yorum/mesaj (günlük tavan)
 likeGiven:0,     // beğeni vermek points getirmez (spam olurdu)
 receivedLike:1,  // KALİTE: postın beğeni alırsa
 roomJoinedBonus:2 // KALİTE: kurduğun odaya biri katılırsa kurucuya
};
const PTS_DAILY_CAP={createRoom:20, post:5, comment:8}; // günlük points tavanları
function _today(){const d=new Date();return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();}
function _resetDayIfNeeded(){const t=_today();if(S.ptsDayKey!==t){S.ptsDayKey=t;S.ptsDay={};}}
// points ekle (sessiz). once:key verilirse tek-seferlik. capKey verilirse günlük tavana tabi.
function award(kind,opts={}){
 if(!S.connected)return;
 // Oda ile ilgili pointslar $10 holder şartına tabi; post/yorum/beğeni public.
 const holderOnly=[]; // artık hiçbir points için holder şartı yok — herkes kazanır
 if(holderOnly.indexOf(kind)>=0){
   const holdsSomething=Object.keys(S.wallet.holdings||{}).some(sym=>holdingUsd(sym).usd>=10);
   if(!holdsSomething)return;
 }
 _resetDayIfNeeded();
 let val=PTS[kind]||0; if(val<=0)return;
 if(opts.once){ if(S.ptsLog[opts.once])return; S.ptsLog[opts.once]=1; }
 if(opts.capKey&&PTS_DAILY_CAP[opts.capKey]){
   const used=S.ptsDay[opts.capKey]||0;
   if(used>=PTS_DAILY_CAP[opts.capKey])return; // tavana ulaştı, sessizce yok say
   S.ptsDay[opts.capKey]=used+val;
 }
 S.pts+=val; // sessizce birik
 // Supabase'e kalici yaz (gercek siralama/airdrop icin)
 if(window.__holdxAddPoints && S.wallet){ window.__holdxAddPoints(S.wallet.address, val); }
}
// Supabase'den gelen toplam pointsi uygula
window.__holdxApplyLeaderboard=function(rows){ S.leaderboard=rows||[]; render(); };
window.__holdxSetPoints=function(total){ if(typeof total==="number"){ S.pts=total; } };

// profil resmi / kapak yükleme → kırpma editörüne al
function pickProfileImg(which){
 const inp=document.createElement("input");
 inp.type="file"; inp.accept="image/*";
 inp.onchange=()=>{const f=inp.files&&inp.files[0]; if(!f)return;
   const r=new FileReader(); r.onload=()=>{
     const img=new Image();
     img.onload=()=>{ S.crop={src:r.result,type:which,zoom:1,x:0,y:0,natW:img.naturalWidth,natH:img.naturalHeight}; render(); };
     img.src=r.result;
   };
   r.readAsDataURL(f);};
 inp.click();
}
// kırpma + zoom penceresi
function cropModal(){
 const c=S.crop; if(!c)return "";
 const isCover=c.type==="cover";
 return `<div class="overlay" data-act="closeCrop">
   <div class="editcard cropcard">
     <div class="edit-h"><strong>${isCover?"Set cover photo":"Set profile photo"}</strong><button class="edit-x" data-act="closeCrop">${I.x}</button></div>
     <div class="crop-stage">
       <div class="crop-frame ${isCover?"cover":"avatar"}" id="cropFrame">
         <img id="cropImg" src="${c.src}" draggable="false" alt="">
       </div>
     </div>
     <div class="crop-zoom">
       <span class="crop-zs">${I.image}</span>
       <input type="range" id="cropZoom" min="1" max="3" step="0.01" value="${c.zoom}">
       <span class="crop-zl">${I.image}</span>
     </div>
     <p class="crop-hint">Drag to pan · slider to zoom</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeCrop">Cancel</button>
       <button class="edit-save" data-act="applyCrop">Uygula</button>
     </div>
   </div>
 </div>`;
}
function setupCropper(){
 const c=S.crop; if(!c)return;
 const frame=document.getElementById("cropFrame");
 const img=document.getElementById("cropImg");
 const zoom=document.getElementById("cropZoom");
 if(!frame||!img)return;
 const fW=frame.clientWidth, fH=frame.clientHeight;
 const base=Math.max(fW/c.natW, fH/c.natH);
 function layout(){
   const ds=base*c.zoom;
   const w=c.natW*ds, h=c.natH*ds;
   const maxX=Math.max(0,(w-fW)/2), maxY=Math.max(0,(h-fH)/2);
   c.x=Math.max(-maxX,Math.min(maxX,c.x));
   c.y=Math.max(-maxY,Math.min(maxY,c.y));
   img.style.width=w+"px"; img.style.height=h+"px";
   img.style.left=(fW/2 - w/2 + c.x)+"px";
   img.style.top=(fH/2 - h/2 + c.y)+"px";
 }
 layout();
 let dragging=false,startX=0,startY=0,ox=0,oy=0;
 const pt=e=>{const t=e.touches&&e.touches[0]?e.touches[0]:e;return{x:t.clientX,y:t.clientY};};
 const down=e=>{dragging=true;const p=pt(e);startX=p.x;startY=p.y;ox=c.x;oy=c.y;e.preventDefault();};
 const move=e=>{if(!dragging)return;if(!document.body.contains(frame)){dragging=false;return;}const p=pt(e);c.x=ox+(p.x-startX);c.y=oy+(p.y-startY);layout();};
 const up=()=>{dragging=false;};
 frame.addEventListener("mousedown",down);
 frame.addEventListener("touchstart",down,{passive:false});
 window.addEventListener("mousemove",move);
 window.addEventListener("touchmove",move,{passive:false});
 window.addEventListener("mouseup",up);
 window.addEventListener("touchend",up);
 zoom.addEventListener("input",()=>{c.zoom=parseFloat(zoom.value);layout();});
}
// demo GIF'i büyük emoji içeren bir SVG dataURL'e çevir (gerçek GIF servisine kadar yer tutucu)
function gifDataUrl(emoji){
 const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='160'><rect width='100%' height='100%' rx='14' fill='%231A1A21'/><text x='50%' y='54%' font-size='84' text-anchor='middle' dominant-baseline='middle'>${emoji}</text></svg>`;
 return "data:image/svg+xml;utf8,"+svg;
}
// hidden dosya seçici ile cihazdan fotoğraf al → dataURL (önizleme)
function triggerPhoto(target){
 const inp=document.createElement("input");
 inp.type="file"; inp.accept="image/*";
 inp.onchange=()=>{const f=inp.files&&inp.files[0]; if(!f)return;
   const r=new FileReader(); r.onload=()=>{ if(target==="post")S.postMedia=r.result; else if(target==="dm")S.dmMedia=r.result; else S.chatMedia=r.result; S.emojiFor=null;S.gifFor=null; render(); };
   r.readAsDataURL(f);};
 inp.click();
}
document.addEventListener("keydown",e=>{
 if(e.target.id==="chatInput"&&e.key==="Enter"){e.preventDefault();sendChat(e.target.dataset.token);}
 if(e.target.id==="dmInput"&&e.key==="Enter"){e.preventDefault();sendDM(e.target.dataset.wallet);}
 if(e.target.id==="commentInput"&&e.key==="Enter"){e.preventDefault();const id=e.target.dataset.id;
   const txt=e.target.value.trim();if(!txt)return;
   S.posts=S.posts.map(p=>{if(String(p.id)===String(id)){const comments=[...(p.comments||[]),{wallet:myTag(),text:txt,time:"now",tier:shownTier(p.token?holdingUsd(p.token).usd:0,true)}];return{...p,comments,replies:(p.replies||0)+1};}return p;});
   S.commentText="";S.replyTo=null;render();}
});

// live fiyat: oda açıkken token fiyatını güncelle

// odadaki live fiyat:
//  - contract address olan (kullanıcı odaları) → DexScreener'dan GERÇEK fiyat
//  - demo/top50 tokenlar → hafif simülasyon (bu tokenlar örnek veri)
let _lastReal=0;
setInterval(async()=>{
 if(S.view.name!=="room")return;
 const t=S.view.token, lp=livePrice(t);
 const tk=tokenBy(t)||{};
 const flash=(dir)=>{const el=document.getElementById("lpPrice");if(el){el.textContent=fprice(lp.price);el.classList.remove("flash-up","flash-down");void el.offsetWidth;el.classList.add(dir>0?"flash-up":"flash-down");}
   const ce=document.getElementById("lpChg");if(ce&&tk.chg!=null){ce.textContent=(tk.chg>=0?"+":"")+(+tk.chg).toFixed(1)+"%";ce.className="lp-chg mono "+(tk.chg>=0?"up":"down");}};
 if(tk.address){
   const now=Date.now(); if(now-_lastReal<4000)return; _lastReal=now;
   try{const d=await dexPrice(tk.address,tk.chain);
     if(d&&S.view.name==="room"&&S.view.token===t){const dir=d.price>=lp.price?1:-1;lp.price=d.price;lp.dir=dir;tk.price=d.price;tk.chg=d.chg;flash(dir);}
   }catch(e){}
 } else if(tk.cgId){
   const now=Date.now(); if(now-_lastReal<8000)return; _lastReal=now; // CG rate-limit'i için daha seyrek
   try{const pr=await cgFetch(`/simple/price?ids=${encodeURIComponent(tk.cgId)}&vs_currencies=usd&include_24hr_change=true`);const o=pr[tk.cgId];
     if(o&&o.usd!=null&&S.view.name==="room"&&S.view.token===t){const dir=o.usd>=lp.price?1:-1;lp.price=o.usd;lp.dir=dir;tk.price=o.usd;tk.chg=o.usd_24h_change||tk.chg;flash(dir);}
   }catch(e){}
 } else {
   const delta=(Math.random()-0.48)*0.006;
   lp.price=Math.max(lp.price*(1+delta),1e-9);lp.dir=delta>=0?1:-1;flash(lp.dir);
 }
},2500);

// resmi odaları başlangıçta yükle (App.jsx loadRooms gelene kadar görünsünler)
if(!S.customRooms||!S.customRooms.length){
  S.customRooms=OFFICIAL_ROOMS.map(function(tk){
    return {ticker:tk, creator:"__official__", members:0, cap:Infinity, address:(TOKREG[tk]&&TOKREG[tk].address)||null, createdAt:"", official:true};
  });
}

render();

// URL yönlendirmesi: /room/TICKER veya /post/ID ile gelindiyse aç
(function(){
  try{
    const path=window.location.pathname||"";
    const rm=path.match(/^\/room\/([^\/]+)/);
    const pm=path.match(/^\/post\/([^\/]+)/);
    const um=path.match(/^\/u\/([^\/]+)/);
    if(rm&&rm[1]){
      const tk=decodeURIComponent(rm[1]).toUpperCase();
      setTimeout(function(){ S.view={name:"room",token:tk}; if(isJoined(tk)){S.chatScrollBottom=true; if(window.__holdxSubscribeRoom)window.__holdxSubscribeRoom(tk);} render(); },300);
    } else if(pm&&pm[1]){
      const pid=decodeURIComponent(pm[1]);
      setTimeout(function(){ S.view={name:"post",id:pid,token:null}; render(); },300);
    } else if(um&&um[1]){
      const uw=decodeURIComponent(um[1]);
      setTimeout(function(){ S.view={name:"profile",token:null,wallet:uw}; if(window.__holdxLoadUserPosts)window.__holdxLoadUserPosts(uw); if(window.__holdxLoadPeerInfo)window.__holdxLoadPeerInfo(uw); render(); },300);
    } else {
      // basit nav sekmeleri: /portfolio, /rooms, /messages, /notifications, /leaderboard, /settings, /profile
      const seg=path.replace(/^\//,"").split("/")[0];
      const navViews=["portfolio","rooms","myrooms","messages","notifications","leaderboard","settings","profile"];
      if(navViews.includes(seg)){
        setTimeout(function(){
          if(seg==="rooms"){S.view={name:"rooms",token:null};S.roomTab="browse";}
          else if(seg==="profile"){S.view={name:"profile",token:null};if(window.__holdxLoadUserPosts&&S.wallet)window.__holdxLoadUserPosts(S.wallet.address);}
          else S.view={name:seg,token:null};
          render();
        },300);
      }
    }
  }catch(e){}
})();

// live fiyatları arka planda çek (elle yazılı örnek fiyatların yerine gerçek veri)
refreshTokenPrices();
setInterval(refreshTokenPrices,60000);

// "back to top" butonunu sadece aşağı kayınca göster
function updateScrollTop(){
 const btn=document.querySelector(".scrolltop"); if(!btn)return;
 const main=document.querySelector(".main");
 const y=Math.max(window.scrollY||0,(main?main.scrollTop:0));
 btn.classList.toggle("show",y>500);
}
window.addEventListener("scroll",updateScrollTop,{passive:true});
document.addEventListener("scroll",e=>{if(e.target.classList&&e.target.classList.contains("main"))updateScrollTop();},{passive:true,capture:true});

// DEMO: ara sıra sahte room activity düşür (akış live hissi versin).
// Gerçek sürümde bu akış Supabase'den gerçek zamanlı gelir.
const DEMO_WALLETS=["7Qm4vK","Bx91Lp","9fKq2m","Kp02aa","3tRw8k","Vp5tK1","Mn8qW2","Ax7pL9","Qz1vN4","Dk3mR7"];
const DEMO_TOKENS=[["ANSEM","solana"],["WIF","solana"],["PEPE","ethereum"],["BONK","solana"],["EIGEN","ethereum"],["POPCAT","solana"],["MOODENG","solana"],["BRETT","base"],["PENGU","solana"]];
// Gerçek aktivite feed: React/Supabase realtime'dan gelir (window.__holdxPushActivity)
window.__holdxSetActivity=function(list){
 S.activity=(list||[]).map(function(a){return {type:a.type,token:a.token,chain:a.chain||"solana",wallet:a.wallet||"",t:a.t||Date.now()};});
 render();
};
window.__holdxPushActivity=function(ev){
 // ev: {type:"create"|"join", token, chain, wallet}
 S.activity.unshift({type:ev.type, token:ev.token, chain:ev.chain||"solana", wallet:ev.wallet||"", t:Date.now()});
 if(S.activity.length>40)S.activity.length=40;
 const box=document.getElementById("actList");
 if(box){
   const tmp=document.createElement("div");tmp.innerHTML=activityPanel();
   const fresh=tmp.querySelector("#actList"); if(fresh)box.innerHTML=fresh.innerHTML;
 }
};

}
