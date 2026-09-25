# MMUST Boutique

A responsive, editorial-style campus fashion storefront for MMUST Boutique. The site is a static HTML, CSS, and JavaScript project with no build step.

## Features

- Responsive header with an accessible hamburger menu on smaller screens.
- Editorial About section and calls to action.
- Twenty product cards, balanced across womenswear, menswear, and campus essentials.
- Product filters for collection and occasion.
- Balanced six-slide womenswear/menswear lookbook carousel.
- Interactive outfit builder with a temporary style list.
- General clothing fit guide and expandable measurement advice.
- Local video preview for a selected 5-to-10-second style clip.
- Responsive testimonials, account preview, and early-access form.

## Run Locally

You can open `index.html` directly, or serve the folder locally with Python:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Project Files

- `index.html` contains the page structure and content.
- `styles.css` contains responsive layout, typography, and component styles.
- `scripts.js/script.js` contains menu, carousel, product-filter, outfit-builder, fit-guide, and preview-form behavior.
- `assets/` contains the logo, background, and local product images.

The project loads Google Fonts, Boxicons, and some product/editorial images from external services. An internet connection is needed for those remote assets. Replace placeholder social links, product details, and sample testimonials with approved MMUST Boutique information before launch.

## Integrations Needed

This is a front-end preview, not a connected store. Product purchase links do not process orders; the outfit list is temporary; account screens do not create authenticated sessions; early-access submissions are not saved; and the video preview is local to the visitor's browser. A secure backend, inventory/checkout provider, authentication service, email platform, and approved video assets are needed for production use.

## Deploy With GitHub Pages

In the repository settings, enable GitHub Pages and select the `main` branch with the repository root as the publishing source. The site entry point is `index.html`.

## Git Commands

Clone and preview the project:

```bash
git clone https://github.com/wisejosiah92-alt/MMUST-boutique.git
cd MMUST-boutique
python -m http.server 8000
```

After editing the site, stage the website files, commit, and push to `main`:

```bash
git add index.html styles.css scripts.js/script.js assets README.md
git commit -m "Describe your changes"
git push origin main
```