# HaramBlur Extension

HaramBlur is a browser extension that allows you to navigate the web with respect for your Islamic values, privacy and reduce browsing distractions. 🌐

HaramBlur utilizes face detection and NSFW content detection and provides controls that allow you to uphold the Islamic gaze protection principle and tailor your online experience by automatically blurring images and videos that contain unwanted or impermissible content. 🚫

You can configure the type of detection you want and the amount of blur, the level of strictness, hover to unblur, choose a specific gender to blur, or turn the extension on and off via the interactive pop-up. 😄

![HaramBlur Demo](demos/demo1.png)

## Features

- 🖼️ Blurs images and videos with unwanted or impermissible content
- 🌍 Compatible with most websites and social media platforms
- ⚙️ Configurable detection settings to tailor your browsing experience
- 🔄 Interactive pop-up for easy on/off toggling
- 🖱️ Customizable hover-to-unblur feature
- 🚀 Decent speed and accuracy (continously improved)

## How It Works

HaramBlur uses face detection and recognition features from the [Human library](https://github.com/vladmandic/human) to detect and blur faces based on user settings. It also utilizes NSFW detection from [nsfwjs](https://github.com/infinitered/nsfwjs/) to enhance accuracy. You can adjust detection types, blur levels, and toggle the extension via the interactive pop-up.

## Installation Guide

### Option 1: Using the Plugin from the Extensions Store

1. Visit the [HaramBlur extension on the Chrome Web Store](https://chrome.google.com/webstore/detail/haramblur/pbcoegikffnadpahojjhgdladmmddeji) or the [Firefox Add-ons Store](https://addons.mozilla.org/addon/haramblur/).

2. Follow the installation instructions provided on the page.

### Option 2: Compiling It On Your Own

If you prefer to compile the extension yourself, follow these steps:

#### Step 1: Clone the Repository

Clone the HaramBlur repository to your local machine:

- **Chromium**:
    ```bash
    git clone https://github.com/alganzory/HaramBlur.git
    ```

- **Firefox**:
    ```bash
    git clone -b firefox-main --single-branch https://github.com/alganzory/HaramBlur.git
    ```

#### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install 
```

### Step 3: Write Your Code

Make the necessary modifications or enhancements to the code.

### Step 4: Build the Extension

-   Build the extension by running:
    ```bash
    npm run build
    ```

### Step 5: Generate a Release (Optional)

Generate a release zip file to be uploaded to the browser/store:

```bash
npm run release
```

### Load the Extension

- **Chromium**

    1. Go to `chrome://extensions/`.
    2. Enable "Developer mode".
    3. Click "Load unpacked" and select the project folder.

- **Firefox**

    1. Go to `about:addons`.
    2. Press the gear icon.
    3. Click "Install Add-on from file".
    4. Select the zip file generated in Step 5.

## Planned Improvements

We have some exciting plans to enhance HaramBlur:

- 🌐 Support for additional browsers
- ⚡ Improve detection speed
- 🎯 Increase NSFW detection accuracy to minimize false positives and negatives
- 🛡️ Add more Shariah-compliant privacy controls and customization options

## Open Source

HaramBlur is an open-source project and I really appreciate any contributions. Feel free to open an issue or submit a pull request if you have any suggestions or improvements you would like to see. 🌟

## Like the Project?

If you like the project, please consider giving it a star ⭐️. If you wanna further support me, [buy me a coffee ☕️](https://www.buymeacoffee.com/alganzory), thank you! 😊

Don't forget us from your Du'a! 🤲