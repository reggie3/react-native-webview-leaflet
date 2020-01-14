import * as svgIcons from "./svgIcons";
import { LatLng } from "leaflet";
import { MapMarker, AnimationType } from "../models";

const emoji = ["😴", "😄", "😃", "⛔", "🎠", "🚓", "🚇"];
const duration = Math.floor(Math.random() * 3) + 1;
const delay = Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

const mapMarkers: MapMarker[] = [
  {
    id: "2",
    position: { lat: 37.06452161, lng: -75.67364786 },
    icon: "😴",
    size: [64, 64],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.PULSE
    }
  },
  {
    id: "19",
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon:
      "https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg",
    size: [32, 32],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.BOUNCE
    }
  },
  {
    id: "100",
    position: new LatLng(37.23310632, -76.23518332),
    icon: emoji[Math.floor(Math.random() * emoji.length)],
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.WAGGLE
    }
  },
  {
    id: "1",
    position: { lat: 36.46410354, lng: -75.6432701 },
    icon: "😴",
    size: [32, 32],
    animation: {
      type: AnimationType.SPIN,
      duration,
      delay,
      iterationCount
    }
  },
  {
    id: "1000",
    position: new LatLng(36.60061515, -76.48888338),
    icon: svgIcons.greenCircle,
    animation: {
      duration,
      delay,
      iterationCount,
      type: AnimationType.PULSE
    }
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    position: { lat: 37.0580835, lng: -75.82318747 },
    icon: "Fish",
    animation: {
      type: AnimationType.WAGGLE,
      duration,
      delay,
      iterationCount
    }
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    position: { lat: 37.23310632, lng: -76.23518332 },
    icon: emoji[Math.floor(Math.random() * emoji.length)],
    size: [4, 4],
    animation: {
      type: AnimationType.PULSE,
      duration,
      delay,
      iterationCount
    }
  }
  /*
	{
		id: Math.floor(Math.random() * 1000),
		coords: [36.94994253, -76.64318409],
		icon: emoji[Math.floor(Math.random() * emoji.length)],
		animation: {
			name: animations[Math.floor(Math.random() * animations.length)],
			duration: Math.floor(Math.random() * 3) + 1,
			delay: Math.floor(Math.random()) * 0.5,
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
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
			iterationCount
		}
	} */
];
export default mapMarkers;
