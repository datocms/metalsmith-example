var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var metadata = require('metalsmith-metadata');
var collections = require('metalsmith-collections');
var pagination = require('metalsmith-pagination')

var sortBy = require('sort-by');
var marked = require('marked');
var ellipsize = require('ellipsize');

Array.prototype.sortBy = function(...args) {
  return this.sort(sortBy(...args));
}

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(metadata({
    site: 'data/homepage.yml'
  }))
  .use(collections({
    characters: {
      pattern: 'character/*.md',
      sortBy: 'position',
    },
    episodes: {
      pattern: 'episode/*.md',
      sortBy: 'date',
    },
    seasons: {
      pattern: 'season/*.md',
      sortBy: 'position',
    }
  }))
  .use(pagination({
    'collections.episodes': {
      perPage: 16,
      layout: 'episodes.ejs',
      first: 'episodes/index.html',
      path: 'episodes/page/:num/index.html',
    }
  }))
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'ejs',
    rename: true,
    markdown: marked,
    truncate: ellipsize,
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
