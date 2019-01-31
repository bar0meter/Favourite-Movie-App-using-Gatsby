const dotEnv = require('dotenv')

if (process.env.env !== 'production') {
  dotEnv.config()
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        // apiKey and sessionID are mandatory

        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,

        // Pass a ISO 639-1 value. Pattern: ([a-z]{2})-([A-Z]{2})
        // Specify the language of titles, descriptions etc.
        // Applied to all results

        language: 'en-US',

        // Specify a ISO 3166-1 code. Pattern: [A-Z]{2}
        // Will narrow the search to only display results within the specified country

        region: 'US',

        // You can specify what modules to use and which endpoints to grab data from
        // If you want to use the default endpoints but deactivate modules,
        // set the value of "activate" to true or false.

        modules: {
          account: {
            activate: true,
            endpoints: {
              tvs: [
                'accountFavoriteTv',
                'accountRatedTv',
                'accountTvWatchlist',
              ],
              movies: [
                'accountFavoriteMovies',
                'accountRatedMovies',
                'accountMovieWatchlist',
              ],
              list: 'accountLists',
            },
          },
          misc: {
            activate: false,
            // The number behind the name specifies the amount of pages you want to pull
            // By default it's set to 3 pages as otherwise, e.g. the endpoint "MiscPopularMovies
            // would pull ~8000 pages (probably all movies)
            // Each page contains 20 items

            endpoints: [
              ['miscUpcomingMovies'],
              ['miscNowPlayingMovies'],
              ['miscPopularMovies', 2],
              ['miscTopRatedMovies', 2],
              ['miscTopRatedTvs', 1],
              ['miscPopularTvs', 1],
            ],
          },
          tv: {
            activate: false,
            endpoints: [['tvAiringToday'], ['tvOnTheAir', 2]],
          },
        },

        // Specify a timezone to offset the day calculation
        // e.g. used in tvAiringToday
        // See all timezones: https://developers.themoviedb.org/3/configuration/get-timezones

        timezone: 'Europe/London',

        // TMDb allows 40 Requests per 10 seconds
        // If you pull a lot of data you could have an error
        // telling you that you're over that limit. With this
        // option you can do less requests per 10 seconds

        reqPerTenSeconds: 36,

        // Decide whether you want to download images from
        // poster_path and backdrop_path URLs or not.
        // This can save you a lot of time if you're not using one/both
        // of them anyway

        poster: true,
        backdrop: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
