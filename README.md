# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Postman API Testi

API endpoint'lerini test etmek için Postman collection kullan:

1. Postman'ı aç
2. **Import** → **File** seçin
3. `postman/My Collection.postman_collection.json` dosyasını seç
4. Collection'u import et

**Base URL:** `https://workintech-fe-ecommerce.onrender.com`

**Başarıyla test edilen endpoint'ler:**
- ✅ POST /signup
- ✅ POST /login
- ✅ GET /verify
- ✅ GET /roles
- ✅ GET /categories
- ✅ GET /products
- ✅ POST /order

**Sorunlu endpoint'ler (Backend issue):**
- ❌ GET /user/address (boş array)
- ❌ POST /user/address (502 error)
- ❌ GET /user/card (502 error)
- ❌ POST /user/card (201 ama boş array)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
