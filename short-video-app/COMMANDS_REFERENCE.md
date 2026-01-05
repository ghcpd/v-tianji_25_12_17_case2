# Development Commands Reference

## Quick Start

### 1. Navigate to Project Directory
```bash
cd c:\Users\v-tianji\Desktop\ghcpd\Claude-haiku-4.5\short-video-app
```

### 2. Install Dependencies (First Time Only)
```bash
npm install
```
**Expected Output**:
```
added 294 packages, and audited 295 packages in 46s
```

---

## Running the Application

### Start Development Server
```bash
npm run dev
```
**Expected Output**:
```
VITE v5.4.21 ready in 490 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Access the Application**:
- Open browser and navigate to: http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Testing

### Run All Tests (One Time)
```bash
npm test -- --run
```
**Expected Output**:
```
✅ Test Files  4 passed (4)
✅ Tests       70 passed (70)
✅ Duration    13.31s
```

### Run Tests in Watch Mode (Continuous)
```bash
npm test
```
The tests will re-run automatically whenever files change.

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

---

## Test Files Overview

### 1. VideoCard Component Tests
**File**: `src/__tests__/VideoCard.test.jsx`
**Tests**: 14
**Coverage**:
- Rendering with all elements
- Props and state management
- User interactions (like, follow, comment, share)
- Visual state changes
- CSS class application

### 2. VideoFeed Component Tests
**File**: `src/__tests__/VideoFeed.test.jsx`
**Tests**: 21
**Coverage**:
- Feed container rendering
- Multiple video rendering
- Scroll indicator
- Interactive button handling
- Keyboard navigation
- State management

### 3. Custom Hooks Tests
**File**: `src/__tests__/hooks.test.js`
**Tests**: 16
**Coverage**:
- `useVideoFeed` hook functionality
- `useScrollFeed` hook functionality
- State management logic
- Event handlers
- Multiple state transitions

### 4. Mock Data Tests
**File**: `src/__tests__/mockData.test.js`
**Tests**: 19
**Coverage**:
- Data structure validation
- Required properties presence
- Data type validation
- Value range validation
- Uniqueness checks

---

## Project Structure Navigation

### Main Application Files
```
src/
├── App.jsx                 # Root component
├── main.jsx               # Entry point
```

### Component Files
```
src/components/
├── VideoFeed.jsx          # Main video feed container
├── VideoCard.jsx          # Individual video card
```

### Hooks (State Management)
```
src/hooks/
├── useVideoFeed.js        # Like/follow state management
```

### Utilities & Data
```
src/utils/
├── mockData.js            # 6 mock videos for testing
```

### Styling
```
src/styles/
├── App.css                # Root styles
├── VideoFeed.css          # Feed styling
├── VideoCard.css          # Card styling + animations
```

### Tests
```
src/__tests__/
├── setup.js               # Test environment setup
├── VideoCard.test.jsx     # Component tests
├── VideoFeed.test.jsx     # Integration tests
├── hooks.test.js          # Hook tests
├── mockData.test.js       # Data tests
```

### Configuration Files
```
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite build configuration
├── vitest.config.js       # Test configuration
├── index.html             # HTML template
├── .gitignore             # Git ignore rules
```

---

## Troubleshooting

### Port 5173 Already in Use
If the dev server fails to start because port 5173 is in use:
```bash
# Option 1: Use a different port
npm run dev -- --port 5174

# Option 2: Kill the process using the port (Windows PowerShell)
lsof -ti:5173 | xargs kill -9
```

### Tests Not Running
If tests fail to start:
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm test -- --run
```

### Module Not Found Errors
```bash
# Clear Vite cache
rm -r .vite

# Rebuild
npm run dev
```

---

## Performance Metrics

### Development Server Startup
- **Time**: ~490ms
- **Module Transform**: ~538ms
- **Setup Time**: ~34.65s
- **Collection**: ~3.01s

### Test Execution
- **Total Duration**: 13.31s
- **Environment Setup**: 8.61s
- **Test Execution**: 0.813s
- **Transform**: 0.538s

### Build Optimization
- Modern JS (ES6+)
- CSS-in-JS with Vite
- Tree-shaking enabled
- Code splitting ready

---

## Environment Variables

Create a `.env.local` file in the project root for environment-specific configuration:

```env
# Optional: Customize Vite config
# VITE_API_URL=http://localhost:3000
# VITE_ENV=development
```

---

## Git Commands

### Initialize Repository (if needed)
```bash
git init
git add .
git commit -m "Initial commit: TikTok-style video feed"
```

### View Changes
```bash
git status
git diff
```

---

## Useful npm Scripts

All available scripts from `package.json`:
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

---

## Additional Resources

### Documentation
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)

### Project Files
- Main Summary: `PROJECT_SUMMARY.md`
- This Reference: `COMMANDS_REFERENCE.md`

---

**Last Updated**: December 17, 2025
**Status**: ✅ All systems operational
