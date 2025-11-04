# Helsinki eBike Center

Täysin staattinen one-page verkkokauppa sähköpyörille. Toimii GitHub Pagesissa ilman server-side koodia.

## 🚀 Ominaisuudet

- **Täysin staattinen** - Ei PHP:tä, MySQL:ää tai server-side ajoa
- **Data-driven** - Kaikki sisältö ladataan `data.json`-tiedostosta
- **Responsiivinen** - Toimii kaikilla laitteilla
- **Tumma teema** - Moderni dark mode neon-korostusvärein (sininen/vihreä)
- **Suomenkielinen** - Kaikki sisältö suomeksi
- **GitHub Pages -yhteensopiva** - Valmis deploymenttiin

### Päätoiminnot

1. **Hero-osio** - Näyttävä etusivu kahdella CTA-painikkeella
2. **Arvolupauksset** - "Miksi Helsinki eBike Center?" -osio
3. **Kategoriat** - Visuaaliset kategoriakortit (Kaupunki, Maasto, Cargo, Premium)
4. **Tuotelistaus** - 14 sähköpyörää eri kategorioissa
5. **Filtterit** - Hakukenttä ja kategoriafiltterit
6. **Yhteystiedot** - Yhteystiedot ja yhteydenottolomake

## 📁 Rakenne

```
/
├── index.html          # Pääverkkokauppa (one-page)
├── asetukset.html      # Konfiguraatio-UI data.json:n muokkaukseen
├── data.json           # Kaikki sisältö (tuotteet, kategoriat, asetukset)
└── README.md           # Tämä tiedosto
```

## 🛠️ Käyttö

### GitHub Pagesissa

1. Pushaa tiedostot repositoryyn
2. Ota GitHub Pages käyttöön repository-asetuksista
3. Valitse lähteeksi `main` branch ja root-hakemisto
4. Sivusto on nyt osoitteessa: `https://[käyttäjänimi].github.io/[repo]`

### Paikallisesti

Käynnistä yksinkertainen HTTP-palvelin repositoryn juuressa:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000
```

Avaa selaimessa: `http://localhost:8000`

## ⚙️ Sisällön muokkaus

### Vaihtoehto 1: Graafinen käyttöliittymä

1. Avaa `asetukset.html` selaimessa
2. Muokkaa kenttiä graafisessa käyttöliittymässä
3. Klikkaa "Tallenna muutokset" (tallentaa selaimeen)
4. Klikkaa "Vie JSON" ladataksesi päivitetyn `data.json`-tiedoston
5. Korvaa projektin `data.json` ladatulla tiedostolla

### Vaihtoehto 2: Suora JSON-muokkaus

Muokkaa `data.json`-tiedostoa suoraan. Tiedosto sisältää:

- `siteSettings` - Hero-tekstit, CTA:t, yhteystiedot
- `valueProps` - Arvolupauksset
- `categories` - Tuotekategoriat
- `products` - Tuotteet (14 kpl)
- `testimonials` - Asiakasarviot
- `faq` - Usein kysytyt kysymykset
- `contact` - Yhteystiedot

## 🎨 Tyyli

- **Värimaailma**: Tumma tausta (#0a0e1a) neon-korostusvärein
  - Neon sininen: #00d4ff
  - Neon vihreä: #00ff88
- **Fontti**: Inter (Google Fonts)
- **Smooth scroll**: Navigaatio käyttää smooth scrollia

## 📦 Tuotteet

Verkkokaupassa on 14 erilaista sähköpyörää neljässä kategoriassa:

### Kaupunkipyörät (6 kpl)
- City Cruiser Pro
- Urban Commuter
- Helsinki Classic
- Folding Compact
- Hybrid Cruiser

### Maastopyörät (3 kpl)
- Mountain Beast X1
- Trail Explorer
- Enduro Power

### Cargo-pyörät (3 kpl)
- Family Cargo
- Urban Cargo Pro
- Heavy Duty Transporter

### Premium-sarja (3 kpl)
- Elite Carbon X
- Luxury Speedster
- Supreme Comfort

## 🖼️ Kuvat

Kaikki kuvat ladataan Unsplashista. Voit vaihtaa kuvien URL:t `data.json`-tiedostossa.

## 🔧 Tekninen toteutus

- **HTML5** - Semanttinen markup
- **CSS3** - Modern layout (Grid, Flexbox)
- **Vanilla JavaScript** - Ei riippuvuuksia
- **Client-side rendering** - Data ladataan JSON:sta
- **Responsive design** - Toimii mobiilista desktop-kokoon

## 📝 Lisenssi

Tämä on esimerkki-projekti. Muokkaa vapaasti omiin tarpeisiisi.

## 🤝 Kehitys

Kehitysehdotuksia:
- [ ] Ostoskori-toiminnallisuus
- [ ] Tuotesivut yksityiskohtaisilla tiedoilla
- [ ] Kielivalinta (FI/EN)
- [ ] Blogiartikkelit
- [ ] Tuotevertailu

---

**Helsinki eBike Center** - Premium sähköpyöriä sydämessä Helsinkiä 🚴‍♂️
