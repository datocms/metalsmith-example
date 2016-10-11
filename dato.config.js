var ellipsize = require('ellipsize');

module.exports = (dato, root) => {
  root.createDataFile(
    'src/data/homepage.yml', 'yaml',
    {
      siteName: dato.homepage.siteName,
      tagLine: dato.homepage.tagLine,
      description: dato.homepage.description,
    }
  );

  root.directory('src/season/', dir => {
    dato.seasons.forEach(season => {
      dir.createPost(
        `${season.slug({ prefixWithId: false })}.md`,
        'yaml',
        {
          frontmatter: {
            slug:         season.slug({ prefixWithId: false }),
            title:        season.name,
            imageUrl:     season.image.url({ w: 400 }),
            thumbnailUrl: season.image.url({ h: 300 }),
            bgUrl:        season.image.url({ w: 5 }),
            position:     season.position,
            excerpt:      ellipsize(season.overview, 150),
            layout:       'season.ejs',
          },
          content: season.overview
        }
      );
    });
  });

  root.directory('src/episode/', dir => {
    dato.episodes.forEach(episode => {
      dir.createPost(
        `${episode.slug()}.md`,
        'yaml',
        {
          frontmatter: {
            title:         episode.title,
            episodeNumber: episode.episodeNumber,
            paletteUrl:    episode.image && episode.image.url({ auto: 'enhance', palette: 'json' }),
            imageUrl:      episode.image && episode.image.url({ w: 500 }),
            thumbnailUrl:  episode.image && episode.image.url({ w: 500, h: 280, fit: 'crop', auto: 'enhance', fm: 'jpg' }),
            date:          episode.firstAired.toMap(),
            rating:        episode.rating,
            director:      episode.director,
            seasonName:    episode.season.name,
            seasonSlug:    episode.season.slug({ prefixWithId: false }),
            layout:        'episode.ejs',
          },
          content: episode.description
        }
      );
    });
  });

  root.directory('src/character/', dir => {
    dato.characters.forEach(character => {
      dir.createPost(
        `${character.slug({ prefixWithId: false })}.md`,
        'yaml',
        {
          frontmatter: {
            title:        character.name,
            actorName:    character.actorName,
            episodes:     parseInt(character.episode),
            imageUrl:     character.image.url({ w: 500, fm: 'jpg' }),
            thumbnailUrl: character.image.url({ fit: 'crop', crop: 'faces', w: 200, h: 200 }),
            position:     character.position,
            layout:       'character.ejs',
          },
          content: character.description
        }
      );
    });
  });
};

