export default function convertUNIXString(
  UNIX_timestamp: number | any,
  mode: number,
  screen?: string
) {
  if (UNIX_timestamp) {
    const convertedString = new Date(UNIX_timestamp * 1000);
    let months: string[] = [];
    let time: string;
    if (mode === 0) {
      months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    } else if (mode === 1) {
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else if (mode === 2) {
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "SeP",
        "Oct",
        "Nov",
        "Dec",
      ];
    }

    const year = convertedString.getFullYear();
    const month = months[convertedString.getMonth()];
    const date = convertedString.getDate();
    const hour = convertedString.getHours();
    let min: any = convertedString.getMinutes();
    //const sec = convertedString.getSeconds(); can be used in future
    if (mode === 0) {
      time = month + "/" + date + "/" + year;
      //+ " " + hour + ":" + min + ":" + sec; // can be used if time is required
      return time;
    } else if (mode === 1) {
      if (min.toString().length == 1) {
        min = "0" + min;
      }
      time = month + " " + date + ", " + year + " at " + hour + ":" + min; // can be used if time is required
      return time;
    } else if (mode === 2) {
      time = month + " " + date; // can be used if time is required
      return time;
    }
  } else {
    return "";
  }
}
