## About

Tavitter is a web application inspired by Twitter that offers a simplified version of its features. This project consists of two other parts, the [backend](https://github.com/patkamon/microservice-tweet) and [cloud deployment using AWS](https://github.com/some-random-idiot/tavitter).

## Setup .env for development

Create `.env.local` file with this following code and place into the `front` folder

    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-key
    NEXT_PUBLIC_TURNSTILE_SECRET_KEY=your-key

    NEXT_PUBLIC_GITHUB_ID=your-key
    NEXT_PUBLIC_GITHUB_SECRET=your-key

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
