# Mobile Automation Testing

Automated integration testing is supported using the BrowserStack App Automate platform.

This uses a **device farm** of _real (physical)_ handheld devices to run our tests on a native application.

> _Within `atlassian-frontend`, this is provided for testing how web content behaves within a native application's WebView._

The tests run on [WebDriver I/O](https://webdriver.io/) and [Appium](http://appium.io/). You can learn more hybrid web testing [here](http://appium.io/docs/en/writing-running-appium/web/hybrid/).

## Purpose

There can be subtle differences between how your web components may behave on a desktop browser versus their mobile browser counterparts.
Testing on a physical handheld device allows us to capture unique regressions before shipping them.

Some common differences might include:

1. How text input behaves on a software keyboard (_composition input_).
1. How layouts react to orientation changes.
1. How media queries react to various device form factors.
1. Differing support for browser APIs and capabilities (_and whether polyfills are needed_).

## AFE BrowserStack App

A generic native application is provided, consisting of a simplified location bar and a WebView to run web tests.

- https://bitbucket.org/atlassian/afe-browserstack-android-app
- https://bitbucket.org/atlassian/afe-browserstack-ios-app

> Note: _If you modify these apps you may need to adjust the Appium selectors used for targetting UI elements._

> **Note:** Uploaded app binaries get deleted automatically after 30 days. Because our app doesn't change very often this requires automated re-uploading once a month. Consult the [REST API docs](https://www.browserstack.com/app-automate/rest-api?framework=appium) to learn more.

### Appium Selectors

Your tests will likely need to interact with UI elements in either the Native, or WebView contexts.

To target your elements within your tests you'll need to use selectors.

> iOS uses `XCUITest` while Android uses `UIAutomator2` which each have different selector syntaxes.

The easiest way to determine the correct selector values is to inspect the mobile app running in the [Appium Desktop](https://github.com/appium/appium-desktop) app.

> Consult this [guide](https://www.browserstack.com/app-automate/appium/appium-desktop) for more information.

1. Select 'New Session Window' from the File Menu
1. Enter your BrowserStack credentials.
1. Set your desired Capabilities.
1. Click 'Start Session' and wait for the app & device to be presented.
1. Using the 'Select Elements' tool, click the element you're interested in.
1. Alternatively, you can find the element you're interested in by expanding the 'App Source' node tree.
1. Your selected element will show its selector in the right side panel.

Examples (you'll get the app ID after uploading your replacement bundle):

```
{
    "app": "bs://f9f237796c8f598cbf426d4438a6cd3205856666",
    "os_version": "13",
    "os": "iOS",
    "device": "iPhone 8"
}
{
    "app": "bs://7b7444d921b4e8e39c90ec0cd27a65daf0ce4e51",
    "os_version": "10.0",
    "os": "Android",
    "device": "Google Pixel 3"
}
```

## BrowserStack App Automate

### Requesting Access

[App Automate](https://app-automate.browserstack.com/) is a separate license from [Automate](https://automate.browserstack.com/). You can request access via Service Desk [here](https://hello.atlassian.net/servicedesk/customer/portal/2/create/3998) and check the box for "Mobile App Testing".

### Devices

_The devices we support have been chosen to satisfy testing functional differences between desktop and handheld browsers.
They're not tailored for testing runtime performance._

**We support testing a variety of device form factors (phone, phablet, tablet).**

> You can learn about the available mobile device clients [here](https://www.browserstack.com/app-automate/capabilities) & [here](https://www.browserstack.com/list-of-browsers-and-platforms/app_automate):

## Device Selection Strategy

> WebView differences occur between OS versions, not across different devices.

> Atlassian's MobileKit supports a dynamic OS version range based on usage statistics. Learn more [here](https://hello.atlassian.net/wiki/spaces/MOBILEKIT/pages/907164712/Tech+Stack).

Our strategy for device selection, is to run a single device for each supported legacy OS version (_phone_), and then run a handful of devices for the latest or most popular release (_phone, phablet, tablet_).

Legacy OS versions are used to validate backwards compatibilty, while recent OS versions are used to validate functional differences such as layout adaptation, OS keyboard differences, and other UX considerations.

When choosing devices, consider their viewport (_or logical_) size using device independent pixels (_dips/points_). Physical device size is irrelevant.

> You can find device sizes [here](https://viewportsizer.com/devices/) listed as the CSS width & height.

**To expedite test suite execution time, we choose the fastest devices available.**

We do this to ensure the infrastructure scales as we add more tests.

> We don't want mobile integration tests negatively impacting CI build times.
