Feature: Login to EastmanPF Portal

Background:
    Given lets open the eastmanpf stage environment from env file
    When lets stage login with validUser user from env file

@sanity1
  Scenario: EastmanPF MyAccount Login
    Given lets login with "validUser" user from json file
    Then logout the EastmanPF portal

@sanity112
  Scenario: mtbc career portal
    Given lets open the mtbc career portal '<URL>'
    When lets login with '<username>' and '<password>'
    Then logout the career portal page
    Examples:
      | URL                      | username                  | password  |
      | https://careers.mtbc.com | automation@mailinator.com | Mtbc@1234 |


    

   