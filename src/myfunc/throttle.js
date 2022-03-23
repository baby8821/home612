function throttle(fn, interval) {
  return function () {
    if (fn) {
      fn.call(this, arguments)
      let func = fn         // 备份一份fn
      // 指定时间后恢复fn
      setTimeout(() => {
        fn = func
      }, interval)
      fn = null
    } else {
      console.log('节流中');
    }
  }
}

export default throttle