# 🧪 Test Execution Guide

This repository uses **Cucumber.js** with npm scripts for running feature files and generating reports.

## Framework's Features ------->
--------------------------------------
 - feature file with tags
 - Rerun on failure
 - cucumber report
 - cucumber report with attached screenshot on failure
 - Generate video and folder will clear on rerun
 - generate screenshot and folder will clear on rerun
 - Passed scenario videos are deleted
 - Failed scenario videos are kept

mutiple Browser run
mutiple environment run (QA, Stage, Prod)

-------------------------------------------- 

### 📊 To run features and report -> 
1. npm run test:report
2. To run one Feature file -> npm run test:login.feature
3. To run feature file folder -> npx cucumber-js "src/features/**/*.feature" --format json:src/features/support/reports/cucumber-report.json
4. Report generate from json to html -> node cucumber-html-reporter.js

## 🚀 run feature file with tag  -> ---------------------
1. npm run test:login.feature -- --tags "@sanity"
2. npm run test:login.feature -- --tags "@smoke and @regression"
3. npm run test:login.feature -- --tags "@smoke or @regression"
4. npm run test:login.feature -- --tags "not @regression"

## 🎯 Command	What it does
1. npm run test:login.feature	(Run login feature only)
2. npm run test:all	(Run all features)
3. npm run test:rerun	(Rerun failed tests from @rerun.txt)
4. npm run report	(Generate HTML report)
5. npm run clean:screenshots	(Delete all screenshots)
6. npm run clean:videos	(Delete all videos)
7. npm run test:fresh	(Clear + run all + report)


 