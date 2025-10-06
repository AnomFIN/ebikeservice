import React, { useState, useEffect } from 'react';
import './HomePage.css';

const chatResponses = [
   "Tervetuloa eBike Serviceen!",
   "Meiltä löytyy kaikki sähköpyörät!",
   "Akun vaihto onnistuu nopeasti ja turvallisesti.",
   "Voit vaihtaa vanhan pyöräsi uuteen helposti.",
   "Kysy lisää sähköpyörien huollosta!",
];

// Customer reviews for the slider
const customerReviews = [
  { name: "Mikko Virtanen", rating: 5, text: "Erinomainen huolto! Pyöräni toimii kuin uusi.", date: "15.03.2024" },
  { name: "Anna Korhonen", rating: 5, text: "Nopea ja ammattitaitoinen palvelu. Suosittelen!", date: "10.03.2024" },
  { name: "Jari Mäkelä", rating: 4, text: "Hyvä hinta-laatusuhde. Tyytyväinen asiakaspalveluun.", date: "05.03.2024" },
  { name: "Laura Saarinen", rating: 5, text: "Diagnostiikka-arvio oli täsmällinen. Kiitos!", date: "28.02.2024" },
  { name: "Petri Heinonen", rating: 5, text: "Live-seuranta huollossa oli loistava ominaisuus!", date: "22.02.2024" }
];

// Bikes for comparison
const bikes = [
  { id: 1, name: "City E-Bike Pro", motor: "250W Bosch", battery: "500Wh", range: "120km", price: "2499€" },
  { id: 2, name: "Mountain E-Bike X", motor: "500W Shimano", battery: "625Wh", range: "100km", price: "3299€" },
  { id: 3, name: "Folding E-Bike Compact", motor: "250W", battery: "400Wh", range: "80km", price: "1799€" }
];

