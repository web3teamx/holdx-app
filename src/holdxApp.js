// HOLDX uygulaması — React icin sarmalanmis surum
// Bu dosya, calisir prototipin tam JavaScript kodunu icerir.
export function initHoldx(){
  if (window.__holdx_inited) return;
  window.__holdx_inited = true;

const BRAND="HOLDX", TAGLINE="cüzdanın konuşur";
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
 {cap:Infinity, price:250}, // sınırsız — üye sınırı yok
];
function capLabel(n){return n===Infinity?"∞":n>=1000?(n/1000)+"K":(""+n);}
function capName(n){return n===Infinity?"Sınırsız":capLabel(n);}
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
   Her kayıt canlı veri kaynağından gelir → gerçek fiyat + kontrat adresi taşır (adresle fiyat %100 doğru çekilir).
   Aşağısı sadece DEMO cüzdan bakiyesinin gösterilebilmesi için ekilmiş birkaç örnek token. */
const TOKREG={
 SOL:{t:"SOL",name:"Solana",price:168.4,chg:3.2,mc:"92.1B",color:tokColor("SOL"),address:"So11111111111111111111111111111111111111112",chain:"solana"},
 BONK:{t:"BONK",name:"Bonk",price:0.0000231,chg:8.1,mc:"1.6B",color:tokColor("BONK"),address:"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",chain:"solana"},
 POPCAT:{t:"POPCAT",name:"Popcat",price:0.91,chg:12.7,mc:"894M",color:tokColor("POPCAT"),address:"7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",chain:"solana"},
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
 topSearch:"", topSearchOpen:false, topResults:[], topProfiles:[], topSearching:false, shareOpen:null, leaderboard:[], dms:{}, dmText:"", dmThreads:[], unreadDM:0, unreadPeers:{},
 commentText:"", prevView:null, roomMenu:null, leaveConfirm:null, deleteConfirm:null, sharePostId:null, lightbox:null,
 profile:{name:"", bio:"", avatar:null, cover:null, joined:"Tem 2025"}, crop:null,
 following:{}, followers:42, editProfile:false, profileTab:"posts",
 pts:0, ptsLog:{}, ptsDay:{}, ptsDayKey:"",
 hideValue:false, hideActivity:false, privateProfile:false, docOpen:null, feedbackOpen:false,
 emojiFor:null, postMedia:null, chatMedia:null, gifQuery:"", gifFor:null, composerText:"", chatText:"", names:{},
 activity:[],
 joined:{}, roomSearch:"",
 roomTab:"browse", createTicker:"", createDone:null, createCap:100, upgradeOpen:null, createHoldError:false,
 searchResults:[], searching:false, searchErr:false, picked:null,
 feedResults:[], feedSearching:false,
 exploreSearch:"", exploreResults:[], exploreSearching:false,
 postSearchOpen:false, postSearch:"", postResults:[], postSearching:false, postToken:null,
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const short=a=>a.slice(0,4)+"…"+a.slice(-4);
function genAddr(){const c="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";let s="";for(let i=0;i<44;i++)s+=c[Math.floor(Math.random()*c.length)];return s;}
function fprice(p){if(p>=1000)return"$"+p.toLocaleString(undefined,{maximumFractionDigits:0});if(p<0.000001)return"$"+p.toFixed(9);if(p<0.001)return"$"+p.toFixed(7);if(p<1)return"$"+p.toFixed(4);return"$"+p.toFixed(2);}
function avatar(seed){let h=0;for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))%360;return`background:conic-gradient(from ${h}deg,hsl(${h} 70% 55%),hsl(${(h+90)%360} 70% 50%),hsl(${(h+200)%360} 70% 55%))`;}
function tokenBy(t){return TOKREG[t];}
function allTokens(){return Object.values(TOKREG);}
function upsertToken(r){ // arama sonucunu registry'ye ekle/güncelle
 const sym=r.symbol||r.t; const prev=TOKREG[sym]||{};
 TOKREG[sym]={t:sym,name:r.name,price:r.price,chg:+(+(r.chg||0)).toFixed(1),mc:typeof r.mc==="number"?fmtMc(r.mc):(r.mc||"—"),color:tokColor(sym),address:r.address||prev.address,chain:r.chain||prev.chain||"solana",source:r.source||prev.source,cgId:r.cgId||prev.cgId};
 return TOKREG[sym];
}
function holds(t){return S.connected&&!!S.wallet.holdings[t];}
function myTag(){return short(S.wallet.address).replace("…","");}
// görünen ad: profilinde isim koyduysan onu, koymadıysan cüzdan adresini göster
function isMyWallet(w,mine){return mine||(S.connected&&w===myTag());}
function displayName(w,mine){
 if(isMyWallet(w,mine)&&S.profile&&S.profile.name&&S.profile.name.trim())return S.profile.name.trim();
 if(S.names&&S.names[w]&&S.names[w].trim())return S.names[w].trim();
 return w;
}
function nameCls(w,mine){
 if(isMyWallet(w,mine)&&S.profile&&S.profile.name&&S.profile.name.trim())return "";
 if(S.names&&S.names[w]&&S.names[w].trim())return "";
 return "mono";
}
// Baska cuzdanlarin profil isimleri (Supabase'den) burada tutulur
window.__holdxApplyNames=function(map){
 S.names=Object.assign(S.names||{}, map||{});
 render();
};
function chart(seed){let s=0;for(let i=0;i<seed.length;i++)s+=seed.charCodeAt(i);const o=[];let v=40;for(let i=0;i<40;i++){s=(s*9301+49297)%233280;v=Math.max(12,Math.min(96,v+((s/233280)-0.42)*26));o.push(v);}return o;}
function livePrice(t){if(!S.livePrices[t]){const tk=tokenBy(t);S.livePrices[t]={price:(tk&&tk.price)||0,dir:0};}return S.livePrices[t];}
function isCustomRoom(t){return S.customRooms.some(r=>r.ticker===t);}
function isJoined(t){return !!S.joined[t];}
function roomFull(t){const r=S.customRooms.find(x=>x.ticker===t);return r?(r.members>=(r.cap||100)):false;}
const MIN_HOLD_USD=10; // odaya katilmak icin o tokenden en az bu kadar $ tutma sarti
function holdsEnough(t){
  // zaten uyeyse tekrar kontrol etme
  if(S.joined[t]) return true;
  const hv=holdingUsd(t);
  return hv.usd>=MIN_HOLD_USD;
}
function canJoin(t){
  if(!isCustomRoom(t)) return holds(t);
  if(roomFull(t) && !S.joined[t]) return false; // dolu
  return holdsEnough(t); // holder sarti
}

/* Kullanıcının bir tokenden elindeki ANLIK dolar değeri.
   Gerçek sürümde: cüzdan bakiyesi (RPC) × canlı fiyat.
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
 {min:100000, key:"whale",  label:"balina",       emoji:"🐋", color:"#F5A623"},
 {min:10000,  key:"shark",  label:"balina adayı", emoji:"",   color:"#9B6BFF"},
 {min:1000,   key:"big",    label:"büyük holder", emoji:"",   color:"#4DA2FF"},
 {min:10,     key:"holder", label:"holder",       emoji:"",   color:"#34E39A"},
];
function tierFor(usd){for(const t of TIERS){if(usd>=t.min)return t;}return null;}
// başkalarına görünen kademe (kendi rozetini gizlemişse en alta indirilir)
function shownTier(usd,isMe){
 const t=tierFor(usd); if(!t)return null;
 if(isMe&&S.hideWhale) return TIERS[TIERS.length-1]; // gizli → sadece "holder"
 return t;
}
// kademe etiketi (renk noktası + isim)
function tierBadge(tier){
 if(!tier)return "";
 return `<span class="tierbadge" style="color:${tier.color};background:${tier.color}1a">${I.badge} ${tier.label}${tier.emoji?" "+tier.emoji:""}</span>`;
}
// kademe renginde halkalı avatar
function ringAvatar(seed,tier,cls){
 const ring=tier?`box-shadow:0 0 0 2px var(--bg),0 0 0 3.5px ${tier.color};`:"";
 return `<span class="av ${cls||""}" style="${avatar(seed)};${ring}"></span>`;
}
// "ne kadar önce"
function ago(ts){const s=Math.floor((Date.now()-ts)/1000);
 if(s<60)return "az önce"; const m=Math.floor(s/60); if(m<60)return m+"d önce";
 const h=Math.floor(m/60); if(h<24)return h+"sa önce"; return Math.floor(h/24)+"g önce";}
// sağdaki canlı oda aktivitesi akışı
function activityPanel(){
 const items=S.activity.slice(0,14).map(a=>{
   const isCreate=a.type==="create"; const mine=a.mine;
   return `<button class="act-row ${mine?"mine":""}" data-act="openRoom" data-token="${esc(a.token)}">
     <span class="av xs" style="${avatar(a.wallet+a.token)}"></span>
     <div class="act-body">
       <div class="act-line"><span class="mono act-w">${esc(a.wallet)}</span> ${isCreate?"oda kurdu":"katıldı"}</div>
       <div class="act-sub"><span class="act-verb ${isCreate?"create":"join"}">${isCreate?I.plus:I.check}${isCreate?"kurdu":"katıldı"}</span>
         <span class="mono act-tk">$${esc(a.token)}</span>${chainBadge(a.chain)}
         <span class="act-time">· ${ago(a.t)}</span></div>
     </div></button>`;
 }).join("");
 return `<aside class="side-rail">
   <section class="card actcard">
     <div class="card-h">${I.waves} Oda aktivitesi <span class="live"><span class="pulse"></span>canlı</span></div>
     <div class="actlist" id="actList">${items}</div>
   </section>
 </aside>`;
}
// aktivite ekle (kendi işlemin akışın başına)
function pushActivity(type,token,chain){
 S.activity.unshift({type,token,chain:chain||"solana",wallet:myTag(),t:Date.now(),mine:true});
 if(S.hideActivity)S.activity.shift(); // gizliyse kendi aktiviteni akışa koyma
 if(S.activity.length>40)S.activity.length=40;
}

/*/* ---------------- canlı veri kaynağı ----------------
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
      const r=await fetch(wrap(url),{headers:{Accept:"application/json"}});
      if(!r.ok)throw new Error("http "+r.status);
      const j=await r.json();
      _proxyIdx=PROXIES.indexOf(wrap);
      return j;
    }catch(e){lastErr=e;}
  }
  throw lastErr||new Error("fetch failed");
}
const dexFetch=path=>apiFetch(DEX_BASE+path);
const cgFetch=path=>apiFetch(CG_BASE+path);

