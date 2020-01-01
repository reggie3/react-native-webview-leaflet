"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emoji = ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇'];
var animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];
var duration = Math.floor(Math.random() * 3) + 1;
var delay = Math.floor(Math.random()) * 0.5;
var iterationCount = 'infinite';
var svgIcons = require("./svgIcons");
var leaflet_1 = require("leaflet");
var models_1 = require("../models");
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
          iterationCount
        } */
    },
    {
        id: 1,
        coords: { lat: 36.46410354, lng: -75.6432701 },
        icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
        size: [32, 32],
        animation: {
            duration: duration,
            delay: delay,
            iterationCount: iterationCount,
            type: models_1.AnimationType.BOUNCE
        }
    },
    {
        id: 100,
        coords: new leaflet_1.LatLng(37.23310632, -76.23518332),
        icon: emoji[Math.floor(Math.random() * emoji.length)],
        animation: {
            duration: duration,
            delay: delay,
            iterationCount: iterationCount,
            type: models_1.AnimationType.WAGGLE
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
        iterationCount
      }
    },*/
    {
        id: 1000,
        coords: new leaflet_1.LatLng(36.60061515, -76.48888338),
        icon: svgIcons.greenCircle,
        animation: {
            duration: duration,
            delay: delay,
            iterationCount: iterationCount,
            type: models_1.AnimationType.PULSE
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
        iterationCount
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
        iterationCount
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
exports.default = mapMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja01hcE1hcmtlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcmVjb21waWxlL21vY2tzL21vY2tNYXBNYXJrZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxJQUFNLFVBQVUsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDekUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzlDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUNsQyxxQ0FBdUM7QUFDdkMsbUNBQWlDO0FBQ2pDLG9DQUFxRDtBQUVyRCxJQUFNLFVBQVUsR0FBZ0I7SUFDOUI7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQy9DLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFO1lBQ0osRUFBRTtZQUNGLEVBQUU7U0FDSCxDQUFDOzs7Ozs7WUFNRTtLQUNMO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsQ0FBQztRQUNMLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFO1FBQzlDLElBQUksRUFDRixvRkFBb0Y7UUFDdEYsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNkLFNBQVMsRUFBRTtZQUNULFFBQVEsVUFBQTtZQUNSLEtBQUssT0FBQTtZQUNMLGNBQWMsZ0JBQUE7WUFDZCxJQUFJLEVBQUUsc0JBQWEsQ0FBQyxNQUFNO1NBQzNCO0tBQ0Y7SUFDRDtRQUNFLEVBQUUsRUFBRSxHQUFHO1FBQ1AsTUFBTSxFQUFFLElBQUksZ0JBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsU0FBUyxFQUFFO1lBQ1QsUUFBUSxVQUFBO1lBQ1IsS0FBSyxPQUFBO1lBQ0wsY0FBYyxnQkFBQTtZQUNkLElBQUksRUFBRSxzQkFBYSxDQUFDLE1BQU07U0FDM0I7S0FDRjtJQUNEOzs7Ozs7Ozs7OztRQVdJO0lBQ0o7UUFDRSxFQUFFLEVBQUUsSUFBSTtRQUNSLE1BQU0sRUFBRSxJQUFJLGdCQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVztRQUMxQixTQUFTLEVBQUU7WUFDVCxRQUFRLFVBQUE7WUFDUixLQUFLLE9BQUE7WUFDTCxjQUFjLGdCQUFBO1lBQ2QsSUFBSSxFQUFFLHNCQUFhLENBQUMsS0FBSztTQUMxQjtLQUNGO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFzQkk7SUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBcUtHO0NBQ0osQ0FBQztBQUNGLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVtb2ppID0gWyfwn5i0JywgJ/CfmIQnLCAn8J+YgycsICfim5QnLCAn8J+OoCcsICfwn5qTJywgJ/CfmocnXTtcclxuY29uc3QgYW5pbWF0aW9ucyA9IFsnYm91bmNlJywgJ2ZhZGUnLCAncHVsc2UnLCAnanVtcCcsICd3YWdnbGUnLCAnc3BpbiddO1xyXG5jb25zdCBkdXJhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMTtcclxuY29uc3QgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41O1xyXG5jb25zdCBpdGVyYXRpb25Db3VudCA9ICdpbmZpbml0ZSc7XHJcbmltcG9ydCAqIGFzIHN2Z0ljb25zIGZyb20gJy4vc3ZnSWNvbnMnO1xyXG5pbXBvcnQgeyBMYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgTWFwTWFya2VyLCBBbmltYXRpb25UeXBlIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbmNvbnN0IG1hcE1hcmtlcnM6IE1hcE1hcmtlcltdID0gW1xyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgY29vcmRzOiB7IGxhdDogMzcuMDY0NTIxNjEsIGxuZzogLTc1LjY3MzY0Nzg2IH0sXHJcbiAgICBpY29uOiAn8J+YtCcsXHJcbiAgICBzaXplOiBbXHJcbiAgICAgIDY0LFxyXG4gICAgICA2NFxyXG4gICAgXSAvKiAsXHJcbiAgICBhbmltYXRpb246IHtcclxuICAgICAgbmFtZTogYW5pbWF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aCldLFxyXG4gICAgICBkdXJhdGlvbixcclxuICAgICAgZGVsYXksXHJcbiAgICAgIGl0ZXJhdGlvbkNvdW50XHJcbiAgICB9ICovXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogMSxcclxuICAgIGNvb3JkczogeyBsYXQ6IDM2LjQ2NDEwMzU0LCBsbmc6IC03NS42NDMyNzAxIH0sXHJcbiAgICBpY29uOlxyXG4gICAgICAnaHR0cHM6Ly93d3cuY2F0c3Rlci5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDcvU2F2YW5uYWgtY2F0LWxvbmctYm9keS1zaG90LmpwZycsXHJcbiAgICBzaXplOiBbMzIsIDMyXSxcclxuICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICBkdXJhdGlvbixcclxuICAgICAgZGVsYXksXHJcbiAgICAgIGl0ZXJhdGlvbkNvdW50LFxyXG4gICAgICB0eXBlOiBBbmltYXRpb25UeXBlLkJPVU5DRVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDEwMCxcclxuICAgIGNvb3JkczogbmV3IExhdExuZygzNy4yMzMxMDYzMiwgLTc2LjIzNTE4MzMyKSxcclxuICAgIGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIGR1cmF0aW9uLFxyXG4gICAgICBkZWxheSxcclxuICAgICAgaXRlcmF0aW9uQ291bnQsXHJcbiAgICAgIHR5cGU6IEFuaW1hdGlvblR5cGUuV0FHR0xFXHJcbiAgICB9XHJcbiAgfSxcclxuICAvKiB7XHJcbiAgICBpZDogMSxcclxuICAgIGNvb3JkczogWzM2LjQ2NDEwMzU0LCAtNzUuNjQzMjcwMV0sXHJcbiAgICBpY29uOiAn8J+YtCcsXHJcbiAgICBzaXplOiBbMzIsIDMyXSxcclxuICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICBuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcbiAgICAgIGR1cmF0aW9uLFxyXG4gICAgICBkZWxheSxcclxuICAgICAgaXRlcmF0aW9uQ291bnRcclxuICAgIH1cclxuICB9LCovXHJcbiAge1xyXG4gICAgaWQ6IDEwMDAsXHJcbiAgICBjb29yZHM6IG5ldyBMYXRMbmcoMzYuNjAwNjE1MTUsIC03Ni40ODg4ODMzOCksXHJcbiAgICBpY29uOiBzdmdJY29ucy5ncmVlbkNpcmNsZSxcclxuICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICBkdXJhdGlvbixcclxuICAgICAgZGVsYXksXHJcbiAgICAgIGl0ZXJhdGlvbkNvdW50LFxyXG4gICAgICB0eXBlOiBBbmltYXRpb25UeXBlLlBVTFNFXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiB7XHJcbiAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcbiAgICBjb29yZHM6IFszNy4wNTgwODM1LCAtNzUuODIzMTg3NDddLFxyXG4gICAgaWNvbjogJ0Zpc2gnLFxyXG4gICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgIG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5LFxyXG4gICAgICBpdGVyYXRpb25Db3VudFxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG4gICAgY29vcmRzOiBbMzcuMjMzMTA2MzIsIC03Ni4yMzUxODMzMl0sXHJcbiAgICBpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuICAgIHNpemU6IFs0LCA0XSxcclxuICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICBuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcbiAgICAgIGR1cmF0aW9uLFxyXG4gICAgICBkZWxheSxcclxuICAgICAgaXRlcmF0aW9uQ291bnRcclxuICAgIH1cclxuICB9ICovXHJcbiAgLypcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi45NDk5NDI1MywgLTc2LjY0MzE4NDA5XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4xOTgxMDIzOSwgLTc2LjI4MDU4NTQ2XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4wMjQxNjE2NSwgLTc2LjU2MDUyNTIxXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi45MTU0MTQ2NywgLTc1LjQ5Mjc5MjQ1XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi43MDUwMzEyMywgLTc2LjMyNzU1MTg1XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi4zMTYwNTg5MSwgLTc2LjQ1MTQxNjE4XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi41OTQzNjgwMywgLTc2Ljg5NDg2ODQyXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4zNTc0MDg3NywgLTc1Ljc3OTEwMTEyXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4zMTUwOTE4MiwgLTc2Ljc2NjkzNzg0XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi45MTgxNTkwOSwgLTc2LjA2NzA3MDcyXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi42MTE5MTcsIC03NS43Njc1ODgyMl0sXHJcblx0XHRpY29uOiBlbW9qaVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaS5sZW5ndGgpXSxcclxuXHRcdGFuaW1hdGlvbjoge1xyXG5cdFx0XHRuYW1lOiBhbmltYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hdGlvbnMubGVuZ3RoKV0sXHJcblx0XHRcdGR1cmF0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcblx0XHRcdGRlbGF5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMC41LFxyXG5cdFx0XHRpdGVyYXRpb25Db3VudFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0aWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLFxyXG5cdFx0Y29vcmRzOiBbMzYuNzk1MjA3NjksIC03Ni4zOTU5NDk3XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy40Mjg1NDY2NiwgLTc1Ljk1ODgzMDUyXSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNi43ODY3MzA5OSwgLTc2LjkwNDU5NzI0XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCksXHJcblx0XHRjb29yZHM6IFszNy4yMDk2Njc2NywgLTc1LjU4Nzk5Njg1XSxcclxuXHRcdGljb246IGVtb2ppW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppLmxlbmd0aCldLFxyXG5cdFx0YW5pbWF0aW9uOiB7XHJcblx0XHRcdG5hbWU6IGFuaW1hdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXSxcclxuXHRcdFx0ZHVyYXRpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpICsgMSxcclxuXHRcdFx0ZGVsYXk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSkgKiAwLjUsXHJcblx0XHRcdGl0ZXJhdGlvbkNvdW50XHJcblx0XHR9XHJcblx0fSAqL1xyXG5dO1xyXG5leHBvcnQgZGVmYXVsdCBtYXBNYXJrZXJzO1xyXG4iXX0=