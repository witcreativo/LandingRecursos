/* ============================================
   MACETITAS 3D - JAVASCRIPT COMPLETO
   ============================================ */

// Productos
const products = [
  {id:1,name:'Pedro',desc:'Pedro es fantastico para regar tus plantas. Cuando pasas poco tiempo en casa, Pedro tiene un sistema para abastecer a tus plantas tipo hoja tal para que puedas despreocuparte.',tag:'Autorriego',img:'images/card-pot-pedro-v2.png'},
  {id:2,name:'Luna',desc:'Luna adora la luz de la luna. Es perfecta para plantas que necesitan poca agua pero mucha paz. Su diseno geometrico refleja la luz de manera magica.',tag:'Luminoso',img:'images/card-pot-luna-v2.png'},
  {id:3,name:'Roberto',desc:'Roberto es el fuerte de la familia. Su estructura ancha y robusta protege las raices mas sensibles. Ideal para plantas que necesitan espacio para crecer.',tag:'Robusto',img:'images/card-pot-roberto-v2.png'},
  {id:4,name:'Mia',desc:'Mia es pura elegancia. Sus lineas suaves y curvas delicadas hacen que cualquier planta luzca como una obra de arte. Perfecta para espacios modernos.',tag:'Elegante',img:'images/card-pot-mia-v2.png'},
  {id:5,name:'Coco',desc:'Coco es el aventurero. Con su sistema de drenaje inteligente, le encanta viajar de ventana en ventana. Ninguna planta se ahoga con Coco cerca.',tag:'Aventurero',img:'images/card-pot-coco-v2.png'},
  {id:6,name:'Pepa',desc:'Pepa es la madre protectora. Su diseno tipo invernadero mantiene la humedad justa. Las plantas mas delicadas se sienten seguras con Pepa.',tag:'Protector',img:'images/card-pot-pepa-v2.png'},
  {id:7,name:'Tito',desc:'Tito es el minimalista. Sin complicaciones, sin excesos. Lo esencial para que tu planta crezca feliz. A Tito le gusta la simplicidad y la funcionalidad.',tag:'Minimalista',img:'images/card-pot-tito-v2.png'},
  {id:8,name:'Nina',desc:'Nina es la sonadora. Su diseno etereo con patrones de nubes crea un ambiente tranquilo. Las plantas que viven en Nina crecen con energia positiva.',tag:'Sonador',img:'images/card-pot-nina-v2.png'},
  {id:9,name:'Zeta',desc:'Zeta es el futuro. Con su forma angular y moderna, representa la innovacion en impresion 3D. Para plantas que quieren estar a la vanguardia.',tag:'Futurista',img:'images/card-pot-zeta-v2.png'},
];

const shelfData = [
  {id:1,name:'Pedro',tagline:'Autorriego inteligente',x:4,y:10,w:16,h:14},
  {id:2,name:'Luna',tagline:'Refleja la luz de manera magica',x:28,y:14,w:13,h:14},
  {id:3,name:'Roberto',tagline:'Fuerte y protector de raices',x:44,y:10,w:14,h:14},
  {id:4,name:'Mia',tagline:'Elegancia pura',x:60,y:14,w:13,h:14},
  {id:5,name:'Coco',tagline:'Drenaje inteligente',x:84,y:10,w:14,h:14},
  {id:6,name:'Pepa',tagline:'Invernadero protector',x:6,y:28,w:14,h:16},
  {id:7,name:'Tito',tagline:'Minimalismo funcional',x:72,y:22,w:14,h:16},
  {id:8,name:'Nina',tagline:'Ambiente tranquilo',x:4,y:42,w:14,h:16},
  {id:9,name:'Zeta',tagline:'Innovacion 3D',x:22,y:34,w:14,h:18},
];

/* ============================================
   THREE.JS PARTICLES (HERO)
   ============================================ */
