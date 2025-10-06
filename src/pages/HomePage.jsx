import React, { useState } from 'react';
import './HomePage.css';

const chatResponses = [
   "Tervetuloa eBike Serviceen!",
   "Meiltä löytyy kaikki sähköpyörät!",
   "Akun vaihto onnistuu nopeasti ja turvallisesti.",
   "Voit vaihtaa vanhan pyöräsi uuteen helposti.",
   "Kysy lisää sähköpyörien huollosta!",
];

export default function HomePage() {
   const [chatHistory, setChatHistory] = useState([
     { sender: "bot", text: "Tervetuloa eBike Serviceen!" }
   ]);
   const [input, setInput] = useState("");

   const handleSend = () => {
     if (input.trim() === "") return;
     const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
     setChatHistory([...chatHistory, { sender: "user", text: input }, { sender: "bot", text: response }]);
     setInput("");
   };

   return (
     <div className="ebike-home">
       <header className="ebike-header">
         <h1>eBike Service</h1>
         <p className="ebike-tagline">Sähköpyörien asiantuntija – huolto, akun vaihto, päivitykset ja tuunaukset</p>
       </header>
       <section className="ebike-hero">
         <div className="ebike-flash">
           <span role="img" aria-label="salama">⚡</span>
           <h2>SALAMOIVA Akun Vaihto</h2>
           <p>Energiaa ja tehoa – vaihdamme akut nopeasti ja turvallisesti!</p>
         </div>
         <div className="ebike-sparkle">
           <span role="img" aria-label="säkenöinti">✨</span>
           <h2>Säkenöivä Pyöränvaihto</h2>
           <p>Vaihda vanha sähköpyöräsi uuteen – modernit moottorit, huippuakku ja parempi ajomukavuus!</p>
         </div>
         <div className="ebike-feature-list">
           <ul>
             <li>Moottorin diagnostiikka</li>
             <li>Akun optimointi & vaihto</li>
             <li>Ohjausyksikön päivitys</li>
             <li>Kiekkojen ja renkaiden huolto</li>
             <li>Sähköjärjestelmän vianetsintä</li>
           </ul>
         </div>
       </section>
       <section className="ebike-chat-section">
         <h3>247 eBike Chat</h3>
         <div className="ebike-chatbox">
           {chatHistory.map((msg, idx) => (
             <div key={idx} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
           ))}
         </div>
         <div className="ebike-chat-input">
           <input
             type="text"
             value={input}
             placeholder="Kysy sähköpyöristä..."
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleSend()}
           />
           <button onClick={handleSend}>Lähetä</button>
         </div>
       </section>
     </div>
   );
}