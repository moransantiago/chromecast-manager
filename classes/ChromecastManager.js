const ChromecastAPI = require('chromecast-api')

class ChormecastManager {
	constructor() {
		this.devices = []
		this.client = new ChromecastAPI()

		this.client.on('device', async device => {
			this.addDevice(device)
			try {
				const device = await this.askForDevice(this.devices)
				device.play(mediaURL, function (err) {
					if (!err) console.log('Playing in your chromecast')
				})
			} catch (err) {
				console.log(err)
			}
		})
	}

	addDevice(device) {
		this.devices.push({ name: device.friendlyName, device })
	}

	async askForDevice(devices) {
		return new Promise((res, rej) => {
			console.log(
				`Select a device to cast: (input the index 0 - ${
					devices.length - 1
				})`
			)
			console.log('Input "cancel" to cancel the action')
			console.table(devices)

			process.stdin.once('data', data => {
				const choice = data.toString().trim().toUpperCase()

				if (choice === 'CANCEL') {
					rej('Action canceled')
				} else if (data < 0 || data > devices.length - 1) {
					rej('Device not found')
				} else {
					res(devices[choice].device)
				}
			})
		})
	}
}

module.exports = ChormecastManager
