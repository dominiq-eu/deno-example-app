# Readme

This is an implementation of a program that reads the customers.txt file parse it and output every customer id in 100km distance of the Future of Voice HQ alphabetically sorted. Warnings are printed on stderr.

## How it's done

The code is managed in a git repository. The language used is TypeScript and the interpreter is deno instead of node. It's a young project, but it's basically node.js with TypeScript build-in, an API similar to Go, a clever alternative to npm and package.json and everything in one binary.

For more info about this project, I recommend you to watch the latest talks from Ryan Dahl (inventor from node.js):

-   https://www.youtube.com/watch?v=1gIiZfSbEAE
-   https://www.youtube.com/watch?v=HjdJzNoT_qg

The dev environment is in an ubuntu container with the deno binary and the local cache linked in. The cache is not part of the repository, but after you run the program and|or the tests you find it at ./dev-env/cache.

## How to get it running

The build/dev environment is based on Docker. This way you don't need to install anything in your local environment. Except for docker and a Unix shell environment, but that should be already on your development box anyway.

**Dependencies**

-   Terminal with a Unix shell and environment (eg. Linux, MacOS Terminal, Git Bash on Windows)
-   make
-   Docker

The build process is controlled by make trough the Makefile. The dev environment is a ubuntu container with the deno binary linked inside. You can enter the dev environment, run the program and run the tests.

### Run the program

```
make run
```

### Run the tests

```
make test
```

### Enter the dev container

```
make dev
```

To run the program inside the dev container:

```
$ make dev
# deno --allow-read main.ts
```

To run the tests inside the dev container:

```
$ make dev
# deno tests
```
