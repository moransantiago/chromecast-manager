const ChromecastAPI = require('chromecast-api')

class ChormecastManager {
	constructor(mediaURL) {
		this.client = new ChromecastAPI()
		this.devices = []
		this.currentDevice = undefined
		this.mediaURL = mediaURL

		this.client.on('device', async device => {
			this.addDevice(device)
		})
	}

	addDevice(device) {
		this.devices.push({ name: device.friendlyName, device })
	}

	async askForDevice() {
		return new Promise((res, rej) => {
			console.log(
				`Select a device to cast: (input the index 0 - ${
					this.devices.length - 1
				})`
			)
			console.log('Input "cancel" to cancel the action')
			console.table(this.devices)

			process.stdin.once('data', data => {
				const choice = data.toString().trim().toLowerCase()

				if (choice === 'cancel') {
					rej('Action canceled')
				} else if (data < 0 || data > this.devices.length - 1) {
					rej('Device not found')
				} else {
					res(this.devices[choice].device)
				}
			})
		})
	}

	async play(mediaURL, cb) {
		try {
			const device = await this.askForDevice(this.devices)
			device.play(mediaURL, err => {
				if (!err) console.log('Playing in your chromecast')
				setTimeout(cb, 3000)
			})
			this.currentDevice = device
		} catch (err) {
			console.log(err)
			cb()
		}
	}

	pause(cb) {
		this.currentDevice.pause(err => {
			if (err) {
				console.log(err)
			}

			cb()
		})
	}
	
	resume(cb) {
		this.currentDevice.resume(err => {
			if (err) {
				console.log(err)
			}
	
			cb()
		})
	}

	stop(cb) {
		this.currentDevice.stop(err => {
			if (err) {
				console.log(err)
			}
	
			cb()
		})
	}

	getDevices(cb) {
		cb()

		return this.devices
	}
}

module.exports = ChormecastManager
