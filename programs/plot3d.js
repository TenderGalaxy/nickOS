		
	
const inb = (x,y,z) => (x >= y && x <= z)

function init(){
  render_dist = 10
  fov = 160
  a = 0.5
  i = 0
  time = 37  
  display = []
  for(let i = 0; i < 64; i++){
	display.push([])
	for(let j = 0; j < 128; j++){
	  display[display.length - 1].push([0,1724])
	}
  }
}
function vecxmatr(x,y){
	let out = []
	for(let i = 0; i < y[0].length; i++){
		sum = 0
		for(let j = 0; j < y.length; j++){
			sum += x[j] * y[j][i]
		}
		out.push(sum)
	}
	return out
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
function project(coord){
  let f = 1 / Math.tan(fov * Math.PI / 90)
  let q = render_dist / (render_dist - 0.3)
  coord.push(1)
  let ret = vecxmatr(coord,[[a*f,0,0,0],[0,f,0,0],[0,0,q,1],[0,0,0-coord[2]*0.3,0]])
  ret[0] /= ret[3]
  ret[1] /= ret[3]
  return ret
}
function drawLine(a, b, color){
  let xd = a[0] - b[0]
  let xy = a[1] - b[1]
  let distance = Math.abs(xd) + Math.abs(xy)
  for(let i = 0; i < distance; i++){
    let x = Math.floor(b[0] + (i * xd)/distance)
    let y = Math.floor(b[1] + (i * xy)/distance)
    if(inb(x,0, 127) && inb(y,0,63)){
      display[y][x][1] = color
    }
  }
}
function scale(d){
  d[0] += 1
  \u{64}[1] += 1
  \u{64}[0] *= 64
  d[1] *= 32
  d[1] = 63 - d[1]
  return d
}
function draw3dline(a,b,color){
  api.log(`a: ${a} b: ${b}`)
  let d = scale(project(a))
  let e = scale(project(b))
  api.log(`d: ${project(a)} e: ${project(b)}`)
  drawLine(d,e,color)
}
function csc(){
	for(let i = 0; i < 64; i++){
	 for(let j = 0; j < 128; j++){
		display[i][j][1] = 1724
	 }
   }
}
function getNormal(tri){
	let diff = [[tri[1][0] - tri[0][0],tri[1][1] - tri[0][1],tri[1][2] - tri[0][2]],[tri[2][0] - tri[0][0],tri[2][1] - tri[0][1],tri[2][2] - tri[0][2]]]
	let normal = [diff[0][1] * diff[1][2] - diff[1][1] * diff[0][2], diff[0][2] * diff[1][0] - diff[0][0] * diff[1][2], diff[0][0] * diff[1][1] - diff[0][1] * diff[1][0]]
	let dist = Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2) // L no Fast Inverse Sqrt
	normal = normal.map(v => v/dist)
	return normal
}
function draw3dtri(k,color){
  let n = getNormal(k)
  if(n[2] < 0{
  	draw3dline(k[0],k[1],color)
  	draw3dline(k[0],k[2],color)
  	draw3dline(k[1],k[2],color)
  }
}

squareMesh = [
  [[0,0,0],[0,1,0],[1,1,0]],
  [[0,0,0],[1,1,0],[1,0,0]],
  [[1,0,0],[1,1,0],[1,1,1]],
  [[1,0,0],[1,1,1],[1,0,1]],
  [[1,0,1],[1,1,1],[0,1,1]],
  [[1,0,1],[0,1,1],[0,0,1]],
  [[0,0,1],[0,1,1],[0,1,0]],
  [[0,0,1],[0,1,0],[0,0,0]],
  [[0,1,0],[0,1,1],[1,1,1]],
  [[0,1,0],[1,1,1],[1,1,0]],
  [[1,0,1],[0,0,1],[0,0,0]],
  [[1,0,1],[0,0,0],[1,0,0]]
]
init()
function t(){
  i++
  i %= squareMesh.length
  if(i == 0){updateDisplay();csc();time++;}
  j = squareMesh[i].map(v => [...v]); let s = Math.sin(time); let c = Math.cos(time)
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
  for(let i = 0; i < 3; i++){
    j[i] = vecxmatr(j[i],matrotx)
	j[i] = vecxmatr(j[i],matrotz)
	j[i][2] += 4
	j[i][0] *= 3
	j[i][1] *= 3
  }
  draw3dtri(j,86)

}
on = false
function tick(){
  if(on){
   t()
  }
}
