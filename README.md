# Deep Speech Trainer

In order to train a model for Mozilla Deep Speech, a lot of supervised training data is required. This app aims to provide a frontend where users can record training data and submit recordings to their own server for later use via a REST API (sold separately).

## Build and Run

This app uses Expo, and requires the Expo Client app to be installed on your phone.

Build using yarn
```
yarn
yarn start
```

Scan the supplied QR code or go to the url provided.

## Build an Android APK

```bash
# export expo - vill land in ./dist
expo export --public-url https://holliebaker.github.io/trainer
# or yarn export

# push to some remote place, then compile the apk
expo build:android --public-url https://holliebaker.github.io/trainer/android-index.json
# or yarn build-apk
```

# Pre-commithook

Please
```bash
cp hooks/pro-commit .git/hooks
```

so that standard will run before every commit

