#!/usr/bin/env node
const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const fs = require('fs').promises;
const { session } = require('./config.js');
const stateFilePath = './state.json';

class CodingChallengeCreator {
    constructor(year, day) {
        this.year = year;
        this.day = day;
        this.folderName = `./${this.year}/${this.day}`;
        this.lastRequestTime = 0;
        this.loadState();
        this.requestInterval = 15 * 60 * 1000;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    saveState() {
        this.lastRequestTime = Date.now();

        const state = {
            lastRequestTime: this.lastRequestTime
        };
        fs.writeFile(stateFilePath, JSON.stringify(state), 'utf8')
            .then(() => console.log(`Request timestamp saved in ${stateFilePath}`))
            .catch(err => console.error('Error saving state:', err));
    }

    loadState() {
        try {
            const state = require(stateFilePath);
            this.lastRequestTime = state.lastRequestTime || 0;
        } catch (error) {
            this.lastRequestTime = 0;
        }
    }

    async createNewCodingChallenge() {
        if (!session) {
            console.error('\x1b[43m The session cookie may not be set. Please check the configuration file. \x1b[0m');
            process.exit(1);
        }

        if (parseInt(this.year) && parseInt(this.day)) {
            const adventData = await this.fetchAdventOfCodeData();
            
            if (adventData) {
                await this.createFolder();
                await this.writeToFile(`${this.folderName}/README.md`, adventData.markdownContent);
                await this.writeToFile(`${this.folderName}/input.txt`, adventData.input);
                await this.copyChallengeFile();
                console.log(`\x1b[42m ${this.day}/${this.year}'s challenge successfully created \x1b[0m`);
            } else {
                console.log('\x1b[43m Unable to fetch Advent of Code data. Challenge creation aborted. \x1b[0m');
            }
        }
    }

    async fetchAdventOfCodeData() {
        try {
            const currentTime = Date.now();

            if (currentTime - this.lastRequestTime < this.requestInterval) {
                const remainingTime = this.requestInterval - (currentTime - this.lastRequestTime);
                console.log(`Rate limit exceeded. Waiting for ${remainingTime / 1000} seconds before making the next request.`);
                await this.sleep(remainingTime);
            }

            this.saveState();

            const headers = {
                Cookie: `session=${session}`,
                'User-Agent': 'https://github.com/JeanM38/advent-of-code-node-starter by JeanM38'
            }

            const pageResponse = await axios.get(`https://adventofcode.com/${this.year}/day/${this.day}`, {
                headers: headers
            });

            const $ = cheerio.load(pageResponse.data);
            const articleContent = $('article').html();
            const turndownService = new TurndownService();
            const markdownContent = turndownService.turndown(articleContent);

            const inputResponse = await axios.get(`https://adventofcode.com/${this.year}/day/${this.day}/input`, {
                headers: headers
            });

            const input = inputResponse.data;

            return { markdownContent, input };
        } catch (error) {
            console.error('Error retrieving data:', error.message);
            return null;
        }
    }

    async createFolder() {
        try {
            await fs.mkdir(this.folderName, { recursive: true });
            console.log(`${this.folderName} successfully created`);
        } catch (err) {
            console.error('Error creating folder:', err);
        }
    }

    /**
     * @param {string} filePath 
     * @param {string} content 
     */
    async writeToFile(filePath, content) {
        try {
            await fs.writeFile(filePath, content, 'utf8');
            console.log(`${filePath} successfully created`);
        } catch (err) {
            console.error('Error writing file:', err);
        }
    }

    async copyChallengeFile() {
        try {
            const challengeFileContent = await fs.readFile('./template/challenge.js', 'utf8');
            await this.writeToFile(`${this.folderName}/challenge.js`, challengeFileContent);
        } catch (err) {
            console.error('Error copying challenge file:', err);
        }
    }
}

const [, , ...args] = process.argv;
const [year, day] = args;

const creator = new CodingChallengeCreator(year, day);
creator.createNewCodingChallenge();