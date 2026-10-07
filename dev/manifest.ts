import {
  APP_DESCRIPTION,
  APP_NAME,
  HOST_URL_IDENTIFIER,
} from "./@libs/constants";

const manifest: chrome.runtime.ManifestV3 = {
  name: APP_NAME,
  version: "0.0.1",
  description: APP_DESCRIPTION,
  background: {
    service_worker: "sw.js",
  },
  content_scripts: [
    {
      matches: [HOST_URL_IDENTIFIER],
      js: ["content-script.js"],
      run_at: "document_start",
      all_frames: true,
      match_about_blank: true,
    },
  ],
  icons: {
    "16": "assets/images/icon-16.png",
    "32": "assets/images/icon-32.png",
    "48": "assets/images/icon-48.png",
    "128": "assets/images/icon-128.png",
  },
  action: {
    default_icon: {
      "16": "assets/images/icon-16.png",
      "24": "assets/images/icon-24.png",
      "32": "assets/images/icon-32.png",
    },
    default_title: APP_NAME,
    default_popup: "popup.html",
  },
  manifest_version: 3,
};

export default manifest;
