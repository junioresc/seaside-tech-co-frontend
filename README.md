# Seaside Tech Co - Frontend

A modern, mobile-first Next.js App Router frontend for a device repair and technical services platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript (strict mode)
- **UI Library**: Material UI v5 with custom theming and dark mode
- **Data Fetching**: TanStack Query v5 + Axios (custom JWT client)
- **Forms**: react-hook-form + Zod validation
- **State Management**: React Query for server state, React Context for client state
- **Authentication**: Custom JWT with httpOnly refresh cookies
- **Real-time**: WebSocket client for live updates
- **Testing**: Vitest + React Testing Library, Cypress (E2E)
- **Development**: ESLint, Prettier, Husky pre-commit hooks, Storybook

## Features

### Public Features
- 🏠 Marketing homepage with service listings
- 📦 Product catalog with ISR (Incremental Static Regeneration)
- 📅 Appointment booking with time slot selection
- 🔍 Repair status tracking with QR codes
- 📱 Device check-in flow

### Customer Portal
- 👤 Account management
- 🛠️ Repair history
- 📆 Appointment management
- 🛒 Shopping cart

### Technician Portal
- 📋 Mobile-first schedule view
- 🔧 Repair detail with optimistic updates
- 📊 Line item management
- 🖨️ Printable repair labels with QR codes
- 📈 Analytics dashboard

## Project Structure

```
/app                    # Next.js App Router
  /(public)            # Public routes
  /(auth)              # Authentication routes
  /(customer)          # Customer portal
  /(tech)              # Technician portal
/components            # Reusable UI components
/features              # Feature-specific code
  /auth               # Authentication logic
  /booking            # Booking functionality
  /cart               # Shopping cart
  /repairs            # Repair management
/lib
  /api                # Axios client & API endpoints
  /auth               # Token management
  /react-query        # Query client config
  /utils              # Utility functions
  /websocket          # WebSocket client
/providers            # React context providers
/types                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend repo)

### Installation

1. Clone the repository
```bash
cd seaside-tech-co-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run validate` - Run all validation checks
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run Vitest with UI
- `npm run cypress` - Open Cypress
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Key Features

### Authentication & Authorization

- Custom JWT authentication with refresh token rotation
- In-memory access token storage (no localStorage)
- HttpOnly refresh cookies for security
- Automatic token refresh on 401 responses
- Role-based route protection (customer, technician, admin)

### Optimistic Updates

Implemented for fast UX in:
- Repair status changes
- Line item management
- Cart operations

```typescript
// Example: Optimistic status update
const updateStatusMutation = useMutation({
  mutationFn: ({ id, status }) => api.patch(`/repairs/${id}/`, { status }),
  onMutate: async ({ id, status }) => {
    await queryClient.cancelQueries(['repairs', id]);
    const prev = queryClient.getQueryData(['repairs', id]);
    queryClient.setQueryData(['repairs', id], (old) => ({ ...old, status }));
    return { prev };
  },
  onError: (_, { id }, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(['repairs', id], ctx.prev);
  },
  onSettled: (_, __, { id }) => {
    queryClient.invalidateQueries(['repairs', id]);
  },
});
```

### Real-time Updates

WebSocket client for live repair queue updates:
```typescript
import { useWebSocketUpdates } from '@/lib/websocket/hooks';

// In component
useWebSocketUpdates();
```

### Theme Customization

Material UI custom theme with:
- Brand colors
- Dark mode support
- Responsive breakpoints
- Custom component variants

Toggle theme:
```typescript
import { useThemeMode } from '@/providers/ThemeProvider';

const { mode, toggleTheme } = useThemeMode();
```

## Code Quality

- **TypeScript**: Strict mode enabled with additional checks
- **ESLint**: Configured with Next.js, TypeScript, and React rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for linting and formatting
- **Lint-staged**: Run checks on staged files only

## Testing

### Unit & Integration Tests (Vitest)

```bash
npm run test
```

### E2E Tests (Cypress)

```bash
# Interactive mode
npm run cypress

# Headless mode
npm run cypress:headless
```

## Storybook

Component documentation and development:

```bash
npm run storybook
```

Build Storybook:
```bash
npm run build-storybook
```

## Deployment

### Build for production

```bash
npm run build
```

### Environment Variables

Required for production:
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL

## Architecture Decisions

### Why Custom JWT instead of NextAuth?

- More control over token refresh logic
- Simpler integration with existing Django backend
- No session storage needed
- Better support for mobile-first workflows

### Why Material UI?

- Comprehensive component library
- Built-in theming and dark mode
- Excellent TypeScript support
- Mobile-responsive by default

### Why TanStack Query?

- Powerful caching and synchronization
- Built-in support for optimistic updates
- Automatic background refetching
- Great developer experience

## Contributing

1. Create a feature branch
2. Make your changes
3. Run validation: `npm run validate`
4. Submit a pull request

## License

See LICENSE file for details.
