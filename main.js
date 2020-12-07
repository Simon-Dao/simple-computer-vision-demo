let video;
let vh = 400;
let vw = 400;

//RGB format
const targetColor = [0,255,0];

function setup() {
    createCanvas(vw,vh);
    background(220);
    pixelDensity(1);

    video = createCapture(VIDEO);
    video.size(vw,vh);
    video.hide();
}

function draw() {
    
    image(video, 0, 0, vw, vh);
    video.loadPixels();

    let yellowest = 10000;
    let yellowX = 0;
    let yellowY = 0;

    //console.log(`${video.pixels[0]} ${video.pixels[1]} ${video.pixels[2]}`);

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          //var current = get(x, y);
            var r = video.pixels[4 * (y*width + x)];
            var g = video.pixels[4 * (y*width + x) + 1];      
            var b = video.pixels[4 * (y*width + x) + 2];      
            
            set(x,y,[r,g,b,255]);

            var ri = 4 * (y*width + x);
            var gi = 4 * (y*width + x)+1;
            var bi = 4 * (y*width + x)+2;
            
            if(dist(
                r,
                g,
                b,
                targetColor[0],
                targetColor[1],
                targetColor[2]) 
                < yellowest) {

                //video.pixels[ri] = 255;
                //video.pixels[gi] = 0;
                //video.pixels[bi] = 0;
                yellowest = dist(r,g,b, 
                    targetColor[0],
                    targetColor[1],
                    targetColor[2]);
                yellowX = x;
                yellowY = y;
            } 
        }
    }

    video.updatePixels();

    fill(255,255,255,0.2);
    strokeWeight(5);

    //rectangle
    rect(yellowX-40, yellowY, 80 , 80);
}



function dist(x0,y0,z0,x1,y1,z1){

    deltaX = x1 - x0;
    deltaY = y1 - y0;
    deltaZ = z1 - z0;
    
    distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    
    return distance;
}