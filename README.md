 
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) 

#### What does this project do?

To manage my daily tasks, I enter them in my google sheets as follows:

![Sheet sample screenshot](./extras/images/sheet-sample-screenshot.png)

The sheet gets messier to understand when number of rows increase. So what I needed was a summary of tasks, so that I can easily
understand what are my delayed tasks, tasks for today and tasks whose deadline I haven't set yet.

I used [apps script](https://developers.google.com/apps-script) to achieve this.
 

#### How to run this project?
1. This project uses [clasp](https://github.com/google/clasp/blob/master/docs/run.md) to run locally. So, need to first install it and setup project 
2. The function to run locally is `clasp run sendTaskSummaryEmail`
