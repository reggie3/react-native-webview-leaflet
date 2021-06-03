import * as React from 'react'
import { MapComponent } from './web/src/components/MapComponent'
import { WebViewLeafletProps } from './web/src/LeafletWebView.types'

export const WebViewLeaflet = (props: WebViewLeafletProps) => {
  return <MapComponent {...props} />
}
