// Class representing the CareerPortal page object
class CareerPortal {

  constructor() {
    // CSS selectors for elements on the CareerPortal page
    this.myAccountlogin = '(//button[text()="Login"])[2]';
    this.MyAccountemail = '#username';
     this.myAccountContinueButton = '(//button[text()="Continue"])';
    this.MyAccountpassword = '#password';
    this.signUp = '.yellow-btn';
    this.logout = '#ctl00_ctl00_BotContent_hreflogout';
    this.stageportalemail = '#username';
    this.stageportalpassword = '#password';
    this.stageportalsignIn = '#submit-button';
    this.logoutMyAccountbutton = '(//button[text()="My Account"])[1]';
    this.logoutMyAccountText = '.portal-logout-btn';
  
  }

  // Open the CareerPortal page with the given URL
  async open(url) {
    // Navigate to the provided URL
    await global.page.goto(url);
  }

      async StageEastmanPFlogin(username, password) {
   
    // Fill in the email and password fields
    await global.page.fill(this.stageportalemail, username);
    await global.page.fill(this.stageportalpassword, password);
    // Click the sign-up button to log in
    await global.page.click(this.stageportalsignIn);
  }

  // Perform login using the provided username and password
  async MyAccountlogin(username, password) {
    // Click the login button
    await global.page.click(this.myAccountlogin);
    // Fill in the email and password fields
    await global.page.fill(this.MyAccountemail, username);

     await global.page.click(this.myAccountContinueButton);

    await global.page.fill(this.MyAccountpassword, password);
    // Click the sign-up button to log in
    await global.page.click(this.myAccountContinueButton);
  }

  async logoutMyAccount() {
    // Click the logout button
    await global.page.locator(this.logoutMyAccountbutton).waitFor({ state: 'visible' });
    await global.page.click(this.logoutMyAccountbutton);

     await global.page.click(this.logoutMyAccountText);
  }


}

// Export the CareerPortal class for use in other modules
export default {
  CareerPortal
};

