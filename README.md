# docs.lsst.io

**A documentation index web site for LSST Data Management.**

## Development

This is a static site built with Gulp.

### Setup

You'll need NPM, which Mac users can get via `brew install npm`.

From this project's directory, install node dependencies (including Gulp) via

```
npm install --save-dev
```

### Gulp commands

While you're developing the site, have a terminal session running this command:

```
npm run gulp
```

This command builds the site, starts up BrowserSync and watches for changes.
Watch the commands output to see where BrowserSync is server your development site from.

## Roadmap

1. Proof-of-concept static site
2. Build from templates and document YAML database
3. Build document YAML database automatically
4. React web app with search and filtering

## License

Copyright 2015 AURA/LSST

License: MIT.
