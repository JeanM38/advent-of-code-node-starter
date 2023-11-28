# 🎅 advent-Of-Code-node-starter ⭐
This repository provides an optimal starting point for Advent of Code enthusiasts who prefer using Node.js

</br>

## ✔️ Before start
* Make sure you got **node.js** installed on your machine, if you don't, go to the [official website](https://nodejs.org/en/download/)

```shell
$ node -v
```
</br>

## 🚀 Launch project
* Clone the repository

```shell
$ # With SSH
$ git clone git@github.com:JeanM38/advent-of-code-node-starter.git my_advent_of_code

$ # With HTTPS
$ git clone https://github.com/JeanM38/advent-of-code-node-starter.git my_advent_of_code
```

* Get into your local repository
```shell
$ cd my_advent_of_code
```

* Link bin commands to allow them
```shell
$ npm link
```

* Install all dependencies
```shell
$ npm install
```
</br>

## 🛠️ Generate a new day

Each day, a new algorithm to create, a template is here to help you, just run this command to create a new folder and retrieve advent of code data

```shell
$ npm exec new-day {YEAR} {DAY}
```

At this point, you got three files in a new folder (for example `2023/1`) :

<h5 a><strong><code>challenge.js</code></strong></h5>
Insert your algorithm into this method, don't hesitate to create other methods and class properties to resolve the problem and keep your code clean

<h5 a><strong><code>input.txt</code></strong></h5>
Each challenge comes with its input, the Challenge class of the <code>challenge.js</code> file will read it input inside of this file.

<h5 a><strong><code>README.md</code></strong></h5>
You can retrieve the challenge instructions here

## Let's solve a problem !