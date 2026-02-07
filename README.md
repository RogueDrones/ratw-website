Rosina & The Weavers - Official Website
Custom single-page website for the New Zealand band "Rosina & The Weavers"

Project Overview
A fully responsive, single-page website featuring the band's music, videos, merch, and contact information. Built with pure HTML/CSS and minimal JavaScript for maximum performance and simplicity.

Live Development: http://localhost:9000 (via Python HTTP server)

Project Structure
ratw-website/
├── index.html              # Single-page website (all sections)
├── css/
│   └── style.css          # Main stylesheet (~900 lines)
├── js/
│   └── carousel.js        # YouTube video carousel logic
├── images/
│   ├── band-photos/       # 18+ professional band photos
│   ├── logos/             # Brand logos (white, black, transparent variants)
│   └── merch/             # Product images (t-shirts, vinyl)
└── README.md              # This file
Design Specification
Color Scheme: Black (#000000) background with white (#FFFFFF) text
Accent Color: Pink/Mauve (#E91E8C) for interactive elements
Design Philosophy: Simple, striking, image-first design
Inspiration: Troy Kingi's website approach
Typography: System fonts for maximum compatibility
Current Status - First Full Draft Complete ✅
Implemented Sections (7 total):
Hero Section

Overlapping logo and band photo
Responsive image cropping controls
Full-width layout
About Section

2/3 width image on left
Text overlay extending from center into black space
Band bio text
Videos Section

YouTube video carousel (3 videos)
Custom arrow navigation with Font Awesome icons
Indicator dots for slide position
Auto-pause when switching videos
Follow Us Section

Social media icons (Facebook, Instagram, Bandcamp, YouTube, Apple Music, Spotify)
Black & white portrait photo
Font Awesome icons with pink hover effects
Behind the Scenes Section

Substack and Patreon links
Text overlay on band photo
Bootstrap Icons integration
Merch Section

Product images (2x t-shirts, 1x vinyl)
Bandcamp integration
Hover effects with pink glow
Contact Section

Email link with envelope icon
Live performance photo
Pink hover effect on heading/icon
Technical Stack
Frontend:

Pure HTML5 (semantic markup)
Vanilla CSS3 (no frameworks)
Minimal JavaScript (YouTube IFrame API only)
External Dependencies:

Font Awesome 6.5.1 (social icons)
Bootstrap Icons 1.11.3 (Substack icon)
YouTube IFrame API (video control)
Browser Compatibility:

Modern browsers (Chrome, Firefox, Safari, Edge)
CSS Flexbox support required
ES6 JavaScript features
Development Workflow
Local Server (Required for YouTube embeds)
cd C:\Users\HP\Desktop\Claude_Workspace\ratw-website
python -m http.server 9000
Access at: http://localhost:9000

Why needed: YouTube embeds require HTTP/HTTPS protocol (file:// won't work)

Hard Refresh (Clear Cache)
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
Responsive Design
Breakpoints:
Desktop: Default styles (>768px)
Tablet: 768px and below
Mobile: 480px and below
Mobile Optimizations:
Removed min-height: 100vh to prevent black gaps
Standardized padding: 30px 15px on all sections
Stacked layouts replace side-by-side
Removed negative margins that break on small screens
Tighter spacing throughout
CSS Architecture
Key Features:
Z-index Scale: Documented hierarchy (1-10 content, 100-200 UI, 1000+ overlays)
Shared Icon Styles: .icon-base class for consistent icon behavior
Extensive Comments: All adjustable parameters marked with /* ADJUST THIS */
Modular Sections: Each section self-contained with clear boundaries
Adjustable Parameters:
Every section includes inline comments for easy customization:

Image sizes and cropping
Text positioning and sizing
Spacing and padding
Hover effects and transitions
Performance Optimizations
Lazy loading on all images (loading="lazy")
Subresource Integrity (SRI) on external stylesheets
Security meta tags included (commented out for development)
Minimal external dependencies
Known Issues & Limitations
YouTube API Console Warnings:
postMessage origin mismatch warnings (harmless)
Will resolve when deployed to HTTPS production domain
Does not affect functionality
Deployment Checklist
 Uncomment security meta tags in index.html
 Test on actual mobile devices (iPhone, Android)
 Verify all external links work
 Test YouTube embeds on production HTTPS domain
 Optimize images for web (compression)
 Test cross-browser compatibility
 Add favicon
 Configure proper HTTPS hosting
Hosting Options
Recommended static hosts:

Netlify (free tier available)
Vercel (free tier available)
GitHub Pages (requires public repo)
Any static file host with HTTPS
Requirements:

HTTPS support (required for YouTube embeds)
Static file serving
No server-side processing needed
Development Notes
All images are in place (no placeholders)
Website is in first full draft state
Client: Anna Rose Carpenter (A-R)
Developer: Phil @ Rogue Drones
