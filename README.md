# Clipper
 This small application allows you to view, sort download and crop Twitch clips to 9 by 16 resolution.
# How to setup

1. run `yarn install`
2. setup `NEXT_PUBLIC_TWITCH_CLIENT_ID` environment variable with your twitch application client id. You can register one [here](https://dev.twitch.tv/) 
3. If you also want to crop videos, you need to [setup a cors proxy server](https://observablehq.com/@severo/setup-your-own-cors-proxy) and set the `NEXT_PUBLIC_CORS` environment variable. (e.g. https://arcane-chamber-62525.herokuapp.com, without last "/")
4. run `yarn dev`
