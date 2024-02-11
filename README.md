<p align="center">
   <img width="160px" src="https://raw.githubusercontent.com/slutske22/hebrew-tracer-font/main/public/preview.png">

   <h2 align="center">Hebrew Tracer Font</h2>
   <p align="center">A simple app for generating custom hebrew tracing worksheets</p>
</p>

<p align="center">
   <h2 align="center"><a href="https://slutske22.github.io/hebrew-tracer-font/">&#128064; View the App &#128064;</a></h2>
</p>

The main features of this application are the custom-made tracing and bubble fonts, as well as the ability to create text with guidelines. You can also add your own images or clip art to make worksheets more fun.

The application and the custom fonts within are free to use!

Bugs? Issues? Open a ticket [here](https://github.com/slutske22/hebrew-tracer-font/issues).

### Known bugs

- Printing layout does not always match what is on screen. This has something to do with react to print, and sort of ruins the central purpose of the app, but it is not clear what exactly causes this when it happens.
- The guielines do not match correctly yet with the Times New Roman fonts

### Planned Features and Improvements

- Hebrew Script fonts (tracer and bubble) to be added
- Arrow fonts for hebrew standard and script tracer fonts
- Allow different fonts within the same line (would probably require a large overhaul to how text lines are generated)

### Want to help??

This application is open source, and I personally have limited bandwidth. If you would like to contribute, let me know - I'd love the help!

### Dev notes

This app is written with react and typescript, using vite as the bundler and demo server. To develop:

- Clone the repo
- `npm install`
- `npm start`

To learn more about how custom fonts were made, check out [this README](https://github.com/slutske22/hebrew-tracer-font/tree/main/fonts)
