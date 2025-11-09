# Aegis Mission Control

A visually stunning, NASA-style mission control dashboard for tracking rocket launches with detailed, real-time statistics.

[cloudflarebutton]

Aegis Mission Control is a sophisticated, visually stunning web application designed to emulate a NASA-style mission control center. It provides a comprehensive dashboard for tracking upcoming, live, and past rocket launches. The interface is information-dense yet clean, featuring a modular grid of data panels displaying critical launch statistics.

## Key Features

-   **Immersive Dashboard**: A single-page, information-dense interface styled after a real mission control center.
-   **Mission Tracking**: Monitor upcoming, live, and past rocket launches.
-   **Dynamic Data Panels**: A modular grid displays critical launch data, including telemetry, weather, and rocket specifications.
-   **Live Countdown**: A prominent countdown timer for the next scheduled mission.
-   **Interactive Mission Selection**: Browse and select missions from a sidebar to dynamically update the entire dashboard.
-   **Futuristic UI**: A dark-themed, polished interface with glowing elements, precise typography, and smooth animations.

## Technology Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **UI Components**: shadcn/ui, Lucide React
-   **State Management**: Zustand
-   **Animations**: Framer Motion
-   **Data Visualization**: Recharts
-   **Date/Time**: date-fns
-   **Backend**: Hono on Cloudflare Workers
-   **Storage**: Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/)
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated:
    ```bash
    bun install -g wrangler
    wrangler login
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd aegis-mission-control
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

## Running Locally

To start the development server, which includes the Vite frontend and the Wrangler dev server for the backend worker, run:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Development

The project is organized into three main directories:

-   `src/`: Contains the React frontend application code, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the Hono backend application running on Cloudflare Workers. API routes and data entities are defined here.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and the backend to ensure type safety.

### Adding API Endpoints

New API routes should be added in `worker/user-routes.ts`. Data persistence is handled through entity abstractions in `worker/entities.ts`, which interact with a global Cloudflare Durable Object.

## Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    ```bash
    bun run deploy
    ```

This command will build the application and deploy it to your Cloudflare account using the configuration in `wrangler.jsonc`.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[cloudflarebutton]

## License

This project is licensed under the MIT License.