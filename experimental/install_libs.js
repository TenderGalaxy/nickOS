api.getBlock(0,1e5, -1)
api.setBlockData(0,1e5, -1, {persisted: {shared: {fileCount: 13}}})

setFile(0, {name:  'root', extension: '', contents: [1, 13]})

setFile(1, {name: 'System', extension: '', contents: [2]})

setFile(2, {name: 'Library', extension: '', contents: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]})

setFile(3, {name: 'buttons', extension: '.pack', contents: `
require('display.pack')
require('cursors.pack')


globalThis.Button = class extends Window{
  constructor(x,y, dx, dy, func){
    super(x, y, dx, dy)
    this.toExec = func
    clickFunctions.push((() => this.exec()))
  }
  exec(){
    if(inBounds(userCursorPos[0], this.startx, this.startx + this.x) && inBounds(userCursorPos[1], this.starty, this.starty + this.y)){
      requestExecFunction(() => this.toExec(), "")
	}
	clickFunctions.push((() => this.exec()))
  }
}`})

setFile(4, {name: 'config', extension: '.json', contents: {
  displayx: 128,
  displayy: 64,
  dark: 86,
  light: 144
}})

setFile(5, {name: 'cursors', extension: '.pack', contents: 'require("display.pack"),require("utils.pack"),globalThis.decreaseClick=function(){if(userCursorPos=getPlayerLook(),registerClick){let i=[...clickFunctions];clickFunctions=[];let l="";for(;i.length>0;)(l=i.shift())(userCursorPos)}registerClick=!1,requestExecFunction(decreaseClick,"")},globalThis.getPlayerLook=function(){let i=api.getPlayerFacingInfo(user),l=i.camPos;return(i=i.dir,i[0]*=(50-l[2])/i[2],i[1]*=(50-l[2])/i[2],i[0]+=l[0],i[1]+=l[1],i[0]=Math.round(i[0]+config.displayx/2),i[1]=Math.round(config.displayy-i[1]),inBounds(i[0],0,config.displayx-3)&&inBounds(i[1],0,config.displayy-3))?i:[0,0]},globalThis.onPlayerClick=function(i){i==user&&(registerClick=!0)},clickFunctions=[],decreaseClick();'})

setFile(6, {name: 'display', extension: '.pack', contents: 'globalThis.drawDisplay=function(i=user){for(let t of(screen=Array.from({length:config.displayy},()=>Array(config.displayx).fill(config.light)),Object.values(windows)))t.render();disx=0,disy=0,requestExecFunction(dis,"")},globalThis.dis=function(){if(!(disy<config.displayy-1))return"";for(requestExecFunction(dis,"");;)if(api.setBlock([disx-config.displayx/2,config.displayy-disy,50],screen[disy][disx]),++disx==config.displayx&&(disy++,disx=0),disy==config.displayy-1)return""},globalThis.Window=class{constructor(i,t,s,l){this.startx=i,this.starty=t,this.x=s,this.y=l,this.isVisible=!0,this.win=Array.from({length:l},()=>Array(s).fill(config.light))}getParams(){return{startx:startx,starty:starty,x:x,y:y,isVisible:isVisible,win:win}}fillInOutline(i,t,s,l){for(let r=s;r<l+1;r++)this.win[i][r]=config.dark,this.win[t][r]=config.dark;for(let e=i;e<t+1;e++)this.win[e][s]=config.dark,this.win[e][l]=config.dark}dtxt(i,t,s,l=86,r=144,e=this.x,n=this.y){let h=i;for(let a=0;a<s.length&&t<n;a++){if("\\n"===s[a]){t+=6;continue}for(let f=0;f<5;f++)for(let o=0;o<3;o++)this.win[i+o][t+f]="#"==font[s[a]][3*f+o]?l:r;(i+=4)>e&&(i=h,t+=6)}}setPixel(i,t,s){this.win[i][t]=s}getPixel(i,t){return this.win[i][t]}setVisibility(i){this.isVisible=i}render(){if(this.isVisible)for(let i=0;i<this.x;i++)for(let t=0;t<this.y;t++)screen[this.startx+i][this.starty+t]=this.win[t][i]}},windows=[];'})

