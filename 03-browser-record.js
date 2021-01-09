// Ref: https://stackoverflow.com/a/60930256/1754750
// https://k6.io/docs/test-authoring/recording-a-session/browser-recorder
// Creator: k6 Browser Recorder 0.2.0

import { sleep, group } from "k6";
import http from "k6/http";

export const options = { vus: 10, duration: "1m" };

export default function main() {
  let response;

  group("page_0 - http://test.k6.io/", function () {
    response = http.get("http://test.k6.io/", {
      headers: {
        Host: "test.k6.io",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });
    response = http.get("http://test.k6.io/static/css/site.css", {
      headers: {
        Host: "test.k6.io",
        Accept: "text/css,*/*;q=0.1",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
    });
    response = http.get("http://test.k6.io/static/js/prisms.js", {
      headers: {
        Host: "test.k6.io",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
    });
    response = http.get("http://test.k6.io/static/favicon.ico", {
      headers: {
        Host: "test.k6.io",
        Accept: "image/webp,*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
    });
  });

  // Automatically added sleep
  sleep(1);
}