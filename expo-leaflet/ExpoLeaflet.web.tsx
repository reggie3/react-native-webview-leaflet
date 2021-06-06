import * as React from 'react'
import { MapComponent } from './web/src/MapComponent'
import { ExpoLeafletProps } from './web/src/ExpoLeaflet.types'

export const ExpoLeaflet = (props: ExpoLeafletProps) => {
  return <MapComponent {...props} />
}
