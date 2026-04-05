
const { Given, When, Then } = require('@cucumber/cucumber')
const { CareerPortal } = require('../pages/careerportal').default
const loginData = require('../test-data/loginData.json')

const career = new CareerPortal()

Given('lets open the eastmanpf stage environment from env file', async () => {
  const url = process.env.URL;
  if (!url) {
    throw new Error(`No URL found in .env file`)
  }
  await career.open(url);
});

Given('lets stage login with validUser user from env file', async () => {
  const username = process.env.USER_NAME;
  const password = process.env.USER_PASSWORD;
  console.log(username);
  console.log(password);
  if (!username || !password) {
    throw new Error(`No credentials found in .env file`)
  }
  await career.StageEastmanPFlogin(username, password);
});

Given('lets login with {string} user from json file', async (userType) => {
  const user = loginData[userType]
  if (!user || !user.username || !user.password) {
    throw new Error(`No credentials found in loginData.json for key: ${userType}`)
  }

  await career.MyAccountlogin(user.username, user.password)
})


Given('lets open the mtbc career portal for {string} from json file', async (userType) => {
  const user = loginData[userType]
  if (!user || !user.url) {
    throw new Error(`No url found in loginData.json for key: ${userType}`)
  }

  await career.open(user.url)
});



Given('lets open the mtbc career portal {string}', async (url) => {
  if (!url) {
    throw new Error(`No url provided`)
  }

  await career.open(url)
});

When('lets login with {string} and {string}', async (username, password) => {
  if (!username || !password) {
    throw new Error(`No credentials provided`)
  }

  await career.login(username, password)
})

Then('logout the EastmanPF portal', async () => {
  await career.logoutMyAccount()
})




