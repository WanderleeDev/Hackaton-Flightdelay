export function formatDistance(distance: number, short = true) {
  if (short) {
    return `${Math.floor(distance / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`;
  }

  return `${distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`;
}
