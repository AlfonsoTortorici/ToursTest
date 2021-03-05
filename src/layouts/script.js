import _      from 'lodash'
import {
  QSelect,
  QItem,
  QItemSection,
  QImg
}             from 'quasar'
import ports  from 'assets/ports'
import tours  from 'assets/shorex'

export default {
	name : 'Destinations',
	components : {
		QSelect,
		QItem,
		QItemSection,
		QImg
	},
	data () {
		return {
			destinations : [],
			toursSelected : [],
			fields : {
				destinations : {
					id        : _.uniqueId('field_'),
					display   : true,
					fakeValue : '',
					value     : '',
					name      : 'Destinations',
					error     : false,
					active    : false,
					options : [],
					filters : {
						type      : 'string',
						required  : true
					},
					onValueChange : (destination) => {

						let vm = this

						let toursSelected = []

						tours.map((tour) => {

							destination.ports.map((port) => {

								if( tour.port.code == port.code ){

									toursSelected.push(tour)

								}

							})
							
						})

						vm.toursSelected = toursSelected

					}
				}
			}
		}
	},
	methods: {

		buildDestinations () {

			let vm = this

			let destinations = []

			ports.map((port) => {

				if( destinations.length > 0 ){

					let alreadyExist = false

					destinations = destinations.map((destination) => {

						if( destination.name == port.destination ){

							alreadyExist = true

							destination.ports.push(port)

						}

						return destination

					})

					if( !alreadyExist ){

						let destination = {
							id    : _.uniqueId('destination_'),
							name  : port.destination,
							ports : [port]
						}

						destinations.push(destination)

					}

				}else{

					let destination = {
						id    : _.uniqueId('destination_'),
						name  : port.destination,
						ports : [port]
					}

					destinations.push(destination)

				}

			})

			vm.destinations = destinations

		},
	
		filterFn (value, update) {
			
			let vm = this

			if (value === '') {
			
				update(() => {

					vm.fields.destinations.options = vm.destinations

				})

				return
			
			}

			update(() => {
				
				const needle = value.toLowerCase()

				vm.fields.destinations.options = vm.destinations.filter(element => element.name.toLowerCase().indexOf(needle) > -1)

			})

		}

	},
	created () {

		let vm = this

		vm.buildDestinations()

	}
}