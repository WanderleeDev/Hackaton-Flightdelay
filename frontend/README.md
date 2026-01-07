# Flight Prediction Engine

AI-powered flight delay and safety prediction engine built for the **NoCountry Hackathon**.

## ✈️ Features

- **Real-time Prediction**: Predict flight delays using machine learning models and atmospheric data
- **Interactive Map**: Visualize flight routes with an interactive global map
- **Batch Processing**: Upload CSV files for bulk flight predictions
- **Prediction History**: Track and review all predictions with detailed status reports
- **Dark/Light Mode**: Full theme support with smooth transitions

## 🛠️ Tech Stack

| Category      | Technologies                   |
| ------------- | ------------------------------ |
| Framework     | Next.js 16, TypeScript         |
| Styling       | Tailwind CSS v4, CSS Variables |
| UI Components | Shadcn/ui, Radix UI            |
| Maps          | MapLibre GL                    |
| Forms         | React Hook Form, Zod           |
| Icons         | Lucide React                   |
| State         | Zustand                        |

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── history/            # Prediction history
│   └── actions/            # Server actions
├── components/
│   ├── shared/             # Shared UI components
│   └── ui/                 # Shadcn UI components
└── src/
    └── modules/            # Feature modules
        ├── about/          # About page components
        ├── history/        # History components
        ├── prediction/     # Prediction form & map
        └── shared/         # Shared utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🎨 Theme Configuration

The app uses CSS custom properties for theming. Colors are defined in `app/globals.css`:

- Light mode: Clean, bright interface
- Dark mode: Emerald-accented dark theme

## 👥 Team

Built by **Equipo 36** for NoCountry Hackathon H12-25-L.

## 📄 License

This project is part of the NoCountry Hackathon.
