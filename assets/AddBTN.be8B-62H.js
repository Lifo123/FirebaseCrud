import{j as c}from"./jsx-runtime.CdUEbdov.js";import{r as n}from"./index.YZ_XhM9s.js";import{J as t}from"./_astro-entry_sonner.BrdQ6kbN.js";import{r as u,d,g as i,s as m}from"./firebase.Dkp7b64R.js";import"./index.CTAGWh-w.js";function b(){const a=async()=>{let e=o();if(e[0].value===""||e[1].value===""||e[2].value===""){t.dismiss(),t.error("Please fill all the fields");return}try{const r=u(d,`products/${e[0].value}`),s=await i(r);if(await m(r,{name:e[0].value,price:Number(e[1].value),stock:Number(e[2].value),createAt:new Date().getTime()}),s.exists()){t.dismiss(),t.success("Product Updated",{duration:1e3});return}}catch{t.dismiss(),t.error("Error adding product");return}t.dismiss(),t.success("Product added successfully")},o=()=>{const e=document.querySelector('[name="name"]'),r=document.querySelector('[name="price"]'),s=document.querySelector('[name="stock"]');return[e,r,s]};return n.useEffect(()=>{o().forEach(r=>{r?.addEventListener("keydown",s=>{s.key==="Enter"&&a()})})},[]),c.jsx("span",{className:"btn f-row btn-blue br-6 w-max mt-2 f-justify-self-end",onClick:a,children:"Add Product"})}export{b as default};
