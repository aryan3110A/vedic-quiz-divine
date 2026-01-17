# Building the Shikshapatri Android APK

This guide explains how to build and update the Android APK for the Shikshapatri app.

## Prerequisites

✅ All installed:
- Node.js and npm
- JDK 17+
- Android Studio
- Capacitor (installed in project)

## Quick Build Commands

### For Future Updates

When you make changes to your web app, run:

```bash
# 1. Build the web app and sync to Android
npm run android:sync

# 2. Open in Android Studio
npm run android:open

# 3. In Android Studio: Build → Generate App Bundles or APKs → Generate APKs
```

Your APK will be located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Alternative: Build via Command Line

```bash
# From project root
cd android
gradlew assembleDebug

# APK will be in: app/build/outputs/apk/debug/app-debug.apk
```

## App Configuration

### App Details
- **App Name**: Shikshapatri
- **Package ID**: com.shikshapatri.app
- **Fullscreen Mode**: ✅ Enabled (immersive mode, no status/navigation bars)

### Changing App Name or Package ID

Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.your.package',  // Change package ID
  appName: 'Your App Name',    // Change app name
  // ...
};
```

Then run:
```bash
npm run android:sync
```

## Fullscreen Configuration

The app is configured for true fullscreen experience:

1. **MainActivity.java** - Enables immersive mode (hides status bar and navigation bar)
2. **AndroidManifest.xml** - Configures window flags
3. **styles.xml** - Applies fullscreen theme

Users will see:
- ✅ No browser UI
- ✅ No status bar
- ✅ No navigation bar
- ✅ Looks 100% like a native Android app

## Installing APK on Android Studio

1. **Open Android Studio**
2. **File → Open** → Select `android` folder
3. **Wait for Gradle sync**
4. **Build → Generate App Bundles or APKs → Generate APKs**
5. APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Installing APK on Device

### Method 1: Android Studio
1. Connect Android device via USB
2. Enable USB Debugging on device
3. In Android Studio: Run → Run 'app'

### Method 2: APK File
1. Copy `app-debug.apk` to device
2. Enable "Install from Unknown Sources" in device settings
3. Tap APK file to install

## Customizing App Icon

1. Create app icons in various sizes (512x512 recommended)
2. Use Android Studio's Image Asset tool:
   - Right-click `res` → New → Image Asset
   - Select your icon image
   - Generate all sizes automatically
3. Run `npm run android:sync`

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
cd android
gradlew clean
gradlew assembleDebug
```

### Changes Not Showing
```bash
# Always sync after web changes
npm run build
npx cap sync android
```

### Storage Space Error
If you see "problem parsing package" or installation fails, ensure you have at least 150 MB free space on your device.
