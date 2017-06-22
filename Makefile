all:
	mkdir -p dist
	rm -rf dist/about-pioneer.xpi
	zip dist/about-pioneer.xpi lib/*.js lib/*.html lib/*.css *.js *.manifest *.rdf *.json

lint:
	npm run lint

install:
	npm install

test:
	npm run test

