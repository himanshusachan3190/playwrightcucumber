To run features and report -> npm run test:report
To run one Feature file -> npm run test:login.feature
To run feature file folder -> npx cucumber-js "src/features/**/*.feature" --format json:src/features/support/reports/cucumber-report.json

Report generate from json to html -> node cucumber-html-reporter.js

run feature file with tag  -> ---------------------
npm run test:login.feature -- --tags "@sanity"
npm run test:login.feature -- --tags "@smoke and @regression"
npm run test:login.feature -- --tags "@smoke or @regression"
npm run test:login.feature -- --tags "not @regression"

Command	What it does
npm run test:login.feature	(Run login feature only)
npm run test:all	(Run all features)
npm run test:rerun	(Rerun failed tests from @rerun.txt)
npm run report	(Generate HTML report)
npm run clean:screenshots	(Delete all screenshots)
npm run clean:videos	(Delete all videos)
npm run test:fresh	(Clear + run all + report)


Framwork Features ------->
--------------------------------------
feature file with tags
Rerun on failure
cucumber report
cucumber report with attached screenshot on failure
Generate video and folder will clear on rerun
generate screenshot and folder will clear on rerun
Passed scenario videos are deleted
Failed scenario videos are kept

mutiple Browser run
mutiple environment run (QA, Stage, Prod)