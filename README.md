# MoniMobile

A React Native mobile application built with TypeScript, providing a comprehensive solution for business management and monitoring.

## Author

**teramuza**  
GitHub: [@teramuza](https://github.com/teramuza)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Running the Backend Server](#running-the-backend-server)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed with minimum versions:

### Core Development Tools

- **Node.js** >= 18.x (tested with v22.18.0) - [Download](https://nodejs.org/)
- **npm** >= 10.x (tested with v10.9.3) or **Yarn** >= 1.22.x (tested with v1.22.22) - Package manager
- **React Native CLI** (optional, can use via npx) - Install globally: `npm install -g react-native-cli`

### iOS Development (macOS only)

- **Xcode** >= 15.0 (tested with Xcode 15.x) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods** >= 1.16.x (tested with v1.16.2) - Install: `sudo gem install cocoapods`

### Android Development

- **Android Studio** - [Download](https://developer.android.com/studio)
- **Java Development Kit (JDK)** >= 17 (tested with OpenJDK 17.0.12 LTS) - Required for Android development
  - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)

### Additional Requirements for Backend Server

- **PostgreSQL** >= 14.x (tested with PostgreSQL 14.18) - Database server
- **Docker** and **Docker Compose** (optional, for database setup via Docker)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd MoniMobile
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Install iOS dependencies** (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Environment Configuration

This project uses environment-specific configuration files. Configure your environment variables before running the application.

### Available Environment Files

- `.env.staging` - Staging environment configuration
- `.env.production` - Production environment configuration

### Configuration Variables

Edit the `.env.production` file (or `.env.staging` for staging) with your configuration:

```env
# API Base URL (without trailing slash)
API_URL=https://your-api-domain.com

# Enable console logging (true/false)
ENABLE_CONSOLE_LOG=false
```

**Important Notes:**
- Do not include trailing slashes in `API_URL`
- The API URL should be the base URL without `/api/v1` (this is appended automatically)
- For local development, use `http://localhost:4000` (or your backend port)
- Ensure `ENABLE_CONSOLE_LOG` is set to `false` in production builds

### Environment Selection

The project uses `react-native-config` to load environment variables. The environment file is selected based on the build command you use (see [Running the Application](#running-the-application)).

## Running the Application

### Start Metro Bundler

First, start the Metro bundler in a terminal:

```bash
yarn start
# or
npm start
```

Keep this terminal running while developing.

### Run on iOS

**For Staging:**
```bash
yarn ios:staging
```

**For Production:**
```bash
yarn ios:prod
```

**Note:** On first run or after updating native dependencies, you may need to install CocoaPods:
```bash
cd ios
pod install
cd ..
```

### Run on Android

**For Staging:**
```bash
yarn android:staging
```

**For Production:**
```bash
yarn android:prod
```

**Note:** Ensure you have an Android emulator running or a device connected via USB with USB debugging enabled.

## Running the Backend Server

The mobile application requires the backend server (`moni-server`) to be running. Follow these steps:

### Prerequisites

1. Navigate to the backend server directory:
   ```bash
   cd ../moni-server
   ```

2. Install backend dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Database Setup

The backend uses PostgreSQL. You can set it up using Docker Compose:

```bash
# Start PostgreSQL database using Docker Compose
yarn db:up
# or
npm run db:up
```

Alternatively, ensure you have PostgreSQL running locally and configure the connection in the backend's `.env` file.

### Start the Backend Server

**For Development:**
```bash
# Prepare development environment
yarn prepare:dev
# or
npm run prepare:dev

# Start the development server
yarn dev
# or
npm run dev
```

**For Staging:**
```bash
# Prepare staging environment
yarn prepare:staging
# or
npm run prepare:staging

# Start the server
yarn start
# or
npm start
```

The backend server typically runs on `http://localhost:4000` by default. Verify the port in the backend's `.env` file.

### Verify Backend is Running

You can verify the backend is running by visiting:
- `http://localhost:4000/api/v1/health` (or your configured health endpoint)

**Important:** Ensure the `API_URL` in your mobile app's `.env.staging` or `.env.production` matches your backend server URL.

## Building for Production

### iOS Production Build

**Debug Build:**
```bash
yarn ios:prod
```

**Release Build:**
```bash
yarn ios:prod-release
```

**Generate Release Bundle:**
```bash
yarn ios:bundle:assets
```

### Android Production Build

**Debug APK:**
```bash
yarn android:prod
```

**Release APK:**
```bash
yarn android:prod-release
```

**Generate Release APK:**
```bash
yarn android:production-release-apk
```

**Generate Release Bundle (AAB):**
```bash
yarn android:production-release-Bundle
```

The generated APK/AAB files will be located in:
- APK: `android/app/build/outputs/apk/`
- AAB: `android/app/build/outputs/bundle/productionRelease/`

You can open these directories automatically using:
```bash
yarn open-apk      # Opens APK directory
yarn open-bundle  # Opens AAB directory
```

## Project Structure

```
MoniMobile/
├── src/
│   ├── constants/       # App configuration and constants
│   ├── networks/        # API clients and network utilities
│   ├── scenes/          # Screen components
│   ├── stores/          # State management (Zustand)
│   ├── utils/           # Utility functions
│   └── type/            # TypeScript type definitions
├── android/             # Android native code
├── ios/                 # iOS native code
├── .env.staging         # Staging environment variables
├── .env.production      # Production environment variables
└── package.json         # Project dependencies and scripts
```

## Troubleshooting

### Metro Bundler Issues

If Metro bundler fails to start:
```bash
# Clear Metro cache
yarn start --reset-cache
```

### iOS Build Issues

**CocoaPods Issues:**
```bash
# Clean and reinstall pods
yarn ios:Pod:Reset
```

**Complete iOS Clean:**
```bash
yarn ios:clean
```

### Android Build Issues

**Clean Android Build:**
```bash
yarn android:clean
```

**Gradle Issues:**
```bash
cd android
./gradlew clean
cd ..
```

### Node Modules Issues

**Clean and reinstall dependencies:**
```bash
yarn node:clean
```

### Environment Variables Not Loading

- Ensure you're using the correct build command (`ios:staging` vs `ios:prod`)
- Verify the `.env` file exists and has correct syntax (no spaces around `=`)
- For iOS, you may need to rebuild the app after changing `.env` files
- For Android, ensure the environment file is properly configured in `react-native-config`

### Backend Connection Issues

- Verify the backend server is running: `curl http://localhost:4000/api/v1/health`
- Check that `API_URL` in `.env.staging` or `.env.production` matches your backend URL
- Ensure no firewall is blocking the connection
- For Android emulator, use `http://10.0.2.2:4000` instead of `http://localhost:4000`
- For iOS simulator, `http://localhost:4000` should work

### Port Already in Use

If port 4000 is already in use:
- Change the backend server port in `moni-server/.env`
- Update `API_URL` in the mobile app's `.env` files accordingly

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
