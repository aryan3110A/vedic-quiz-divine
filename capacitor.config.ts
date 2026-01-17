import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.shikshapatri.app',
    appName: 'Shikshapatri',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        StatusBar: {
            style: 'dark',
            backgroundColor: '#000000',
            overlaysWebView: false,
        },
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#000000',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
        }
    },
    android: {
        allowMixedContent: true,
        captureInput: true,
        webContentsDebuggingEnabled: false
    }
};

export default config;
