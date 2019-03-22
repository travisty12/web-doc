# Web Doc
> _A program using API calls to query a medical database to recommend doctors based on symptoms_

#### By **Travis Toal**

### Installation / Usage
* _Clone this repository to your machine, and run 'npm install' to download the dependencies._
* _Run 'npm run start' to build the project on a local server._
* _Replace 'process.env.exports.apiKey' with your own API key to make the program functional_

### Description

* _Web Doc uses the Better Doctor API to take a user's input, either a symptom or a doctor's name, and returns a list of doctors that fit that specialty or name._

## Planning

1. Dependencies
  * babel-core, loader, and preset-es2015: compiles JS for different browsers
  * clean-webpack-plugin: clears dist folder
  * css-loader, style-loader, sass-loader, node-sass: dependencies for styles
  * eslint, eslint-loader: linter for JS
  * file-loader: loads images
  * html-webpack-plugin: dependency for loading html file
  * uglifyjs-webpack-plugin: minifying dependency
  * webpack, webpack-cli, webpack-dev-server: bundling dependencies
  * dotenv-webpack: makes api key available within files

1. Configuration
  * Set up project as npm/webpack-bundled, behavior-driven, logic-separated directory

1. Specs

  | Spec | Input | Output |
| :-------------     | :------------- | :------------- |
| **Program returns a list of doctors based on the inputted symptoms** | Sore throat | Dr. Example McFake, Doctor of throats. Etc... |
| **Program returns a list of doctors based on the inputted name** | Exampleson | Dr. Leonard Exampleson, Hypothetical Doctor Extraordinaire. Etc... |
| **Program returns all known information about the returned doctors** | Doctor | Firstname Lastname, Address Phone Website, Accepting new patients? |
| **Program returns an error message is the promise doesn't return a 200 OK message** | Return 404 error | 404, Data not found |
| **Program returns a message if no doctors match your criteria** | Dr. Fancypants Scrufflestone | Your search did not match any results |
| **Program allows the user to input their preferred city** | Portland | Here are some doctors matching your symptoms in Portland: .... |

1. UX/UI
* Include and modify html/Sass once specs are completed for .js files

## Technologies Used

* _Node Package Manager_

* _Sass_

* _jQuery_

* _All of the dependencies listed in the planning section_

### Known Bugs

* _No known bugs as of 3/22/19_

### Support and Contact Details

[Email me for any questions](mailto:travisty12@gmail.com)

[View my work](https://www.github.com/travisty12/)

#### License
* _This software is licensed under the MIT license_

Copyright (c) 2019 **Travis Toal**
