const inb = (x,y,z) => (x >= y && x <= z)
					
function init(){
	render_dist = 20
	fov = 160
	a = 0.5
	nr = 0.2
	time = 37  
	display = []
	camera = [0,0,-15]
	lookDir = [0,0,1]
	light = normalize([1, 0, 0])
}
function updateDisplay(){
	for(let i = 0; i < 64; i++){
		for(let j = 0; j < 128; j++){
			if(display[i][j][0] != display[i][j][1]){
				api.setBlock(j-64,i,50,api.blockIdToBlockName(display[i][j][1]))
				display[i][j][0] = display[i][j][1]
			}
		}
	}
}
function csc(){
	for(let i = 0; i < 64; i++){
	 for(let j = 0; j < 128; j++){
		display[i][j][1] = 90
		display[i][j][2] = 9999
	 }
   }
}
function getColor(norm){
	colors = [1724,8,47,483,32,97,59,6,31,28,29,136,85,946,947,948,84,949,950,951,147,66,86].reverse()
	if(inb(norm,0,1)){
		return colors[Math.floor(norm*22)]
	} else if (norm > 1){
		return 86
	} else {
		return 1724
	}
}
function vecxmatr(x,y){
	let out = []
	for(let i = 0; i < y[0].length; i++){
		sum = 0
		for(let j = 0; j < y.length; j++){
			sum += x[j] * y[i][j]
		}
		out.push(sum)
	}
	return out
}
function dotProduct(x,y){
	return x[0] * y[0] + x[1] * y[1] + x[2] * y[2]
}
function difference(x,y){
	return [x[0]-y[0], x[1]-y[1], x[2]-y[2]]
}
function add(x,y){
	let out = []
	for(let i = 0; i < 3; i++){
		out.push(x[i] + y[i])
	} return out
}
function normalize(x){
	let dist = Math.sqrt(x[0] ** 2 + x[1] ** 2 + x[2] ** 2)
	return x.map(v => v/dist)
}
function crossProduct(x,y){
	return [
	(x[1] * y[2] - x[2] * y[1]),
	(x[2] * y[0] - x[0] * y[2]),
	(x[0] * y[1] - x[1] * y[0])
	]
}
function project(coord){
  let f = 1 / Math.tan(fov * Math.PI / 90)
  let q = render_dist / (render_dist - nr)
  let ret = vecxmatr([...coord,1],[
[a*f  ,0    ,0    ,0    ],
[0    ,f    ,0    ,0    ],
[0    ,0    ,q    ,-nr*q],
[0    ,0    ,1    ,0    ]
])
  ret[0] /= ret[3]
  ret[1] /= ret[3]
  return ret
}
function convert(camera, pos, up){
	let newF = normalize(difference(pos, camera))
	let a = dotProduct(up,newF)
	a = newF.map(v => v*a)
	let newUp = normalize(difference(up,a))
	let newRight = crossProduct(newUp,newF)
	let mat = [
		[newRight[0],newRight[1],newRight[2],1],
		[newUp[0],newUp[1],newUp[2],1],
		[newF[0],newF[1],newF[2],1],
		[pos[0],pos[1],pos[2],1]
	]
	return mat

}
function invert(m){
	let mat = []
	mat.push([m[0][0],m[1][0],m[2][0],0])
	mat.push([m[0][1],m[1][1],m[2][1],0])
	mat.push([m[0][2],m[1][2],m[2][2],0])

	mat.push([
		-(m[3][0] * mat[0][0] + m[3][1] * mat[1][0] + m[3][2] * mat[2][0]),
		-(m[3][0] * mat[0][1] + m[3][1] * mat[1][1] + m[3][2] * mat[2][1]),
		-(m[3][0] * mat[0][2] + m[3][1] * mat[1][2] + m[3][2] * mat[2][2]), 1
	])
	return mat
}
function drawLine(a, b, color, z){
  let xd = a[0] - b[0]
  let xy = a[1] - b[1]
  let distance = Math.abs(xd) + Math.abs(xy)
  for(let i = 0; i < distance; i++){
    let x = Math.floor(b[0] + (i * xd)/distance)
    let y = Math.floor(b[1] + (i * xy)/distance)
    if(inb(x,0, 127) && inb(y,0,63)){
			if(display[y][x][2] > z){
      	display[y][x][1] = color
				display[y][x][2] = z
			}
    }
  }
}
function fillTri(n,color, mz){
	let x = n[0]
	let y = n[1]
	let z = n[2]
	let pos = [...x]
	let tmp = [0,0]
	let manhattanDist = Math.abs(z[0]-x[0]) + Math.abs(z[1]-x[1])
	// api.log(`x: ${x} y: ${y} z: ${mz}`)
	for(let i = 0; i < manhattanDist; i++){
		tmp[0] = pos[0] + i*(z[0]-x[0])/manhattanDist
		tmp[1] = pos[1] + i*(z[1]-x[1])/manhattanDist
		drawLine(tmp,y,color, mz)
	}
}
function scale(d){
  d[0] += 1
  \u{64}[1] += 1
  \u{64}[0] *= 64
  d[1] *= 32
  d[1] = 63 - d[1]
  return [d[0],d[1]]

}
function getNormal(tri){
	let diff = [difference(tri[1],tri[0]),difference(tri[2],tri[0])]
	let normal = crossProduct(diff[0],diff[1])
	return normalize(normal)
}
function draw3dtri(k,mat){
	let n = getNormal(k)
	let tmp = difference(k[0],camera)
	if(dotProduct(n,tmp) < 0 && n[2] < 0){
		let tritorend = k.map(v => [...v,1])
		tritorend = tritorend.map(v => vecxmatr(v,mat))
		tritorend = tritorend.map(v => difference(v,camera))
		tritorend = tritorend.map(v => scale(project(v)))
		let color = getColor(dotProduct(light,n)/4 + 0.5)
		fillTri(tritorend,color,(k[0][2] + k[1][2] + k[2][2])/3)
	}
	/*
  	drawLine(k[0],k[1],color+1)
  	drawLine(k[0],k[2],color+1)
  	drawLine(k[1],k[2],color+1)
	*/
}
init()
function t(){
 	 j = api.getStandardChestItemSlot([0,0,52+curr_page],curr_tri).attributes.customAttributes.pages
 	 j = j.map(v => JSON.parse(v))
 	 let s = Math.sin(time); let c = Math.cos(time)
 	 let hs = Math.sin(time/2); let hc = Math.cos(time/2)
 	 matrotz = [
	[c,s,0],
	[-s,c,0],
	[0,0,1]
	]
  	matrotx = [
	[0,hc,hs],
	[0,-hs,c],
	[1,0,0]
	]
	let up = [0,1,0]
	let target = add(camera,lookDir)
	let matCam = convert(camera,target,up)
	matCam = invert(matCam)
  	for(let m = 0; m < 3; m++){
		j[m] = vecxmatr(j[m],matrotx)
		j[m] = vecxmatr(j[m],matrotz)
	}
	api.log(j)
	draw3dtri(j,matCam)
	
}	
on = false
curr_page = 1
task = "tick"
function tick(){
  if(on){
	switch(task){
		case "tick":
			if(curr_page > objcount){
				time += 0.15;
				curr_page = 1;
				task = "updateDisplay"
			} else {
				while(1){
				t()
				curr_tri++
				if(curr_tri == 36){
					curr_tri = 0
					api.setBlock([0,1,52+curr_page],"Glass")
					curr_page++
					api.log(curr_page)
					break
				}
				}
			}
			break
		case "updateDisplay":
			updateDisplay()
			task = "csc"
			break
		case "csc":
			csc()
			task = "tick"
			break
	}
  }
}

