#!/usr/bin/env node

// Import necessary modules
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import figlet from 'figlet';

// Initialize variables
let playerName;
let points = 0;

// Define chalk colors
const headingColor = chalk.bold.hex('#4B0082');
const sublineColor = chalk.hex('#C0C0C0');
const welcomeMessageColor = chalk.hex('#FFD700');
const questionColor = chalk.bold.hex('#008080');
const resultMessageColor = chalk.bold.hex('#008000');

// Function to display the welcome message
function welcome_msg() {
    figlet("TraitTally", function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        // Display the heading and subline
        console.log(headingColor(data));
        console.log('');
        console.log(sublineColor(`Discover Your Essence in ${chalk.bgCyan('Five')} Questions with TraitTally: Unveil the ${chalk.blueBright('Layers')} of You!`));
        console.log('');
        // Ask for the player's name
        playerName = readlineSync.question(questionColor("What is Your Name? "));
        console.log(welcomeMessageColor(`Welcome, ${playerName}! Let's explore your personality.`));
    });
}

// Function to ask personality questions
function personalityQuestions(question, options, number) {
    // Define a marking system for scoring
    const markingSystem = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
        5: 0
    };
    console.log(`Q${number}`);
    // Ask the user to select an option and update the points
    let index = readlineSync.keyInSelect(options, chalk.italic(questionColor(question)), { cancel: false });
    points += markingSystem[Object.keys(markingSystem)[index]];
}

// Function to define personality questions
function questions() {
    // Define an array of questions and options
    const questionOne = {
        question: "How do you prefer to spend your free time?",
        options: ['Reading a book or exploring new ideas.',
            'Socializing with friends or attending events.',
            'Engaging in physical activities or sports.',
            'Creating something artistic or expressing yourself.',
            'Relaxing at home and enjoying quiet time alone.']
    };

    const questionTwo = {
        question: "In a group project, what role do you naturally take on?",
        options: ['The thinker and planner.',
            'The communicator and motivator.',
            'The hands-on doer and executor.',
            'The creative and innovative mind.',
            'The independent contributor.']
    };

    const questionThree = {
        question: "What's your approach to solving problems?",
        options: ['Analyzing the situation logically.',
            'Seeking input and collaboration.',
            'Taking immediate action.',
            'Thinking outside the box.',
            'Trusting your instincts.']
    };

    const questionFour = {
        question: "How do you handle stress?",
        options: ['Planning and organizing to regain control.',
            'Talking it out with friends or seeking support.',
            'Engaging in physical activity to blow off steam.',
            'Finding a creative outlet to express emotions.',
            'Taking time alone to reflect and recharge.']
    };

    const questionFive = {
        question: "What's your ideal vacation destination?",
        options: ['Historical or cultural city.',
            'Vibrant and lively beach resort.',
            'Adventure-filled mountain or nature retreat.',
            'Artistic and creative community.',
            'Quiet and secluded countryside.']
    };

    // Return an array of questions
    return [questionOne, questionTwo, questionThree, questionFour, questionFive];
}

// Function to determine the result message based on scores
function resultMessage(scores) {
    if (scores >= 16 && scores <= 20) {
        return `Your analytical thinking shines through!`;
    } else if (scores >= 11 && scores <= 15) {
        return `You're a social butterfly, connecting with others effortlessly.`;
    } else if (scores >= 6 && scores <= 10) {
        return `Your active and practical approach sets you apart.`;
    } else if (scores >= 1 && scores <= 5) {
        return `Creativity flows through you, making you an artistic soul.`;
    } else {
        return `You value quiet and solitude, embracing your introverted nature.`;
    }
}

// Function to start the game
function gameStart() {
    // Display the welcome message
    welcome_msg();
    // Wait for a short time before displaying questions
    setTimeout(() => {
        // Get an array of questions
        let questionArray = questions();
        // Iterate through questions, ask the user, and update points
        for (let i = 0; i < questionArray.length; i++) {
            personalityQuestions(questionArray[i].question, questionArray[i].options, i + 1);
        }
        console.log('');
        // Display the completion message and the result
        console.log(`Thanks, ${chalk.bgYellow(playerName)}! You've completed the TraitTally Personality Test.`);
        let result = resultMessage(points);
        console.log(`The result is:\n${resultMessageColor(result)}`);
    }, 100);
}

// Start the game
gameStart();
