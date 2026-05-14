# 🛒 Cybertech Store — Full-Stack E-commerce Project (Portfolio)

![Prévia do desenvolvimento](src/assets/image.png)

> A full-stack e-commerce project developed as part of my personal portfolio.
>
> 🚧 Project currently under development.

---

## 📸 Preview

The image above represents the current state of the application, highlighting:
- A Header with navigation, search, and users actions.
- A promotional main banner.
- Banner sections organized in a grid layout.
- A modern and responsive layout using a free template avaible on [Figma](https://www.figma.com/design/5ShWzeXmTChbGMLHAcSocJ/E-Store---Mobile-web--Community-?node-id=91-75&t=ZcVUk93YZsdnbVhy-0)

---

## 👩‍💻 About the Project

**Cyber Store** is an e-commerce project created to simulate a real digital product environment, applying industry-standard concepts.

The main goal is to demonstrate:
- Clean code organization and structural archtecture.
- Componentization in React, separating visual pieces from page logic.
- Advanced usage of CSS Grid and Flexbox with Tailwind CSS.
- Front-end and Back-end integration (in progress).
- UI/UX best practices.

This project is a core piece of my **professional portfolio**.

---
## 🏗️ Architecture & Technical Decisions

Throughout the development of Cybertech, several architectural choices were made to ensure scalability and performance:

- **Routing Structure**: The application uses `react-router-dom` with a dedicated `Layout` component. This acts as a shell containing repeating elements like the Header and Footer, while an `<Outlet />` dynamically injects specif page content (like the Home or Cart pages).
- **Global State Management**: Data such as product information and shoppring cart logic is managed globally using React's Context API, including a `ProductProvider` and structures for a `CartContext`.
- **Mobile-First Responsiveness:** The styling strictly adheres to Tailwind's Mobile First golden rule. Base classes define the mobile layout (e.g., using `flex-col` for stacking items), while responsive prefixes like `md:` and `lg:` adapt the layout for larger screens.
- **Visual Reordering:** To improve mobile UX without duplicating HTML, the project leverages Tailwind's `order` utility classes to visually rearrange product hierarchies on smaller screnns, reverting to the original DOM order on desktop using `lg:order-none`.
- **Performance Optimization:** The application uses the native HTML `<picture>` tag to conditionally deliver different banner images based on screen size, saving bandwidth for mobile users instead of just hiding elements with CSS.
---

## 🚀 Feartures

### Implemented
- [x] Fully responsive layout (Mobile First).
- [x] Header with functional navigation and search interface.
- [x] Main promotional banner.
- [x] Dynamic product grid with interactive cards
- [x] Programmatic navigation to product detail pages using the `useNavigate` hook.
- [x] Reusable React components. 
- [x] Complete API integration.

### In development
- [ ] Product details page.
- [ ] Shopping cart functionality.
- [ ] User authentication.
- [ ] Wishlist (Favorites). 

---

## 🛠️ Technologies Used

### Front-end
- React & Typescript
- **Tailwind CSS** (Styling and Responsive Design)
- **react-router-dom** (Routing and Navigation)
- **Context API** (Global State Management)
- **Lucide Icons**
- **Vite**

### Back-end (planned)
- **Node.js**
---

## 📁 Project Structure
The project separates concerns by distiguishing reusible UI components from actural page view:

```bash
src/
├── assets/
├── components/       # Reusable visual pieces
│   ├── banner/
│   ├── category/
│   ├── footer/
│   ├── header/
│   ├── icon-button/
│   ├── layout/        # Contains the application shell
│   ├── product-card/
│   ├── product-list/
│   └── promo-banner/
├── contexts/          # Global state management
├── pages/             # Page content injected into the Layout
│   ├── cart/
│   ├── details/
│   └── home/
├── App.tsx            # Route configuration
├── index.css
└── main.tsx
```

## 🌐 Acess 

Check out the live project here: [Ecommerce Cybertech](https://ecommerce-project-omega-hazel.vercel.app).

## Author

<a><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/133506658?s=400&u=add96d4ebb6071b0473386091845a1509b3de27b&v=4" width="100px;" alt=""/>
<br />
<sub><b>Andressa Martins</b></sub></a>

Made by Andressa Martins. Feel free to get in touch <3.

<a href="mailto:andressa.devsystem@gmail.com"><img alt="Static Badge" src="https://img.shields.io/badge/andressa.devsystem%40gmail.com-black?style=flat&logo=gmail&logoColor=%23EA4335&logoSize=auto&color=EDF2F4"></a>

