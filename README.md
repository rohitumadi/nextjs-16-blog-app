# 🚀 BlogOrbit

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Convex](https://img.shields.io/badge/Convex-Backend-FF6B6B?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

**A modern, full-stack blog platform built with cutting-edge technologies.**

[Live Demo](https://your-demo-link.vercel.app) · [Report Bug](https://github.com/rohitumadi/nextjs-16-blog-app/issues) · [Request Feature](https://github.com/rohitumadi/nextjs-16-blog-app/issues)

</div>

---

## ✨ Features

### 📝 **Blog Management**

- **Create Posts** – Rich text content with image uploads directly to Convex storage
- **Browse Posts** – Beautiful card-based grid layout with responsive design
- **Full-Text Search** – Real-time search across post titles and content
- **Dynamic Metadata** – SEO-optimized pages with auto-generated meta tags

### 🔐 **Authentication**

- **Email/Password Auth** – Secure authentication powered by Better Auth
- **Guest Login** – Quick demo access for visitors
- **Protected Routes** – Middleware-based route protection

### 🎨 **Premium UI/UX**

- **Animated Hero Section** – Smooth entrance animations with Framer Motion
- **Dark/Light Mode** – Seamless theme switching with `next-themes`
- **Responsive Design** – Mobile-first approach, looks great on all devices
- **Skeleton Loading** – Polished loading states for better perceived performance

### 💬 **Real-Time Features**

- **Live Presence** – See who's viewing a post in real-time
- **Comments System** – Engage with posts through comments

---

## 🛠️ Tech Stack

| Category          | Technology                                 |
| ----------------- | ------------------------------------------ |
| **Framework**     | Next.js 16 (App Router, Server Components) |
| **Frontend**      | React 19, TypeScript 5                     |
| **Styling**       | Tailwind CSS 4, Radix UI, Shadcn/ui        |
| **Backend**       | Convex (Real-time Database + File Storage) |
| **Auth**          | Better Auth with Convex Integration        |
| **Forms**         | React Hook Form + Zod Validation           |
| **Animations**    | Framer Motion                              |
| **Notifications** | Sonner Toast                               |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- A [Convex](https://convex.dev) account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rohitumadi/nextjs-16-blog-app.git
   cd nextjs-16-blog-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

   This will prompt you to log in and create a new project.

4. **Configure environment variables**

   Create a `.env.local` file:

   ```env
   CONVEX_DEPLOYMENT=your-convex-deployment
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   SITE_URL=http://localhost:3000
   # Same as NEXT_PUBLIC_CONVEX_URL but ends in .site not cloud
   NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
nextjs-blog-app/
├── app/
│   ├── (shared-layout)/      # Routes with navbar
│   │   ├── blog/             # Blog listing & post pages
│   │   ├── create/           # Create new post
│   │   └── page.tsx          # Home page
│   ├── auth/                 # Login & Sign up
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Shadcn/ui components
│   └── web/                  # Custom components (Navbar, SearchInput, etc.)
├── convex/
│   ├── schema.ts             # Database schema
│   ├── posts.ts              # Post queries & mutations
│   ├── comments.ts           # Comments functionality
│   ├── presence.ts           # Real-time presence
│   └── auth.ts               # Authentication setup
├── lib/                      # Utility functions & clients
└── public/                   # Static assets
```

---

## 🎯 Key Features Explained

### 🔍 Full-Text Search

The search feature uses Convex's built-in search indexes for blazing-fast results:

- Searches across both title and content
- Prioritizes title matches
- Debounced input for optimal performance

### 👥 Real-Time Presence

See who else is viewing a blog post:

- Powered by `@convex-dev/presence`
- Shows user avatars in real-time
- Automatic cleanup on disconnect

### 🖼️ Image Handling

- Direct client-to-Convex file uploads
- No server action size limits
- Optimized with Next.js Image component

---

## 📜 Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start development server |
| `npm run build`  | Build for production     |
| `npm run start`  | Start production server  |
| `npm run lint`   | Run ESLint               |
| `npx convex dev` | Start Convex dev server  |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) – The React Framework
- [Convex](https://convex.dev) – Backend as a Service
- [Shadcn/ui](https://ui.shadcn.com) – Beautiful UI Components
- [Better Auth](https://better-auth.com) – Authentication Library
- [Tailwind CSS](https://tailwindcss.com) – Utility-First CSS

---

<div align="center">

**Built with ❤️ using Next.js 16 and Convex**

⭐ Star this repo if you found it helpful!

</div>