(function initParticles(){
  const canvas = document.getElementById('particleCanvas');
  if(!canvas) return;
  
  // Simple Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  
  function resize(){
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    renderer.setSize(w,h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }
  resize();
  window.addEventListener('resize',resize);

  const COUNT = 200;
  const positions = new Float32Array(COUNT*2);
  const sizes = new Float32Array(COUNT);
  
  for(let i=0;i<COUNT;i++){
    positions[i*2] = Math.random()*2-1;
    positions[i*2+1] = Math.random()*2-1;
    sizes[i] = 2+Math.random()*2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,2));
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1));

  const mat = new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,
    uniforms:{
      uTime:{value:0},
      uColor:{value:new THREE.Color(0x74c69d)},
      uOpacity:{value:0.3},
      uResolution:{value:new THREE.Vector2(canvas.offsetWidth,canvas.offsetHeight)},
    },
    vertexShader:`
      attribute float size;
      uniform float uTime;
      uniform vec2 uResolution;
      varying float vAlpha;
      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
      vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i=floor(v+dot(v,C.yy));
        vec2 x0=v-i+dot(i,C.xx);
        vec2 i1;
        i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
        vec4 x12=x0.xyxy+C.xxzz;
        x12.xy-=i1;
        i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
        vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
        m=m*m;m=m*m;
        vec3 x=2.*fract(p*C.www)-1.;
        vec3 h=abs(x)-0.5;
        vec3 ox=floor(x+0.5);
        vec3 a0=x-ox;
        m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
        vec3 g;
        g.x=a0.x*x0.x+h.x*x0.y;
        g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.*dot(m,g);
      }
      void main(){
        vec2 pos=position;
        float nx=snoise(pos*3.+uTime*0.3)*0.015;
        float ny=snoise(pos*3.+uTime*0.3+100.)*0.015;
        pos.x+=nx;
        pos.y+=ny+uTime*0.03*size*0.5;
        pos.y=mod(pos.y+1.,2.)-1.;
        pos.x=mod(pos.x+1.,2.)-1.;
        vec2 pixelPos=pos*uResolution*0.5;
        vec4 mvPosition=vec4(pixelPos/uResolution.x,0.,1.);
        gl_Position=mvPosition;
        gl_PointSize=size*(uResolution.y/800.);
        float edgeFade=smoothstep(-0.9,-0.5,pos.y)*smoothstep(0.9,0.5,pos.y);
        vAlpha=edgeFade*0.6;
      }
    `,
    fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main(){
        float dist=length(gl_PointCoord-vec2(0.5));
        float alpha=smoothstep(0.5,0.1,dist)*vAlpha*uOpacity;
        gl_FragColor=vec4(uColor,alpha);
      }
    `,
  });

  const points = new THREE.Points(geo,mat);
  scene.add(points);

  const clock = new THREE.Clock();
  let visible = true;
  
  const observer = new IntersectionObserver(([e])=>{visible=e.isIntersecting},{threshold:0.1});
  observer.observe(canvas.parentElement);

  function animate(){
    requestAnimationFrame(animate);
    if(!visible) return;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene,camera);
  }
  animate();
})();

/* ============================================
   HERO SLIDER
   ============================================ */
const slides = document.querySelectorAll('.hero-slide-img');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;

slides.forEach((_,i)=>{
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i===0?' active':'');
  dot.onclick = ()=>goToSlide(i);
  dotsContainer.appendChild(dot);
});

function goToSlide(idx){
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].classList.remove('active');
  currentSlide = idx;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].classList.add('active');
}

document.getElementById('slideNext').onclick = ()=>goToSlide((currentSlide+1)%slides.length);
document.getElementById('slidePrev').onclick = ()=>goToSlide((currentSlide-1+slides.length)%slides.length);

/* ============================================
   PRODUCT CARDS (DYNAMIC + FLIP)
   ============================================ */
const grid = document.getElementById('cardGrid');
let flippedId = null;

products.forEach((p,i)=>{
  const floatDur = (3+(i%3)*0.3).toFixed(1);
  const floatDel = (i*0.15).toFixed(2);
  
  const card = document.createElement('div');
  card.className = 'card-wrap';
  card.innerHTML = `
    <div class="pot-box" style="animation:float ${floatDur}s ease-in-out ${floatDel}s infinite">
      <img src="${p.img}" alt="${p.name}" class="pot-photo" id="pot-${p.id}">
    </div>
    <div class="card-flipper" id="card-${p.id}">
      <div class="card-face card-front">
        <div style="flex:1"></div>
        <h3 class="card-name">${p.name}</h3>
        <span class="card-tag">${p.tag}</span>
      </div>
      <div class="card-face card-back">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5 19 9.8 19 13a4 4 0 0 1-2.4 3.6c.4.7.4 1.6 0 2.4a3 3 0 0 1-2.6 1.6h-.2a3 3 0 0 1-2.6-1.6c-.4-.8-.4-1.7 0-2.4A4 4 0 0 1 7 13c0-3.2 3.5-8 9.2-6.9A7 7 0 0 1 15 20"/></svg>
      </div>
    </div>
  `;
  card.onclick = ()=>toggleFlip(p.id);
  grid.appendChild(card);
});

function toggleFlip(id){
  const card = document.getElementById('card-'+id);
  const pot = document.getElementById('pot-'+id);
  if(flippedId === id){
    card.classList.remove('flipped');
    pot.classList.remove('flip');
    flippedId = null;
  }else{
    if(flippedId !== null){
      document.getElementById('card-'+flippedId)?.classList.remove('flipped');
      document.getElementById('pot-'+flippedId)?.classList.remove('flip');
    }
    card.classList.add('flipped');
    pot.classList.add('flip');
    flippedId = id;
  }
}

/* ============================================
   MURO VERDE HOTSPOTS
   ============================================ */
const shelfWrap = document.getElementById('shelfWrap');
shelfData.forEach(item=>{
  const spot = document.createElement('div');
  spot.className = 'shelf-hotspot';
  spot.style.cssText = `left:${item.x}%;top:${item.y}%;width:${item.w}%;height:${item.h}%;`;
  spot.innerHTML = `
    <div class="shelf-tooltip">
      <div class="shelf-tooltip-inner">
        <p class="shelf-tooltip-name">${item.name}</p>
        <p class="shelf-tooltip-tagline">${item.tagline}</p>
      </div>
    </div>
  `;
  shelfWrap.appendChild(spot);
});

/* ============================================
   CONTACT FORM
   ============================================ */
document.getElementById('contactForm').onsubmit = function(e){
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  setTimeout(()=>{
    this.reset();
    this.style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
  },3000);
};

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY > 80);
});

/* ============================================
   SMOOTH SCROLL (nav links)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
const revealElements = document.querySelectorAll('.gallery-header, .card-wrap, .featured-inner, .shelf-container, .glass-form-card');

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.1});

revealElements.forEach(el=>{
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(el);
});


/* ============================================
   LEAF INTRO - TYPEWRITER EFFECT
   ============================================ */
(function initTypewriter() {
  const text = 'Macetitas 3D';
  const el = document.getElementById('typewriterText');
  const cursor = document.getElementById('typeCursor');
  let i = 0;
  
  // Start after a small delay
  setTimeout(() => {
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        // Hide cursor after 2 seconds
        setTimeout(() => {
          cursor.style.opacity = '0';
          cursor.style.transition = 'opacity 0.5s ease';
        }, 2000);
      }
    }, 150); // typing speed (ms per character)
  }, 600); // initial delay
  
  // Set CSS rotation variables for the float animation
  document.getElementById('leafOverText').style.setProperty('--rot', '-15deg');
  document.getElementById('leafOverInsta').style.setProperty('--rot', '25deg');
})();