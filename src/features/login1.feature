Feature: Login to MTBC Career Portal
  Scenario: himanshu mtbc career portal
    Given lets open the mtbc career portal for "validUser" from json file
    When lets login with "validUser" user from json file
    Then logout the career portal