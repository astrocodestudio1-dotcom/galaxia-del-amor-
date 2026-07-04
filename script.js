/*=========================================
        GALAXIA DEL AMOR
        PARTE 1
=========================================*/

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/*=========================================
            ESTRELLAS
=========================================*/

const stars = [];
const STAR_COUNT = 5000;

class Star {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 1.8 + 0.2;

        this.alpha = Math.random();

        this.speed = Math.random() * 0.15;

        this.twinkle = Math.random() * 0.03;

    }

    update() {

        this.alpha += this.twinkle;

        if (this.alpha >= 1 || this.alpha <= 0.15) {

            this.twinkle *= -1;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

        ctx.shadowBlur = 12;

        ctx.shadowColor = "#ffffff";

        ctx.fill();

    }

}

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push(new Star());

}

/*=========================================
        ESTRELLAS FUGACES
=========================================*/

const meteors = [];

class Meteor {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;

        this.y = -100;

        this.length = 100 + Math.random() * 250;

        this.speed = 8 + Math.random() * 8;

        this.life = 0;

        this.maxLife = 120;

    }

    update() {

        this.x += this.speed;

        this.y += this.speed;

        this.life++;

        if (this.life > this.maxLife) {

            this.reset();

        }

    }

    draw() {

        ctx.beginPath();

        const gradient = ctx.createLinearGradient(

            this.x,

            this.y,

            this.x - this.length,

            this.y - this.length

        );

        gradient.addColorStop(0, "white");

        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(

            this.x - this.length,

            this.y - this.length

        );

        ctx.stroke();

    }

}

for (let i = 0; i < 6; i++) {

    meteors.push(new Meteor());

}

/*=========================================
            ANIMACIÓN
=========================================*/

function animateSpace() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {

        star.update();

        star.draw();

    }

    for (const meteor of meteors) {

        meteor.update();

        meteor.draw();

    }

    requestAnimationFrame(animateSpace);

}

animateSpace();
/*=========================================
        CORAZÓN DE PARTÍCULAS
        PARTE 2
=========================================*/

const heartCanvas = document.getElementById("heart");
const hctx = heartCanvas.getContext("2d");

function resizeHeart() {
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;
}

resizeHeart();
window.addEventListener("resize", resizeHeart);

const particles = [];
const PARTICLE_COUNT = 4000;

let mouse = {
    x: -1000,
    y: -1000
};

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("touchmove", e => {

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

});

class Particle {

    constructor(t){

        this.t = t;

        this.size = Math.random()*2+1;

        this.offset = Math.random()*6;

    }

    update(time){

        const scale = 16 + Math.sin(time*2)*1.5;

        const x = 16*Math.pow(Math.sin(this.t),3);

        const y =
        13*Math.cos(this.t)
        -5*Math.cos(2*this.t)
        -2*Math.cos(3*this.t)
        -Math.cos(4*this.t);

        this.tx = heartCanvas.width/2 + x*scale;

        this.ty = heartCanvas.height/2 - y*scale;

        let dx = this.tx - mouse.x;
        let dy = this.ty - mouse.y;

        let dist = Math.sqrt(dx*dx+dy*dy);

        if(dist<90){

            this.tx += dx/dist*25;

            this.ty += dy/dist*25;

        }

    }

    draw(time){

        hctx.beginPath();

        hctx.arc(

            this.tx,

            this.ty,

            this.size,

            0,

            Math.PI*2

        );

        const glow =
        180+
        Math.sin(time*4+this.offset)*75;

        hctx.fillStyle=`rgb(255,${glow},${glow})`;

        hctx.shadowBlur=18;

        hctx.shadowColor="hotpink";

        hctx.fill();

    }

}

for(let i=0;i<PARTICLE_COUNT;i++){

    particles.push(

        new Particle(

            Math.random()*Math.PI*2

        )

    );

}

function animateHeart(){

    hctx.clearRect(

        0,

        0,

        heartCanvas.width,

        heartCanvas.height

    );

    const t=Date.now()/1000;

    particles.forEach(p=>{

        p.update(t);

        p.draw(t);

    });

    requestAnimationFrame(

        animateHeart

    );

}

animateHeart();
/*=========================================
      FRASES DEL AMOR
      PARTE 3
=========================================*/

const loveContainer = document.getElementById("loveContainer");

const loveWords = [

"Te Amo ❤️",
"Te Quiero 💖",
"I Love You",
"Je t'aime",
"Ich liebe dich",
"Ti amo",
"Eu te amo",
"愛してる",
"我爱你",
"사랑해",
"Я тебя люблю",
"Ik hou van jou",
"Jeg elsker dig",
"Jag älskar dig",
"Minä rakastan sinua",
"Kocham Cię",
"Volim te",
"Ljubim te",
"Te iubesc",
"Nakupenda",
"Seni Seviyorum",
"Σ' αγαπώ",
"אני אוהב אותך",
"أنا أحبك",
"Main tumse pyar karta hoon",
"Mahal kita",
"Aloha Au Ia Oe",
"Wo ai ni",
"Ngo oi ney",
"Ek het jou lief",
"Mi amas vin",
"Ya tebya lyublyu",
"Ngiyakuthanda",
"Anh yêu em",
"Chan rak khun",
"Kei te aroha ahau ki a koe",
"Te sakam",
"Ana behibak"

];

const colors = [

"#ffffff",
"#ff66cc",
"#66ffff",
"#ff99ff",
"#99ccff",
"#ffcc66",
"#ffd6f5"

];

function random(min,max){

    return Math.random()*(max-min)+min;

}

function createLoveText(){

    const text=document.createElement("div");

    text.className="loveText";

    text.innerHTML=
    loveWords[
    Math.floor(
    Math.random()*loveWords.length
    )];

    text.style.left=random(0,95)+"vw";

    text.style.top="110vh";

    text.style.fontSize=
    random(18,42)+"px";

    text.style.color=
    colors[
    Math.floor(
    Math.random()*colors.length
    )];

    text.style.animationDuration=
    random(12,24)+"s";

    text.style.opacity=random(.6,1);

    text.style.transform=
    `rotate(${random(-25,25)}deg)`;

    loveContainer.appendChild(text);

    setTimeout(()=>{

        text.remove();

    },25000);

}

setInterval(createLoveText,350);

/*=========================================
        DESTELLOS ALEATORIOS
=========================================*/

function randomSparkle(){

    const sparkle=document.createElement("div");

    sparkle.style.position="absolute";

    sparkle.style.width="4px";

    sparkle.style.height="4px";

    sparkle.style.borderRadius="50%";

    sparkle.style.background="white";

    sparkle.style.boxShadow=

    "0 0 15px white,"+

    "0 0 30px cyan,"+

    "0 0 50px hotpink";

    sparkle.style.left=random(0,100)+"vw";

    sparkle.style.top=random(0,100)+"vh";

    sparkle.style.zIndex=9;

    sparkle.style.opacity=0;

    document.body.appendChild(sparkle);

    sparkle.animate([

        {

            transform:"scale(0)",

            opacity:0

        },

        {

            transform:"scale(2)",

            opacity:1

        },

        {

            transform:"scale(0)",

            opacity:0

        }

    ],{

        duration:2000,

        easing:"ease-in-out"

    });

    setTimeout(()=>{

        sparkle.remove();

    },2000);

}

setInterval(randomSparkle,180);
