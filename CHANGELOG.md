# Changelog
All notable changes to this project will be documented in this file..

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-12-01 - @jmionnet <jean.mionnet38@gmail.com>
### Added
- cli.js now stores last request timestamp to prevent spamming
- User-Agent specified in request headers

### Changed
- Update README.md
- Update .gitignore to ignore challenges

## [0.1.2] - 2023-11-30 - @jmionnet <jean.mionnet38@gmail.com>
### Fixed
- AdventOfCodeSolverProcessor now takes filePath as constructor argument to prevent input.txt to be reached from that point

## [0.1.1] - 2023-11-28 - @jmionnet <jean.mionnet38@gmail.com>
### Fixed
- Add .env to gitignore

## [0.1.0] - 2023-11-28 - @jmionnet <jean.mionnet38@gmail.com>
### Changed
- cli.js : The new-day command now retrieves challenge information directly from the Advent of Code API.
- Update README.md

### Added
- axios / cheerio / doteven / turndown modules : to accomplish challenge retrieval, convert html to markdown and configure environment

### Fixed
- challenge.js require path