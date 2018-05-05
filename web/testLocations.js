const emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const interationCount = 'infinite';

const locations = [
	{
		id: 2,
		coords: [37.06452161, -75.67364786],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: 1,
		coords: [36.46410354, -75.6432701],
		icon: 'Hello',
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	}, 
/* 
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.60061515, -76.48888338],
		icon: emoji[Math.floor(Math.random() * emoji.length)]
	},

	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.0580835, -75.82318747],
		icon: 'Fish',
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.23310632, -76.23518332],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.94994253, -76.64318409],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.19810239, -76.28058546],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.02416165, -76.56052521],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.91541467, -75.49279245],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.70503123, -76.32755185],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.31605891, -76.45141618],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.59436803, -76.89486842],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.35740877, -75.77910112],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.31509182, -76.76693784],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.91815909, -76.06707072],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.611917, -75.76758822],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.79520769, -76.3959497],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.42854666, -75.95883052],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.78673099, -76.90459724],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	},
	{
		id: Math.floor(Math.random() * 1000),
		coords: [37.20966767, -75.58799685],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			interationCount
		}
	} */
];
export default locations;
