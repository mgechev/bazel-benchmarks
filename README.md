## Usage

* Install packages: `yarn install`
* Generate source files with: `yarn generate-1000` (or generate-2000, generate-4000, generate-8000, generate-10000)
* Run webpack dev server with: `yarn dev`
* In another terminal, update a single source file with: `yarn update-1`

This should prompt an incremental build and redeploy to browser. Console log in browser will show the RTT.

## Comparing with prototype Bazel devserver

See the `bazel` branch in this repo.