export default function HomePage() {
   const [chatHistory, setChatHistory] = useState([
     { sender: "bot", text: "Tervetuloa eBike Serviceen!" }
   ]);
   const [input, setInput] = useState("");
   
   // Navigation state
   const [activeNav, setActiveNav] = useState("home");
   
   // Booking state
   const [bookingDate, setBookingDate] = useState("");
   const [bookingTime, setBookingTime] = useState("");
   const [bookingService, setBookingService] = useState("huolto");
   
   // Diagnostic state
   const [diagnosticInputs, setDiagnosticInputs] = useState({
     mileage: "",
     batteryHealth: "",
     motorNoise: "no"
   });
   const [diagnosticResult, setDiagnosticResult] = useState(null);
   
   // Comparison state
   const [selectedBikes, setSelectedBikes] = useState([]);
   
   // Service tracking state
   const [trackingId, setTrackingId] = useState("");
   const [serviceStatus, setServiceStatus] = useState(null);
   
   // Review slider state
   const [currentReview, setCurrentReview] = useState(0);
   
   // Quote popup state
   const [showQuotePopup, setShowQuotePopup] = useState(false);
   const [quoteForm, setQuoteForm] = useState({ name: "", email: "", message: "" });

   const handleSend = () => {
     if (input.trim() === "") return;
     const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
     setChatHistory([...chatHistory, { sender: "user", text: input }, { sender: "bot", text: response }]);
     setInput("");
   };

   // Handle booking submission
   const handleBookingSubmit = (e) => {
     e.preventDefault();
     alert(`Ajanvaraus vahvistettu!\n\nPäivä: ${bookingDate}\nKlo: ${bookingTime}\nPalvelu: ${bookingService}`);
   };

   // Calculate diagnostic result
   const calculateDiagnostic = () => {
     const mileage = parseInt(diagnosticInputs.mileage) || 0;
     const battery = parseInt(diagnosticInputs.batteryHealth) || 0;
     const hasNoise = diagnosticInputs.motorNoise === "yes";
     
     let cost = 50; // Base inspection
     let issues = [];
     
     if (mileage > 5000) {
       cost += 80;
       issues.push("Perushuolto suositeltava");
     }
     if (battery < 70) {
       cost += 150;
       issues.push("Akun vaihto suositeltava");
     }
     if (hasNoise) {
       cost += 100;
       issues.push("Moottorin diagnostiikka tarvitaan");
     }
     
     setDiagnosticResult({ cost, issues: issues.length > 0 ? issues : ["Pyörä hyvässä kunnossa!"] });
   };

   // Toggle bike comparison
   const toggleBikeComparison = (bikeId) => {
     if (selectedBikes.includes(bikeId)) {
       setSelectedBikes(selectedBikes.filter(id => id !== bikeId));
     } else if (selectedBikes.length < 3) {
       setSelectedBikes([...selectedBikes, bikeId]);
     }
   };

   // Track service
   const trackService = () => {
     if (!trackingId) return;
     const statuses = [
       { stage: "Vastaanotettu", progress: 25 },
       { stage: "Diagnostiikka", progress: 50 },
       { stage: "Korjaus käynnissä", progress: 75 },
       { stage: "Valmis noudettavaksi", progress: 100 }
     ];
     const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
     setServiceStatus(randomStatus);
   };

   // Auto-advance review slider
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentReview((prev) => (prev + 1) % customerReviews.length);
     }, 5000);
     return () => clearInterval(interval);
   }, []);

   // Show quote popup after delay
   useEffect(() => {
     const timer = setTimeout(() => {
       setShowQuotePopup(true);
     }, 10000);
     return () => clearTimeout(timer);
   }, []);

   // Handle quote submission
   const handleQuoteSubmit = (e) => {
     e.preventDefault();
     alert(`Kiitos tarjouspyynnöstä, ${quoteForm.name}! Otamme yhteyttä pian.`);
     setShowQuotePopup(false);
     setQuoteForm({ name: "", email: "", message: "" });
   };

   return (
     <div className="ebike-home">
       {/* Modern Navigation */}
       <nav className="ebike-nav">
         <div className="nav-logo">⚡ eBike Service</div>
         <div className="nav-buttons">
           <button className={activeNav === "home" ? "active" : ""} onClick={() => setActiveNav("home")}>Etusivu</button>
           <button className={activeNav === "booking" ? "active" : ""} onClick={() => setActiveNav("booking")}>Ajanvaraus</button>
           <button className={activeNav === "diagnostic" ? "active" : ""} onClick={() => setActiveNav("diagnostic")}>Diagnostiikka</button>
           <button className={activeNav === "compare" ? "active" : ""} onClick={() => setActiveNav("compare")}>Vertailu</button>
           <button className={activeNav === "tracking" ? "active" : ""} onClick={() => setActiveNav("tracking")}>Seuranta</button>
         </div>
       </nav>

       <header className="ebike-header">
         <h1>eBike Service</h1>
         <p className="ebike-tagline">Sähköpyörien asiantuntija – huolto, akun vaihto, päivitykset ja tuunaukset</p>
       </header>

       {/* Main Content - Home */}
       {activeNav === "home" && (
         <>
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

           {/* Customer Review Slider */}
           <section className="review-slider">
             <h3>🌟 Asiakaspalautteet</h3>
             <div className="review-container">
               <div className="review-card">
                 <div className="review-stars">{"⭐".repeat(customerReviews[currentReview].rating)}</div>
                 <p className="review-text">"{customerReviews[currentReview].text}"</p>
                 <p className="review-author">- {customerReviews[currentReview].name}</p>
                 <p className="review-date">{customerReviews[currentReview].date}</p>
               </div>
               <div className="review-dots">
                 {customerReviews.map((_, idx) => (
                   <span 
                     key={idx} 
                     className={`dot ${idx === currentReview ? "active" : ""}`}
                     onClick={() => setCurrentReview(idx)}
                   ></span>
                 ))}
               </div>
             </div>
           </section>
         </>
       )}

       {/* Booking Section */}
       {activeNav === "booking" && (
         <section className="booking-section">
           <h2>📅 Huoltokalenteri & Ajanvaraus</h2>
           <form onSubmit={handleBookingSubmit} className="booking-form">
             <div className="form-group">
               <label>Valitse päivä:</label>
               <input 
                 type="date" 
                 value={bookingDate} 
                 onChange={(e) => setBookingDate(e.target.value)} 
                 required 
               />
             </div>
             <div className="form-group">
               <label>Valitse aika:</label>
               <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required>
                 <option value="">-- Valitse --</option>
                 <option value="09:00">09:00</option>
                 <option value="10:00">10:00</option>
                 <option value="11:00">11:00</option>
                 <option value="13:00">13:00</option>
                 <option value="14:00">14:00</option>
                 <option value="15:00">15:00</option>
                 <option value="16:00">16:00</option>
               </select>
             </div>
             <div className="form-group">
               <label>Palvelu:</label>
               <select value={bookingService} onChange={(e) => setBookingService(e.target.value)}>
                 <option value="huolto">Perushuolto</option>
                 <option value="akku">Akun vaihto</option>
                 <option value="diagnostiikka">Diagnostiikka</option>
                 <option value="korjaus">Korjauspalvelu</option>
               </select>
             </div>
             <button type="submit" className="submit-btn">Varaa aika</button>
           </form>
         </section>
       )}

       {/* Diagnostic Section */}
       {activeNav === "diagnostic" && (
         <section className="diagnostic-section">
           <h2>🔧 Dynaaminen Diagnostiikka-arvio</h2>
           <div className="diagnostic-form">
             <div className="form-group">
               <label>Ajokilometrit:</label>
               <input 
                 type="number" 
                 value={diagnosticInputs.mileage}
                 onChange={(e) => setDiagnosticInputs({...diagnosticInputs, mileage: e.target.value})}
                 placeholder="esim. 3000"
               />
             </div>
             <div className="form-group">
               <label>Akun kunto (%):</label>
               <input 
                 type="number" 
                 value={diagnosticInputs.batteryHealth}
                 onChange={(e) => setDiagnosticInputs({...diagnosticInputs, batteryHealth: e.target.value})}
                 placeholder="0-100"
                 min="0"
                 max="100"
               />
             </div>
             <div className="form-group">
               <label>Moottorin ääniä:</label>
               <select 
                 value={diagnosticInputs.motorNoise}
                 onChange={(e) => setDiagnosticInputs({...diagnosticInputs, motorNoise: e.target.value})}
               >
                 <option value="no">Ei</option>
                 <option value="yes">Kyllä</option>
               </select>
             </div>
             <button onClick={calculateDiagnostic} className="submit-btn">Laske arvio</button>
           </div>
           
           {diagnosticResult && (
             <div className="diagnostic-result">
               <h3>Arvioitu kustannus: {diagnosticResult.cost}€</h3>
               <ul>
                 {diagnosticResult.issues.map((issue, idx) => (
                   <li key={idx}>{issue}</li>
                 ))}
               </ul>
             </div>
           )}
         </section>
       )}

       {/* Bike Comparison Section */}
       {activeNav === "compare" && (
         <section className="comparison-section">
           <h2>🚴 Sähköpyörien Vertailutyökalu</h2>
           <p>Valitse enintään 3 pyörää vertailuun:</p>
           <div className="bike-grid">
             {bikes.map(bike => (
               <div key={bike.id} className={`bike-card ${selectedBikes.includes(bike.id) ? "selected" : ""}`}>
                 <h3>{bike.name}</h3>
                 <p><strong>Moottori:</strong> {bike.motor}</p>
                 <p><strong>Akku:</strong> {bike.battery}</p>
                 <p><strong>Toimintamatka:</strong> {bike.range}</p>
                 <p className="bike-price">{bike.price}</p>
                 <button onClick={() => toggleBikeComparison(bike.id)}>
                   {selectedBikes.includes(bike.id) ? "Poista" : "Vertaa"}
                 </button>
               </div>
             ))}
           </div>
           
           {selectedBikes.length > 0 && (
             <div className="comparison-table">
               <h3>Valitut pyörät:</h3>
               <table>
                 <thead>
                   <tr>
                     <th>Ominaisuus</th>
                     {selectedBikes.map(id => {
                       const bike = bikes.find(b => b.id === id);
                       return <th key={id}>{bike.name}</th>;
                     })}
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Moottori</td>
                     {selectedBikes.map(id => {
                       const bike = bikes.find(b => b.id === id);
                       return <td key={id}>{bike.motor}</td>;
                     })}
                   </tr>
                   <tr>
                     <td>Akku</td>
                     {selectedBikes.map(id => {
                       const bike = bikes.find(b => b.id === id);
                       return <td key={id}>{bike.battery}</td>;
                     })}
                   </tr>
                   <tr>
                     <td>Toimintamatka</td>
                     {selectedBikes.map(id => {
                       const bike = bikes.find(b => b.id === id);
                       return <td key={id}>{bike.range}</td>;
                     })}
                   </tr>
                   <tr>
                     <td>Hinta</td>
                     {selectedBikes.map(id => {
                       const bike = bikes.find(b => b.id === id);
                       return <td key={id}><strong>{bike.price}</strong></td>;
                     })}
                   </tr>
                 </tbody>
               </table>
             </div>
           )}
         </section>
       )}

       {/* Service Tracking Section */}
       {activeNav === "tracking" && (
         <section className="tracking-section">
           <h2>📍 Live-huoltoseuranta</h2>
           <div className="tracking-form">
             <input 
               type="text" 
               value={trackingId}
               onChange={(e) => setTrackingId(e.target.value)}
               placeholder="Syötä seurantatunnus (esim. EB-12345)"
             />
             <button onClick={trackService} className="submit-btn">Seuraa</button>
           </div>
           
           {serviceStatus && (
             <div className="tracking-result">
               <h3>Huollon tila: {serviceStatus.stage}</h3>
               <div className="progress-bar">
                 <div className="progress-fill" style={{width: `${serviceStatus.progress}%`}}></div>
               </div>
               <p>{serviceStatus.progress}% valmis</p>
             </div>
           )}
         </section>
       )}

       {/* Chat Section */}
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

       {/* Quote Popup */}
       {showQuotePopup && (
         <div className="quote-popup-overlay" onClick={() => setShowQuotePopup(false)}>
           <div className="quote-popup" onClick={(e) => e.stopPropagation()}>
             <button className="close-popup" onClick={() => setShowQuotePopup(false)}>✕</button>
             <h2>💬 Pyydä tarjous</h2>
             <p>Täytä lomake, niin otamme yhteyttä 24h sisällä!</p>
             <form onSubmit={handleQuoteSubmit}>
               <input 
                 type="text" 
                 placeholder="Nimi *" 
                 value={quoteForm.name}
                 onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                 required
               />
               <input 
                 type="email" 
                 placeholder="Sähköposti *" 
                 value={quoteForm.email}
                 onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                 required
               />
               <textarea 
                 placeholder="Viesti" 
                 value={quoteForm.message}
                 onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                 rows="4"
               ></textarea>
               <button type="submit" className="submit-btn">Lähetä pyyntö</button>
             </form>
           </div>
         </div>
       )}
     </div>
   );
}