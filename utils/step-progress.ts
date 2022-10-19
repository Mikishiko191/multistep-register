export const stepProgress = (step: string | string[] | 0) => {
  switch (step) {
    case '0':
      return 20
    case '1':
      return 40
    case '2':
      return 60
    case '3':
      return 80
    case '4':
      return 100
    default:
      return 25
  }
}
