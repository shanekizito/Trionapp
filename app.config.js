
import 'dotenv/config'

export default{
  "expo": {
    "name": "on-the-go",
    
    "slug": "on-the-go",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "packagerOpts": {
      "sourceExts": ["cjs"] 
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "on.the.go",
    
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#FFFFFF",
       
      },
      "package": "on.the.go"
    },
    "web": {
      "favicon": "./assets/icon.png"
    },
   
      
      "extra": {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        FLW_PUBLIC_KEY:process.env.FLW_PUBLIC_KEY,
        FLW_SECRET_KEY:process.env.FLW_SECRET_KEY,
        OPEN_API_KEY:process.env.OPEN_API_KEY,
        "eas": {
          "projectId": "a8f6d266-f2fd-4045-80e4-c382440e0e2d"
        },
      },
    
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}


