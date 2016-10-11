# Metalsmith example website

This repository contains a Metalsmith website integrated with a DatoCMS site. The site is deployed on Netlify, and can be seen at this URL: https://datocms-metalsmith-example.netlify.com/

Content stored in a DatoCMS site gets translated into local Metalsmith files using an npm package called `datocms-client` you need to add to your Metalsmith project. The translation rules are defined in file placed in your project root folder called [dato.config.js](https://github.com/datocms/metalsmith-example/blob/master/dato.config.js).

To read more about the `datocms-client` module, please refer to [its documentation](https://github.com/datocms/js-datocms-client/blob/master/docs/dato-cli.md).

## Usage

```
# install dependencies
npm install

# download latest data from DatoCMS site
dato dump --token=6d71de8571ec5a8d925c83b4a5087813db3242233d187758b6

# build Metalsmith site!
node index.js
```

## Website preview

![Website screenshot](https://raw.githubusercontent.com/datocms/jekyll-example/master/screenshot.png)
