'use strict'

const ChormecastManager = require('./classes/ChromecastManager')

const myChromecastClient = new ChormecastManager()

const listenToUser = () => {
	process.stdin.once('data', data => {
		const input = data.toString().split(' ')
		const command = input[0].trim().toLowerCase()
        const args = input[1] && input[1].trim()

		switch (command) {
			case 'play':
                if (!args) {
                    console.log('Wrong usage, example: play https://www.youtube.com/watch?v=cU4315WzMyM');
                    listenToUser()
                } else {
                    myChromecastClient.play(args, listenToUser)
                }
				break
			case 'pause':
				myChromecastClient.pause(listenToUser)
				break
			case 'resume':
				myChromecastClient.resume(listenToUser)
				break
			case 'stop':
				myChromecastClient.stop(listenToUser)
				break
			case 'devices':
                const devices = myChromecastClient.getDevices(listenToUser)
                console.table(devices);
				break
			case 'clear':
                console.clear();
                listenToUser()
				break
			default:
				console.log('The input option is not valid')
                listenToUser()
				break
		}
	})
}

listenToUser()
