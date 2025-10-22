import { XMLParser } from "fast-xml-parser"

export function calculateDistanceFromGpx(
  gpxData: string
): { distance: number; elevationGain: number } | 0 {
  try {
    let distanciaTotal = 0
    let elevationGain = 0

    const parser = new XMLParser({ ignoreAttributes: false })
    const json = parser.parse(gpxData)

    const trk = json?.gpx?.trk
    if (!trk) return 0
    console.log("Este es el trk:", trk)

    const trksegments = Array.isArray(trk)
      ? trk.map((t) => t.trkseg)
      : [trk.trkseg]

    if (!trksegments) return 0

    console.log("Estos son los trksegments:", trksegments)

    const trkpt = trksegments.map((seg: any) => seg.trkpt)

    console.log("Estos son los trkpt:", trkpt)

    trkpt.forEach((pts: any) => {
      console.log("Estos son los pts:", pts)
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]
        const curr = pts[i]

        const prevElev = prev?.ele ? parseFloat(prev.ele) : 0
        const currElev = curr?.ele ? parseFloat(curr.ele) : 0

        if (currElev > prevElev) {
          elevationGain += currElev - prevElev
        }

        const distancia = haverSine(
          parseFloat(prev["@_lat"]),
          parseFloat(prev["@_lon"]),
          parseFloat(curr["@_lat"]),
          parseFloat(curr["@_lon"])
        )
        distanciaTotal += distancia
      }
    })
    return {
      distance: Number((distanciaTotal / 1000).toFixed(2)),
      elevationGain: Number(elevationGain.toFixed(0)),
    }
  } catch (error) {
    console.error("Error al calcular distancia:", error)
    return 0
  }

  function haverSine(lat1: any, lon1: any, lat2: any, lon2: any) {
    const toRad = (value: number) => (value * Math.PI) / 180

    const lat1Rad = toRad(lat1)
    const lon1Rad = toRad(lon1)
    const lat2Rad = toRad(lat2)
    const lon2Rad = toRad(lon2)

    const deltaLat = lat2Rad - lat1Rad
    const deltaLon = lon2Rad - lon1Rad
    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distancia = 6371e3 * c
    return distancia // en metros
  }
}