// CoinGecko arama: borsa coinlerini (TIA, APT, SUI...) bulur. /search fiyat vermez → /simple/price ile çekilir.
async function cgSearch(q){
 const d=await cgFetch(`/search?query=${encodeURIComponent(q)}`);
 window._cgOk=true; // CoinGecko erişilebiliyor
 const coins=(d.coins||[]).slice(0,10); // {id,name,symbol,market_cap_rank,thumb}
 if(!coins.length)return [];
 const ids=coins.map(c=>c.id).join(",");
 let prices={};
 try{ prices=await cgFetch(`/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);}catch(e){}
 return coins.map(c=>{
   const p=prices[c.id]||{};
   return {source:"cg", cgId:c.id, symbol:(c.symbol||"").toUpperCase(), name:c.name,
     price:p.usd!=null?p.usd:null, chg:p.usd_24h_change||0, mc:p.usd_market_cap||0,
     rank:c.market_cap_rank||9999, chain:"cex", address:null};
 }).filter(x=>x.price!=null); // fiyatı olmayanları ele
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
 const pairs=(d.pairs||[]).filter(p=>p.priceUsd);
 // aynı token = adres + ağ birlikte (farklı ağlarda aynı isim ayrı token'dır)
 const byToken={};
 for(const p of pairs){
   const key=p.chainId+":"+p.baseToken.address, liq=(p.liquidity&&p.liquidity.usd)||0;
   if(!byToken[key]||liq>byToken[key]._liq){byToken[key]={
     source:"dex", address:p.baseToken.address, chain:p.chainId, symbol:p.baseToken.symbol, name:p.baseToken.name,
     price:parseFloat(p.priceUsd), chg:(p.priceChange&&p.priceChange.h24)||0,
     mc:p.marketCap||0, _fdv:p.fdv||0, _liq:liq };}
 }
 return Object.values(byToken);
}
// İKİ KAYNAĞI BİRLEŞTİREN ANA ARAMA: DexScreener (DEX/meme) + CoinGecko (borsa coinleri).
async function tokenSearch(q){
 const ql=q.trim().toLowerCase();
 const [dex,cg]=await Promise.allSettled([dexSearch(q),cgSearch(q)]);
 let dexArr=dex.status==="fulfilled"?dex.value:[];
 const cgArr=cg.status==="fulfilled"?cg.value:[];

 // CoinGecko sonuçları mcap sırasıyla gelir → sembolü tam eşleşen en üstteki "gerçek" token'dır.
 // Eğer bir sembol için CoinGecko'da köklü (yüksek mcap) bir token varsa, DexScreener'daki
 // aynı sembollü DÜŞÜK likiditeli kopyaları ele — çünkü onlar sahte/impostor olma ihtimali yüksek.
 const cgBySym={};
 for(const c of cgArr){const k=(c.symbol||"").toUpperCase(); if(!cgBySym[k])cgBySym[k]=c;}
 dexArr=dexArr.filter(d=>{
   const k=(d.symbol||"").toUpperCase(); const canon=cgBySym[k];
   if(canon && (canon.mc||0)>2_000_000 && (d._liq||0)<50000) return false; // köklü coin var + bu kopya sığ → ele
   return true;
 });

 // birleştir; aynı sembol iki kaynakta varsa DEX olanı tut (kontrat adresi → holder mantığına uygun)
 const seen=new Set(dexArr.map(t=>(t.symbol||"").toUpperCase()));
 const merged=[...dexArr];
 for(const c of cgArr){ if(!seen.has((c.symbol||"").toUpperCase())){merged.push(c);seen.add((c.symbol||"").toUpperCase());} }

 // sıralama: tam sembol/isim eşleşmesi öne; sonra piyasa büyüklüğü (mcap) + likidite.
 const score=t=>{const sym=(t.symbol||"").toLowerCase(),nm=(t.name||"").toLowerCase();
   if(sym===ql)return 2; if(sym.startsWith(ql)||nm===ql)return 1; return 0;};
 // CoinGecko'da market_cap_rank'i olan tokenlar KÖKLÜ/GERÇEK'tir (sahteler listelenmez).
 // Bir DEX sonucu, CoinGecko'da aynı sembolle köklü bir coin varsa, onun mcap'ini "gerçek" kabul et.
 const cgRankBySym={};
 for(const c of cgArr){const k=(c.symbol||"").toUpperCase(); if(c.rank && c.rank<9999 && (!cgRankBySym[k]||c.rank<cgRankBySym[k].rank)) cgRankBySym[k]={rank:c.rank,mc:c.mc||0};}
 // Her tokene "güven puanı": CoinGecko rank'i varsa yüksek; yoksa likiditeye bak.
 const trust=t=>{
   const k=(t.symbol||"").toUpperCase();
   const cg=cgRankBySym[k];
   // CoinGecko'da köklü coin + bu tokenin mcap'i o köklüye yakınsa → gerçek (yüksek güven)
   if(t.source==="cg" && t.rank && t.rank<9999) return 1e12 - t.rank*1e6; // rank ne düşükse o kadar üstte
   // DEX sonucu ama CoinGecko'da köklü karşılığı var ve mcap benzer → gerçek
   if(cg && t.mc>0 && t.mc >= cg.mc*0.5) return 1e12 - cg.rank*1e6 - 1;
   // aksi halde likidite + gerçek mcap
   return ((t._liq||0)*10) + (t.mc||0);
 };
 merged.sort((x,y)=>{const w=trust(y)-trust(x); if(w!==0)return w; return score(y)-score(x);});
 return merged.slice(0,14);
}
async function dexPrice(address,chain){
 const arr=await dexFetch(`/tokens/v1/${chain||"solana"}/${address}`);
 if(!arr||!arr.length)return null;
 const best=arr.filter(p=>p.priceUsd).sort((a,b)=>((b.liquidity&&b.liquidity.usd)||0)-((a.liquidity&&a.liquidity.usd)||0))[0];
 if(!best)return null;
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

// --- akış filtresi için canlı arama (tüm ağlardaki tokenlar) ---
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
// --- paylaşıma token ekleme araması (tüm ağlar) ---
function postSearchResultsHtml(){
 const q=(S.postSearch||"").trim();
 if(q.length<2)return `<p class="searchhint">2+ harf yaz — bahsetmek istediğin tokenı ara.</p>`;
 if(S.postSearching)return `<div class="searchstate">${I.search} aranıyor…</div>`;
 if(!S.postResults.length)return `<p class="searchhint">"${esc(q)}" için sonuç yok.</p>`;
 return `<div class="resultlist">${S.postResults.map((r,i)=>`
   <button class="resultrow" data-act="pickPostToken" data-i="${i}">
     <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
     <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}</span><span class="rr-name">${esc(r.name)}${r.mc?` · mcap ${typeof r.mc==="number"?fmtMc(r.mc):r.mc}`:""}</span></div>
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
       if(tok.address){ d=await dexPrice(tok.address,tok.chain); }
       else if(tok.cgId){ try{const pr=await cgFetch(`/simple/price?ids=${encodeURIComponent(tok.cgId)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);const o=pr[tok.cgId];if(o&&o.usd!=null)d={price:o.usd,chg:o.usd_24h_change||0,mc:o.usd_market_cap||0};}catch(e){} }
       else { const res=await dexSearch(tok.t); const ex=res.find(r=>r.symbol.toUpperCase()===tok.t.toUpperCase())||res[0]; if(ex)d={price:ex.price,chg:ex.chg,mc:ex.mc}; }
       if(d&&d.price>0){
         tok.price=d.price; tok.chg=+(+d.chg).toFixed(1); if(d.mc)tok.mc=fmtMc(d.mc);
         if(S.livePrices[tok.t])S.livePrices[tok.t].price=d.price; else S.livePrices[tok.t]={price:d.price,dir:0};
       }
     }catch(e){}
   }));
 }
 if(["tokens","feed","rooms","portfolio"].includes(S.view.name))render();
}
const NAV=[["feed","Akış","home"],["tokens","Token ara","search"],["profile","Profil","user"],["portfolio","Portfolyo","wallet"],["rooms","Odalar","chat"],["myrooms","Odalarım","badge"],["messages","Mesajlar","send"],["leaderboard","Sıralama","trend"],["settings","Ayarlar","gear"]];

