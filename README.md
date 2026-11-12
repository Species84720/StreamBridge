# StreamBridge for VIDAA

Community HTML5 installer and TV receiver for StreamBridge.

- Website: https://species84720.github.io/StreamBridge/
- Hosted receiver: https://species84720.github.io/StreamBridge/app/

The installer can add a fullscreen receiver tile on supported Hisense VIDAA firmware. It uses the community `Hisense_installApp` method documented by [trialuser/vidaa-appstore](https://github.com/trialuser/vidaa-appstore). Installation support depends on firmware and the origin from which the installer runs. A GitHub Pages address does not grant the privileged `vidaahub.com` installation API.

## Use

Open the website on the TV. Choose **Check TV support** before attempting installation. **Open receiver now** opens the configured local receiver; **Change receiver URL** lets you choose another receiver address, including the hosted receiver above.

The default local receiver is `http://192.168.68.73:8088/app/`. Keep that hosting PC running when using the local receiver. The receiver discovers StreamBridge senders on TCP 57984 (Windows) and 39847 (Android phone). Select the private network, choose a sender, and enter its six-digit pairing code once. Saved connections reconnect automatically. Remote arrows/OK control playback and Settings; Back returns to devices or exits.

## Local network access

GitHub Pages uses HTTPS. A TV browser may block HTTP LAN discovery or video as mixed content, even though the sender permits CORS. Local HTTP hosting remains available for those TVs. Installing a home-screen tile is not an offline copy of the player and does not change codec or DRM support.

Some firmware exposes installation only from `https://vidaahub.com/`; the community method uses a temporary, TV-specific local DNS override and a local HTTPS installer. Restore original TV DNS after installation. The Windows local-hosting scripts and generated certificates are kept outside this public repository.

## Contents and deployment

`public/` contains the complete static installer/player. `.github/workflows/pages.yml` publishes only that directory. No private certificates, keys, pairing data, device credentials, process records or runtime logs belong in this repository.

HLS.js is included with its license in `public/app/HLS-LICENSE.txt`. The receiver can use HLS.js or the TV's native HTML5 player. Physical firmware support and codec behavior vary by TV.
