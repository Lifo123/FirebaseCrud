import{j as i}from"./jsx-runtime.CdUEbdov.js";import{a as g,u as d}from"./index.Cd4NzlIq.js";import{r as m}from"./index.YZ_XhM9s.js";import{D as u,G as h,H as S,r as p,g as w}from"./index.esm2017.enH01Utu.js";import{g as b}from"./Hashing.Co_4HAtW.js";const x=typeof window<"u",l={gameState:{word:"",salt:"",guess:"",valid:[{char:"",isValid:null},{char:"",isValid:null},{char:"",isValid:null},{char:"",isValid:null},{char:"",isValid:null}],status:"inProgress"},gameSettings:{WordLength:5,Tries:3,Language:"ES",DicLength:926}},c=g(x?JSON.parse(localStorage.getItem("F-Shuffle")||JSON.stringify(l)):l),y=(e,o)=>{let t=e.split(""),r=o.split("").reduce((a,s)=>a+s.charCodeAt(0),0);for(let a=t.length-1;a>0;a--){const s=(r+a)%t.length;[t[a],t[s]]=[t[s],t[a]]}return{word:e,shuffle:t.join("")}},j=e=>Math.floor(Math.random()*((e||100)+1)),G=(e,o)=>{e.endsWith("/")&&(e=e.slice(0,-1));const t=e.split("/");let r=c.get(),a=r;for(let s=1;s<t.length;s++){const n=t[s];s===t.length-1?a[n]=o:(a[n]||(a[n]={}),a=a[n])}localStorage.setItem(t[0],JSON.stringify(r))},D={apiKey:"AIzaSyAwmC0jcBFmuMxYJaGS1wjdiuOSPYYSZWo",authDomain:"dictionaries-15fdf.firebaseapp.com",databaseURL:"https://dictionaries-15fdf-default-rtdb.firebaseio.com",projectId:"dictionaries-15fdf",storageBucket:"dictionaries-15fdf.appspot.com",messagingSenderId:"250956565323",appId:"1:250956565323:web:494f59d70d787ecc7c36ce",measurementId:"G-S3KRN2E2FZ"},f=u(D),W=h(f);S(f);const N=async(e,o)=>{try{const t=p(W,`${e}/gameDefault/d${o}`),a=(await w(t)).val(),s=j(a.length);return a[s]}catch(t){throw console.log("Error fetching word:",t),t}};function I(){const e=d(c);return{getWord:async()=>{try{const t=b(),r=await N(e.gameSettings.Language,e.gameSettings.WordLength),a=y(r,t);G("F-Shuffle/gameState/word",a.shuffle),c.set({...e,gameState:{...e.gameState,word:a.shuffle,salt:t}})}catch(t){console.log(t)}}}}function B(){const e=d(c),o=I();return m.useEffect(()=>{e.gameState.word===""&&e.gameState.salt===""&&o.getWord()},[]),i.jsxs("section",{className:"game-container f-col g-2 mt-5 mx-auto",children:[i.jsx("div",{className:"game-board f-row g-2 mx-auto",children:e?.gameState?.valid.map((t,r)=>i.jsx("span",{className:"box-in br-6","data-state":t.isValid,children:t.char},r))}),i.jsx("span",{className:"btn btn-blue br-6 w-max mt-5",onClick:()=>{o.getWord()},children:"Ver Word"})]})}export{B as default};
