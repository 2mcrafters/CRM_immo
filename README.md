# CRM Immobilier Monorepo

Full-stack starter:
- Frontend: React + Vite + Redux Toolkit + TailwindCSS
- Backend: Laravel + Sanctum + Spatie Permission + MySQL

## Quick start

1) Backend
- Copy `backend/.env` and set DB credentials (or keep sqlite for quick try)
- Install PHP deps: composer install
- Generate key and migrate: php artisan key:generate; php artisan migrate --seed
- Run dev server: php artisan serve

2) Frontend
- Copy `frontend/.env.example` to `frontend/.env` and set VITE_API_URL to backend URL
- Install deps: npm install
- Start dev: npm run dev

Default admin: admin@example.com / password

## Notes
- Auth: token-based via Sanctum personal access tokens at /api/auth/*
- Roles: seeded roles [admin,user] via Spatie Permission
# CRM_immo
