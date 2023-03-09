// Requiring the module
const fs = require("fs");
let links = [
  ["draw-canopy-fractal","draw canopy fractal"],
  ["draw-flowsnake-fractal","draw flowsnake fractal"],
  ["draw-morton-fractal","draw morton fractal"],
  ["draw-v-fractal","draw v fractal"],
  ["draw-peano-fractal","draw peano fractal"],
  ["draw-heighway-fractal","draw heighway fractal"],
  ["draw-twin-heighway-fractal","draw twin heighway fractal"],
  ["draw-triangle-dragon-fractal","draw triangle dragon fractal"],
  ["draw-koch-fractal","draw koch fractal"],
  ["draw-triflake-fractal","draw triflake fractal"],
  ["draw-sierpinski-fractal","draw sierpinski fractal"],
  ["draw-hexaflake-fractal","draw hexaflake fractal"],
  ["draw-multiflake-fractal","draw multiflake fractal"],
  ["draw-cantor-fractal","draw cantor fractal"],
  ["draw-cantor-dust-fractal","draw cantor dust fractal"],
  ["draw-levy-fractal","draw levy fractal"],
  ["draw-frosty-fractal","draw frosty fractal"],
  ["draw-pythagoras-fractal","draw pythagoras fractal"],
  ["draw-t-square-fractal","draw t square fractal"],
  ["draw-hausdorff-fractal","draw hausdorff fractal"],
];
for (let i = 0; i < links.length; i++) {
  const dataToGenerate = {
    Language: "English",
    htmlLangAtt: "en",
    H1: links[i][1],
    H2: "",
    nofileupload: true,
    variant: "primary",
    TITLE: "",
    META: "",
    LABEL: "",
    BREADCRUMB_LABEL: "",
    color: "blue",
    TEXTUAL_CONTENT: [
      {
        priority: 1,
        logoUrl: "/assets/images/lightbulb.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/target.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/cross.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/shield.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/fast.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/cloud_new.svg",
        header: "",
        content: "",
      },
    ],
    FAQ: [
      {
        question: "",
        answer: "",
      },
    ],
    csscdns: ['<link rel="stylesheet" href="/assets/css/style.css"/>'],
    jsfilepaths: [
      "/assets/js/common.js",
      "/assets/js/imagefit.js",
      "https://cdn.jsdelivr.net/npm/lindenmayer@1.5.4/dist/lindenmayer.browser.min.js",
      "/assets/js/colortools.js",
      "/assets/js/canvas-toblob-polyfill.js",
      `/assets/js/${links[i][0]}.js`,
    ],
  };

  const htmlfile = `${links[i][0]}.json`;
  fs.writeFileSync(
    "./_data/feature/en/" + htmlfile,
    JSON.stringify(dataToGenerate)
  );
var mdFileData = `---
layout: feature
folderName: feature
lang: en
fileName: ${links[i][0]}
permalink: /${links[i][0]}
tool: ${links[i][0]}
noBox: true
---

{%- include ${links[i][0]}.html -%}
`;
fs.writeFileSync(`./feature/${links[i][0]}.md`, mdFileData);
fs.writeFileSync(`./assets/js/${links[i][0]}.js`, `First_call();
function generate(options, cb) {
  
}`);
fs.writeFileSync(`./_includes/${links[i][0]}.html`, '');
}