// --- emoji seti (X benzeri bol seçenek, kategorili) ---
const EMOJI={
 "Sık":["😂","🤣","🔥","🚀","💎","🙌","👀","❤️","💯","🐋","📈","📉","🤝","🥹","🫡","😍","😅","🤔","👍","🙏"],
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
function gifPicker(target){
 const q=S.gifQuery.trim();
 return `<div class="gifpop" data-emoji-pop>
   <div class="gif-search">${I.search}<input id="gifSearch" placeholder="GIF ara (demo)" value="${esc(S.gifQuery)}" autocomplete="off"></div>
   <div class="gif-grid">${DEMO_GIFS.map((g,i)=>`<button class="gif-b" data-act="pickGif" data-gif="${g}" data-i="${i}" data-target="${target}"><span class="gif-emoji">${g}</span><span class="gif-tag">${q||"gif"}_${i+1}</span></button>`).join("")}</div>
   <div class="gif-note">Gerçek GIF arama (GIPHY) yayın aşamasında bağlanacak.</div>
 </div>`;
}

function postTier(p){
 if(!p.token||!p.verified)return null;
 if(p.mine||(S.connected&&p.wallet===myTag()))return shownTier(holdingUsd(p.token).usd,true);
 // mock yazar: cüzdan+token'dan deterministik $ değer (kademe çeşitliliği için)
 let h=0;const s=p.wallet+p.token;for(let i=0;i<s.length;i++)h=(h*131+s.charCodeAt(i))>>>0;
 const buckets=[50,600,5000,45000,320000];
 return shownTier(buckets[h%buckets.length],false);
}
function msgTier(m,ticker){
 if(m.mine||(S.connected&&m.wallet===myTag()))return shownTier(holdingUsd(ticker).usd,true);
 let h=0;const s=m.wallet+ticker;for(let i=0;i<s.length;i++)h=(h*131+s.charCodeAt(i))>>>0;
 const buckets=[50,600,5000,45000,320000];
 return shownTier(buckets[h%buckets.length],false);
}
function postCard(p){
 const tk=tokenBy(p.token)||{color:"#8A8A96"};
 const tier=postTier(p);
 return `<article class="post-card"><button class="pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${ringAvatar(p.wallet+(p.token||""),tier)}</button>
  <div class="post-body"><div class="post-head">
   <button class="${nameCls(p.wallet,p.mine)} post-wallet pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${esc(displayName(p.wallet,p.mine))}</button>
   ${tier?tierBadge(tier):""}
   ${p.token?`<button class="post-token" style="color:${tk.color}" data-act="filterToken" data-token="${p.token}">$${p.token}</button>`:""}
   <span class="post-time">· ${p.time}</span>
  </div><p class="post-text">${esc(p.text)}</p>
  ${p.media?`<img class="post-media zoomable" src="${p.media}" alt="" data-act="zoom" data-src="${p.media}">`:""}
  <div class="post-actions">
   <button data-act="openPost" data-id="${p.id}">${I.reply} ${p.replies||0}</button>
   <button class="${p.reposted?"reposted":""}" data-act="repost" data-id="${p.id}">${I.repost} ${p.reposts||0}</button>
   <button class="${p.liked?"liked":""}" data-act="like" data-id="${p.id}">${p.liked?I.heartf:I.heart} ${p.likes||0}</button>
   <button class="pa-share" data-act="sharePost" data-id="${p.id}">${I.share}</button>
  </div></div></article>`;
}
// tek bir postun detay + yorumlar görünümü
function postDetailView(id){
 const p=S.posts.find(x=>x.id===id);
 if(!p)return `<button class="back" data-act="nav" data-view="feed">← Akış</button><p class="empty">Paylaşım bulunamadı.</p>`;
 const tk=tokenBy(p.token)||{color:"#8A8A96"};
 const tier=postTier(p);
 const comments=p.comments||[];
 return `<button class="back" data-act="back">← Geri</button>
  <article class="post-card detail">
   <button class="pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${ringAvatar(p.wallet+(p.token||""),tier)}</button>
   <div class="post-body"><div class="post-head">
     <button class="${nameCls(p.wallet,p.mine)} post-wallet pf-link" data-act="openProfile" data-wallet="${esc(p.wallet)}">${esc(displayName(p.wallet,p.mine))}</button>
     ${tier?tierBadge(tier):""}
     ${p.token?`<button class="post-token" style="color:${tk.color}" data-act="filterToken" data-token="${p.token}">$${p.token}</button>`:""}
     <span class="post-time">· ${p.time}</span>
   </div><p class="post-text big">${esc(p.text)}</p>
   ${p.media?`<img class="post-media zoomable" src="${p.media}" alt="" data-act="zoom" data-src="${p.media}">`:""}
   <div class="post-actions">
     <button>${I.reply} ${p.replies||0}</button>
     <button class="${p.reposted?"reposted":""}" data-act="repost" data-id="${p.id}">${I.repost} ${p.reposts||0}</button>
     <button class="${p.liked?"liked":""}" data-act="like" data-id="${p.id}">${p.liked?I.heartf:I.heart} ${p.likes||0}</button>
     <button class="pa-share" data-act="sharePost" data-id="${p.id}">${I.share}</button>
   </div></div>
  </article>
  ${S.connected?`<div class="commentbox">
    <span class="av" style="${avatar(S.wallet.address)}"></span>
    <input id="commentInput" class="comment-input" placeholder="Yorumunu yaz…" value="${esc(S.commentText||"")}" data-id="${p.id}">
    <button class="comment-send" data-act="sendComment" data-id="${p.id}">${I.send}</button>
  </div>`:`<div class="commentbox locked"><button class="connect" data-act="connect">Yorum için cüzdan bağla</button></div>`}
  <div class="section-label">${comments.length} yorum</div>
  <div class="comments">${comments.length?comments.map(c=>{
    const ctier=c.tier||null;
    return `<div class="comment">${ringAvatar(c.wallet+"c",ctier,"sm")}
      <div class="comment-body"><button class="${nameCls(c.wallet)} comment-w pf-link" data-act="openProfile" data-wallet="${esc(c.wallet)}">${esc(displayName(c.wallet))}</button>${ctier?tierBadge(ctier):""}<span class="comment-time">· ${c.time}</span>
      <p>${esc(c.text)}</p></div></div>`;
  }).join(""):`<p class="empty">İlk yorumu sen yaz.</p>`}</div>
  ${S.sharePostId?postShareModal():""}`;
}
function feedDropdown(){
 const q=(S.feedSearch||"").trim();
 let listHtml;
 if(q.length>=2){
   if(S.feedSearching)listHtml=`<div class="searchstate">${I.search} aranıyor…</div>`;
   else if(S.feedResults.length)listHtml=S.feedResults.map((r,i)=>`<button class="ff-opt" data-act="pickFeedToken" data-i="${i}">
       <span class="dot" style="background:${tokColor(r.symbol)}"></span>
       <span class="mono ff-t">$${esc(r.symbol)}</span>${chainBadge(r.chain)}<span class="ff-n">${esc(r.name)}</span>
       <span class="mono ff-p ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span></button>`).join("");
   else listHtml=`<p class="ff-empty">"${esc(q)}" için sonuç yok</p>`;
 } else {
   // arama boşken: hızlı erişim — bizim bildiğimiz tokenlar
   listHtml=`<button class="ff-opt ${S.filter==="ALL"?"on":""}" data-act="pickFilter" data-token="ALL">
       <span class="ff-alldot">${I.globe}</span><span class="ff-t">Tümü</span><span class="ff-n">bütün akış</span></button>
     ${allTokens().map(t=>`<button class="ff-opt ${S.filter===t.t?"on":""}" data-act="pickFilter" data-token="${t.t}">
       <span class="dot" style="background:${t.color}"></span>
       <span class="mono ff-t">$${t.t}</span><span class="ff-n">${t.name}</span>
       <span class="mono ff-p ${t.chg>=0?"up":"down"}">${fprice(t.price)}</span></button>`).join("")}`;
 }
 return `<div class="ff-backdrop" data-act="closeFeedDrop"></div>
  <div class="ff-panel">
   <div class="ff-search">${I.search}<input id="feedSearch" placeholder="tüm tokenlarda ara — isim veya ticker (ansem, wif…)" value="${esc(S.feedSearch)}" autocomplete="off"></div>
   <div class="ff-list" id="feedDropList">${listHtml}</div></div>`;
}
function feedView(){
 const sel=S.filter==="ALL"?null:(tokenBy(S.filter)||{t:S.filter,name:"",color:tokColor(S.filter)});
 const filtered=S.filter==="ALL"?S.posts:S.posts.filter(p=>p.token===S.filter);
 const filterBar=`<div class="feedfilter">
   <button class="ff-btn ${sel?"active":""}" data-act="toggleFeedDrop">
     ${sel?`<span class="dot" style="background:${sel.color}"></span><span class="mono ff-btn-tk">$${sel.t}</span>${sel.chain?chainBadge(sel.chain):""}<span class="ff-btn-name">${sel.name}</span>`
          :`<span class="ff-btn-ico">${I.search}</span><span>Coin'e göre filtrele</span>`}
     <span class="ff-caret ${S.feedDrop?"up":""}">▾</span>
   </button>
   ${sel?`<span class="ff-count mono">${filtered.length} paylaşım</span><button class="ff-clear" data-act="setFilter" data-token="ALL">✕</button>`:""}
   ${S.feedDrop?feedDropdown():""}
 </div>`;
 const attached=S.postToken; // paylaşıma bağlı token (opsiyonel)
 const attLp=attached?livePrice(attached.symbol):null;
 const attachBtn=attached
   ? `<button class="attachchip" data-act="clearPostToken"><span class="dot" style="background:${tokColor(attached.symbol)}"></span><span class="mono">$${esc(attached.symbol)}</span>${chainBadge(attached.chain)}<span class="mono attach-price">${fprice(attLp?attLp.price:attached.price)}</span><span class="mono attach-chg ${attached.chg>=0?"up":"down"}">${attached.chg>=0?"+":""}${(+attached.chg).toFixed(1)}%</span><span class="attach-x">✕</span></button>`
   : `<button class="attachbtn" data-act="openPostSearch">${I.plus} Token ekle</button>`;
 const composer=S.connected?
  `<div class="composer"><span class="av lg" style="${avatar(S.wallet.address)}"></span>
   <div class="composer-body"><textarea id="composerText" rows="2" placeholder="Ne düşünüyorsun?">${esc(S.composerText||"")}</textarea>
   ${S.postMedia?`<div class="mediaprev"><img src="${S.postMedia}" alt=""><button class="media-x" data-act="clearPostMedia">${I.x}</button></div>`:""}
   ${S.postSearchOpen?`<div class="postsearchwrap">
     <div class="roomsearch"><span>${I.search}</span><input class="searchinput" id="postSearch" placeholder="bahsetmek istediğin tokenı ara (tüm ağlar)" value="${esc(S.postSearch)}" autocomplete="off"></div>
     <div id="postSearchResults" class="searchresults">${postSearchResultsHtml()}</div></div>`:""}
   <div class="composer-tools">
     <button class="tool-b ${S.emojiFor==="post"?"on":""}" data-act="toggleEmoji" data-target="post" title="Emoji">${I.smile}</button>
     <button class="tool-b ${S.gifFor==="post"?"on":""}" data-act="toggleGif" data-target="post" title="GIF">${I.gif}</button>
     <button class="tool-b" data-act="pickPhoto" data-target="post" title="Fotoğraf">${I.image}</button>
     <div class="tool-pop">${S.emojiFor==="post"?emojiPicker("post"):""}${S.gifFor==="post"?gifPicker("post"):""}</div>
   </div>
   <div class="composer-foot">
    ${attachBtn}
    <button class="post" data-act="publish">Paylaş</button>
   </div></div></div>`
  :`<div class="connectbanner"><div><strong>Cüzdanını bağla, sesin gerçek olsun.</strong>
    <p>Tuttuğun token'da <span class="vinline">${I.badge} verified holder</span> rozeti alırsın. Bot yok, sahte hesap yok.</p></div>
    <button class="connect" data-act="connect">Cüzdan bağla</button></div>`;
 return `<h1 class="h1">Akış</h1>${filterBar}${composer}
  <div class="posts">${filtered.length?filtered.map(postCard).join(""):`<p class="empty">$${S.filter} için henüz paylaşım yok. İlk sen paylaş.</p>`}</div>
  ${S.sharePostId?postShareModal():""}`;
}
function exploreResultsHtml(){
 const q=(S.exploreSearch||"").trim();
 if(q.length>=2){
   if(S.exploreSearching)return `<div class="searchstate">${I.search} aranıyor…</div>`;
   if(!S.exploreResults.length)return `<p class="searchhint">"${esc(q)}" için sonuç yok.</p>`;
   return `<div class="resultlist">${S.exploreResults.map((r,i)=>`
     <button class="resultrow" data-act="openResult" data-i="${i}">
       <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
       <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}</span><span class="rr-name">${esc(r.name)}</span></div>
       <span class="mono rr-price ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span>
     </button>`).join("")}</div>`;
 }
 // arama boşken: daha önce görülen/oda açılan tokenlar
 const seen=allTokens();
 if(!seen.length)return `<p class="searchhint">Bir token adı yaz — tüm ağlardaki tokenlar (yeni çıkanlar dahil) aranır.</p>`;
 return `<div class="section-label">Son görülenler</div><div class="resultlist">${seen.map(t=>`
   <button class="resultrow" data-act="openToken" data-token="${t.t}">
     <span class="tokenmark sm" style="background:${t.color}"></span>
     <div class="rr-body"><span class="mono rr-tk">$${t.t}</span><span class="rr-name">${t.name}</span></div>
     <span class="mono rr-price ${t.chg>=0?"up":"down"}">${fprice(t.price)}</span>
   </button>`).join("")}</div>`;
}
function tokensView(){
 return `<h1 class="h1">Token ara</h1>
  <p class="sub">Herhangi bir tokenı ara — tüm ağlarda (Solana, Ethereum, Base, BSC & daha fazlası). Fiyat, sayfa ve odalar canlı.</p>
  <div class="roomsearch"><span>${I.search}</span>
    <input class="searchinput" id="exploreSearch" placeholder="token adı veya ticker (örn. eigen, ansem, wif)" value="${esc(S.exploreSearch)}" autocomplete="off"></div>
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
   <div class="token-livewrap"><span class="lp-live"><span class="pulse"></span>CANLI</span></div></div>
  ${addr?`<button class="token-addr" data-act="copyAddr" data-addr="${esc(addr)}">${I.copy}<span class="mono">${addr.slice(0,8)}…${addr.slice(-8)}</span><span class="ta-copy">${S.copied?"kopyalandı":"kopyala"}</span></button>`:""}
  <div class="token-stats">
    ${stat("fiyat",fprice(lp.price))}${stat("24s",(t.chg>=0?"+":"")+t.chg+"%",t.chg>=0?"up":"down")}
    ${stat("mcap",mcTxt)}${chain?stat("ağ",chainMeta(chain).label):""}</div>
  <div class="chart">${bars.map(h=>`<span style="height:${h}%;background:${t.color}"></span>`).join("")}</div>
  ${room
    ? `<button class="roomcta joined" data-act="openRoom" data-token="${t.t}">${I.chat} $${t.t} odasına gir<span class="rcta-meta">${(room.members||0).toLocaleString()}${(room.cap||100)===Infinity?"":"/"+capLabel(room.cap||100)} üye</span></button>`
    : `<button class="roomcta" data-act="openRoom" data-token="${t.t}">${I.plus} $${t.t} için ilk odayı kur</button>`}
  <div class="section-label">$${t.t} akışı ${tp.length?`<span class="sl-count">${tp.length}</span>`:""}</div>
  <div class="posts">${tp.length?tp.map(postCard).join(""):`<p class="empty">Bu token için henüz paylaşım yok. İlk sen paylaş — Akış'tan $${t.t} ekleyerek.</p>`}</div>
  ${S.sharePostId?postShareModal():""}`;
}
function stat(l,v,c){return`<div class="stat"><span class="stat-label">${l}</span><span class="mono stat-value ${c||""}">${v}</span></div>`;}
function portfolioView(){
 if(!S.connected)return gate("portfolyonu görmek");
 const rows=Object.entries(S.wallet.holdings).map(([tk,h])=>{const t=tokenBy(tk)||{price:0,name:h.name||"",color:tokColor(tk)};const price=t.price||0;const now=price*h.amount;const cost=(h.buyAvg||0)*h.amount;const pl=now-cost;return{tk,t,...h,now,pl,plPct:cost>0?(pl/cost)*100:0};});
 const total=rows.reduce((a,r)=>a+r.now,0), totalPl=rows.reduce((a,r)=>a+r.pl,0);
 const mask=v=>S.hideValue?"••••":v;
 return `<h1 class="h1">Portfolyo</h1>
  <div class="walletbar">${ringAvatar(S.wallet.address,shownTier(total,true))}
   <span class="mono fulladdr">${short(S.wallet.address)}</span>
   <button class="copy" data-act="copy">${S.copied?I.check:I.copy}${S.copied?"kopyalandı":"kopyala"}</button></div>
  <div class="total"><span class="total-label">toplam değer</span>
   <span class="mono total-value">${S.hideValue?"••••••":"$"+Math.round(total).toLocaleString()}</span>
   <span class="mono total-pl ${totalPl>=0?"up":"down"}">${S.hideValue?"gizli":`${totalPl>=0?"+":""}$${totalPl.toFixed(0)} toplam K/Z`}</span></div>
  <div class="holdings">${rows.map(r=>{const tier=tierFor(r.now);return `<div class="holding"><span class="dot" style="background:${r.t.color}"></span>
   <span class="hld-name"><span class="mono tk">$${r.tk}</span>${tier?`<span class="holdtier" style="color:${tier.color}" title="${tier.label}">${tier.label}${tier.emoji?" "+tier.emoji:""}</span>`:""}</span><span class="mono hamt">${S.hideValue?"••••":r.amount.toLocaleString()}</span>
   <span class="mono hval">${S.hideValue?"••••":"$"+r.now.toFixed(0)}</span>
   <span class="mono chg ${r.pl>=0?"up":"down"}">${S.hideValue?"••":`${r.pl>=0?"+":""}${r.plPct.toFixed(0)}%`}</span></div>`;}).join("")}</div>
  <div class="tierlegend">
    <span class="tl-title">Kademeler</span>
    ${TIERS.slice().reverse().map(t=>`<span class="tl-item"><span class="tl-dot" style="background:${t.color}"></span>${t.label}${t.emoji?" "+t.emoji:""} <span class="tl-range">${t.min>=100000?"$100K+":t.min>=10000?"$10K–100K":t.min>=1000?"$1K–10K":"$10–1K"}</span></span>`).join("")}
  </div>
  <p class="pf-settings-hint">Gizlilik ve rozet ayarları için ${I.gear} <button class="inline-link" data-act="nav" data-view="settings">Ayarlar</button></p>`;
}
function roomsView(){
 if(!S.connected)return gate("odaları görmek");
 const subtabs=`<div class="subtabs">
   <button class="subtab ${S.roomTab!=="create"?"on":""}" data-act="roomTab" data-tab="browse">${I.chat} Keşfet</button>
   <button class="subtab ${S.roomTab==="create"?"on":""}" data-act="roomTab" data-tab="create">${I.plus} Oda kur</button>
 </div>`;
 const body=S.roomTab==="create"?createRoomView():browseRoomsView();
 return `<h1 class="h1">Odalar</h1>${subtabs}${body}`;
}
function myRoomsView(){
 const mine=Object.keys(S.joined).filter(k=>S.joined[k]);
 if(!mine.length)return `<div class="norooms">${I.chat}<h3>Henüz bir odaya katılmadın</h3><p>Odalar'dan bir odaya katıl, buradan hızlıca erişirsin.</p><button class="norooms-btn" data-act="nav" data-view="rooms">Odaları keşfet →</button></div>`;
 const cards=mine.map(tk=>{
  const t=tokenBy(tk)||{name:"",color:tokColor(tk)}; const lp=livePrice(tk);
  const custom=isCustomRoom(tk); const room=S.customRooms.find(r=>r.ticker===tk);
  const mineCreator=room&&room.creator===myTag();
  return`<div class="roomcard">
    <div class="rc-click" data-act="openRoom" data-token="${tk}">
      <span class="tokenmark" style="background:${t.color}"></span>
      <div class="rc-body">
        <div class="rc-top"><span class="mono rc-tk">$${esc(tk)}</span>
          ${mineCreator?`<span class="creatorbadge">${I.badge} kurucun</span>`:custom?`<span class="pubbadge">${I.globe} herkese açık</span>`:`<span class="openbadge">${I.badge} holder</span>`}</div>
        <div class="rc-name">${t.name||""}</div>
        <div class="rc-meta"><span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span>${room?` · <span class="mono">${(room.members||0).toLocaleString()}${(room.cap||100)===Infinity?" üye · ∞":"/"+capLabel(room.cap||100)+" üye"}</span>`:""}</div>
      </div>
    </div>
    <button class="rc-leave" data-act="askLeave" data-token="${tk}" title="Odadan ayrıl">${I.exit}</button>
  </div>`;
 }).join("");
 return `<div class="section-label">${I.badge} Katıldığın odalar</div><div class="roomgrid">${cards}</div>
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
 if(!S.connected)return gate("profilini görmek");
 const target=S.view.wallet; // başka kullanıcı mı? (undefined ise kendim)
 const isMe=!target||target===myTag();
 if(isMe)return ownProfileView();
 return otherProfileView(target);
}
function ownProfileView(){
 const p=S.profile;
 const name=p.name||myTag();
 const myPosts=S.posts.filter(x=>x.mine||x.wallet===myTag());
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
     <button class="pf-edit-btn" data-act="openEditProfile">${I.edit} Profili düzenle</button>
   </div>
   <div class="pf-info">
     <div class="pf-nameline"><h1 class="pf-name">${esc(name)}</h1>${top&&top.tier?tierBadge(top.tier):""}</div>
     <div class="pf-addr mono">${short(S.wallet.address)} <button class="pf-copy" data-act="copy">${S.copied?I.check:I.copy}</button></div>
     ${p.bio?`<p class="pf-bio">${esc(p.bio)}</p>`:`<p class="pf-bio muted">Henüz bio yok. "Profili düzenle" ile ekle.</p>`}
     <div class="pf-meta">${I.badge}<span>${p.joined} tarihinde katıldı</span>${top?`<span class="pf-dot">·</span><span class="mono">${top.tier?top.tier.label:""} $${top.sym}</span>`:""}</div>
     <div class="pf-follows">
       <button class="pf-follow-stat"><b class="mono">${followingCount}</b> Takip</button>
       <button class="pf-follow-stat"><b class="mono">${S.followers}</b> Takipçi</button>
       <span class="pf-follow-stat"><b class="mono">${myRooms.length}</b> Oda</span>
       ${createdCount?`<span class="pf-follow-stat"><b class="mono">${createdCount}</b> Kurdu</span>`:""}
     </div>
   </div>
   <div class="subtabs pf-tabs">
     <button class="subtab ${tab==="posts"?"on":""}" data-act="profileTab" data-tab="posts">Paylaşımlar ${myPosts.length?`<span class="subtab-count">${myPosts.length}</span>`:""}</button>
     <button class="subtab ${tab==="rooms"?"on":""}" data-act="profileTab" data-tab="rooms">Odalar ${myRooms.length?`<span class="subtab-count">${myRooms.length}</span>`:""}</button>
   </div>
   ${tab==="posts"
     ? `<div class="posts">${myPosts.length?myPosts.map(postCard).join(""):`<p class="empty">Henüz paylaşım yok. Akış'tan ilk paylaşımını yap.</p>`}</div>`
     : `<div class="roomgrid">${myRooms.length?myRooms.map(tk=>{const t=tokenBy(tk)||{name:"",color:tokColor(tk)};const lp=livePrice(tk);const room=S.customRooms.find(r=>r.ticker===tk);const mineCreator=room&&room.creator===myTag();return`<div class="roomcard" data-act="openRoom" data-token="${tk}"><span class="tokenmark" style="background:${t.color}"></span><div class="rc-body"><div class="rc-top"><span class="mono rc-tk">$${esc(tk)}</span>${mineCreator?`<span class="creatorbadge">${I.badge} kurucun</span>`:`<span class="pubbadge">${I.globe} üye</span>`}</div><div class="rc-name">${t.name||""}</div><div class="rc-meta"><span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span></div></div><span class="rc-go">Gir →</span></div>`;}).join(""):`<p class="empty">Henüz bir odada değilsin.</p>`}</div>`}
   ${S.editProfile?editProfileModal():""}
   ${S.crop?cropModal():""}
 </div>`;
}
// başka bir kullanıcının profili (mock veri — gerçek kullanıcılar Supabase ile gelince gerçekleşir)
function messagesView(){
 if(!S.connected)return gate("mesajlarını görmek");
 const threads=S.dmThreads||[];
 return `<h1 class="h1">Mesajlar</h1>
   ${threads.length?`<div class="dmlist">${threads.map(function(t){
     const nm=S.names&&S.names[t.peer]?S.names[t.peer]:short(t.peer);
     const unread=S.unreadPeers&&S.unreadPeers[t.peer];
     return `<button class="dmlist-item ${unread?"unread":""}" data-act="openDM" data-wallet="${esc(t.peer)}">
       <span class="av md" style="${avatar(t.peer)}"></span>
       <div class="dmlist-info"><span class="dmlist-name">${esc(nm)}</span><span class="mono dmlist-addr">${short(t.peer)}</span><span class="dmlist-last">${esc((t.last||"").slice(0,50))}</span></div>
       ${unread?`<span class="dmlist-badge">1</span>`:`<span class="dmlist-arrow">›</span>`}
     </button>`;
   }).join("")}</div>`:`<div class="norooms">${I.send}<h3>Henüz mesajın yok</h3><p>Bir kullanıcının profiline gidip "Mesaj" ile sohbet başlatabilirsin.</p></div>`}`;
}
window.__holdxApplyThreads=function(threads){ S.dmThreads=threads||[]; render(); };
function dmView(peer){
 if(!S.connected)return gate("mesajlaşmak");
 const msgs=(S.dms&&S.dms[peer])||[];
 const nm=S.names&&S.names[peer]?S.names[peer]:short(peer);
 return `<div class="dmwrap">
   <div class="dm-head">
     <button class="dm-back" data-act="nav" data-view="messages">${I.back||"←"}</button>
     <span class="av sm" style="${avatar(peer)}"></span>
     <div class="dm-peer"><span class="dm-name">${esc(nm)}</span><span class="mono dm-addr">${short(peer)}</span></div>
   </div>
   <div class="dm-msgs" id="dmMsgs">
     ${msgs.length?msgs.map(function(m){
       const mine=S.wallet&&m.from_wallet===S.wallet.address;
       return `<div class="dm-msg ${mine?"mine":""}"><span class="dm-bubble">${esc(m.text||"")}</span></div>`;
     }).join(""):`<p class="dm-empty">Henüz mesaj yok. İlk mesajı sen gönder.</p>`}
   </div>
   <div class="dm-input"><input id="dmInput" placeholder="Mesaj yaz…" value="${esc(S.dmText||"")}" data-wallet="${esc(peer)}">
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
 // bu kullanıcının akıştaki paylaşımları
 const theirPosts=S.posts.filter(x=>x.wallet===wallet&&!(x.mine));
 // deterministik "sahte ama tutarlı" profil verisi (aynı cüzdan hep aynı görünür)
 let h=0;for(let i=0;i<wallet.length;i++)h=(h*131+wallet.charCodeAt(i))>>>0;
 const followers=0, following=0;
 const seed=wallet+"seed";
 const isFollowing=!!S.following[wallet];
 // bu kullanıcının en yüksek kademesi (paylaşımlarındaki tier'lardan tahmini)
 const anyTier=theirPosts.map(postTier).find(Boolean)||null;
 const bios=["degen & holder","sadece grafik izliyorum","erken alan geç satan","memecoin avcısı","holder gang","zincirde yaşıyorum",""];
 const bio=bios[h%bios.length];
 return `<div class="profilewrap">
   <div class="pf-cover"><!-- diğer kullanıcı, kapak yok --></div>
   <div class="pf-top">
     <div class="pf-avatar"><span class="pf-avatar-gen" style="${avatar(seed)}"></span></div>
     <div class="pf-actions">
       <button class="pf-follow-btn ${isFollowing?"following":""}" data-act="toggleFollow" data-wallet="${esc(wallet)}">${isFollowing?"Takiptesin":"Takip et"}</button>
       ${S.connected?`<button class="pf-follow-btn" data-act="openDM" data-wallet="${esc(wallet)}">${I.send} Mesaj</button>`:""}
     </div>
   </div>
   <div class="pf-info">
     <div class="pf-nameline"><h1 class="pf-name">${esc(wallet)}</h1>${anyTier?tierBadge(anyTier):""}</div>
     <div class="pf-addr mono">${esc(wallet)}…</div>
     ${bio?`<p class="pf-bio">${esc(bio)}</p>`:`<p class="pf-bio muted">Bu kullanıcı henüz bio eklememiş.</p>`}
     <div class="pf-meta">${I.badge}<span>HOLDX üyesi</span></div>
     <div class="pf-follows">
       <button class="pf-follow-stat"><b class="mono">${following}</b> Takip</button>
       <button class="pf-follow-stat"><b class="mono">${followers+(isFollowing?1:0)}</b> Takipçi</button>
     </div>
   </div>
   <div class="subtabs pf-tabs">
     <button class="subtab on">Paylaşımlar ${theirPosts.length?`<span class="subtab-count">${theirPosts.length}</span>`:""}</button>
   </div>
   <div class="posts">${theirPosts.length?theirPosts.map(postCard).join(""):`<p class="empty">Bu kullanıcının görünür paylaşımı yok.</p>`}</div>
 </div>`;
}
function editProfileModal(){
 const p=S.profile;
 return `<div class="overlay" data-act="closeEdit">
   <div class="editcard">
     <div class="edit-h"><strong>Profili düzenle</strong><button class="edit-x" data-act="closeEdit">${I.x}</button></div>
     <label class="edit-label">Görünen ad</label>
     <input class="edit-input" id="editName" value="${esc(p.name)}" placeholder="${myTag()}" maxlength="30">
     <label class="edit-label">Bio</label>
     <textarea class="edit-input" id="editBio" rows="3" placeholder="Kendini tanıt — degen misin, holder mı?" maxlength="160">${esc(p.bio)}</textarea>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeEdit">Vazgeç</button>
       <button class="edit-save" data-act="saveProfile">Kaydet</button>
     </div>
   </div>
 </div>`;
}
const ADMIN_WALLETS=["AFdRQtXzEqomxVbT21aXb8JoYpc93q6tFYnWmUkS8EQx"];
function isAdmin(){ return S.connected && S.wallet && ADMIN_WALLETS.includes(S.wallet.address); }
function leaderboardView(){
 // ADMIN: gerçek sıralamayı gör
 if(isAdmin()){
   const rows=(S.leaderboard||[]).slice(0,100);
   return `<div class="lbtable-wrap">
     <div class="lbtable-head">
       <div><h1 class="lbadmin-title">Sıralama <span class="lbadmin-tag">admin</span></h1>
       <p class="lbadmin-sub">Gerçek puan sıralaması · sadece sana görünür · ilk 100</p></div>
       <button class="lbadmin-export" data-act="exportLeaderboard">${I.wallet} CSV indir</button>
     </div>
     <table class="lbtable">
       <thead><tr><th class="lbt-rank">#</th><th class="lbt-user">Kullanıcı</th><th class="lbt-addr">Cüzdan</th><th class="lbt-pts">Puan</th></tr></thead>
       <tbody>
       ${rows.length?rows.map((r,i)=>{
         const nm=S.names&&S.names[r.wallet]?S.names[r.wallet]:short(r.wallet);
         return `<tr>
           <td class="lbt-rank">${i+1}</td>
           <td class="lbt-user">${esc(nm)}</td>
           <td class="lbt-addr mono">${short(r.wallet)}</td>
           <td class="lbt-pts mono">${r.total.toLocaleString()}</td>
         </tr>`;
       }).join(""):`<tr><td colspan="4" class="lbt-empty">Henüz puan kazanan kullanıcı yok.</td></tr>`}
       </tbody>
     </table>
   </div>`;
 }
 return `<div class="lbwrap">
   <div class="lb-hero">
     <div class="lb-badge">${I.trend}</div>
     <h1 class="lb-title">Sıralama yakında</h1>
     <p class="lb-sub">HOLDX'te aktif ol — paylaş, odalara katıl, oda kur, sohbet et. Aktifliğin arka planda değerlendiriliyor.</p>
     <div class="lb-teaser">
       <div class="lb-lock">${I.lock}</div>
       <div class="lb-teaser-txt"><strong>Sıralama henüz açık değil</strong><p>Erken ve gerçekten aktif kullanıcılar öne çıkacak. Sıralama açıldığında yerini burada göreceksin.</p></div>
     </div>
     <div class="lb-hints">
       <div class="lb-hint">${I.plus}<span>Oda kur</span></div>
       <div class="lb-hint">${I.chat}<span>Odalara katıl & sohbet et</span></div>
       <div class="lb-hint">${I.home}<span>Paylaşım yap</span></div>
       <div class="lb-hint">${I.badge}<span>Gerçek holder ol</span></div>
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
 terms:{title:"Kullanım Şartları",updated:"Son güncelleme: Temmuz 2025",body:[
  ["1. Kabul","HOLDX'i (\"Platform\") kullanarak bu Kullanım Şartları'nı kabul etmiş olursunuz. Şartları kabul etmiyorsanız Platform'u kullanmayınız."],
  ["2. Platform'un niteliği","HOLDX, kripto varlık sahiplerini (holder) bir araya getiren merkeziyetsiz bir sosyal platformdur. Platform bir borsa, cüzdan sağlayıcısı veya yatırım danışmanı DEĞİLDİR. Platform üzerinde görüntülenen fiyat ve piyasa verileri üçüncü taraf kaynaklardan gelir ve doğruluğu garanti edilmez."],
  ["3. Yatırım tavsiyesi değildir","Platform'daki hiçbir içerik, paylaşım, oda sohbeti veya veri yatırım tavsiyesi niteliği taşımaz. Kripto varlıklar yüksek risklidir ve değer kaybedebilir. Verdiğiniz tüm kararlardan yalnızca siz sorumlusunuz. Yatırım kararlarınızı vermeden önce kendi araştırmanızı yapın."],
  ["4. Cüzdan ve hesap","Platform'a cüzdanınızla bağlanırsınız. Cüzdanınızın, özel anahtarlarınızın ve işlemlerinizin güvenliğinden yalnızca siz sorumlusunuz. HOLDX özel anahtarlarınıza hiçbir zaman erişemez ve onları saklamaz."],
  ["5. Kullanıcı içeriği","Paylaştığınız içerikten (metin, görsel, mesaj) tamamen siz sorumlusunuz. Yasa dışı, dolandırıcılık amaçlı, nefret söylemi içeren, taciz edici veya başkalarının haklarını ihlal eden içerik paylaşmak yasaktır. HOLDX, bu tür içerikleri kaldırma hakkını saklı tutar."],
  ["6. Oda kurma ve ücretler","Oda kurmak için belirli bir ücret (ör. SOL cinsinden) ve ilgili tokenden asgari miktarda tutma şartı aranabilir. Ödenen ücretler, aksi belirtilmedikçe iade edilmez."],
  ["7. Puan ve ödüller","Platform'daki aktiviteye bağlı puan/ödül sistemleri tanıtım amaçlıdır; herhangi bir parasal değer garantisi vermez. Ödül kriterleri önceden haber verilmeksizin değiştirilebilir. Suistimal tespit edilen hesapların puanları iptal edilebilir."],
  ["8. Sorumluluk reddi","Platform \"olduğu gibi\" sunulur. HOLDX, kesintisiz veya hatasız çalışacağını garanti etmez. Platform kullanımından doğan doğrudan veya dolaylı zararlardan HOLDX sorumlu tutulamaz."],
  ["9. Değişiklikler","Bu şartlar zaman zaman güncellenebilir. Önemli değişiklikler Platform üzerinden duyurulur. Güncellemeden sonra Platform'u kullanmaya devam etmeniz, yeni şartları kabul ettiğiniz anlamına gelir."],
 ]},
 privacy:{title:"Gizlilik Politikası",updated:"Son güncelleme: Temmuz 2025",body:[
  ["1. Genel","Bu Gizlilik Politikası, HOLDX'in hangi verileri işlediğini açıklar."],
  ["2. Topladığımız veriler","HOLDX temel olarak cüzdan tabanlı çalışır. İşlenebilecek veriler: herkese açık cüzdan adresiniz, on-chain işlem/holding verileriniz (herkese açık blok zincirinden), Platform üzerinde oluşturduğunuz içerik (paylaşımlar, odalar, mesajlar) ve profil bilgileriniz (isim, bio, görsel). E-posta, telefon veya kimlik gibi kişisel bilgileri zorunlu tutmayız."],
  ["3. Verilerin kullanımı","Verileriniz; Platform'un çalışması, holder doğrulaması, rozet/kademe gösterimi ve topluluk özelliklerinin sağlanması için kullanılır. Verilerinizi izniniz olmadan üçüncü taraflara satmayız."],
  ["4. On-chain veriler herkese açıktır","Cüzdan adresiniz ve blok zinciri işlemleriniz doğası gereği herkese açıktır. Platform bu verileri gösterebilir. Mahremiyet için sağladığımız ayarlarla (ör. balina rozetini gizle, portfolyo değerini gizle) bazı bilgilerin görünürlüğünü kısabilirsiniz."],
  ["5. Üçüncü taraf servisler","Fiyat ve piyasa verileri için üçüncü taraf servislerden yararlanırız. Bu servislerin kendi gizlilik politikaları geçerlidir."],
  ["6. Çerezler ve yerel depolama","Platform, tercihlerinizi (ör. tema) hatırlamak için tarayıcı depolamasını kullanabilir."],
  ["7. Güvenlik","Verilerinizi korumak için makul önlemler alırız, ancak internet üzerinden hiçbir aktarımın %100 güvenli olmadığını unutmayın. Cüzdan güvenliğiniz sizin sorumluluğunuzdadır."],
  ["8. Haklarınız","Oluşturduğunuz içeriğe erişme ve onu silme talebinde bulunabilirsiniz. Cüzdan bağlantısını istediğiniz zaman kesebilirsiniz."],
  ["9. İletişim","Gizlilikle ilgili sorularınız için Platform üzerindeki geri bildirim kanalını kullanabilirsiniz."],
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
     <div class="edit-h"><strong>Geri bildirim gönder</strong><button class="edit-x" data-act="closeFeedback">${I.x}</button></div>
     <p class="fb-intro">Fikrin, hata bildirimin veya önerin mi var? Yaz, doğrudan bize ulaşsın.</p>
     <label class="edit-label">Konu</label>
     <input class="edit-input" id="fbSubject" placeholder="örn. Oda kurma hatası" maxlength="80">
     <label class="edit-label">Mesajın</label>
     <textarea class="edit-input" id="fbBody" rows="4" placeholder="Detayları buraya yaz…" maxlength="1000"></textarea>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeFeedback">Vazgeç</button>
       <button class="edit-save" data-act="sendFeedback">Gönder</button>
     </div>
   </div>
 </div>`;
}
function settingsView(){
 if(!S.connected)return gate("ayarlara erişmek");
 return `<h1 class="h1">Ayarlar</h1>
   <div class="set-group">
     <div class="set-group-title">Görünüm</div>
     <div class="settingcard">
       ${toggleRow("Karanlık mod","Açık ve koyu tema arasında geçiş yap.",S.theme==="dark","toggleTheme")}
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">Gizlilik</div>
     <div class="settingcard">
       ${toggleRow("Balina rozetimi gizle","Herkes seni sadece \"holder\" görür; balina/büyük holder kademen gizlenir.",S.hideWhale,"toggleHideWhale")}
       <div class="set-divider"></div>
       ${toggleRow("Portfolyo değerimi gizle","Toplam cüzdan değerin ve holding tutarların ekranda gizlenir.",S.hideValue,"toggleHideValue")}
       <div class="set-divider"></div>
       ${toggleRow("Aktivite akışında görünme","Oda kurma/katılma hareketlerin sağdaki canlı akışta görünmez.",S.hideActivity,"toggleHideActivity")}
       <div class="set-divider"></div>
       ${toggleRow("Profilim gizli olsun","Profilin başkalarına kapalı olur (yakında herkese açık moda geçebilirsin).",S.privateProfile,"togglePrivateProfile")}
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">Cüzdan</div>
     <div class="settingcard">
       <div class="set-wallet-row">
         <span class="av" style="${avatar(S.wallet.address)}"></span>
         <div class="set-wallet-info"><span class="mono">${short(S.wallet.address)}</span><span class="set-wallet-sub">${S.wallet.sol.toFixed(2)} ${S.wallet.solSymbol||"SOL"} · bağlı</span></div>
         <button class="set-disconnect" data-act="disconnect">Bağlantıyı kes</button>
       </div>
     </div>
   </div>
   <div class="set-group">
     <div class="set-group-title">Hakkında</div>
     <div class="settingcard">
       <button class="set-link-row" data-act="openDoc" data-doc="terms"><span>Kullanım şartları</span><span class="set-muted">→</span></button>
       <div class="set-divider"></div>
       <button class="set-link-row" data-act="openDoc" data-doc="privacy"><span>Gizlilik politikası</span><span class="set-muted">→</span></button>
       <div class="set-divider"></div>
       <button class="set-link-row" data-act="openFeedback"><span>Geri bildirim gönder</span><span class="set-muted">→</span></button>
     </div>
   </div>
   ${S.docOpen?docModal(S.docOpen):""}
   ${S.feedbackOpen?feedbackModal():""}`;
}
function browseRoomsView(){
 const qq=S.roomSearch.trim().toLowerCase();
 const match=(tk)=>{const t=tokenBy(tk)||{};return !qq||tk.toLowerCase().includes(qq)||(t.name||"").toLowerCase().includes(qq);};
 const customRooms=S.customRooms.filter(r=>match(r.ticker));
 const search=`<div class="roomsearch">${I.search}
   <input id="roomSearch" placeholder="oda ara — token adı veya ticker" value="${esc(S.roomSearch)}">
   ${S.roomSearch?`<button class="rs-clear" data-act="clearRoomSearch">✕</button>`:""}</div>`;
 const customCards=customRooms.map(r=>{
  const t=tokenBy(r.ticker)||{name:"",color:tokColor(r.ticker)}; const lp=livePrice(r.ticker); const joined=isJoined(r.ticker);
  const cap=r.cap||100; const unlimited=cap===Infinity; const full=!unlimited&&r.members>=cap; const pct=unlimited?0:Math.min(100,Math.round((r.members/cap)*100));
  return`<div class="roomcard" data-act="openRoom" data-token="${r.ticker}">
   <span class="tokenmark" style="background:${t.color}"></span>
   <div class="rc-body">
     <div class="rc-top"><span class="mono rc-tk">$${r.ticker}</span><span class="pubbadge">${I.globe} herkese açık</span>${full?`<span class="fulltag">${I.lock} dolu</span>`:""}</div>
     <div class="rc-name">${t.name||""}</div>
     <div class="rc-meta">kurucu ${esc(r.creator)} · <span class="mono ${lp.dir>=0?"up":"down"}">${fprice(lp.price)}</span></div>
     <div class="rc-capacity">
       ${unlimited
         ? `<span class="rc-capnum mono">${r.members.toLocaleString()} üye · <span class="rc-unlim">∞ sınırsız</span></span>`
         : `<div class="rc-capbar"><span class="rc-capfill ${full?"full":pct>=80?"high":""}" style="width:${pct}%"></span></div>
            <span class="rc-capnum mono">${r.members.toLocaleString()}/${capLabel(cap)} üye</span>`}
     </div>
   </div>
   ${joined?`<span class="joinedtag">${I.check} katıldın</span>`:full?`<span class="joinbtn disabled">Dolu</span>`:`<span class="joinbtn">Katıl</span>`}
  </div>`;
 }).join("");
 const body=customCards
   ? `<div class="section-label">${I.globe} Açık odalar — herkese açık</div><div class="roomgrid">${customCards}</div>`
   : (S.roomSearch
       ? `<p class="empty">"${esc(S.roomSearch)}" için oda bulunamadı. İlk odayı sen kurabilirsin.</p>`
       : `<div class="norooms">${I.chat}<h3>Henüz açık oda yok</h3><p>İlk odayı sen kur — herhangi bir token için, anlık fiyatıyla.</p><button class="norooms-btn" data-act="roomTab" data-tab="create">${I.plus} Oda kur</button></div>`);
 return `${search}${body}`;
}
function createResultsHtml(){
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
    <button class="pk-change" data-act="unpick">← başka token seç</button>
    ${exists?`<p class="mhint" style="color:var(--red)">$${esc(p.symbol)} için zaten bir oda var.</p>`:""}
  </div>`;
 }
 if(S.searching)return `<div class="searchstate">${I.search} aranıyor…</div>`;
 if(S.searchErr)return `<div class="searchstate err">${I.lock} Arama bağlanamadı. Önizleme penceresi dış API'yi engelliyor olabilir — kendi sitene deploy edince çalışır.</div>`;
 if(q.length<2)return `<p class="searchhint">En az 2 harf yaz — tüm ağlardaki tokenlar (yeni çıkanlar dahil) aranır.</p>`;
 if(!S.searchResults.length)return `<p class="searchhint">"${esc(q)}" için sonuç yok. Ticker'ı kontrol et.</p>`;
 return `<div class="resultlist">${S.searchResults.map((r,i)=>`
   <button class="resultrow" data-act="pickToken" data-i="${i}">
     <span class="tokenmark sm" style="background:${tokColor(r.symbol)}"></span>
     <div class="rr-body"><span class="rr-line"><span class="mono rr-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}</span><span class="rr-name">${esc(r.name)}${r.mc?` · mcap ${typeof r.mc==="number"?fmtMc(r.mc):r.mc}`:""}</span></div>
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
       <p class="ar-txt">Her cüzdan yalnızca <b>bir oda</b> kurabilir. Kurduğun oda aşağıda — istediğin zaman girebilirsin.</p>
       <div class="ar-card">
         <span class="tokenmark" style="background:${t.color}"></span>
         <div class="ar-info"><span class="mono ar-tk">$${esc(existing.ticker)}</span><span class="ar-meta">${(existing.members||0).toLocaleString()}${(existing.cap||100)===Infinity?" üye · ∞ sınırsız":"/"+capLabel(existing.cap||100)+" üye"} · kurucusu sensin</span></div>
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
    ${t.cap===Infinity?`<span class="cap-num">∞</span><span class="cap-lbl">sınırsız</span>`:`<span class="cap-num">${capLabel(t.cap)}</span><span class="cap-lbl">abone</span>`}
    <span class="cap-price ${t.price===0?"free":""}">${t.price===0?"Bedava":"$"+t.price}</span></button>`).join("");
 const canCreate=picked&&!exists;
 const btnLabel=sel.price===0?`Odayı kur — bedava`:`Öde ve kur — $${sel.price}`;
 return `<div class="createwrap">
  <div class="createhero">
   <div class="ch-ic">${I.plus}</div>
   <div><strong>Kendi odanı kur</strong><p>Token adını yaz, doğru olanı seç. Oda kurmak <b>bedava</b> — 100 aboneye kadar. Daha büyük topluluk istiyorsan kapasiteni yükselt. Her cüzdan <b>1 oda</b> kurabilir.</p></div>
  </div>
  <div class="mfield"><label class="mlabel">Hangi token için?</label>
   <div class="roomsearch"><span id="searchIco">${I.search}</span>
     <input class="searchinput" id="createTicker" placeholder="token adı veya ticker (örn. ansem, wif, bonk)" value="${esc(S.createTicker||"")}" maxlength="24" autocomplete="off" ${picked?"disabled":""}>
   </div>
   <div id="searchResults" class="searchresults">${createResultsHtml()}</div>
  </div>
  ${picked&&!exists?`
  <div class="mfield"><label class="mlabel">Kapasite seç</label>
    <div class="cap-grid">${capOptions}</div>
    <p class="cap-hint">${S.createCap===Infinity?"Sınırsız kapasite — odan hiç dolmaz, herkes katılabilir.":"Oda "+capLabel(S.createCap)+" aboneye ulaşınca dolar. İstediğin zaman sonradan da yükseltebilirsin."}</p>
  </div>
  ${(function(){
    const hvc=holdingUsd(picked.symbol,picked.price);
    if(hvc.usd<10){
      return `<div class="room-fullbox" style="margin-top:4px">${I.lock} Oda kurmak için cüzdanında en az <b>$10</b> değerinde $${esc(picked.symbol)} tutman gerekiyor.<br>Şu an: <span class="mono">$${hvc.usd.toFixed(2)}</span></div>`;
    }
    return `<button class="createsubmit" data-act="payCreate">${sel.price===0?I.plus:I.wallet} ${btnLabel}</button>
    <p class="create-fine">Cüzdanında $${hvc.usd.toFixed(2)} değerinde $${esc(picked.symbol)} var. ${sel.price===0?"Oda kurulunca otomatik katılırsın.":"Ödeme cüzdanından onaylanır."}</p>`;
  })()}
  `:""}
 </div>`;
}
function roomView(ticker){
 const t=tokenBy(ticker)||{t:ticker,name:"",price:0,chg:0,color:tokColor(ticker)};
 const custom=isCustomRoom(ticker);
 if(!S.connected)return gate("$"+ticker+" odasına girmek");
 // bu token için henüz oda yoksa: kurmaya yönlendir
 if(!custom)return `<button class="back" data-act="nav" data-view="rooms">← Odalar</button>
   <div class="norooms">${I.chat}<h3>$${ticker} için henüz oda yok</h3><p>İlk odayı sen kurabilirsin — anlık fiyatıyla, herkese açık.</p><button class="norooms-btn" data-act="createFor" data-token="${ticker}">${I.plus} $${ticker} odası kur</button></div>`;
 const room=S.customRooms.find(r=>r.ticker===ticker);
 // katılım ekranı: katılmadan sohbet GÖRÜNMEZ
 if(!isJoined(ticker)){
  const lp=livePrice(ticker);
  const cap=room?room.cap||100:100; const full=room?room.members>=cap:false;
  return `<button class="back" data-act="nav" data-view="rooms">← Odalar</button>
   <div class="joinscreen">
     <span class="tokenmark xl" style="background:${t.color}"></span>
     <h2 class="mono join-tk">$${ticker}</h2>
     <p class="join-name">${t.name||""}</p>
     <div class="join-stats">
       <div><span class="js-v mono">${fprice(lp.price)}</span><span class="js-l">fiyat</span></div>
       <div><span class="js-v mono ${t.chg>=0?"up":"down"}">${t.chg>=0?"+":""}${t.chg}%</span><span class="js-l">24s</span></div>
       <div><span class="js-v mono">${(room?room.members:0).toLocaleString()}${cap===Infinity?"":"/"+capLabel(cap)}</span><span class="js-l">üye</span></div>
     </div>
     <div class="join-lockinfo">${I.globe} Herkese açık oda · kurucu ${esc(room.creator)}</div>
     ${(function(){
       if(full) return `<div class="room-fullbox">${I.lock} Bu oda dolu (${capLabel(cap)}/${capLabel(cap)}). Kurucunun kapasiteyi yükseltmesi gerekiyor.</div>`;
       const hv=holdingUsd(ticker);
       const enough=hv.usd>=MIN_HOLD_USD;
       if(!enough){
         return `<div class="room-fullbox">${I.lock} Bu odaya katılmak için cüzdanında en az <b>$${MIN_HOLD_USD}</b> değerinde $${esc(ticker)} tutman gerekiyor.<br>Şu an: <span class="mono">$${hv.usd.toFixed(2)}</span></div>`;
       }
       return `<button class="joinbig" data-act="joinRoom" data-token="${ticker}">Odaya katıl</button>
       <p class="join-hint">Cüzdanında $${hv.usd.toFixed(2)} değerinde $${esc(ticker)} var · katılabilirsin.</p>`;
     })()}
   </div>`;
 }
 const msgs=S.chat[ticker]||[];
 const lp=livePrice(ticker);
 return `<div class="roompane"><div class="roomhead"><button class="back" data-act="nav" data-view="rooms">←</button>
   <span class="tokenmark sm" style="background:${t.color}"></span><span class="mono tk">$${ticker}</span>
   <span class="roommeta">${I.globe} ${(room?room.members:0).toLocaleString()}${(room?room.cap:100)===Infinity?" üye · ∞":"/"+capLabel(room?room.cap||100:100)+" üye"}</span>
   <div class="livepricebox">
     <span class="lp-live"><span class="pulse"></span>CANLI</span>
     <span class="lp-price mono" id="lpPrice">${fprice(lp.price)}</span>
     <span class="lp-chg mono ${t.chg>=0?"up":"down"}" id="lpChg">${t.chg>=0?"+":""}${t.chg}%</span>
   </div>
   <div class="roommenu-wrap">
     <button class="room-share" data-act="toggleRoomMenu" title="Diğer">${I.dots}</button>
     ${S.roomMenu===ticker?`<div class="roommenu" data-emoji-pop>
       <button class="roommenu-item" data-act="shareRoom" data-token="${ticker}">${I.share} Odayı paylaş</button>
       ${room&&room.creator===myTag()&&nextTiers(room.cap||100).length?`<button class="roommenu-item" data-act="openUpgrade" data-token="${ticker}">${I.trend} Kapasite yükselt</button>`:""}
       <button class="roommenu-item danger" data-act="askLeave" data-token="${ticker}">${I.exit} Odadan ayrıl</button>
     </div>`:""}
   </div>
   </div>
  ${S.leaveConfirm===ticker?leaveConfirmModal(ticker):""}
  ${S.deleteConfirm===ticker?deleteConfirmModal(ticker):""}
  ${S.upgradeOpen===ticker?upgradeModal(ticker):""}
  <div class="messages" id="messages">${msgs.map(m=>{
    const tier=msgTier(m,ticker);
    return `<div class="msg ${m.mine?"mine":""}">
   ${ringAvatar(m.wallet+ticker,tier,"sm")}
   <div><button class="${nameCls(m.wallet,m.mine)} msgwallet pf-link" data-act="openProfile" data-wallet="${esc(m.wallet)}">${esc(displayName(m.wallet,m.mine))}${tier?tierBadge(tier):""}${m.creator?`<span class="msgcreator">kurucu</span>`:""}</button>
   ${m.text?`<p>${esc(m.text)}</p>`:""}${m.media?`<img class="msg-media zoomable" src="${m.media}" alt="" data-act="zoom" data-src="${m.media}">`:""}</div></div>`;}).join("")}</div>
  ${S.chatMedia?`<div class="chatmediaprev"><img src="${S.chatMedia}" alt=""><button class="media-x" data-act="clearChatMedia">${I.x}</button></div>`:""}
  <div class="chat-tools">
    <button class="tool-b ${S.emojiFor==="chat"?"on":""}" data-act="toggleEmoji" data-target="chat" title="Emoji">${I.smile}</button>
    <button class="tool-b ${S.gifFor==="chat"?"on":""}" data-act="toggleGif" data-target="chat" title="GIF">${I.gif}</button>
    <button class="tool-b" data-act="pickPhoto" data-target="chat" title="Fotoğraf">${I.image}</button>
    <div class="tool-pop up">${S.emojiFor==="chat"?emojiPicker("chat"):""}${S.gifFor==="chat"?gifPicker("chat"):""}</div>
  </div>
  <div class="chatinput"><input id="chatInput" placeholder="$${ticker} odasına yaz…" data-token="${ticker}" value="${esc(S.chatText||"")}">
   <button data-act="sendChat" data-token="${ticker}">${I.send}</button></div>
  ${S.shareOpen===ticker?shareModal(ticker):""}</div>`;
}
function gate(what){return`<div class="gate">${I.wallet}<h2>${what} için cüzdanını bağla</h2>
 <p>Her şey cüzdanınla çalışır. Şifre yok, e-posta yok — sadece cüzdanın.</p>
 <button class="connect big" data-act="connect">Cüzdan bağla</button></div>`;}

function modalView(){
 if(!S.createDone)return"";
 const tk=S.createDone;
 return`<div class="toast"><span class="toast-ic">${I.check}</span>
   <div class="toast-txt"><strong>$${tk} odası kuruldu</strong><span>kurucu rozetin hazır · otomatik katıldın</span></div>
   <button class="toast-go" data-act="goNewRoom" data-token="${tk}">Odaya git →</button></div>`;
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
 if(!S.connected)return gate("odalarını görmek");
 return `<h1 class="h1">Odalarım</h1>
   <p class="sub">Katıldığın ve kurduğun odalar burada.</p>
   ${myRoomsView()}`;
}
// paylaşımı paylaşma penceresi
function postShareModal(){
 const p=S.posts.find(x=>x.id===S.sharePostId); if(!p)return "";
 const link=`https://holdx.app/post/${p.id}`;
 const who=displayName(p.wallet,p.mine);
 const snippet=(p.text||"").slice(0,80)+((p.text||"").length>80?"…":"");
 const tweet=`${snippet ? '"'+snippet+'" ':""}HOLDX'te gör 👉 ${link}`;
 const xUrl=`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
 return `<div class="overlay" data-act="closePostShare">
   <div class="editcard">
     <div class="edit-h"><strong>Paylaşımı paylaş</strong><button class="edit-x" data-act="closePostShare">${I.x}</button></div>
     <div class="sharepreview"><span class="mono sp-who">${esc(who)}</span><p class="sp-txt">${esc(snippet||"(medya)")}</p></div>
     <div class="share-linkbox"><span class="mono share-link">${link}</span><button class="share-copy" data-act="copyPostLink" data-id="${p.id}">${S.copied?I.check:I.copy}${S.copied?" kopyalandı":" kopyala"}</button></div>
     <div class="share-opts">
       <a class="share-opt x" href="${xUrl}" target="_blank" rel="noopener">${I.twitter}<span>X'te paylaş</span></a>
     </div>
   </div>
 </div>`;
}
// oda paylaşma penceresi: link kopyala + X'te paylaş + akışta paylaş
function roomLink(ticker){return `https://holdx.app/room/${encodeURIComponent(ticker)}`;}
function leaveConfirmModal(ticker){
 return `<div class="overlay" data-act="closeLeave">
   <div class="editcard confirm">
     <div class="confirm-ic">${I.exit}</div>
     <strong class="confirm-title">$${esc(ticker)} odasından ayrıl</strong>
     <p class="confirm-txt">Bu odadan ayrılmak istediğine emin misin? İstediğin zaman tekrar katılabilirsin.</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeLeave">Vazgeç</button>
       <button class="confirm-leave" data-act="leaveRoom" data-token="${esc(ticker)}">Odadan ayrıl</button>
     </div>
   </div>
 </div>`;
}
function deleteConfirmModal(ticker){
 return `<div class="overlay" data-act="closeDelete">
   <div class="editcard confirm">
     <div class="confirm-ic">${I.trash}</div>
     <strong class="confirm-title">$${esc(ticker)} odasını sil</strong>
     <p class="confirm-txt">Odanı kalıcı olarak silmek üzeresin. Tüm sohbet ve üyeler kaybolur, bu geri alınamaz. Sildikten sonra yeni bir oda kurabilirsin.</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeDelete">Vazgeç</button>
       <button class="confirm-leave" data-act="deleteRoom" data-token="${esc(ticker)}">Odayı sil</button>
     </div>
   </div>
 </div>`;
}
function upgradeModal(ticker){
 const room=S.customRooms.find(r=>r.ticker===ticker); if(!room)return "";
 const cur=room.cap||100;
 const opts=nextTiers(cur).map(t=>`<button class="cap-opt ${t.cap===Infinity?"unlimited":""}" data-act="doUpgrade" data-token="${esc(ticker)}" data-cap="${t.cap}">
    ${t.cap===Infinity?`<span class="cap-num">∞</span><span class="cap-lbl">sınırsız</span>`:`<span class="cap-num">${capLabel(t.cap)}</span><span class="cap-lbl">abone</span>`}
    <span class="cap-price">$${t.price}</span></button>`).join("");
 return `<div class="overlay" data-act="closeUpgrade">
   <div class="editcard">
     <div class="edit-h"><strong>Kapasite yükselt</strong><button class="edit-x" data-act="closeUpgrade">${I.x}</button></div>
     <p class="fb-intro">$${esc(ticker)} odası şu an <b>${capLabel(cur)}</b> abone kapasiteli. Daha büyük bir kademe seç:</p>
     <div class="cap-grid">${opts}</div>
     <p class="create-fine" style="margin-top:12px">Ödeme cüzdanından onaylanır. Yeni kapasite anında geçerli olur.</p>
   </div>
 </div>`;
}
function shareModal(ticker){
 const t=tokenBy(ticker)||{name:""};
 const link=roomLink(ticker);
 const tweet=`$${ticker} odasına HOLDX'te katıl 👉 ${link}`;
 const xUrl=`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
 return `<div class="overlay" data-act="closeShare">
   <div class="editcard">
     <div class="edit-h"><strong>$${esc(ticker)} odasını paylaş</strong><button class="edit-x" data-act="closeShare">${I.x}</button></div>
     <p class="fb-intro">Bu odayı başkalarıyla paylaş — link ile herkes katılabilir.</p>
     <div class="share-linkbox"><span class="mono share-link">${link}</span><button class="share-copy" data-act="copyRoomLink" data-token="${esc(ticker)}">${S.copied?I.check:I.copy}${S.copied?" kopyalandı":" kopyala"}</button></div>
     <div class="share-opts">
       <a class="share-opt x" href="${xUrl}" target="_blank" rel="noopener">${I.twitter}<span>X'te paylaş</span></a>
       <button class="share-opt feed" data-act="shareToFeed" data-token="${esc(ticker)}">${I.home}<span>Akışta paylaş</span></button>
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
   // profil (cüzdan/isim) araması — Supabase
   if(window.__holdxSearchProfiles){
     window.__holdxSearchProfiles(q).then(function(profs){
       if(S.topSearch===my){ S.topProfiles=profs||[]; renderTopDrop(); }
     });
   }
   try{const res=await tokenSearch(q);
     if(S.topSearch===my){S.topResults=res;S.topSearching=false;renderTopDrop();}
   }catch(e){if(S.topSearch===my){S.topResults=[];S.topSearching=false;renderTopDrop();}}
 },350);
}
function renderTopDrop(){
 const box=document.getElementById("topSearchDrop");
 if(box)box.innerHTML=topSearchResultsHtml();
}
function topSearchResultsHtml(){
 const q=(S.topSearch||"").trim();
 if(q.length<2)return `<div class="sd-hint">En az 2 harf yaz — token ya da cüzdan ara.</div>`;
 const ql=q.toLowerCase();
 // gerçek profil eşleşmeleri (Supabase) + mevcut içerikteki cüzdanlar
 const profs=(S.topProfiles||[]).slice(0,4);
 const wallets=knownWallets().filter(w=>w.toLowerCase().includes(ql)).slice(0,3);
 const tokens=S.topResults.slice(0,8);
 let html="";
 if(profs.length){
   html+=`<div class="sd-cat">Kullanıcılar</div>`+profs.map(p=>{
     const nm=(p.display_name&&p.display_name.trim())?p.display_name:short(p.wallet);
     return `<button class="sd-row" data-act="openProfile" data-wallet="${esc(p.wallet)}">
       ${p.avatar?`<img class="av xs" src="${p.avatar}" alt="">`:`<span class="av xs" style="${avatar(p.wallet)}"></span>`}<span class="sd-w">${esc(nm)}</span><span class="mono sd-type">${short(p.wallet)}</span></button>`;
   }).join("");
 }
 if(wallets.length){
   html+=`<div class="sd-cat">Cüzdanlar</div>`+wallets.map(w=>`<button class="sd-row" data-act="openProfile" data-wallet="${esc(w)}">
     <span class="av xs" style="${avatar(w+"seed")}"></span><span class="mono sd-w">${esc(w)}</span><span class="sd-type">profil</span></button>`).join("");
 }
 // ODA eşleşmeleri
 const rooms=S.customRooms.filter(r=>r.ticker.toLowerCase().includes(ql)).slice(0,4);
 if(rooms.length){
   html+=`<div class="sd-cat">Odalar</div>`+rooms.map(r=>`<button class="sd-row" data-act="openRoom" data-token="${esc(r.ticker)}">
     <span class="tokenmark xs" style="background:${tokColor(r.ticker)}"></span><span class="mono sd-tk">$${esc(r.ticker)}</span><span class="sd-type">${(r.members||0)} üye · oda</span></button>`).join("");
 }
 html+=`<div class="sd-cat">Tokenlar</div>`;
 if(S.topSearching)html+=`<div class="sd-hint">${I.search} aranıyor…</div>`;
 else if(!tokens.length)html+=`<div class="sd-hint">"${esc(q)}" için token yok.</div>`;
 else html+=tokens.map((r,i)=>`<button class="sd-row" data-act="pickTopToken" data-i="${i}">
     <span class="tokenmark xs" style="background:${tokColor(r.symbol)}"></span>
     <span class="mono sd-tk">$${esc(r.symbol)}</span>${chainBadge(r.chain)}<span class="sd-name">${esc(r.name)}</span>
     <span class="mono sd-price ${r.chg>=0?"up":"down"}">${fprice(r.price)}</span></button>`).join("");
 return html;
}
function welcomeScreen(){
 return `<div class="welcome" data-theme="${S.theme}">
   <div class="wc-bg"></div>
   <button class="wc-theme" data-act="toggleTheme">${S.theme==="dark"?I.sun:I.moon}</button>
   <div class="wc-inner">
     <div class="wc-logo"><span class="logo lg"></span></div>
     <h1 class="wc-brand">${BRAND}</h1>
     <p class="wc-tag">${TAGLINE}</p>
     <p class="wc-desc">Holder'ların buluştuğu yer. Cüzdanını bağla, tuttuğun coin'lerin odalarına gir, gerçek holder'larla konuş. Bot yok, sahte hesap yok — sadece cüzdanın konuşur.</p>
     <div class="wc-actions">
       <button class="wc-connect" data-act="connect">${I.wallet} Cüzdan bağla</button>
       <button class="wc-explore" data-act="enterExplore">Önce keşfet →</button>
     </div>
     <div class="wc-feats">
       <div class="wc-feat">${I.badge}<span>Doğrulanmış holder rozetleri</span></div>
       <div class="wc-feat">${I.chat}<span>Token bazlı sohbet odaları</span></div>
       <div class="wc-feat">${I.globe}<span>Tüm ağlar — SOL, ETH, Base & daha fazlası</span></div>
     </div>
   </div>
 </div>`;
}
function render(){
 const app=document.getElementById("app");
 app.setAttribute("data-theme",S.theme);
 // ilk açılış: karşılama ekranı (bir kez, "keşfet" ya da "cüzdan bağla" seçilene kadar)
 if(!S.entered&&!S.connected){app.innerHTML=welcomeScreen();return;}
 app.innerHTML=`
  <header class="top"><button class="brand" data-act="nav" data-view="feed"><span class="logo"></span><span class="word">${BRAND}</span><span class="betatag">beta</span></button>
   <div class="search"><span class="search-ic">${I.search}</span><input id="topSearch" placeholder="token, cüzdan veya \$ticker ara" value="${esc(S.topSearch)}" autocomplete="off">${S.topSearch?`<button class="search-clear" data-act="clearTopSearch">${I.x}</button>`:""}
     ${S.topSearchOpen?`<div class="search-dropdown" id="topSearchDrop">${topSearchResultsHtml()}</div>`:""}
   </div>
   <div class="top-right">
     <button class="themebtn" data-act="toggleTheme" title="${S.theme==="dark"?"Aydınlık mod":"Karanlık mod"}">${S.theme==="dark"?I.sun:I.moon}</button>
     ${S.connected?`<button class="idbtn" data-act="nav" data-view="portfolio"><span class="av" style="${avatar(S.wallet.address)}"></span><span class="mono">${short(S.wallet.address)}</span><span class="solbal">${S.wallet.sol.toFixed(2)} ${S.wallet.solSymbol||"SOL"}</span></button>`
      :`<button class="connect" data-act="connect">Cüzdan bağla</button>`}
   </div></header>
  <div class="shell">
   <nav class="rail">${NAV.map(n=>`<button class="navbtn ${navActive(n[0])?"on":""}" data-act="nav" data-view="${n[0]}"><span class="icn">${I[n[2]]}</span><span>${n[1]}</span>${n[0]==="messages"&&S.unreadDM>0?`<span class="nav-badge">${S.unreadDM}</span>`:""}</button>`).join("")}
    <div class="rail-foot"><p class="tag">${TAGLINE}</p></div></nav>
   <main class="main">${mainView()}</main>
   ${activityPanel()}
  </div>
  <nav class="bottom">${NAV.map(n=>`<button class="${navActive(n[0])?"on":""}" data-act="nav" data-view="${n[0]}">${I[n[2]]}${n[0]==="messages"&&S.unreadDM>0?`<span class="nav-badge sm">${S.unreadDM}</span>`:""}</button>`).join("")}</nav>
  ${modalView()}
  ${S.lightbox?`<div class="lightbox" data-act="closeZoom"><button class="lb-close" data-act="closeZoom">${I.x}</button><img src="${S.lightbox}" alt=""></div>`:""}
  <button class="scrolltop" data-act="scrollTop" title="En üste dön">↑</button>`;
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
 const tsi=document.getElementById("topSearch");
 if(tsi&&S.topSearchOpen){tsi.focus();tsi.setSelectionRange(tsi.value.length,tsi.value.length);}
 const cmi=document.getElementById("commentInput");
 if(cmi&&S.commentText){cmi.focus();cmi.setSelectionRange(cmi.value.length,cmi.value.length);}
 if(S.crop)setupCropper();
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
  else { console.log("Privy henüz hazır değil"); }
}
// Privy giriş yapınca React bunu çağırır; gerçek cüzdan adresini HOLDX'e verir
// Supabase'den paylasimlari yukle ve akisa ekle
window.__holdxApplyMemberships=function(tickers){
  if(!tickers) return;
  tickers.forEach(function(t){ S.joined[t]=true; });
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
  S.customRooms = mapped;
  render();
  // yeni odalarin fiyatlarini hemen cek
  if(typeof refreshTokenPrices==="function"){ refreshTokenPrices(); }
};
window.__holdxApplyPosts=function(rows){
  if(!rows || !rows.length) return;
  const mapped=rows.map(function(r){
    return {id:r.id, wallet:r.wallet, mine:(S.wallet&&r.wallet===S.wallet.address), token:r.token||null, verified:false, time:"", text:r.text||"", media:r.media||null, likes:r.likes||0, replies:r.replies||0, reposts:r.reposts||0, liked:false};
  });
  // mevcut demo postlarin ustune gercek postlari koy (en yeni ustte)
  S.posts = mapped.concat(S.posts.filter(function(p){return !mapped.find(function(m){return m.id===p.id;});}));
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
          render();
        }
      });
    }
  } else {
    S.connected=false; S.wallet=null;
    S.profile={name:"", bio:"", avatar:null, cover:null, joined:"Tem 2025"};
  }
  render();
};
// Profili Supabase'e kaydet (React tarafindan saglanir)
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
 if(S.topSearchOpen&&!e.target.closest(".search")){S.topSearchOpen=false;render();}
 if(S.roomMenu&&!e.target.closest(".roommenu-wrap")){S.roomMenu=null;render();}
 // emoji/gif popover'ı dışarı tıklayınca kapat (araç butonları ve popover içi hariç)
 if((S.emojiFor||S.gifFor)&&!e.target.closest("[data-emoji-pop]")&&!e.target.closest('[data-act="toggleEmoji"]')&&!e.target.closest('[data-act="toggleGif"]')&&!e.target.closest('[data-act="pickEmoji"]')&&!e.target.closest('[data-act="pickGif"]')){S.emojiFor=null;S.gifFor=null;render();}
 const el=e.target.closest("[data-act]"); if(!el)return;
 const a=el.dataset.act;
 if(a==="closeModalBg"&&el!==e.target)return;
 if(a==="connect"){S.entered=true;connect();}
 else if(a==="enterExplore"){S.entered=true;S.view={name:"feed",token:null};render();}
 else if(a==="pickTopToken"){const r=S.topResults[+el.dataset.i];if(r){upsertToken(r);S.view={name:"token",token:r.symbol};S.topSearch="";S.topSearchOpen=false;S.topResults=[];}render();}
 else if(a==="openDM"){const w=el.dataset.wallet;S.view={name:"dm",peer:w};if(S.unreadPeers&&S.unreadPeers[w]){delete S.unreadPeers[w];S.unreadDM=Math.max(0,(S.unreadDM||0)-1);}if(window.__holdxLoadDMs){window.__holdxLoadDMs(w);}render();}
 else if(a==="sendDM"){sendDM(el.dataset.wallet);}
 else if(a==="exportLeaderboard"){
   const rows=(S.leaderboard||[]).slice(0,100);
   let csv="sira,cuzdan,isim,puan\n";
   rows.forEach(function(r,i){ const nm=(S.names&&S.names[r.wallet]?S.names[r.wallet]:"").replace(/,/g," "); csv+=(i+1)+","+r.wallet+","+nm+","+r.total+"\n"; });
   const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
   const url=URL.createObjectURL(blob);
   const a2=document.createElement("a"); a2.href=url; a2.download="holdx-siralama.csv";
   document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
   setTimeout(function(){URL.revokeObjectURL(url);},1000);
 }
 else if(a==="clearTopSearch"){S.topSearch="";S.topSearchOpen=false;S.topResults=[];render();}
 else if(a==="shareRoom"){S.shareOpen=el.dataset.token;S.roomMenu=null;render();}
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
   S.posts.unshift({id:Date.now(),wallet:myTag(),mine:true,token:tk,verified:holds(tk),time:"şimdi",text:`$${tk} odasına katılın! 👇 ${roomLink(tk)}`,media:null,likes:0,replies:0,reposts:0,liked:false});
   S.shareOpen=null;S.view={name:"feed",token:null};render();}
 else if(a==="nav"){const v=el.dataset.view;
   if(v==="rooms"){S.view={name:"rooms",token:null};S.roomTab="browse";}
   else S.view={name:v,token:null};
   if(v==="messages"&&window.__holdxLoadThreads){window.__holdxLoadThreads();}
   render();}
 else if(a==="openToken"){S.view={name:"token",token:el.dataset.token};render();}
 else if(a==="openRoom"){S.view={name:"room",token:el.dataset.token};if(window.__holdxLoadMessages){window.__holdxLoadMessages(el.dataset.token);}render();}
 else if(a==="joinRoom"){const t=el.dataset.token;
   // güvenlik: sadece katılabilecekse (holder ya da topluluk odası)
   if(canJoin(t)&&!S.joined[t]){S.joined[t]=true;
     const room=S.customRooms.find(r=>r.ticker===t); if(room)room.members+=1;
     if(window.__holdxJoinRoom && S.wallet){ window.__holdxJoinRoom(t, S.wallet.address, room?room.members:1); }
     const tk=tokenBy(t); pushActivity("join",t,tk&&tk.chain);
     award("joinRoom",{once:"join:"+t}); // oda başına 1 kez
     // kalite: kurucuya "odana katılım" bonusu (kendi odana katılım hariç)
     if(room&&room.creator!==myTag())award("roomJoinedBonus",{once:"joinbonus:"+t+":"+myTag()});
   }
   render();}
 else if(a==="clearRoomSearch"){S.roomSearch="";render();}
 else if(a==="setFilter"){S.filter=el.dataset.token;S.feedDrop=false;render();}
 else if(a==="toggleFeedDrop"){S.feedDrop=!S.feedDrop;S.feedSearch="";render();}
 else if(a==="closeFeedDrop"){S.feedDrop=false;render();}
 else if(a==="pickFilter"){S.filter=el.dataset.token;S.feedDrop=false;S.feedSearch="";S.feedResults=[];render();}
 else if(a==="pickFeedToken"){const r=S.feedResults[+el.dataset.i];if(r){upsertToken(r);S.filter=r.symbol;S.feedDrop=false;S.feedSearch="";S.feedResults=[];}render();}
 else if(a==="openResult"){const r=S.exploreResults[+el.dataset.i];if(r){upsertToken(r);S.view={name:"token",token:r.symbol};S.exploreSearch="";S.exploreResults=[];}render();}
 else if(a==="createFor"){const sym=el.dataset.token;const t=tokenBy(sym);
   S.view={name:"rooms",token:null};S.roomTab="create";
   if(t)S.picked={symbol:t.t,name:t.name,price:t.price,chg:t.chg,mc:t.mc,address:t.address||""};
   S.createTicker="";S.searchResults=[];render();}
 else if(a==="filterToken"){S.filter=el.dataset.token;S.view={name:"feed",token:null};render();}
 else if(a==="like"){const id=+el.dataset.id;let becameLiked=false;
   S.posts=S.posts.map(p=>{if(p.id===id){becameLiked=!p.liked;return{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)};}return p;});
   // KALİTE: beğeni ALAN kişi puan alır (kendi postunu beğenmek hariç, post başına 1 kez)
   const post=S.posts.find(p=>p.id===id);
   if(becameLiked&&post&&(post.mine||post.wallet===myTag())===false){/* başkasının postunu beğendik: yazara puan gerçek sürümde */}
   if(becameLiked&&post&&(post.mine||post.wallet===myTag())){/* kendi postumuz: puan yok */}
   render();}
 else if(a==="openPost"){S.prevView=S.view;S.view={name:"post",id:+el.dataset.id,token:null};S.commentText="";render();}
 else if(a==="back"){S.view=S.prevView||{name:"feed",token:null};S.prevView=null;render();}
 else if(a==="zoom"){S.lightbox=el.dataset.src;render();}
 else if(a==="closeZoom"){if(el.classList.contains("lightbox")||el.classList.contains("lb-close")||e.target.closest(".lb-close")){S.lightbox=null;render();}}
 else if(a==="scrollTop"){window.scrollTo({top:0,behavior:"smooth"});const main=document.querySelector(".main");if(main)main.scrollTo({top:0,behavior:"smooth"});}
 else if(a==="sharePost"){S.sharePostId=+el.dataset.id;render();}
 else if(a==="copyAddr"){const addr=el.dataset.addr;
   (navigator.clipboard?navigator.clipboard.writeText(addr):Promise.reject()).then(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);}).catch(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);});}
 else if(a==="closePostShare"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.sharePostId=null;render();}}
 else if(a==="copyPostLink"){const link="https://holdx.app/post/"+el.dataset.id;
   (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);}).catch(()=>{S.copied=true;render();setTimeout(()=>{S.copied=false;render();},1400);});}
 else if(a==="repost"){const id=+el.dataset.id;
   S.posts=S.posts.map(p=>{if(p.id===id){const on=!p.reposted;return{...p,reposted:on,reposts:(p.reposts||0)+(on?1:-1)};}return p;});
   render();}
 else if(a==="sendComment"){const id=+el.dataset.id;
   const inp=document.getElementById("commentInput");
   const txt=(inp?inp.value:S.commentText||"").trim(); if(!txt)return;
   S.posts=S.posts.map(p=>{if(p.id===id){
     const comments=[...(p.comments||[]),{wallet:myTag(),text:txt,time:"şimdi",tier:shownTier(p.token?holdingUsd(p.token).usd:0,true)}];
     return{...p,comments,replies:(p.replies||0)+1};
   }return p;});
   award("comment",{capKey:"comment"}); // yorum puanı (günlük tavan)
   S.commentText="";render();}
 else if(a==="publish"){
  const ta=document.getElementById("composerText");
  const txt=(ta?ta.value:S.composerText||"").trim();
  if(!txt&&!S.postMedia)return; // en az metin veya medya olmalı
  const pt=S.postToken; // opsiyonel bağlı token
  if(pt)upsertToken(pt);
  const newPost={id:Date.now(),wallet:myTag(),mine:true,token:pt?pt.symbol:null,verified:pt?holds(pt.symbol):false,time:"şimdi",text:txt,media:S.postMedia,likes:0,replies:0,reposts:0,liked:false};
  S.posts.unshift(newPost);
  // Supabase'e kaydet
  if(window.__holdxSavePost && S.connected && S.wallet){
    window.__holdxSavePost({ wallet:S.wallet.address, text:txt, token:pt?pt.symbol:null, media:S.postMedia||null });
  }
  award("post",{capKey:"post"}); // günlük tavan
  S.postToken=null;S.postSearchOpen=false;S.postSearch="";S.postResults=[];S.postMedia=null;S.composerText="";S.emojiFor=null;S.gifFor=null;
  render();
 }
 else if(a==="toggleEmoji"){const t=el.dataset.target;S.emojiFor=S.emojiFor===t?null:t;S.gifFor=null;render();}
 else if(a==="toggleGif"){const t=el.dataset.target;S.gifFor=S.gifFor===t?null:t;S.emojiFor=null;S.gifQuery="";render();}
 else if(a==="pickEmoji"){const e2=el.dataset.emoji,t=el.dataset.target;
   if(t==="post")S.composerText=(S.composerText||"")+e2; else S.chatText=(S.chatText||"")+e2;
   render();}
 else if(a==="pickGif"){const t=el.dataset.target,g=el.dataset.gif;
   // demo GIF = emoji görsel yer tutucu (dataURL üretmiyoruz, işaretliyoruz)
   const gif="gif:"+g;
   if(t==="post"){S.postMedia=gifDataUrl(g);S.gifFor=null;} else {S.chatMedia=gifDataUrl(g);S.gifFor=null;}
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
 else if(a==="disconnect"){if(window.__privyLogout){window.__privyLogout();}S.connected=false;S.wallet=null;S.view={name:"feed",token:null};render();}
 else if(a==="noop"){/* placeholder link */}
 else if(a==="openDoc"){S.docOpen=el.dataset.doc;render();}
 else if(a==="closeDoc"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x")){S.docOpen=null;render();}}
 else if(a==="openFeedback"){S.feedbackOpen=true;render();}
 else if(a==="closeFeedback"){if((el.classList.contains("overlay")&&e.target===el)||e.target.closest(".edit-x,.edit-cancel")){S.feedbackOpen=false;render();}}
 else if(a==="sendFeedback"){
   const sub=(document.getElementById("fbSubject")||{}).value||"";
   const body=(document.getElementById("fbBody")||{}).value||"";
   if(!body.trim()){return;}
   const subject=encodeURIComponent("[HOLDX geri bildirim] "+sub);
   const cuzdan=S.connected?myTag():"bağlı değil";
   const mailBody=encodeURIComponent(body+"\n\n— — —\nCüzdan: "+cuzdan+"\nHOLDX beta");
   window.location.href=`mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${mailBody}`;
   S.feedbackOpen=false;render();
 }
 else if(a==="toggleTheme"){S.theme=S.theme==="dark"?"light":"dark";render();}
 else if(a==="profileTab"){S.profileTab=el.dataset.tab;render();}
 else if(a==="openProfile"){const w=el.dataset.wallet;S.view={name:"profile",token:null,wallet:w};S.profileTab="posts";render();}
 else if(a==="toggleFollow"){const w=el.dataset.wallet;S.following[w]=!S.following[w];render();}
 else if(a==="openEditProfile"){S.editProfile=true;render();}
 else if(a==="closeEdit"){
   // overlay'in kendisine, X butonuna ya da Vazgeç'e basıldıysa kapat (SVG'ye basılsa da çalışsın)
   const onOverlay=el.classList.contains("overlay")&&e.target===el;
   const onBtn=!!e.target.closest(".edit-x,.edit-cancel");
   if(onOverlay||onBtn){const n=document.getElementById("editName"),b=document.getElementById("editBio");if(n)S.profile.name=n.value.trim();if(b)S.profile.bio=b.value.trim();S.editProfile=false;render();}
 }
 else if(a==="saveProfile"){const n=document.getElementById("editName"),b=document.getElementById("editBio");if(n)S.profile.name=n.value.trim();if(b)S.profile.bio=b.value.trim();S.editProfile=false;persistProfile();render();}
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
 else if(a==="pickToken"){const r=S.searchResults[+el.dataset.i];if(r){S.picked=r;S.searchResults=[];S.createCap=100;}render();}
 else if(a==="unpick"){S.picked=null;S.createTicker="";S.searchResults=[];render();}
 else if(a==="pickCap"){S.createCap=+el.dataset.cap;render();}
 else if(a==="payCreate"){
  const p=S.picked;
  if(!p||isCustomRoom(p.symbol))return;
  if(myRoom())return; // 1 cüzdan = 1 oda güvenlik kontrolü
  // oda kurmak icin o tokenden en az $10 tutma sarti
  const hvc=holdingUsd(p.symbol,p.price);
  if(hvc.usd<MIN_HOLD_USD){ S.createHoldError=true; render(); return; }
  S.createHoldError=false;
  const tier=tierForCap(S.createCap);
  const q=p.symbol;
  upsertToken(p);
  S.livePrices[q]={price:p.price,dir:0};
  // demo başlangıç üye sayısı: kapasitenin bir kısmı dolu görünsün (canlılık)
  const seedMembers=1;
  S.customRooms.unshift({ticker:q,creator:myTag(),members:seedMembers,cap:tier.cap,createdAt:"şimdi",address:p.address});
  if(window.__holdxSaveRoom && S.connected && S.wallet){
    window.__holdxSaveRoom({ ticker:q, creator:S.wallet.address, members:seedMembers, cap:(tier.cap===Infinity?2000000000:tier.cap), address:p.address||null, chain:p.chain||"solana" });
  }
  S.joined[q]=true;
  pushActivity("create",q,p.chain);
  award("createRoom",{capKey:"createRoom",once:"createroom:"+q});
  if(!(S.chat[q]||[]).length)S.chat[q]=[{wallet:myTag(),verified:holds(q),creator:true,mine:true,text:`$${q} odasına hoş geldiniz! 🎉`}];
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
 if(e.target.id==="composerText"){S.composerText=e.target.value;} // sadece state, re-render yok (focus korunur)
 if(e.target.id==="chatInput"){S.chatText=e.target.value;}
 if(e.target.id==="dmInput"){S.dmText=e.target.value;}
 if(e.target.id==="gifSearch"){S.gifQuery=e.target.value;const box=document.querySelector(".gif-grid");if(box){const tmp=document.createElement("div");tmp.innerHTML=(S.gifFor?gifPicker(S.gifFor):"");const fresh=tmp.querySelector(".gif-grid");if(fresh)box.innerHTML=fresh.innerHTML;}}
 if(e.target.id==="editName"){S.profile.name=e.target.value;}
 if(e.target.id==="editBio"){S.profile.bio=e.target.value;}
 if(e.target.id==="topSearch"){const wasOpen=S.topSearchOpen;S.topSearch=e.target.value;S.topSearchOpen=true;if(!wasOpen){render();}scheduleTopSearch(e.target.value);}
 if(e.target.id==="commentInput"){S.commentText=e.target.value;}
});
function sendDM(peer){
 const inp=document.getElementById("dmInput"); const txt=(inp?inp.value:S.dmText||"").trim();
 if(!txt||!S.wallet)return;
 if(window.__holdxSendDM){ window.__holdxSendDM({from_wallet:S.wallet.address,to_wallet:peer,text:txt}); }
 S.dmText=""; render();
}
function sendChat(ticker){
 const inp=document.getElementById("chatInput"); const txt=(inp?inp.value:S.chatText||"").trim();
 if(!txt&&!S.chatMedia)return;
 const room=S.customRooms.find(r=>r.ticker===ticker);
 // Supabase'e yaz (gercek zamanli olarak herkese gider, kendimize de geri doner)
 if(window.__holdxSendMessage && S.wallet){
   window.__holdxSendMessage({ ticker:ticker, wallet:S.wallet.address, text:txt||null, media:S.chatMedia||null });
 } else {
   // baglanti yoksa yerel goster
   S.chat[ticker]=[...(S.chat[ticker]||[]),{wallet:myTag(),verified:holds(ticker),creator:room&&room.creator===myTag(),text:txt,media:S.chatMedia,mine:true}];
 }
 award("comment",{capKey:"comment"});
 S.chatText="";S.chatMedia=null;S.emojiFor=null;S.gifFor=null;
 render();
}
// Supabase'den gelen mesaji akisa ekle (gercek zamanli veya gecmis)
window.__holdxAddMessage=function(m){
 const arr=S.chat[m.ticker]||[];
 // ayni id varsa ekleme (cift onleme)
 if(m.id && arr.find(function(x){return x.id===m.id;})) return;
 const room=S.customRooms.find(function(r){return r.ticker===m.ticker;});
 arr.push({ id:m.id, wallet:m.wallet, verified:false, creator:room&&room.creator===m.wallet, text:m.text||"", media:m.media||null, mine:(S.wallet&&m.wallet===S.wallet.address) });
 S.chat[m.ticker]=arr;
 render();
};
window.__holdxSetMessages=function(ticker,rows){
 if(!rows) return;
 const room=S.customRooms.find(function(r){return r.ticker===ticker;});
 S.chat[ticker]=rows.map(function(m){
   return { id:m.id, wallet:m.wallet, verified:false, creator:room&&room.creator===m.wallet, text:m.text||"", media:m.media||null, mine:(S.wallet&&m.wallet===S.wallet.address) };
 });
 render();
};
// ============ SESSİZ PUAN MOTORU (airdrop için) ============
// Değerler GİZLİ (kullanıcı görmez), dengeli + suistimal korumalı.
// Kurallar:
//  - Her eylemin puanı farklı; günlük tavan + tek-seferlik + kalite bonusu var.
//  - Puan kazanmak için holder olmak (en az $10 değerinde token) gerekir → sybil zorlaşır.
//  - Hiçbir görsel geri bildirim yok; toplam S.pts'te sessizce birikir.
const PTS={
 createRoom:10,   // oda kur (değerli ama günde sınırlı)
 joinRoom:1,      // odaya katıl (oda başına 1 kez)
 post:1,          // paylaşım (günlük tavan)
 comment:1,       // yorum/mesaj (günlük tavan)
 likeGiven:0,     // beğeni vermek puan getirmez (spam olurdu)
 receivedLike:1,  // KALİTE: paylaşımın beğeni alırsa
 roomJoinedBonus:2 // KALİTE: kurduğun odaya biri katılırsa kurucuya
};
const PTS_DAILY_CAP={createRoom:20, post:5, comment:8}; // günlük puan tavanları
function _today(){const d=new Date();return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();}
function _resetDayIfNeeded(){const t=_today();if(S.ptsDayKey!==t){S.ptsDayKey=t;S.ptsDay={};}}
// puan ekle (sessiz). once:key verilirse tek-seferlik. capKey verilirse günlük tavana tabi.
function award(kind,opts={}){
 if(!S.connected)return;
 // holder şartı: en az $10 değerinde bir token tutmalı (yoksa puan yok)
 const holdsSomething=Object.keys(S.wallet.holdings||{}).some(sym=>holdingUsd(sym).usd>=10);
 if(!holdsSomething)return;
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
// Supabase'den gelen toplam puani uygula
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
     <div class="edit-h"><strong>${isCover?"Kapak fotoğrafını ayarla":"Profil fotoğrafını ayarla"}</strong><button class="edit-x" data-act="closeCrop">${I.x}</button></div>
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
     <p class="crop-hint">Sürükleyerek kaydır · kaydıraçla yakınlaştır</p>
     <div class="edit-actions">
       <button class="edit-cancel" data-act="closeCrop">Vazgeç</button>
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
// gizli dosya seçici ile cihazdan fotoğraf al → dataURL (önizleme)
function triggerPhoto(target){
 const inp=document.createElement("input");
 inp.type="file"; inp.accept="image/*";
 inp.onchange=()=>{const f=inp.files&&inp.files[0]; if(!f)return;
   const r=new FileReader(); r.onload=()=>{ if(target==="post")S.postMedia=r.result; else S.chatMedia=r.result; S.emojiFor=null;S.gifFor=null; render(); };
   r.readAsDataURL(f);};
 inp.click();
}
document.addEventListener("keydown",e=>{
 if(e.target.id==="chatInput"&&e.key==="Enter"){e.preventDefault();sendChat(e.target.dataset.token);}
 if(e.target.id==="dmInput"&&e.key==="Enter"){e.preventDefault();sendDM(e.target.dataset.wallet);}
 if(e.target.id==="commentInput"&&e.key==="Enter"){e.preventDefault();const id=+e.target.dataset.id;
   const txt=e.target.value.trim();if(!txt)return;
   S.posts=S.posts.map(p=>{if(p.id===id){const comments=[...(p.comments||[]),{wallet:myTag(),text:txt,time:"şimdi",tier:shownTier(p.token?holdingUsd(p.token).usd:0,true)}];return{...p,comments,replies:(p.replies||0)+1};}return p;});
   S.commentText="";render();}
});

// canlı fiyat: oda açıkken token fiyatını güncelle

// odadaki canlı fiyat:
//  - kontrat adresi olan (kullanıcı odaları) → DexScreener'dan GERÇEK fiyat
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

render();

// canlı fiyatları arka planda çek (elle yazılı örnek fiyatların yerine gerçek veri)
refreshTokenPrices();
setInterval(refreshTokenPrices,60000);

// "en üste dön" butonunu sadece aşağı kayınca göster
function updateScrollTop(){
 const btn=document.querySelector(".scrolltop"); if(!btn)return;
 const main=document.querySelector(".main");
 const y=Math.max(window.scrollY||0,(main?main.scrollTop:0));
 btn.classList.toggle("show",y>500);
}
window.addEventListener("scroll",updateScrollTop,{passive:true});
document.addEventListener("scroll",e=>{if(e.target.classList&&e.target.classList.contains("main"))updateScrollTop();},{passive:true,capture:true});

// DEMO: ara sıra sahte oda aktivitesi düşür (akış canlı hissi versin).
// Gerçek sürümde bu akış Supabase'den gerçek zamanlı gelir.
const DEMO_WALLETS=["7Qm4vK","Bx91Lp","9fKq2m","Kp02aa","3tRw8k","Vp5tK1","Mn8qW2","Ax7pL9","Qz1vN4","Dk3mR7"];
const DEMO_TOKENS=[["ANSEM","solana"],["WIF","solana"],["PEPE","ethereum"],["BONK","solana"],["EIGEN","ethereum"],["POPCAT","solana"],["MOODENG","solana"],["BRETT","base"],["PENGU","solana"]];
// Gerçek aktivite akışı: React/Supabase realtime'dan gelir (window.__holdxPushActivity)
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
