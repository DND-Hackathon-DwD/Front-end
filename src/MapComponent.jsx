import { useKakaoLoader } from "react-kakao-maps-sdk"
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"

// https://www.npmjs.com/package/react-kakao-maps-sdk
// https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample
function MapComponent() {
  const options = {}
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    ...options,
  })
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
    >
        
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{color:"#000"}}>Hello World!</div>
      </MapMarker>
    </Map>
  )
}
  
export default MapComponent