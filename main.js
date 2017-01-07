var menubar =  require('menubar');

var mb = menubar({
  index: 'file://' + __dirname + '/public/index.html',
  preloadWindow: true,
  tooltip: 'yo',
  showDockIcon: true
  // webPreferences: {
    // webSecurity: false
  // }
})

mb.on('ready', function ready () {
  console.log('app is ready')
  mb.app.setBadgeCount(5)


  // Fetch and display?
})

mb.on('after-create-window', function(){
  //mb.window.openDevTools();


  // console.log(mb.tray)

  // mb.tray.setToolTip("5")
  // mb.tray.setImage('./noun_11222_cc.png')
})
