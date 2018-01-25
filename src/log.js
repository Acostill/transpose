const log = (obj) => {
    let date = new Date();
    let mins = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    let time = `${date.getHours()}:${mins}:${date.getMilliseconds()}`;
    let message = '--- New log ' + time + ' ---'
    console.log('--- New log ' + time + ' ---' )
    for (var key in obj) {
      console.log(key + ':', obj[key]);
    }
    console.log('--- End of log ---');
}

export default log;