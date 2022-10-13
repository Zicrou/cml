export function convertUNIXString(UNIX_timestamp: number, mode: number) {
  if (UNIX_timestamp) {
    const convertedString = new Date(UNIX_timestamp * 1000)
    let months
    let time: string
    if (mode === 0) {
      months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    } else {
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }

    const year = convertedString.getFullYear()
    const month = months[convertedString.getMonth()]
    const date = convertedString.getDate()
    if (mode === 0) {
      time = month + '/' + date + '/' + year
      //+ " " + hour + ":" + min + ":" + sec; // can be used if time is required
      return time
    } else {
      time = month + ' ' + date + ', ' + year
      //+ " " + hour + ":" + min + ":" + sec; // can be used if time is required
      return time
    }
  } else {
    return ''
  }
}
