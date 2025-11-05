# Omar Farha - Frontend Developer Portfolio

A modern, animation-rich portfolio website built with Next.js 15, featuring stunning 3D effects, smooth animations, and a fully responsive design.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4
- **Stunning Animations**: Powered by Motion (Framer Motion) with custom animation variants
- **3D Effects**: Interactive 3D card perspectives using custom components
- **WebGL Canvas**: Advanced particle effects using Three.js and React Three Fiber
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support
- **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, and semantic HTML
- **Contact Form**: Integrated with EmailJS for easy communication
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Performance**: Optimized images, lazy loading, and efficient rendering

## Sections

1. **Hero** - Eye-catching introduction with spotlight effects
2. **About Me** - Personal introduction, education, and tech stack
3. **Grid** - Bento grid showcasing skills and information
4. **Projects** - Portfolio projects with 3D card effects
5. **Store** - Interactive scroll-based animation
6. **Testimonials** - Infinite scrolling client testimonials
7. **Approach** - Development methodology with canvas reveals
8. **Contact** - Form with validation and success/error feedback

## Tech Stack

### Core
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.3
- **Animations**: Motion v12.6.5

### UI & Effects
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Integrations
- **Email**: EmailJS Browser
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/omar-farha/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment variables (optional)
```bash
cp .env.example .env.local
```

Edit `.env.local` with your EmailJS credentials:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main homepage
│   └── globals.css        # Global styles & animations
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── AboutMe.tsx       # About section
│   ├── Projects.tsx      # Projects showcase
│   ├── Footer.tsx        # Contact form & footer
│   ├── ui/               # Reusable UI components
│   └── magicui/          # Advanced animation components
├── data/                 # Content data
│   └── index.ts          # All content (projects, testimonials, etc.)
├── lib/                  # Utilities
│   ├── utils.ts          # Helper functions
│   └── motionVariants.ts # Animation presets
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## Customization

### Update Content

Edit `data/index.ts` to customize:
- Navigation items
- Projects
- Testimonials
- Work experience
- Social media links

### Modify Styling

Edit `tailwind.config.ts` for:
- Custom colors
- Theme extensions
- Typography
- Shadows & effects

### Animation Presets

Use or modify presets in `lib/motionVariants.ts`:
- fadeIn, fadeInUp, fadeInDown
- fadeInLeft, fadeInRight
- fadeInScale
- staggerContainer

## Recent Improvements (2025)

### SEO & Performance
- Comprehensive meta tags (Open Graph, Twitter Card)
- Improved semantic HTML structure
- Better image optimization
- Smooth scroll behavior

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy
- Focus indicators

### UX Enhancements
- Form validation with error messages
- Loading states during form submission
- Success/error notifications
- Better responsive design
- Improved contrast ratios

### Code Quality
- Fixed Tailwind config typo (DEFALT → DEFAULT)
- Better TypeScript types
- Consistent component structure
- Improved code organization

## Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/omar-farha/portfolio)

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## License

This project is open source and available for personal and commercial use.

## Contact

- **Email**: farha.omar2008@gmail.com
- **GitHub**: [@omar-farha](https://github.com/omar-farha)
- **LinkedIn**: [Omar Farha](https://www.linkedin.com/in/omar-farha-036604285/)
- **WhatsApp**: [+20 114 141 2551](https://wa.me/201141412551)

---

Built with ❤️ by Omar Farha using Next.js & TypeScript