setFile(7, {name: 'font', extension: '.json', contents: {
		"A":"#### ##### ## #",
		"B":"## # ### # ### ",
		"C":"####  #  #  ###",
		"D":"## # ## ## ### ",
		"E":"####  ####  ###",
		"F":"####  ####  #  ",
		"G":"####  # ## ####",
		"H":"# ## ##### ## #",
		"I":"### #  #  # ###",
		"J":"  #  #  ## ####",
		"K":"# ## ### # ## #",
		"L":"#  #  #  #  ###",
		"M":"########## ## #",
		"N":"#### ## ## ## #",
		"O":"#### ## ## ####",
		"P":"#### #####  #  ",
		"Q":"#### ## ## ### ",
		"R":"#### ## ### # #",
		"S":"####   #   ####",
		"T":"### #  #  #  # ",
		"U":"# ## ## ## ####",
		"V":"# ## ## ### #  ",
		"W":"# ## ## #######",
		"X":"# ## # # # ## #",
		"Y":"# ## ## # #  # ",
		"Z":"###  # # #  ###",
		"a":"______ ### # ##",
		"b":"#  #  #### ####",
		"c":"______####  ###",
		"d":"  #  ##### ####",
		"e":"_______#_#_###_",
		"f":"  # # ### #  # ",
		"g":"____#_#_#_####_",
		"h":"#  #  #### ## #",
		"i":"___ # ___ #  # ",
		"j":"  #___  #  ####",
		"k":"#  #  # ### # #",
		"l":"  #  #  #  # # ",
		"m":"______####### #",
		"n":"______#### ## #",
		"o":"______#### ####",
		"p":"___#### #####  ",
		"q":"___#### ####  #",
		"r":"______####  #  ",
		"s":"______ ## # ## ",
		"t":"___ # ### #  # ",
		"u":"______# ## ####",
		"v":"______# ## # # ",
		"w":"______# #######",
		"x":"______# # # # #",
		"y":"______#_#_#_#__",
		"z":"______##  #  ##",
		"0":"#### ## ## ####",
		"1":"##  #  #  # ###",
		"2":"###  #####  ###",
		"3":"###  ####  ####",
		"4":"# ## ####  #  #",
		"5":"####  ###  ####",
		"6":"####  #### ####",
		"7":"###  #  #  #  #",
		"8":"#### ##### ####",
		"9":"#### ####  #  #",
		"-":"______###______",
		"=":"___###___###___",
		"_":"____________###",
		"+":"___ # ### # ___",
		"/":"__#_##_#_##_#__",
		" ":"               ",
		".":"_____________#_",
		"!":"_#__#__#_____#_",
		"?":"##___#_#_____#_",
		">":"______##___###_",
		"<":"_______###___##",
		":":"____#_____#____",
		'"':"#_##_#_________",
		"'":"_#__#_#________",
		"&":"_#_#___#_#_###_",
		",":"__________#_#__",
		"^":"_#_#_##_#______",
		"|":"_#__#__#__#__#_",
		"(":"_#_#__#__#___#_",
		";":"____#_____#_#__",
		")":"_#___#__#__#_#_",
		"[":"##_#__#__#__##_",
		"]":"_##__#__#__#_##",
		"%":"#____#_#_#____#",
		"*":"#_#_#_#_#______",
		"{":"_##_#_##__#__##",
		"}":"##__#__##_#_##_",
		"~":"______#_#_#____"
	}})

setFile(8, {name: 'require', extension: '.pack', contents: 'loaded=[],globalThis.require=function(e){loaded.includes(e)||(log("require",`Attempting to require Library ${e}`),executeCFF(".pack",`System/Library/${e}`),loaded[loaded.length]=e)};'})

setFile(9, {name: 'requirements', extension: '.json', contents: [
  'terminal.pack',
  'display.pack',
  'cursors.pack',
  'buttons.pack'
]})
setFile(10, {name: 'terminal', extension: '.pack', contents: 'globalThis.parseCommand=function(x){let f;return eval(`${(x=x.split(" ")).shift()}(...x)`)},globalThis.cd=function(n){return terminalPath=n},globalThis.home=function(){terminalPath=""},globalThis.echo=function(n){return log("terminal",parseCommand(X))},globalThis.ls=function(){let n=getFile(terminalPath).contents;return log("terminal",n=n.map(n=>getFile(n)).map(n=>n.name+n.extension))},globalThis.touch=function(n,t){return log("terminal",newFile(n,t))},terminalPath=followPath("User");'})

setFile(11, {name: 'utils', extension: '.pack', contents: 'globalThis.inBounds=function(n,o,s){return n>o&&n<s},globalThis.log=function(n,o){api.broadcastMessage(`module-minos-${n}: ${o}`)};'})


setFile(12, {name: '.pack', extension: '.cff', contents: 'try{let j=eval(getFile(data).contents);log("pack.cff",`Succesfully decompressed file ${data}`)}catch(error){log("pack.cff",`Unable to decompress file ${data}: Error ${error}`)}"HALT"'})

setFile(13, {name: 'User', extension: '', contents: []})
