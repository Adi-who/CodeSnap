import React,{useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import {toPng} from "html-to-image";
import {Code2,Download,Copy,Check,Sun,Moon,RotateCcw,Sparkles,SlidersHorizontal} from "lucide-react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus,dracula,oneDark,oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import "./styles.css";

const themes={Midnight:vscDarkPlus,Dracula:dracula,"One Dark":oneDark,"One Light":oneLight};
const backgrounds={Aurora:"linear-gradient(135deg,#111827 0%,#312e81 45%,#0f766e 100%)",Ocean:"linear-gradient(135deg,#0f172a,#0c4a6e,#164e63)",Sunset:"linear-gradient(135deg,#451a03,#9a3412,#701a75)",Mono:"linear-gradient(135deg,#111827,#374151,#111827)"};
const starter=`function greet(name) {
  const message = \`Hello, \${name}! 👋\`;
  console.log(message);
}

greet("Aditya");`;

function App(){
 const [code,setCode]=useState(starter),[language,setLanguage]=useState("javascript"),[theme,setTheme]=useState("Midnight"),[bg,setBg]=useState("Aurora");
 const [title,setTitle]=useState("codesnap.js"),[padding,setPadding]=useState(42),[radius,setRadius]=useState(18),[fontSize,setFontSize]=useState(15),[dark,setDark]=useState(true),[copied,setCopied]=useState(false);
 const card=useRef(null);
 const exportPng=async()=>{if(!card.current)return;const data=await toPng(card.current,{pixelRatio:2,cacheBust:true});const a=document.createElement("a");a.download="codesnap.png";a.href=data;a.click()};
 const copyImage=async()=>{if(!card.current)return;const blob=await (await fetch(await toPng(card.current,{pixelRatio:2}))).blob();try{await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);setCopied(true);setTimeout(()=>setCopied(false),1600)}catch{exportPng()}};
 const reset=()=>{setCode(starter);setLanguage("javascript");setTheme("Midnight");setBg("Aurora");setTitle("codesnap.js");setPadding(42);setRadius(18);setFontSize(15)};
 return <div className={dark?"app":"app light"}>
  <header className="topbar"><div className="brand"><div className="logo"><Code2 size={21}/></div><div><b>CodeSnap</b><span>beautiful code, captured.</span></div></div>
   <div className="actions"><button className="ghost" onClick={reset}><RotateCcw size={16}/> Reset</button><button className="icon" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button></div>
  </header>
  <main className="workspace">
   <aside className="panel editor"><div className="panelhead"><span><Code2 size={15}/> Editor</span><select value={language} onChange={e=>setLanguage(e.target.value)}><option>javascript</option><option>typescript</option><option>jsx</option><option>css</option><option>html</option><option>python</option><option>json</option></select></div>
    <textarea spellCheck="false" value={code} onChange={e=>setCode(e.target.value)} aria-label="Code editor"/>
    <div className="editorfoot">
  <span>{code.split("\n").length} lines</span>
  <span>CodeSnap</span>
</div>
   </aside>
   <section className="previewwrap"><div className="previewhead"><div><span className="eyebrow"><Sparkles size={14}/> LIVE PREVIEW</span><h1>Turn code into a statement.</h1></div><div className="export"><button className="secondary" onClick={copyImage}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?"Copied":"Copy"}</button><button className="primary" onClick={exportPng}><Download size={16}/> Export PNG</button></div></div>
    <div className="canvas"><div ref={card} className="codecard" style={{background:backgrounds[bg],padding,borderRadius:radius}}>
      <div className="shot" style={{borderRadius:Math.max(8,radius-5)}}><div className="shotbar"><div className="dots"><i/><i/><i/></div><input value={title} onChange={e=>setTitle(e.target.value)} aria-label="Filename"/><span className="lang">{language}</span></div>
       <SyntaxHighlighter language={language} style={themes[theme]} customStyle={{margin:0,padding:"28px 30px",fontSize,lineHeight:1.65,background:"transparent",fontFamily:"'JetBrains Mono',monospace",minHeight:220}}>{code}</SyntaxHighlighter>
      </div>
     </div></div>
   </section>
   <aside className="panel controls"><div className="panelhead"><span><SlidersHorizontal size={15}/> Customize</span></div>
    <Control label="Theme"><div className="chips">{Object.keys(themes).map(x=><button className={theme===x?"chip active":"chip"} onClick={()=>setTheme(x)} key={x}>{x}</button>)}</div></Control>
    <Control label="Background"><div className="chips">{Object.keys(backgrounds).map(x=><button className={bg===x?"chip active":"chip"} onClick={()=>setBg(x)} key={x}>{x}</button>)}</div></Control>
    <Range label="Padding" value={padding} min={18} max={70} onChange={setPadding} suffix="px"/>
    <Range label="Corner radius" value={radius} min={8} max={34} onChange={setRadius} suffix="px"/>
    <Range label="Font size" value={fontSize} min={12} max={20} onChange={setFontSize} suffix="px"/>
    <div className="tip"><Sparkles size={15}/><span><b>Pro tip</b> Use short snippets with a clear idea. Your screenshot becomes easier to read and share.</span></div>
   </aside>
  </main>
  <footer>Built for developers · <b>CodeSnap</b> · ADITYA KUMAR</footer>
 </div>
}
function Control({label,children}){return <div className="control"><label>{label}</label>{children}</div>}
function Range({label,value,min,max,onChange,suffix}){return <div className="control"><div className="rangehead"><label>{label}</label><span>{value}{suffix}</span></div><input type="range" min={min} max={max} value={value} onChange={e=>onChange(+e.target.value)}/></div>}
createRoot(document.getElementById("root")).render(<App/>);