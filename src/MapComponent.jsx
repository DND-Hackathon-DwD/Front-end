/*global kakao*/ 
import { useEffect, useState } from "react"
import { useKakaoLoader } from "react-kakao-maps-sdk"
import { Map, MapMarker, MapTypeControl, ZoomControl, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk"

// https://www.npmjs.com/package/react-kakao-maps-sdk
// https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample

function MapComponent() {
  useKakaoLoader()
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.450701, lng: 126.570667 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  })
  
  return (
    <Map
      center={state.center}
      isPanto={state.isPanto}
      style={{ width: "100%", height: "360px" }}
      level={3}
    >
      <MapMarker position={state.center}>
        <div style={{color:"#000"}}>Hello World!</div>
      </MapMarker>

      <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
    </Map>
  )
}
  
export default MapComponent