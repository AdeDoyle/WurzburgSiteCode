# WurzburgSiteCode

HTML, CSS, JavaScript, JSON and JPG documents for the _Würzburg Irish Glosses_ website (wurzburg.ie / wuerzburg.ie)

This file contains the code for the _Würzburg Irish Glosses_ website.

The text of the Würzburg glosses was taken initially from _Thesaurus Palaeohibernicus_, Volume 1 (1901) by Whitley Stokes and John Strachan, with the permission of the Dublin Institute for Advanced Studies. New Readings, New Translations and Site Notes have been provided for many glosses by Adrian Doyle. Other academic literature which is referenced on the website is attributed as appropriate to the authors, and a bibliography of referenced material appears in the `about.html` and `about_Eng.html` files.

This database and its contents are the copyright of Adrian Doyle, and are licenced for reuse under CC-BY 4.0. Earlier versions of this database (uploaded prior to September 2021) are the copyright of Adrian Doyle and the National University of Ireland, Galway (NUIG). These are also licenced for reuse under CC-BY 4.0.

## Run the Website Locally:

It is possible to download the contents of the _Würzburg Irish Glosses_ website and run it on a local machine. This makes it possible to:

* Use the website offline, without any internet connection.
* Revisit historical versions of the website, even after the contents of the live site have changed or been updated.

To run the website on your local machine you will need to carry out the following steps:

### Install Software to Create a Local Server Environment

1. Download the free version of [MAMP](https://www.mamp.info/en/mamp/) (or other comparable software), which will create a local server environment on your computer.
2. Install the software, following any on-screen installation instructions provided with the software.

### Download Website Data from GitHub

1. Download the contents of the _Würzburg Irish Glosses_ website from the [GitHub repository](https://github.com/AdeDoyle/WurzburgSiteCode).
* If downloading the most up-to-date version of the website:
  1. Click the `<> Code` button in the `master` branch of the GitHub repository (this should be towards the top-right of the window).
  2. Select the `Download ZIP` option from the dropdown menu.
* If downloading a historical version of the website:
  1. First click the `Commits` button beneath `<> Code`.
  2. Scroll through the listed commits until you find the historical version of the website you wish to download. Each commit is dated and represents an incremental update made to the website on that date.
  3. Click the `<>` icon to the right of the desired commit.
  4. Click the `<> Code` button (this should be towards the top-right of the window).
  5. Select `Download ZIP` option from the dropdown menu.
2. Unzip the zip-file downloaded from GitHub, or otherwise extract its contents.
   * These contents should include files such as `index.html`, `index.js`, and `main.css`.

### Copy Website Data into MAMP

If you are using MAMP software to create a local server environment, as suggested above, complete the following steps so that MAMP can access the downloaded website data.

If you have chosen to use alternative software for this purpose, refer to specific guidelines and documentation for that software instead.

1. Locate MAMP's `htdocs` folder.
   * On Windows check `C:\MAMP\htdocs`. Unless you have specified another location during installation of MAMP, this is where the `htdocs` folder should be located.
   * On Mac open Applications, and find the MAMP folder there. Inside the MAMP folder will be the `htdocs` folder.
   1. Do not rename either the `MAMP` or `htdocs` folders. The MAMP software will look for these exact folders, and if the names are changed it will not be able to find them.
   2. Do not move either the `MAMP` or `htdocs` folders to your desktop or anywhere else on your computer's file system. The MAMP software needs them to stay where they are to be able to find them.
2. Copy all of the contents from the unzipped GitHub folder into the `htdocs` folder.

### Launch Local Server Software

1. Once installation is complete, launch the MAMP software.
2. If the servers do not start automatically click the `Start Servers` button in the main MAMP window.
   1. It may take a while the servers to become active after initially launching MAMP or clicking the `Start Servers` button.
   2. To confirm servers are running locate `Apache Server` and `MySQL Server` in the main MAMP window, and ensure there is a green dot in the circle next to each of these
   3. There does not need to be a green dot in the circle beside `Cloud`.
3. Ensure that MAMP software remains running, with servers active, for the duration of the time that you are attempting to host the website on your local machine.
   * If these servers are not active, you will not be able to access the locally hosted website in your web browser.

### Open `localhost` in your Web Browser

1. Open your web browser of choice (e.g. `Safari`, `FireFox`, `Chrome`).
   * The website should run well on most browsers, however, testing has only been carried out using `Safari`, `Brave` and `Chrome`.
   * If the webpage is not functioning as expected it may help to try using a different browser, particularly if you are attempting to run an earlier version of the website on your local machine.
2. Type or copy http://localhost:8888/ into the address bar in your browser, and press enter.
   * In MAMP the (Apache) web server starts on port 8888 by default. This can be changed by navigating to `preferences`/`settings` > `ports` in the MAMP software, and specifying a new port number. This new port number can then be used in the URL instead of 8888 (you may need to restart MAMP before this is possible).
3. The version of the website which you downloaded from GitHub should now display in your browser, with all the functionality which was available for that version of the website.

### Running Different Versions Locally

If it becomes necessary to locally run a different version of the website to the one which is currently downloaded, this can be achieved by altering the contents of the `htdocs` folder as follows:

1. Download the required version of the website from GitHub, as described above, and unzip the file.
2. Delete the contents of the `htdocs` folder associated with the previous version of the website.
3. Replace the deleted files with the newly downloaded contents from the unzipped GitHub folder.
4. Launch MAMP and start the servers, as described above.
5. Open http://localhost:8888/ in your web browser, as above.
   * If the previous version of the website still appears in your browser after this step, it may be stored in your browser's cache. This problem can be solved by clearing your borwser's cache and reloading the page. The can be accomplished by different means depending on the browser being used, so refer to guidelines for your specific browser.
