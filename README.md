# NoteHub — Next.js

Багатосторінковий застосунок для керування особистими нотатками. Рефакторинг
попередньої SPA-версії (Vite) на **Next.js 15 App Router** з поєднанням SSR та CSR.

## Технології

- Next.js 15 (App Router) + TypeScript
- TanStack Query v5 — SSR-prefetch із гідратацією кешу
- axios — HTTP-запити
- CSS Modules — стилізація
- Formik + Yup — форма створення нотатки
- react-paginate, use-debounce

## Маршрути

| Маршрут | Опис | Рендеринг |
| --- | --- | --- |
| `/` | Головна сторінка з описом застосунку | Статичний |
| `/notes` | Список нотаток, пошук, створення | SSR + prefetch, далі CSR |
| `/notes/[id]` | Деталі однієї нотатки | SSR + prefetch, далі CSR |

## Структура

```
app/
├── layout.tsx              # TanStackProvider + Header + Footer
├── page.tsx                # Home
├── loading.tsx             # стан завантаження для всіх маршрутів
└── notes/
    ├── page.tsx            # SSR: prefetch(['notes', 1, ''])
    ├── Notes.client.tsx    # клієнтська логіка списку
    ├── NoteDetails.client.tsx
    ├── error.tsx
    └── [id]/
        ├── page.tsx        # SSR: prefetch(['note', id])
        └── error.tsx
components/                 # компоненти, не прив'язані до маршруту
lib/api.ts                  # axios-інстанс і функції роботи з API
types/note.ts               # спільні типи та інтерфейси
```

## Запуск

```bash
npm install
cp .env.example .env.local   # і вписати свій токен
npm run dev
```

## Змінні оточення

| Змінна | Опис |
| --- | --- |
| `NEXT_PUBLIC_NOTEHUB_TOKEN` | Персональний токен доступу до NoteHub API |

> Префікс `NEXT_PUBLIC_` означає, що токен вбудовується у клієнтський бандл і
> видимий у браузері. Це вимога навчального завдання — не використовуйте цей
> підхід для продакшн-секретів.

## Скрипти

| Команда | Дія |
| --- | --- |
| `npm run dev` | Дев-сервер |
| `npm run build` | Продакшн-збірка |
| `npm start` | Запуск продакшн-збірки |
| `npm run format` | Форматування Prettier |

## Деплой

Проєкт готовий до розгортання на Vercel. Не забудьте додати
`NEXT_PUBLIC_NOTEHUB_TOKEN` у налаштуваннях Environment Variables проєкту.
