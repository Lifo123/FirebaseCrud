import{j as e}from"./jsx-runtime.CdUEbdov.js";import{a as t,u as i}from"./index.Cd4NzlIq.js";import{r}from"./index.YZ_XhM9s.js";const o=typeof window<"u";t(o?localStorage.getItem("DMstate")==="true":!1);const l=t(o?JSON.parse(localStorage.getItem("F-User")||"{}"):{});function u(){const[a,n]=r.useState(!1),s=i(l),c=()=>{localStorage.removeItem("F-User"),window.location.reload()};return r.useEffect(()=>{s?.user&&n(!0)},[]),e.jsx("div",{className:"f-row g-2 f-center",children:a?e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"fw-500",children:s.user}),e.jsx("span",{className:"btn btn-red br-6 fs-1",onClick:c,children:"Log out"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"btn btn-blue br-6 fs-1",onClick:()=>{window.location.href="/Games/Login"},children:"Login"}),e.jsx("span",{className:"btn btn-br br-6 fs-1",onClick:()=>{window.location.href="/Games/Register"},children:"Register"})]})})}export{u as default};