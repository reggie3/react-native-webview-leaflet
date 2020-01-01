"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
var animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
var duration = Math.floor(Math.random() * 3) + 1;
var delay = Math.floor(Math.random()) * 0.5;
var interationCount = 'infinite';
var svgIcons = require("./svgIcons");
var leaflet_1 = require("leaflet");
var mapMarkers = [
    {
        id: 2,
        coords: { lat: 37.06452161, lng: -75.67364786 },
        icon: '😴',
        size: [
            64,
            64
        ] /* ,
        animation: {
          name: animations[Math.floor(Math.random() * animations.length)],
          duration,
          delay,
          interationCount
        } */
    },
    {
        id: 1,
        coords: { lat: 36.46410354, lng: -75.6432701 },
        icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
        size: [32, 32],
        animation: {
            name: 'bounce',
            duration: duration,
            delay: delay,
            interationCount: interationCount
        }
    },
    {
        id: 100,
        coords: new leaflet_1.LatLng(37.23310632, -76.23518332),
        icon: emoji[Math.floor(Math.random() * emoji.length)],
        animation: {
            name: animations[Math.floor(Math.random() * animations.length)],
            duration: duration,
            delay: delay,
            interationCount: interationCount
        }
    },
    /* {
      id: 1,
      coords: [36.46410354, -75.6432701],
      icon: '😴',
      size: [32, 32],
      animation: {
        name: animations[Math.floor(Math.random() * animations.length)],
        duration,
        delay,
        interationCount
      }
    },*/
    {
        id: 1000,
        coords: new leaflet_1.LatLng(36.60061515, -76.48888338),
        icon: svgIcons.greenCircle,
        animation: {
            name: animations[Math.floor(Math.random() * animations.length)],
            duration: duration,
            delay: delay,
            interationCount: interationCount
        }
    }
    /* {
      id: Math.floor(Math.random() * 1000),
      coords: [37.0580835, -75.82318747],
      icon: 'Fish',
      animation: {
        name: animations[Math.floor(Math.random() * animations.length)],
        duration,
        delay,
        interationCount
      }
    },
    {
      id: Math.floor(Math.random() * 1000),
      coords: [37.23310632, -76.23518332],
      icon: emoji[Math.floor(Math.random() * emoji.length)],
      size: [4, 4],
      animation: {
        name: animations[Math.floor(Math.random() * animations.length)],
        duration,
        delay,
        interationCount
      }
    } */
    /*
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
exports.default = mapMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwTWFwTWFya2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3ByZWNvbXBpbGUvbW9ja3MvYXBwTWFwTWFya2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM5QyxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMscUNBQXVDO0FBQ3ZDLG1DQUFpQztBQUdqQyxJQUFNLFVBQVUsR0FBZ0I7SUFDOUI7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQy9DLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFO1lBQ0osRUFBRTtZQUNGLEVBQUU7U0FDSCxDQUFDOzs7Ozs7WUFNRTtLQUNMO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFO1FBQzlDLElBQUksRUFDRixvRkFBb0Y7UUFDdEYsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNkLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxVQUFBO1lBQ1IsS0FBSyxPQUFBO1lBQ0wsZUFBZSxpQkFBQTtTQUNoQjtLQUNGO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsR0FBRztRQUNQLE1BQU0sRUFBRSxJQUFJLGdCQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELFFBQVEsVUFBQTtZQUNSLEtBQUssT0FBQTtZQUNMLGVBQWUsaUJBQUE7U0FDaEI7S0FDRjtJQUNEOzs7Ozs7Ozs7OztRQVdJO0lBQ0o7UUFDRSxFQUFFLEVBQUUsSUFBSTtRQUNSLE1BQU0sRUFBRSxJQUFJLGdCQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVztRQUMxQixTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCxRQUFRLFVBQUE7WUFDUixLQUFLLE9BQUE7WUFDTCxlQUFlLGlCQUFBO1NBQ2hCO0tBQ0Y7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNCSTtJQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFxS0c7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZW1vamkgPSBbJ/CfmLQnLCAn8J+YhCcsICfwn5iDJywgJ+KblCcsICfwn46gJywgJ/CfmpMnLCAn8J+ahyddO1xyXG5jb25zdCBhbmltYXRpb25zID0gWydib3VuY2UnLCAnZmFkZScsICdwdWxzZScsICdqdW1wJywgJ3dhZ2dsZScsICdzcGluJ107XHJcbmNvbnN0IGR1cmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxO1xyXG5jb25zdCBkZWxheSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjU7XHJcbmNvbnN0IGludGVyYXRpb25Db3VudCA9ICdpbmZpbml0ZSc7XHJcbmltcG9ydCAqIGFzIHN2Z0ljb25zIGZyb20gJy4vc3ZnSWNvbnMnO1xyXG5pbXBvcnQgeyBMYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgTWFwTWFya2VyIH0gZnJvbSAncmVhY3QtbmF0aXZlLXdlYnZpZXctbGVhZmxldCc7XHJcblxyXG5jb25zdCBtYXBNYXJrZXJzOiBNYXBNYXJrZXJbXSA9IFtcclxuICB7XHJcbiAgICBpZDogMixcclxuICAgIGNvb3JkczogeyBsYXQ6IDM3LjA2NDUyMTYxLCBsbmc6IC03NS42NzM2NDc4NiB9LFxyXG4gICAgaWNvbjogJ/CfmLQnLFxyXG4gICAgc2l6ZTogW1xyXG4gICAgICA2NCxcclxuICAgICAgNjRcclxuICAgIF0gLyogLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5LFxyXG4gICAgICBpbnRlcmF0aW9uQ291bnRcclxuICAgIH0gKi9cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAxLFxyXG4gICAgY29vcmRzOiB7IGxhdDogMzYuNDY0MTAzNTQsIGxuZzogLTc1LjY0MzI3MDEgfSxcclxuICAgIGljb246XHJcbiAgICAgICdodHRwczovL3d3dy5jYXRzdGVyLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxOC8wNy9TYXZhbm5haC1jYXQtbG9uZy1ib2R5LXNob3QuanBnJyxcclxuICAgIHNpemU6IFszMiwgMzJdLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6ICdib3VuY2UnLFxyXG4gICAgICBkdXJhdGlvbixcclxuICAgICAgZGVsYXksXHJcbiAgICAgIGludGVyYXRpb25Db3VudFxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDEwMCxcclxuICAgIGNvb3JkczogbmV3IExhdExuZygzNy4yMzMxMDYzMiwgLTc2LjIzNTE4MzMyKSxcclxuICAgIGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5LFxyXG4gICAgICBpbnRlcmF0aW9uQ291bnRcclxuICAgIH1cclxuICB9LFxyXG4gIC8qIHtcclxuICAgIGlkOiAxLFxyXG4gICAgY29vcmRzOiBbMzYuNDY0MTAzNTQsIC03NS42NDMyNzAxXSxcclxuICAgIGljb246ICfwn5i0JyxcclxuICAgIHNpemU6IFszMiwgMzJdLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5LFxyXG4gICAgICBpbnRlcmF0aW9uQ291bnRcclxuICAgIH1cclxuICB9LCovXHJcbiAge1xyXG4gICAgaWQ6IDEwMDAsXHJcbiAgICBjb29yZHM6IG5ldyBMYXRMbmcoMzYuNjAwNjE1MTUsIC03Ni40ODg4ODMzOCksXHJcbiAgICBpY29uOiBzdmdJY29ucy5ncmVlbkNpcmNsZSxcclxuICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICBuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcbiAgICAgIGR1cmF0aW9uLFxyXG4gICAgICBkZWxheSxcclxuICAgICAgaW50ZXJhdGlvbkNvdW50XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiB7XHJcbiAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcbiAgICBjb29yZHM6IFszNy4wNTgwODM1LCAtNzUuODIzMTg3NDddLFxyXG4gICAgaWNvbjogJ0Zpc2gnLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5LFxyXG4gICAgICBpbnRlcmF0aW9uQ291bnRcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuICAgIGNvb3JkczogWzM3LjIzMzEwNjMyLCAtNzYuMjM1MTgzMzJdLFxyXG4gICAgaWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcbiAgICBzaXplOiBbNCwgNF0sXHJcbiAgICBhbmltYXRpb246IHtcclxuICAgICAgbmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG4gICAgICBkdXJhdGlvbixcclxuICAgICAgZGVsYXksXHJcbiAgICAgIGludGVyYXRpb25Db3VudFxyXG4gICAgfVxyXG4gIH0gKi9cclxuICAvKlxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM2Ljk0OTk0MjUzLCAtNzYuNjQzMTg0MDldLFxyXG5cdFx0aWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcblx0XHRhbmltYXRpb246IHtcclxuXHRcdFx0bmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG5cdFx0XHRkdXJhdGlvbjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxLFxyXG5cdFx0XHRkZWxheTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDAuNSxcclxuXHRcdFx0aW50ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4xOTgxMDIzOSwgLTc2LjI4MDU4NTQ2XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGludGVyYXRpb25Db3VudFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0aWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG5cdFx0Y29vcmRzOiBbMzcuMDI0MTYxNjUsIC03Ni41NjA1MjUyMV0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM2LjkxNTQxNDY3LCAtNzUuNDkyNzkyNDVdLFxyXG5cdFx0aWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcblx0XHRhbmltYXRpb246IHtcclxuXHRcdFx0bmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG5cdFx0XHRkdXJhdGlvbjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxLFxyXG5cdFx0XHRkZWxheTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDAuNSxcclxuXHRcdFx0aW50ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi43MDUwMzEyMywgLTc2LjMyNzU1MTg1XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGludGVyYXRpb25Db3VudFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0aWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG5cdFx0Y29vcmRzOiBbMzYuMzE2MDU4OTEsIC03Ni40NTE0MTYxOF0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM2LjU5NDM2ODAzLCAtNzYuODk0ODY4NDJdLFxyXG5cdFx0aWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcblx0XHRhbmltYXRpb246IHtcclxuXHRcdFx0bmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG5cdFx0XHRkdXJhdGlvbjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxLFxyXG5cdFx0XHRkZWxheTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDAuNSxcclxuXHRcdFx0aW50ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4zNTc0MDg3NywgLTc1Ljc3OTEwMTEyXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGludGVyYXRpb25Db3VudFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0aWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG5cdFx0Y29vcmRzOiBbMzcuMzE1MDkxODIsIC03Ni43NjY5Mzc4NF0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM2LjkxODE1OTA5LCAtNzYuMDY3MDcwNzJdLFxyXG5cdFx0aWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcblx0XHRhbmltYXRpb246IHtcclxuXHRcdFx0bmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG5cdFx0XHRkdXJhdGlvbjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxLFxyXG5cdFx0XHRkZWxheTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDAuNSxcclxuXHRcdFx0aW50ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi42MTE5MTcsIC03NS43Njc1ODgyMl0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM2Ljc5NTIwNzY5LCAtNzYuMzk1OTQ5N10sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdGNvb3JkczogWzM3LjQyODU0NjY2LCAtNzUuOTU4ODMwNTJdLFxyXG5cdFx0aWNvbjogZW1vamlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamkubGVuZ3RoKV0sXHJcblx0XHRhbmltYXRpb246IHtcclxuXHRcdFx0bmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG5cdFx0XHRkdXJhdGlvbjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxLFxyXG5cdFx0XHRkZWxheTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDAuNSxcclxuXHRcdFx0aW50ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi43ODY3MzA5OSwgLTc2LjkwNDU5NzI0XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGludGVyYXRpb25Db3VudFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0aWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG5cdFx0Y29vcmRzOiBbMzcuMjA5NjY3NjcsIC03NS41ODc5OTY4NV0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpbnRlcmF0aW9uQ291bnRcclxuXHRcdH1cclxuXHR9ICovXHJcbl07XHJcbmV4cG9ydCBkZWZhdWx0IG1hcE1hcmtlcnM7XHJcbiJdfQ==