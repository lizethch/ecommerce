# Shop.co - React E-commerce Platform
A modern e-commerce platform built with React + TypeScript, featuring a responsive design with Tailwind CSS and comprehensive shopping features.
## 🛠️ Tech Stack
* React 18
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React (for icons)
  
## 📋 Prerequisites
* Node.js (v16.0.0 or higher)
* npm (v8.0.0 or higher)
* Git
  
## 🚀 Installation & Setup
1. Clone the repository:
   ```bash
git clone https://github.com/yourusername/shop-co-ecommerce.git
cd shop-co-ecommerce
```
2. Install dependencies:

  ```bash
npm install react-router-dom @types/react-router-dom
npm install tailwindcss postcss autoprefixer
npm install axios
npm install lucide-react
```
3.Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

4. Configure Tailwind CSS
    ```bash
    (tailwind.config.js):
    ```
 ```bash
    module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          500: '#3B82F6',
          600: '#2563EB',
          900: '#1E3A8A',
        },
        'gray': {
          400: '#9CA3AF',
          700: '#374151',
          900: '#111827',
        }
      }
    },
  },
  plugins: [],
}
```

## 📁 Project Structure
  ```bash
shop-co/
├── src/
│   ├── assets/
│   │   └── bannerImage.jpg
│   ├── components/
│   │   ├── Banner.tsx
│   │   └── Footer.tsx
│   ├── api/
│   │   └── axios.ts        # Axios configuration
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── About.tsx
│   │   ├── Features.tsx
│   │   ├── Career.tsx
│   │   └── Support/
│   │       ├── CustomerSupport.tsx
│   │       ├── DeliveryDetails.tsx
│   │       ├── Terms.tsx
│   │       └── Privacy.tsx
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```
## ⚙️ Component Setup
# Banner Component
// Required imports
 ```bash
import { Link } from 'react-router-dom';
import bannerImage from '../assets/bannerImage.jpg';
```
# Key features:
* Full-width banner with background image
* Responsive text layout
* Call-to-action button linking to shop
  
## Footer Component
 ```bash
// Required imports
import { Link } from 'react-router-dom';
```
## 🚀 Running the Project
 ```bash
npm run dev
 ```
