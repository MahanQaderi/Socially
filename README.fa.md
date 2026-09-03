<div align="center">

# Socially

[English](./README.md) &nbsp;·&nbsp; **فارسی**

یک شبکهٔ اجتماعی که در آن می‌توانی پست بگذاری، لایک و کامنت کنی، بقیه را دنبال
کنی و باخبر شوی — پروژهٔ پایانی بوت‌کمپ فرانت‌اند کوئرا.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

</div>

<!--
  تصویرها اینجا قرار می‌گیرند. عکس‌ها را در docs/screenshots/ بگذار و این را از کامنت دربیاور:

  <div align="center">
    <img src="./docs/screenshots/feed-light.png" width="49%" alt="فید، تم روشن" />
    <img src="./docs/screenshots/feed-dark.png"  width="49%" alt="فید، تم تیره" />
  </div>
-->

---

## فهرست

<div dir="rtl">

- [دربارهٔ پروژه](#about)
- [امکانات](#features)
- [تکنولوژی‌ها](#tech-stack)
- [شروع به کار](#getting-started)
  - [پیش‌نیازها](#prerequisites)
  - [دیتابیس را از کجا بیاوریم؟](#database)
  - [۱. بالا آوردن API](#start-api)
  - [۲. بالا آوردن فرانت‌اند](#start-frontend)
- [ساختار پروژه](#project-structure)
- [مرجع API](#api-reference)
- [دستورها](#scripts)
- [نکته‌های پیاده‌سازی](#notes)
- [نویسنده](#author)
- [لایسنس](#license)
- [قدردانی](#acknowledgements)

</div>

---

<a id="about"></a>

## دربارهٔ پروژه

<div dir="rtl">

Socially یک فید اجتماعی کامل است: حساب کاربری، پست همراه عکس، لایک، کامنت،
دنبال کردن، اعلان و جستجو — با تم روشن و تیره، و واکنش‌گرا از موبایل ۳۷۵ پیکسلی
تا دسکتاپ عریض.

تمرکز این پروژه روی **فرانت‌اند** است. APIای که با آن حرف می‌زند در پوشهٔ
[`backend/`](./backend) قرار دارد و آورده شده تا بتوانی کل پروژه را لوکال اجرا
کنی و رابط کاربری را در عمل ببینی.

</div>

<a id="features"></a>

## امکانات

<div dir="rtl">

| | |
|---|---|
| **حساب کاربری** | ثبت‌نام و ورود با ایمیل و رمز، سشن داخل کوکی http-only |
| **فید** | ساخت پست با عکس اختیاری، ویرایش و حذف پست‌های خودت |
| **لایک** | خوش‌بینانه — قلب همان لحظه عوض می‌شود و اگر سرور رد کرد برمی‌گردد |
| **کامنت** | افزودن، ویرایش و حذف، ارسال با `Ctrl` / `Cmd` + `Enter` |
| **پروفایل** | بیو، موقعیت، وب‌سایت، آواتار، تاریخ عضویت و تب‌های پست و لایک |
| **دنبال کردن** | فالو و آنفالو، همراه با لیست فالوورها و فالوینگ‌ها |
| **اعلان‌ها** | لایک، کامنت و فالو، با نشانگر خوانده‌نشده در هدر |
| **جستجو** | پیدا کردن کاربران با نام یا ایمیل |
| **تم** | روشن و تیره — بار اول از سیستم پیروی می‌کند و بعد به خاطر می‌ماند |
| **کیبورد و دسترس‌پذیری** | مودال‌ها با `Esc` بسته می‌شوند و صفحهٔ پشتشان قفل می‌شود، همهٔ کنترل‌ها با کیبورد قابل دسترس‌اند |

</div>

<a id="tech-stack"></a>

## تکنولوژی‌ها

<div dir="rtl">

**فرانت‌اند** — ریشهٔ مخزن

| | |
|---|---|
| فریم‌ورک | React 19 + TypeScript با Vite 8 |
| استایل | Tailwind CSS v4 |
| مسیریابی | React Router v7 |
| مدیریت داده سرور | TanStack Query v5 |
| مدیریت state | Zustand |
| فرم‌ها | React Hook Form |
| ارتباط با سرور | Axios |
| آیکون و توست | lucide-react و react-hot-toast |

**API** — پوشهٔ [`backend/`](./backend)

| | |
|---|---|
| فریم‌ورک | Next.js 15 با App Router |
| دیتابیس | PostgreSQL از طریق Prisma 6 |
| احراز هویت | better-auth |
| اعتبارسنجی | Zod |
| ذخیرهٔ فایل | Uploadcare |

</div>

---

<a id="getting-started"></a>

## شروع به کار

<div dir="rtl">

به **دو ترمینال** نیاز داری: یکی برای API و یکی برای فرانت‌اند. اول API را بالا
بیاور، چون فرانت‌اند روی `http://localhost:3000` صدایش می‌زند.

<a id="prerequisites"></a>

### پیش‌نیازها

- [Node.js](https://nodejs.org) نسخهٔ ۲۰ به بالا
- یک دیتابیس PostgreSQL — پایین‌تر توضیح داده شده، لازم نیست دیتای خودت را بیاوری
- یک کلید عمومی [Uploadcare](https://uploadcare.com) — فقط برای آپلود عکس

<a id="database"></a>

### دیتابیس را از کجا بیاوریم

این مخزن دیتابیس ندارد (هیچ‌کس رشتهٔ اتصال دیتابیس خودش را منتشر نمی‌کند). در
عوض چیز بهتری دارد: **کل ساختار دیتابیس** در
[`backend/prisma/migrations/`](./backend/prisma/migrations) است، پس با یک دستور
تمام جدول‌ها ساخته می‌شوند. فقط به یک Postgres خالی نیاز داری که با دو راه ساده
به دست می‌آید.

**راه اول — داکر، بدون هیچ ثبت‌نامی**

</div>

```bash
cd backend
docker compose up -d db
```

<div dir="rtl">

این دستور Postgres را روی پورت ۵۴۳۲ با یک دیتابیس خالی به اسم `socially` بالا
می‌آورد، پس رشتهٔ اتصال تو می‌شود:

</div>

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/socially"
```

<div dir="rtl">

**راه دوم — یک Postgres رایگان ابری**

روی [Neon](https://neon.tech)، [Supabase](https://supabase.com) یا
[Prisma Postgres](https://www.prisma.io/postgres) یک دیتابیس رایگان بساز و رشتهٔ
اتصالی که می‌دهند را کپی کن. حدود دو دقیقه طول می‌کشد.

در هر دو حالت، جدول‌ها در گام ۱ برایت ساخته می‌شوند.

<a id="start-api"></a>

### ۱. بالا آوردن API

</div>

```bash
cd backend
npm install
```

<div dir="rtl">

دستور `npm install` کلاینت Prisma را هم برایت می‌سازد.

حالا فایل محیطی را از روی نمونه بساز و پرش کن:

</div>

```bash
cp .env.example .env
```

<div dir="rtl">

| متغیر | توضیح |
|---|---|
| `DATABASE_URL` | رشتهٔ اتصالی که از راه اول یا دوم گرفتی |
| `BETTER_AUTH_SECRET` | کلید امضای سشن‌ها — با `openssl rand -hex 32` بساز |
| `BETTER_AUTH_URL` | آدرسی که API روی آن اجرا می‌شود، در توسعه `http://localhost:3000` |
| `NEXT_PUBLIC_UPLOADCARE_API_KEY` | کلید عمومی Uploadcare |
| `NEXT_PUBLIC_UPLOADCARE_CDN_CNAME` | آدرس CDN آپلودکر |

جدول‌ها را بساز و سرور را اجرا کن:

</div>

```bash
npx prisma migrate deploy   # همهٔ جدول‌ها را از روی migrationهای همین مخزن می‌سازد
npm run dev
```

<div dir="rtl">

حالا API روی **http://localhost:3000** بالا است. این ترمینال را باز بگذار.

<a id="start-frontend"></a>

### ۲. بالا آوردن فرانت‌اند

در یک ترمینال دوم، از ریشهٔ مخزن:

</div>

```bash
npm install
npm run dev
```

<div dir="rtl">

آدرس **http://localhost:5173** را باز کن، ثبت‌نام کن و وارد شو. دیتابیس خالی
شروع می‌شود، پس دو تا حساب بساز تا فالو، اعلان و کامنت را در عمل ببینی.

> [!IMPORTANT]
> این API فقط درخواست‌های `http://localhost:5173` را قبول می‌کند. اگر فرانت‌اند
> را روی پورت دیگری اجرا کردی، مقدار `Access-Control-Allow-Origin` در
> `backend/middleware.ts` و `trustedOrigins` در `backend/lib/auth.ts` را هم عوض
> کن، وگرنه ورود کار نمی‌کند.

</div>

---

<a id="project-structure"></a>

## ساختار پروژه

```
.
├── src/                    # فرانت‌اند React
│   ├── components/
│   │   ├── Ui/             # اجزای کوچک مشترک (Avatar، Button، Spinner، TextField…)
│   │   ├── home/           # فید و باکس ارسال پست
│   │   ├── post/           # کارت پست، بخش کامنت و مودال‌هایشان
│   │   ├── profile/        # کارت پروفایل، تب‌ها و مودال‌ها
│   │   └── notification/   # ردیف‌های اعلان
│   ├── hooks/              # برای هر کوئری یا میوتیشن یک هوک
│   ├── services/           # نمونهٔ axios و فراخوانی‌های API
│   ├── store/              # استور احراز هویت با zustand
│   ├── types/              # تایپ‌های مشترک
│   ├── utils/              # توابع کمکی
│   ├── layout/             # قالب کلی صفحه
│   ├── pages/              # برای هر مسیر یک فایل
│   └── routes/             # تعریف روتر
│
└── backend/                # APIای که فرانت با آن کار می‌کند
    ├── app/api/            # route handlerها - کل سطح API
    ├── prisma/             # اسکیما و migrationها
    ├── lib/                # کلاینت prisma و تنظیمات auth
    ├── data/               # کوئری‌های دیتابیس
    └── schemas/            # اسکیماهای zod
```

---

<a id="api-reference"></a>

## مرجع API

<div dir="rtl">

همهٔ مسیرها با `/api` شروع می‌شوند. ستون «ورود» یعنی کوکی سشن معتبر لازم است.

**احراز هویت**

</div>

| متد | مسیر | ورود | توضیح |
|---|---|:--:|---|
| `POST` | `/authentication/register` | – | ساخت حساب |
| `POST` | `/authentication/login` | – | ورود و گرفتن کوکی سشن |
| `POST` | `/authentication/logout` | – | خروج |
| `GET` | `/authentication/session` | ✔ | سشن و کاربر فعلی |

**پست‌ها**

| متد | مسیر | ورود | توضیح |
|---|---|:--:|---|
| `GET` | `/posts` | – | فید، جدیدترین اول |
| `POST` | `/posts` | ✔ | ساخت پست |
| `PUT` | `/posts/:id` | ✔ | ویرایش پست خودت |
| `PATCH` | `/posts/:id` | ✔ | لایک / آنلایک |
| `DELETE` | `/posts/:id` | ✔ | حذف پست خودت |

**کامنت‌ها**

| متد | مسیر | ورود | توضیح |
|---|---|:--:|---|
| `POST` | `/posts/:id/comment` | ✔ | افزودن کامنت |
| `PUT` | `/posts/:id/comment/:commentId` | ✔ | ویرایش کامنت خودت |
| `DELETE` | `/posts/:id/comment/:commentId` | ✔ | حذف کامنت خودت |

**کاربرها**

| متد | مسیر | ورود | توضیح |
|---|---|:--:|---|
| `GET` | `/users/:username/profile` | – | پروفایل عمومی |
| `GET` | `/users/:id/posts` | – | پست‌های یک کاربر |
| `GET` | `/users/:id/likes` | – | پست‌هایی که کاربر لایک کرده |
| `GET` | `/users/:id/followers` | ✔ | لیست فالوورها |
| `GET` | `/users/:id/followings` | ✔ | لیست فالوینگ‌ها |
| `PUT` | `/users/:id` | ✔ | ویرایش پروفایل خودت |
| `PATCH` | `/users/:id` | ✔ | فالو / آنفالو |
| `GET` | `/users/search?q=` | ✔ | جستجوی کاربران |
| `GET` | `/users/recommend` | ✔ | کاربران پیشنهادی |

**سایر**

| متد | مسیر | ورود | توضیح |
|---|---|:--:|---|
| `GET` | `/notifications` | ✔ | اعلان‌های تو |
| `PATCH` | `/notifications` | ✔ | خوانده‌شده کردن اعلان‌ها |
| `POST` | `/upload` | – | آپلود عکس روی Uploadcare |

---

<a id="scripts"></a>

## دستورها

<div dir="rtl">

**ریشه — فرانت‌اند**

| دستور | توضیح |
|---|---|
| `npm run dev` | اجرای سرور توسعه روی پورت ۵۱۷۳ |
| `npm run build` | بررسی تایپ‌ها و ساخت نسخهٔ production در `dist/` |
| `npm run preview` | اجرای لوکال نسخهٔ ساخته‌شده |
| `npm run lint` | اجرای ESLint |

**پوشهٔ `backend/` — API**

| دستور | توضیح |
|---|---|
| `npm run dev` | اجرای API روی پورت ۳۰۰۰ |
| `npm run build` | ساخت نسخهٔ production |
| `npm run start` | اجرای نسخهٔ ساخته‌شده |
| `npm run lint` | اجرای ESLint |

</div>

---

<a id="notes"></a>

## نکته‌های پیاده‌سازی

<div dir="rtl">

- **لایک خوش‌بینانه.** لایک قبل از تمام شدن درخواست، مستقیم روی کش React Query
  نوشته می‌شود تا قلب همان لحظه واکنش نشان دهد، و اگر API رد کرد کش قبلی برمی‌گردد.
- **اعتبارسنجی در هر دو طرف.** API برای پست ۵ تا ۳۰۰ کاراکتر و برای کامنت حداقل
  ۵ کاراکتر می‌خواهد و لایک روی پست خودت را رد می‌کند. رابط کاربری هم همین
  قانون‌ها را رعایت می‌کند تا قبل از ارسال متوجه شوی.
- **کوئری‌های مقاوم.** خطای `4xx` یک جواب واقعی حساب می‌شود و بقیه دوباره تلاش
  می‌شوند، پس یک لغزش لحظه‌ای سرور تو را از حساب بیرون نمی‌اندازد.
- **اندازهٔ عکس‌ها.** آپلودها روی Uploadcare می‌روند و CDN همان‌جا تغییر اندازه
  می‌دهد، پس فید نسخهٔ کوچک را می‌گیرد نه فایل اصلی.
- **تم.** سطح‌ها یک مقیاس ارتفاع دارند — در تم روشن کارت با سایه شناور می‌شود و
  در تم تیره با روشن‌تر بودن از پس‌زمینه بالا می‌آید.
- **کلیدهای محرمانه.** در `backend/.env` هستند که در گیت نادیده گرفته می‌شود.
  فقط `.env.example` با مقادیر نمونه منتشر می‌شود.

</div>

---

<a id="author"></a>

## نویسنده

<div dir="rtl">

**مهان قادری**

</div>

<a id="license"></a>

## لایسنس

<div dir="rtl">

فرانت‌اند تحت لایسنس MIT منتشر شده — فایل [LICENSE](./LICENSE) را ببین.
API داخل `backend/` محتوای آموزشی شخص ثالث است و مشمول این لایسنس نیست.

</div>

<a id="acknowledgements"></a>

## قدردانی

<div dir="rtl">

ساخته‌شده به‌عنوان پروژهٔ پایانی **بوت‌کمپ فرانت‌اند کوئرا**.

</div>
