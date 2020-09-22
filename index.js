'use strict'

const mediaURL = process.env.MEDIA_URL

if (!mediaURL) {
    throw new Error('You have to input a mediaURL!');
}

const ChormecastManager = require('./classes/ChromecastManager')

const myChromecastClient = new ChormecastManager()
