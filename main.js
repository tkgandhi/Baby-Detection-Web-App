Status = "";
objects = [];
song = "";

function setup() 
{
    canvas = createCanvas(380, 290);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.position(520, 200);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload() 
{
    song = loadSound("alarm.wav");
}

function modelLoaded() 
{
    console.log("Model Loaded");
    Status = true;
}

function draw() 
{
    image(video, 0, 0, 380, 380);

    if (Status!="") 
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for (i=0; i<objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            /*rect(objects.x, objects.y, objects.width, objects.height);*/

            if (objects[i].label = "person") 
            {
                document.getElementById("nof").innerHTML = "Baby Found!";
                song.stop();
            } 
            else 
            {
                document.getElementById("nof").innerHTML = "Baby Not Found!";
                song.play();
            }

        }

        if (objects.length == 0) 
        {
            document.getElementById("nof").innerHTML = "Baby Not Found!";
            song.play();
        }
    }
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;    
    }
}