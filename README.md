<div align="center">

# Socially

**English** &nbsp;·&nbsp; [فارسی](./README.fa.md)

A social network where you can share posts, like and comment, follow people
and get notified — built as the final project of the Quera Front-End Bootcamp.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

</div>

<!--
  Screenshots go here. Drop your images in docs/screenshots/ and uncomment:

  <div align="center">
    <img src="./docs/screenshots/feed-light.png" width="49%" alt="Feed, light theme" />
    <img src="./docs/screenshots/feed-dark.png"  width="49%" alt="Feed, dark theme" />
  </div>
-->

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Where does the database come from?](#where-does-the-database-come-from)
  - [1. Start the API](#1-start-the-api)
  - [2. Start the frontend](#2-start-the-frontend)
- [Project structure](#project-structure)
- [API reference](#api-reference)
- [Available scripts](#available-scripts)
- [Implementation notes](#implementation-notes)
- [Author](#author)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About

Socially is a full social feed: accounts, posts with images, likes, comments,
following, notifications and search — in a light and a dark theme, responsive
from a 375px phone up to a wide desktop.

The focus of this project is the **frontend**. The API it talks to lives in
[`backend/`](./backend) and is included so you can run the whole thing locally
and see the interface actually working.

## Features

| | |
|---|---|
| **Accounts** | Email/password sign up and sign in, session stored in an http-only cookie |
| **Feed** | Create posts with an optional image, edit and delete your own |
| **Likes** | Optimistic — the heart reacts instantly and rolls back if the server refuses |
| **Comments** | Add, edit and delete, submit with `Ctrl` / `Cmd` + `Enter` |
| **Profiles** | Bio, location, website, avatar, join date, and tabs for posts and likes |
| **Follow** | Follow and unfollow, with follower and following lists |
| **Notifications** | Likes, comments and follows, with an unread badge in the header |
| **Search** | Find people by name or email |
| **Theme** | Light and dark — follows your system on first visit, then remembered |
| **Keyboard & a11y** | Modals close with `Esc` and lock the page behind them, every control is reachable by keyboard |

## Tech stack

**Frontend** — repository root

| | |
|---|---|
| Framework | React 19 + TypeScript, bundled with Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Server state | TanStack Query v5 |
| Client state | Zustand |
| Forms | React Hook Form |
| HTTP | Axios |
| Icons / toasts | lucide-react, react-hot-toast |

**API** — [`backend/`](./backend)

| | |
|---|---|
| Framework | Next.js 15, App Router route handlers |
| Database | PostgreSQL via Prisma 6 |
| Auth | better-auth |
| Validation | Zod |
| File storage | Uploadcare |

---

## Getting started

You need **two terminals**: one for the API and one for the frontend. Start the
API first, because the frontend calls it on `http://localhost:3000`.

### Prerequisites

- [Node.js](https://nodejs.org) 20 or newer
- A PostgreSQL database — see below, you do **not** need to bring your own data
- An [Uploadcare](https://uploadcare.com) public key — only for image uploads

### Where does the database come from?

This repository does not ship a database (nobody publishes their own connection
string). It ships something better: the **whole schema** lives in
[`backend/prisma/migrations/`](./backend/prisma/migrations), so one command
builds every table for you. All you need is an empty Postgres to point at, and
there are two easy ways to get one.

**Option A — Docker, nothing to sign up for**

```bash
cd backend
docker compose up -d db
```

That starts Postgres on port 5432 with an empty `socially` database, so your
connection string is:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/socially"
```

**Option B — a free hosted Postgres**

Create a free database on [Neon](https://neon.tech), [Supabase](https://supabase.com)
or [Prisma Postgres](https://www.prisma.io/postgres) and copy the connection
string. Takes about two minutes.

Either way, the tables are created for you in step 1.

### 1. Start the API

```bash
cd backend
npm install
```

`npm install` also generates the Prisma client for you.

Create your environment file from the template and fill it in:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | The connection string from Option A or B |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions — generate with `openssl rand -hex 32` |
| `BETTER_AUTH_URL` | Where the API runs — `http://localhost:3000` in development |
| `NEXT_PUBLIC_UPLOADCARE_API_KEY` | Uploadcare public key |
| `NEXT_PUBLIC_UPLOADCARE_CDN_CNAME` | Uploadcare CDN address |

Build the tables and start the server:

```bash
npx prisma migrate deploy   # creates every table from the migrations in this repo
npm run dev
```

The API is now on **http://localhost:3000**. Leave this terminal running.

### 2. Start the frontend

In a second terminal, from the repository root:

```bash
npm install
npm run dev
```

Open **http://localhost:5173**, sign up and you are in. The database starts
empty, so create a couple of accounts to see follows, notifications and
comments in action.

> [!IMPORTANT]
> The API only accepts requests from `http://localhost:5173`. If you run the
> frontend on another port, update `Access-Control-Allow-Origin` in
> `backend/middleware.ts` and `trustedOrigins` in `backend/lib/auth.ts` to
> match, otherwise sign in will fail.

---

## Project structure

```
.
├── src/                    # the React frontend
│   ├── components/
│   │   ├── Ui/             # small shared pieces (Avatar, Button, Spinner, TextField…)
│   │   ├── home/           # the feed and the post composer
│   │   ├── post/           # the post card, its comment section and their modals
│   │   ├── profile/        # profile card, tabs, follow and profile modals
│   │   └── notification/   # notification rows
│   ├── hooks/              # one hook per query or mutation
│   ├── services/           # axios instance and the api calls
│   ├── store/              # zustand auth store
│   ├── types/              # shared types
│   ├── utils/              # small helpers
│   ├── layout/             # the page shell
│   ├── pages/              # one file per route
│   └── routes/             # router definition
│
└── backend/                # the api the frontend talks to
    ├── app/api/            # route handlers - the whole api surface
    ├── prisma/             # schema and migrations
    ├── lib/                # prisma client and auth setup
    ├── data/               # database queries
    └── schemas/            # zod schemas
```

---

## API reference

All routes are prefixed with `/api`. "Auth" means a valid session cookie is required.

**Authentication**

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `POST` | `/authentication/register` | – | Create an account |
| `POST` | `/authentication/login` | – | Sign in and receive the session cookie |
| `POST` | `/authentication/logout` | – | Sign out |
| `GET` | `/authentication/session` | ✔ | Current session and user |

**Posts**

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `GET` | `/posts` | – | The feed, newest first |
| `POST` | `/posts` | ✔ | Create a post |
| `PUT` | `/posts/:id` | ✔ | Edit your post |
| `PATCH` | `/posts/:id` | ✔ | Like / unlike a post |
| `DELETE` | `/posts/:id` | ✔ | Delete your post |

**Comments**

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `POST` | `/posts/:id/comment` | ✔ | Add a comment |
| `PUT` | `/posts/:id/comment/:commentId` | ✔ | Edit your comment |
| `DELETE` | `/posts/:id/comment/:commentId` | ✔ | Delete your comment |

**Users**

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `GET` | `/users/:username/profile` | – | Public profile |
| `GET` | `/users/:id/posts` | – | A user's posts |
| `GET` | `/users/:id/likes` | – | Posts a user liked |
| `GET` | `/users/:id/followers` | ✔ | Follower list |
| `GET` | `/users/:id/followings` | ✔ | Following list |
| `PUT` | `/users/:id` | ✔ | Update your profile |
| `PATCH` | `/users/:id` | ✔ | Follow / unfollow |
| `GET` | `/users/search?q=` | ✔ | Search people |
| `GET` | `/users/recommend` | ✔ | Suggested people to follow |

**Other**

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `GET` | `/notifications` | ✔ | Your notifications |
| `PATCH` | `/notifications` | ✔ | Mark notifications as read |
| `POST` | `/upload` | – | Upload an image to Uploadcare |

---

## Available scripts

**Root — frontend**

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 5173 |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

**`backend/` — API**

| Command | Description |
|---|---|
| `npm run dev` | Start the API on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Implementation notes

- **Optimistic likes.** Liking writes straight to the React Query cache before
  the request finishes, so the heart reacts immediately, and the previous cache
  is restored if the API refuses.
- **Validation on both sides.** The API requires 5–300 characters for a post,
  at least 5 for a comment, and refuses a like on your own post. The interface
  enforces the same rules, so you find out before you submit.
- **Resilient queries.** A `4xx` is treated as a real answer, anything else is
  retried, so a momentary server hiccup does not sign you out.
- **Image sizing.** Uploads go to Uploadcare and are resized by its CDN, so the
  feed loads small versions instead of full-size originals.
- **Theming.** Surfaces follow an elevation scale — in light mode cards float
  with a shadow, in dark mode they lift by being lighter than the page.
- **Secrets.** They live in `backend/.env`, which is git-ignored. Only
  `.env.example` with placeholder values is committed.

---

## Author

**Mahan Qaderi**

## License

The frontend is released under the MIT License — see [LICENSE](./LICENSE).
The API under `backend/` is third-party course material and is not covered by it.

## Acknowledgements

Built as the final project of the **Quera Front-End Bootcamp**.
