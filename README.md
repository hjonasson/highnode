# highnode

![npm](https://img.shields.io/npm/v/highnode.svg) ![license](https://img.shields.io/npm/l/highnode.svg) ![github-issues](https://img.shields.io/github/issues/hjonasson/highnode.svg)  ![Circle CI build status](https://circleci.com/gh/hjonasson/highnode.svg?style=svg)

Node module to make highcharts a little more usable

![nodei.co](https://nodei.co/npm/highnode.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/hjonasson/highnode.svg)
![stars](https://img.shields.io/github/stars/hjonasson/highnode.svg)
![forks](https://img.shields.io/github/forks/hjonasson/highnode.svg)

![forks](https://img.shields.io/github/forks/hjonasson/highnode.svg)

![](https://david-dm.org/hjonasson/highnode/status.svg)
![](https://david-dm.org/hjonasson/highnode/dev-status.svg)

## Features


## Install

`npm install --save highnode`


## Scripts

 - **npm run sparkline** : `browserify -t brfs sparkline/plot.js -o bundle.js`
 - **npm run bubbleChart** : `browserify -t brfs bubbleChart/plot.js -o bundle.js`
 - **npm run stackedColumnChart** : `browserify -t brfs stackedColumnChart/plot.js -o bundle.js`
 - **npm run readme** : `node ./node_modules/.bin/node-readme`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[d3](https://www.npmjs.com/package/d3) | 4.4.0 | ✖
[brfs](https://www.npmjs.com/package/brfs) | 1.4.3 | ✖
[ava](https://www.npmjs.com/package/ava) | ^0.15.0 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.9 | ✔
[xo](https://www.npmjs.com/package/xo) | ^0.16.0 | ✔


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

Hjortur Jonasson <hjorturjonasson@gmail.com> undefined

## License

 - **MIT** : http://opensource.org/licenses/MIT
