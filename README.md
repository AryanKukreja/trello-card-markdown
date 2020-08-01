# Trello Card-To-Markdown Power-Up
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)


This project is for a Trello Power-Up that lets users export a Trello Card to a Markdown document.

# Motivation
I often use Trello's checklist features in cards to track my work. At one point, I needed to have the checklist offline as a Markdown document, but the only way possible was to export it to json and convert it into markdown using Python or JavaScript.

Hence came the idea of a power-up :)

# Build Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/46753bde-17e7-4753-aec5-199cb8dc6b6b/deploy-status)](https://app.netlify.com/sites/card-to-markdown/deploys)

Netlify is the current host for this project for building and deploying.

# Status
[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

This is a work-in progress; a few issues need to be sorted before I apply to Trello for publishing this power-up.

# Tech Stack
JavaScript, HTML, CSS, Bootstrap, and Trello's Developer PLugin were used to develop the project. Parcel.js was used as the bundler.

# Features
This power-up, when/if it is successfully published onto Trello's Power-Up Marketplace, is the only power-up that will let users export a card directly to Markdown. Current features include:

- Simple, intuitive and well-designed UI
- Custom field selection: Select which fields to include in the exported Markdown document
- Styles: It retains the original style (label colors, member name initials) of the Trello card as HTML and CSS embedded in the markdown.
- No-styles option: To get a pure Markdown document without HTML/CSS embedded in it, users can select this option

# Credits
Many thanks to the Trello team's vast set of tutorials online for developing power-ups. A special shout-out to these specific tutorials:

- [Trello Building a Power-Up Tutorial - Part 1 (GitHub Repo)](https://github.com/trello/glitch-power-up-tutorial-part-one) 
- [Video Tutorial on First Power-Up](https://youtu.be/dLCkcQnwAQk) (This helped me set up the project with Parcel,js and Netlify)

