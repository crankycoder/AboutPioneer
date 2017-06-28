all: aboutPioneer.js

clean:
	rm aboutPioneer.js

aboutPioneer.js: aboutPioneer.jsx
	babel --plugins transform-react-jsx aboutPioneer.jsx > aboutPioneer.js

install_dev_deps:
	npm install
