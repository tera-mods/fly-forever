'use strict'

module.exports = function FlyForever(mod) {
	let outOfEnergy = false

	mod.hook('S_CANT_FLY_ANYMORE', 'raw', () => false)
	mod.hook('S_PLAYER_CHANGE_FLIGHT_ENERGY', 1, event => { outOfEnergy = event.energy === 0 })

	mod.hook('C_PLAYER_FLYING_LOCATION', 4, event => {
		if(outOfEnergy && event.type !== 7 && event.type !== 8) {
			event.type = 7
			event.dest.z = Math.min(event.loc.z, event.dest.z)
			return true
		}
	})
}