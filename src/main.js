//fenl	
user = "doesNotExist"     
s = [0,0,0,0,0]
inBounds = (x,y,z) => (x >= y && x <= z)
function onPlayerClick(id){
	let item = api.getHeldItem(id)
	if(item != null){
		if(item.name == "Spawn Block (Gray)" && item.attributes.customDescription == "NickOS Remote"){
			if(osOn){
				palette[0] = palette[1]
				api.setClientOption(user,"speedMultiplier",1)
				task = ["clearScreen",["shut"],0]
			} else {
				OSboot()
				user = id
				api.setClientOption(user,"speedMultiplier",0)
			}
			return
		} 
	}
	if(osOn){
		s[4] = 1
	}
}
function getProgram(){
	program = ""
	for(let y = 0; y < cLength; y++){
		let list = api.getStandardChestItems([chestPos,0,52+y])
		for(let i = 0; i < 36; i++){
			program += list[i].attributes.customDescription
		}
	}
	return program
}
function drawBoxOutline(tl,br){
	for(let y = tl[1]; y <= br[1]; y++){
		display[tl[0]][y][1] = palette[1]
		display[br[0]][y][1] = palette[1]
	}
	for(let x = tl[0]; x <= br[0]; x++){
		display[x][tl[1]][1] = palette[1]
		display[x][br[1]][1] = palette[1]
	}
}
function fillBox(tl, br, color){
	for(let x = tl[0]; x <= br[0]; x++){
		for(let y = tl[1]; y <= br[1]; y++){
			display[x][y][1] = color
		}
	}
}
function onPlayerAttemptAltAction(id){
	if(user == id && osOn){
		s[5] == 1
	}
}
function ctrack(){
        let ctmp = api.getPlayerFacingInfo(user)
        let vec = ctmp.camPos
        ctmp = ctmp.dir
        ctmp[0] = ctmp[0] * ((50-vec[2]) / ctmp[2]) + vec[0]
        ctmp[1] = ctmp[1] * ((50-vec[2]) / ctmp[2]) + vec[1]
        ctmp[0] = Math.round(ctmp[0] + 64)
        ctmp[1] = Math.round(64 - ctmp[1])
        if(inBounds(ctmp[0], 0, 125) && inBounds(ctmp[1],0,61)){
                return ctmp
        }
        return [0,0,0]
}
function jp(){
        let tmp = ctrack()
        s[2] = tmp[0]
        s[3] = tmp[1]
        tmp = api.getPosition(user)
        s[0] = Math.ceil(tmp[0])
        s[1] = Math.ceil(tmp[2])
        s[4] = Math.abs(s[4]-0.25)-0.25
        s[5] = Math.abs(s[4]-0.25)-0.25
}
function drawCursor(){
        let m = "100011010"
        for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                        let pos = [s[7]-64+i,64-s[8]-j,50]
                        let tmp = display[s[7]+i][s[8]+j][1]
                        api.setBlock(pos,api.blockIdToBlockName(tmp))
                        pos = [s[2]+i-64,64-s[3]-j,50]
                        api.setBlock(pos,api.blockIdToBlockName(palette[m[3*i+j]]))
                }
        }
        s[7] = s[2]
        s[8] = s[3]
}
function OSboot(){
        active = []
        ram = []
        s = [0,0,0,0,0,0,0,0,0]
	palette = [144,86]
        display = new Uint16Array()
        task = ["clearScreen",["initmenu"],0]
	isFile = false
        loadFont()
	curr_page = 0
	parentFolder = [0]
	directory = ["~"]
	itemSlotPath = []
	colors = [144,1724,8,47,483,32,97,59,6,31,28,29,136,85,946,947,948,84,949,950,951,147,66,86].reverse()
	charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|[]{}/-_>=+`~?.,;:"
	cColors = [2,1694,5,650,6,8,139,28,29,31,474,40,41,42,45,465,652,959,958,976,106,1630,1621,1629,946,947,948,949,950,951,482,484,486,471,140,961,962,147,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,97,93,92,90,99,91,94,84,85,89,95,87,88,98,96,86,1722,1056,1271,212,1510,1576,1605,1607,1608,1609]
	api.log("Welcome to NickOS! - fenl")
	osOn = true
}
function loadFont(){
	font = {
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
	}
}
function translate(x){
	let n = []
	for(let i = 0; i < x.length; i++){
		if(x[i] == "#"){
			n.push(palette[1])
		} else {
			n.push(palette[0])
		}
	}
	return n
}
function drawImage(sx,sy,dx,dy,x){
	let idx = 0
	for(let j = 0; j < dy; j++){
		for(let i = 0; i < dx; i++){
			display[sx+i][sy+j][1] = x[idx]
			idx++
		}
	}
}
function dtxt(x,y,m){ 
        for(let r = 0; r < m.length; r++){
		drawImage(x,y,3,5,translate(font[m[r]]))
                x += 4
		if(x > 124){
			x = 0
			y += 6
		}
        }
}
function updateDisplay(){
        for(let y = 0; y < 128; y++){
                for(let x = 0; x < 64; x++){
                        let val = display[y][x]
                        if(val[0] != val[1]){
                                val[0] = val[1]
                                api.setBlock([y - 64,64 - x,50],val[1])
                                display[y][x] = val
                        }
                }
        } return task[1]
}
function clearScreen(obj){
	if(task[2] == 0){
			display = []
	}
        for(let i = task[2]; i < 128;i++){
                display.push(Array(64))
		for(let z = 0; z < 64; z++){
			display[i][z] = [palette[0],palette[0]]
		}
		api.setBlockRect([i-64,64,50],[i-64,0,50],api.blockIdToBlockName(palette[0]))
		task[2] = i
        }
        return task[1]
}

osOn = false
function tick(delta){
	if(osOn){
		api.setClientOption(user,"RightInfoText",'NickOS Statistics \n'  + user + '\n' + parentFolder + '\n' + task)
                jp()
		try{drawCursor()}catch{}
                switch(task[0]){
                        case "initmenu":
				let txt = ""
				for(const i of directory){
					txt += i + "/"
				}
        			dtxt(0, 0, txt.slice(0,32))
				dtxt(92, 0, "<")
				dtxt(100,0, ">")
				dtxt(108,0, "Opt")

				if(txt != "~/"){
					dtxt(0, 6, `Return to ${directory.at(-2)}`     )
				}
				updateDisplay()
				chestFiles = Array(36).fill([null,null])
                                task = ["scanFolderItemSlots",2,0]
                                break
			case "scanFolderItemSlots":
				while(task[1] < 36){
					let x = api.getStandardChestItemSlot([parentFolder.at(-1),0,51], task[1])
					if(x != null){
						x = parseInt(x.attributes.customDescription)
						chestFiles[task[2]] = [api.getStandardChestItemSlot([x,0,51],0).attributes.customDescription + api.getStandardChestItemSlot([x,0,51],1).attributes.customDescription, x]
						task[2]++
					}
					task[1]++
				}
				task = ["displayFolderSons",curr_page]
				break
                        case "displayFolderSons":
                                for(let i = 0; i < 6; i++){
					let item = chestFiles[i + task[1] ][0]
					if(item != null){
						prefix = [3,5,translate(font[">"])]
						if(api.getStandardChestItemSlot([chestFiles[i+task[1]][1], 0,51],3) && !item.endsWith(".fol")){
							prefix = JSON.parse(api.getStandardChestItemSlot([chestFiles[i+task[1]][1], 0,51],3))
							prefix = [prefix[0],prefix[1],prefix.shift(2)]
						} else {
						if(item.endsWith(".fol")){
							prefix = [3,5,[0,0,0,0,0,0,99,0,0,99,99,99,99,99,99]]
						}
						if(item.endsWith(".rgb") || item.endsWith(".ngp") ){
							prefix = [5,5,[86,86,86,86,86,86,84,84,144,86,86,84,84,84,86,86,84,84,84,86,86,86,86,86,86]]
						}
						if(item.endsWith(".js")){
							prefix = [5,5,[86,86,86,86,86,86,91,91,86,86,86,86,86,86,86,86,91,91,91,86,86,86,86,86,86]]
						}
						}
						drawImage(1,6*i+12,prefix[0],prefix[1],prefix[2])
						dtxt(prefix[0]+2,6*i+12, item)
					}
				}
				task = ["updateDisplay",["waitTC",["mainMenuClicked"]]]
                                break
                        case "updateDisplay":
                                updateDisplay()
				task = task[1]
                                break
			case "waitTC":
				if(s[4] == 0.5){
					task = task[1]
				}
				break
			case "clearScreen":
				clearScreen()
				task = task[1]
				break
			case "shut":
				osOn = false
				break
			case "mainMenuClicked":
				if(inBounds(s[3],0,6)){
					if(inBounds(s[2],92,100)){
						curr_page -= 6
						task = ["clearScreen",["initmenu"],0]
						break
					}
					if(inBounds(s[2],100,108)){
						curr_page += 6
						task = ["clearScreen",["initmenu"],0]
						break
					}
					if(inBounds(s[2],108,128)){
						task =  ["folderMenu"]
						break
					}
					if(inBounds(s[2],88,124)){
						tmp = palette[0]
						palette[0] = palette[1]
						palette[1] = tmp
						task = ["clearScreen",["initmenu"],0]
						break
					}
				}
				cp = Math.floor((s[3])/6) - 1
				if(cp == 0){
					if(parentFolder.length > 1){
						parentFolder.pop()
						directory.pop()
						itemSlotPath.pop()
					}
					task = ["clearScreen",["initmenu"],0]
					break
				}
				cpace = chestFiles[curr_page + cp - 1][1]
				if(cpace == null){
					task = ["waitTC", ["mainMenuClicked"]]
					break
				}
				zf = api.getStandardChestItems([cpace,0,51])
				if(zf[1].attributes.customDescription == ".fol"){
					directory.push(zf[0].attributes.customDescription)
					parentFolder.push(cpace)
					itemSlotPath.push(curr_page + cp + 1)
					curr_page = 0
					task = ["clearScreen",["initmenu"],0]
					break
				}
				task = ["drawFileMenu"]
				break
			case "drawFileMenu":
				cLength = parseInt(zf[2].attributes.customDescription)
				chestPos = cpace + 0
				let name = zf[0].attributes.customDescription + zf[1].attributes.customDescription
				drawBoxOutline([100,41],[127,63])
				fillBox([101,42],[126,62],palette[0])
				dtxt(102,43,"Exec X")
				dtxt(102,49,"Raw")
				dtxt(102,55,"Del")
				updateDisplay()
				task = ["waitTC",["menuOptionClicked"]]
				break
			case "viewingTextRedir":
				if(s[4] == 0.5 && inBounds(s[3],6,12)){
					if(inBounds(s[2],0,16)){
						task[1] -= 256
						task[2] -= 256
						task[0] = "displayFile"
						task = ["clearScreen",task,0]
					}
					if(inBounds(s[2],24,40)){
						task[1] += 256
						task[2] += 256
						task[0] = "displayFile"
						task = ["clearScreen",task,0]
					}
					if(inBounds(s[2],48,64)){
						task = ["clearScreen",["initmenu"],0]
					}
				}
				break
			case "menuOptionClicked":
				if(inBounds(s[3],43,61)){
					if(inBounds(s[3],43,48)){
						if(inBounds(s[2],120,128)){
							curr_page = 0
							task = ["clearScreen",["initmenu"],0]
							break
						}
						extension = zf[1].attributes.customDescription
						if(extension == ".js"){
							getProgram()
							task = ["clearScreen",["initexecute"],0]
							memory = []
							break
						}
						if(extension == ".txt"){
							getProgram()
							task = ["clearScreen",["displayFile",0,256],0]
							break
						}
						if(extension == ".ngp"){
							getProgram()
							prog = 0
							task = ["clearScreen",["ngpFormat"],0]
							break
						}
						if(extension == ".rgb"){
							getProgram()
							prog = 0
							task = ["clearScreen",["rgbFormat"],0]
							break
						}
						if(extension == '.nvf'){
							program = api.getStandardChestItemSlot([chestPos,0,52],0).attributes.customDescription
							program = program.split(" ")
							xl = parseInt(program[0])
							yl = parseInt(program[1])
							frameCount = parseInt(program[2])
							data_idx = 0
							currCPos = 0
							currCItem = 0
							idx = 0, j = 0
							pos = 0
							data = program[3]
							task = ["clearScreen",["playVideoFrame"],0]
							break
						}
						break
					}
					if (inBounds(s[3],49,55)){
						getProgram()
						task = ["clearScreen",["displayFile",0,256],0]
						break
					}	
					if(inBounds(s[3],55,61)){
						api.setStandardChestItemSlot([parentFolder.at(-1),0,51], cpace+1, "Air", 1, undefined)
						api.setStandardChestItemSlot([chestPos, 0, 51], 0, "Air", 1, undefined)
						api.setBlock([chestPos,0,51],"Air")
						task = ["clearScreen",["initmenu"],0]
						break
					}
				} else {
					task = ["waitTC",["menuOptionClicked"]]
				}
				break
			case "execute":
				if(s[3]<6 && s[4] == 0.5){
					task = ["clearScreen",["initmenu"],0]
				}
				eval(program)
				dtxt(0,0,"x")
				break
			case "displayFile":
				dtxt(0,0,zf[0].attributes.customDescription + zf[1].attributes.customDescription)
				dtxt(0,6,"Back")
				dtxt(24,6,"Next")
				dtxt(48,6,"Exit")
				dtxt(0,12,program.slice(task[1],task[2]))
				updateDisplay()
				task[0] = "viewingTextRedir"
				break
			case "initexecute":
				dtxt(0,0,"Exit")
				updateDisplay()
				task = ["execute"]
				break
			case "folderMenu":
				drawBoxOutline([93,6], [127,28])
				fillBox([94,7], [126,27], palette[0])
				dtxt(95,8, "About X")
				dtxt(95,14, "Upload")
				dtxt(95,20, "Delete")
				task = ["updateDisplay",["waitTC",["folderMenuClicked"]]]
				break
			case "folderMenuClicked":
				if(inBounds(s[3], 8, 26) && inBounds(s[2],97,127)){
					if(inBounds(s[3],8,13)){
						if(inBounds(s[2],97,119)){
							task = ["about"]
						}
						if(inBounds(s[2],120,124)){
							task = ["clearScreen", ["initmenu"], 0]
						}
						break
					}
					if(inBounds(s[3],14,19)){
						fillBox([4,4],[94,23],palette[0])
						drawBoxOutline([3,3],[95,24])
						task = ["upload"]
						break
					}
					if(inBounds(s[3],20,26)){
						api.setStandardChestItemSlot([parentFolder.at(-2),0,51],itemSlotPath.at(-1),"Air",1,undefined)
						api.setStandardChestItemSlot([parentFolder.at(-1),0,51],0,"Air",1,undefined)
						api.setBlock([parentFolder.at(-1),0,51], "Air")
						parentFolder.pop()
						itemSlotPath.pop()
						directory.pop()
						task = ["clearScreen",["initmenu"],0]
					}
					
				}
				task = ["waitTC",["folderMenuClicked"]]
				break
			case "about":
				fillBox([6,6],[112,30],palette[0])
				drawBoxOutline([5,5],[113,31])				
				dtxt(7,7, "NickOS V2.11.2 by fenl_")
				dtxt(7,13,"2025 UNDER GPL V3         ")

				dtxt(7,25,"Click to exit")
				updateDisplay()
				task = ["waitTC", ["clearScreen",["initmenu"],0]]
				break
			case "upload":
				dtxt(5,5,"Waiting for user input")
				dtxt(5,11,"Click to exit")
				updateDisplay()
				p = 0
				while(p < 36 && api.getStandardChestItemSlot([parentFolder.at(-1),0,51],p) != null ){
					p++
				}
				if(p == 36){
					dtxt(5,17,"Folder Space Full")
					task = ["updateDisplay",["waitTC",["clearScreen",["initmenu"],0]]]
				} else {
					task = ["findChest"]
				}
			case "findChest":
				cpos = 0
				y = 0
				while(api.getBlock(cpos,0,51).startsWith("Chest")){
					if(api.getStandardChestItemSlot([cpos,0,51],0) == null){
						break
					}
					cpos++
				}
				task = ["waitUpload"]
			case "waitUpload": // isFile contents fileName extension
				if(isFile){
					api.setStandardChestItemSlot([parentFolder.at(-1),0,51], p, "Net", 1, undefined, {customDescription: cpos.toString()  })
					api.setBlock([cpos,0,51], "Chest")
					api.setStandardChestItemSlot([cpos,0,51], 0, "Net", 1, undefined, {customDescription: fileName })
					api.setStandardChestItemSlot([cpos,0,51], 1, "Net", 1, undefined, {customDescription: extension} )
					api.setStandardChestItemSlot([cpos,0,51], 2, "Net", 1, undefined, {customDescription: (contents.length / 36).toString() })
					for(; y < contents.length/36; y++){
						api.setBlock([cpos,0,52+y],"Chest")
						for(let i = 0; i < 36; i++){
							api.setStandardChestItemSlot([cpos,0,52+y], i, "Net", 1, undefined, {customDescription: contents[36*y+i]} )
						}
					}
					isFile = false
					task = ["clearScreen", ["initmenu"],0]
					break
				}
				if(s[4] == 0.5){
					task = ["clearScreen",["initmenu"],0]
					break
				}
			case "ngpFormat":
				dtxt(0,0,"Click to Exit")
				if(typeof(program)=="string"){program = program.split(" ")}
				yl = parseInt(program[1])
				xl = parseInt(program[0])
				for(let i = prog; i < yl; i++){
					for(let j = 0; j < xl; j++){
						display[j][6+i][1] = colors[charset.indexOf(program[2][xl*i+j])]
					}
					prog = i
				}
				task = ["updateDisplay",["waitTC",["clearScreen",["initmenu"],0]]]
				break
			case "rgbFormat":
				dtxt(0,0,"Click to Exit")
				if(typeof(program)=="string"){program = program.split(" ")}
				yl = parseInt(program[1])
				xl = parseInt(program[0])
				for(let i = prog; i < yl; i++){
					for(let j = 0; j < xl; j++){
						display[j][6+i][1] = cColors[charset.indexOf(program[2][xl*i+j])]
					}
					prog = i
				}
				task = ["updateDisplay",["waitTC",["clearScreen",["initmenu"],0]]]
				break
			case "playVideoFrame":
				if(idx == frameCount){
					task = ["waitTC",["clearScreen",["initmenu"],0]]
					break
				}
				if(data == "REFRESH"){
					data_idx = 0
					currCItem++
					if(currCItem == 36){
						currCItem = 0
						currCPos++
					}
					data = api.getStandardChestItemSlot([chestPos,0,52+currCPos], currCItem).attributes.customDescription
					return
				}
				while(pos != "EOF" && pos < xl*yl){
					item = data[data_idx].codePointAt(0)
					if(item == 32){
						pos = "EOF"
						continue
					}
					length = Math.floor(item/100)
					item = item % 100
					while(j < length){
						if(item != 79){
							display[pos % xl][Math.floor(pos/xl)][1] = cColors[item]
						}
						pos++, j++
					}
					j = 0
					data_idx++
					if(data_idx >= data.length){
						data = "REFRESH"
						return
					}
						
				}
				idx++
				pos = 0
				data_idx++
				if(data_idx >= data.length){
						data = "REFRESH"
				}
				task = ["updateDisplay", ["playVideoFrame"]]
				break
				
			}
		}
}
