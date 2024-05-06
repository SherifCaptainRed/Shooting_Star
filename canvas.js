const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// class Star{
//   constructor(x,y){
//     this.x = x;
//     this.y = y;
//     this.size = 5;
//     this.weight = 2;
//     this.directionX = 1;
//   }
//   update(){
//     this.weight +=0.1;
//     this.y += this.weight;
//     this.x += this.directionX;
//     if(this.y > canvas.height){
//       //this.y = canvas.height - this.size;
//       this.y += -3;
//       this.weight *= -0.5;
//     }
//   }
//   draw(){
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// const Star_1 = new Star(100,100);

// function animate(){
//   ctx.fillStyle = 'rgba(0,0,0,0.1)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   Star_1.update();
//   Star_1.draw();
//   requestAnimationFrame(animate);
// }
// animate();

// Track the position of the mouse
let mouse = {
  x: null,
  y: null
};

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function writeText() {
  ctx.textAlign = "center";

  ctx.font = ' 30px Anton';
  ctx.fillStyle = 'white';
  ctx.fillText('slow-mo Shooting Star', canvas.width/2, canvas.height/3);

  ctx.font = '150px Anton';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'white';
  ctx.strokeText('02 May 2024', canvas.width/2, canvas.height/2);

  ctx.font = ' 70px Anton';
  ctx.fillStyle = 'white';
  ctx.fillText('Ansh Kumar Tripathi', canvas.width/2, (canvas.height/20)*13);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 7, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 1 + 1;
    //this.weight = Math.random() * 1 + 1;
    this.weight = 10;
    //this.weight = weight;
    //this.directionX = Math.random() * 1 - 0.5;
    this.directionX = -1;
  }

  update() {
    this.weight += 2;
    this.y += this.weight /60;
    this.x += this.directionX;


    // Check if the star has hit the bottom of the canvas
    if (this.y > canvas.height - this.size - 200) {
      this.weight *= -0.1 * (this.size / 5);
      this.size *= 0.5;

      // Create a particle burst
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(this.x, this.y));
      }
    }

    // Check if the size of the star is below 0.01
    if (this.size < 0.01) {
      this.size = 0;
      let index = stars.indexOf(this);
      if (index !== -1) {
        stars.splice(index, 1);
      }
    }

    // Check if the star has hit the left or right side of the canvas
    if (this.x < 0 || this.x > canvas.width) {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.weight = Math.random() * 1 + 1;
    }

    // Check if the star has collided with the mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + 10) {
      // Change the trajectory of the star
      this.directionX = Math.random() * 3 - 1.5;
      this.directionY = Math.random() * 3 - 1.5;

      // Emit a particle
      particles.push(new Particle(this.x, this.y));
    }
  }
  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Create an array of 100 stars
let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Create an array for the particles
let particles = [];

function animate() {
  ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
  //ctx.fillStyle = '';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, canvas.height - 200, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Remove the particle from the array if its size is below 0.2
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }

  // Check if the number of stars is below 45
  if (stars.length < 100) {
    // If it is, spawn another 50 stars at the top of the canvas
    for (let i = 0; i < 15; i++) {
      stars.push(new Star(Math.random() * canvas.width, 0));
    }
  }

  writeText();

  requestAnimationFrame(animate);

}
animate();



// let mouse = {
//   x: null,
//   y: null
// };

// window.addEventListener('mousemove', function(event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
// });

// class Particle {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 5 + 1;
//     this.speedX = Math.random() * 3 - 1.5;
//     this.speedY = Math.random() * 3 - 1.5;
//   }

//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;

//     if (this.size > 0.2) this.size -= 0.1;
//   }

//   draw() {
//     ctx.fillStyle = 'orange';
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size / 7, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// class Star {
//   constructor(x, y, weight) {
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 5 + 1;
//     this.weight = weight;
//     this.directionX = -0.5;
//   }

//   update() {
//     this.weight += 0.01;
//     this.y += this.weight;
//     this.x += this.directionX;

//     if (this.y > canvas.height - this.size - 200) {
//       this.weight *= -0.3 * (this.size / 5);
//       this.size *= 0.5;

//       for (let i = 0; i < 5; i++) {
//         particles.push(new Particle(this.x, this.y));
//       }
//     }

//     if (this.size < 0.01) {
//       this.size = 0;
//       let index = stars.indexOf(this);
//       if (index !== -1) {
//         stars.splice(index, 1);
//       }
//     }

//     if (this.x < 0 || this.x > canvas.width) {
//       this.x = Math.random() * canvas.width;
//       this.y = 0;
//       this.weight = Math.random() * 1 + 1;
//     }

//     let dx = mouse.x - this.x;
//     let dy = mouse.y - this.y;
//     let distance = Math.sqrt(dx * dx + dy * dy);

//     if (distance < this.size + 10) {
//       this.directionX = Math.random() * 3 - 1.5;
//       this.directionY = Math.random() * 3 - 1.5;

//       particles.push(new Particle(this.x, this.y));
//     }
//   }

//   draw() {
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// let stars = [];
// for (let i = 0; i < 200; i++) {
//   stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, 2));
// }

// let particles = [];

// function animate() {
//   ctx.fillStyle = 'rgba(30, 33, 57, 0.4)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = 'rgba(0,0,0,1)';
//   ctx.fillRect(0, canvas.height - 200, canvas.width, canvas.height);

//   for (let i = 0; i < stars.length; i++) {
//     stars[i].update();
//     stars[i].draw();
//   }

//   for (let i = 0; i < particles.length; i++) {
//     particles[i].update();
//     particles[i].draw();

//     if (particles[i].size <= 0.2) {
//       particles.splice(i, 1);
//       i--;
//     }
//   }

//   if (stars.length < 185) {
//     for (let i = 0; i < 15; i++) {
//       stars.push(new Star(Math.random() * canvas.width, 0, weightSlider.value));
//     }
//   }

//   requestAnimationFrame(animate);
// }

// animate();

// let weightSlider = document.getElementById('weightSlider');
// let restartButton = document.getElementById('restartButton');

// restartButton.addEventListener('click', function() {
//   stars = [];
//   for (let i = 0; i < 100; i++) {
//     stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, weightSlider.value));
//   }
// });
