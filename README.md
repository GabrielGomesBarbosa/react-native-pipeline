# Task App
---

A very simple Task app to practice Fastlane and GitHub Actions together.

### Goal

The goal of this project is generate whitelabels app by one app, and publish on the Google Play and App Store.

### Build an WhiteLabel

List of whitelabels available to build:

- task-master
- task-tide
- todo-tracker
- utask

Use this command to build an or more whitelabels. Example:

```
node scripts/buildWhitelabels.js --whitelabels=utask,task-master,task-tide
```

## Deploy on Store

#### Android

To execute fastlane use

```
bundle exec fastlane <command>
```
