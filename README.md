# platformregulation

Static site generator for [platformregulation.eu](https://platformregulation.eu). Requires [`pandoc`](https://pandoc.org) as well as for generating a PDF version [`weasyprint`](https://weasyprint.org/).

## Usage

Install `pandoc` and `weasyprint`, clone this git repository and run `./build.sh`. This generates all necessary files and puts them in the folder `output`. Serve with a web server of your choice.

If there is an upload script available at `./upload.sh`, you can use `./build.sh -u` to upload the generated files.

## License

This software is licensed under AGPL-3.0 by [Bernhard Hayden](https://github.com/burnoutberni).
