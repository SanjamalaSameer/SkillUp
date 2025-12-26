const canvas = document.getElementById("lines");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const lineCount = 5;

// Initialize lines
for(let i=0;i<lineCount;i++){
    lines.push({
        points: [{x:0, y:canvas.height/2 + i*20}],
        color:`hsl(${200+i*30},80%,60%)`,
        speed: 1 + Math.random()*1.5
    });
}

// Animation
let time = 0;
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    time += 0.02;

    lines.forEach(line=>{
        let lastPoint = line.points[line.points.length-1];
        let newX = lastPoint.x + 2*line.speed;
        let newY = canvas.height/2 + Math.sin(newX*0.01 + time*line.speed)*50 - line.speed*20;

        if(newX>canvas.width){ line.points.shift(); }
        line.points.push({x:newX, y:newY});

        ctx.beginPath();
        ctx.moveTo(line.points[0].x,line.points[0].y);
        for(let p of line.points){ ctx.lineTo(p.x,p.y); }
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 12;
        ctx.shadowColor = line.color;
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

animate();

// Redirect after 6s
setTimeout(()=>{
    window.location.href="index1.html";
},6000);
