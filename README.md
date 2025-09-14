# Suryansh Enterprises Website

A responsive business website for **Suryansh Enterprises** with service tabs, contact form validation, smooth scrolling, animations, and mobile menu support.

## [Demo](https://ispyadav01.github.io/Suryansh-Enterprises-Website1/)

---

## 🚀 Features

* 🖼️ **Custom Logo Support** – Replace hero flag with your company logo
* 🌐 **Multilingual Support** – English & Hindi toggle
* 🗂️ **Service Tabs** – Dynamic tab-based service details
* 📩 **Contact Form** – Validation + success/error messages
* 📱 **Responsive Design** – Mobile-friendly navigation & layout
* 🎨 **Animations** – Intersection observer-based reveal effects
* ⚡ **Optimizations** – Debouncing, lazy loading images

---

## 📁 Folder Structure

```
Suryansh-Enterprises-Website/
│-- index.html         # Main HTML file (homepage)
│-- style.css          # Stylesheet for layout, colors, and responsiveness
│-- app.js             # JavaScript functionality (language toggle, tabs, forms, etc.)
│-- /assets            # Images, icons, logos, etc.
│   ├── logo.png       # Company logo
│   ├── hero.jpg       # Hero section background image
│   └── services/      # Service-related images
│-- /docs              # Additional project documentation (if needed)
│   └── README.md
```

---

## ⚙️ Setup & Run Locally

### Option 1 – Open in Browser

1. Clone the repo:

   ```bash
   git clone https://github.com/iSPYadav01/Suryansh-Enterprises-Website1.git
   cd Suryansh-Enterprises-Website1
   ```
2. Double-click `index.html` to open in your browser.

### Option 2 – Run with Node.js Local Server

1. Install [Node.js](https://nodejs.org/) if not already installed.
2. Inside project folder, create a `server.js` file with Express:

   ```js
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.use(express.static(__dirname));

   app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
   ```
3. Install dependencies:

   ```bash
   npm init -y
   npm install express
   ```
4. Start server:

   ```bash
   node server.js
   ```
5. Open `http://localhost:3000` in browser.

---

## 🌍 Deployment

You can deploy this website for free using:

* [Vercel](https://vercel.com)
* [Netlify](https://www.netlify.com)
* [GitHub Pages](https://pages.github.com)
* VPS + Docker/CapRover/Dokku

---

## 🔑 Customization

* Replace **assets/logo.png** with your company logo
* Update company info in **index.html** (text, services, contact)
* Edit **style.css** for brand colors & design tweaks
* Modify **app.js** for extra features

---

## 📝 License

This project is open-source under the **MIT License**.

---

<div align="center">
  <h2>🚀 Ready to Get Started?</h2>
  <p>Follow the <a href="#quick-start">Quick Start</a> guide to have the application running in minutes!</p>
  
  <a href="#quick-start" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Get Started Now</a>
</div>

---

<div align="center">
  <p>Made with ❤️ by <strong>Data Dynasty Lab</strong></p>
  <p>© 2025 Data Dynasty Lab. All rights reserved.</p>
</div>



