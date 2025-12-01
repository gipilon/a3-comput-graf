import { getColorIterator } from "./utils/colors/color.js"

function widget(key, draw) {
  const nextColor = getColorIterator(key)

  // ======================
  // CONFIGURAÇÕES GERAIS
  // ======================
  const cx = 500 // centro do avatar
  const cy = 500
  const baseSize = 400

  // Grupo de camadas
  const backLayer = draw.group();   // Camada 0 
  const bodyLayer = draw.group();   // Camada 1 
  const faceLayer = draw.group();   // Camada 2 
  const accessory = draw.group();   // Camada 3 

  // ======================
  // Variáveis
  // ======================

  // Fundo (círculo principal)
  const bgColor = nextColor()
  // Pele / Rosto
  const skinTones = ["#FBD3B0", "#E0A899", "#C68642", "#8D5524"]
  const skinColor = skinTones[key.next16() % skinTones.length]
  //Cabelo
  const hairColors = ["#2C1B18", "#4A312C", "#A55728", "#D6A57C", "#000"]
  const hairColor = hairColors[key.next16() % hairColors.length]
  const hairStyle = key.next16() % 5 // Tamanho da aleatoriedade
  // Olhos
  const eyeY = cy - 60
  const eyeSpacing = 100
  const eyeWhite = "white"
  const eyeColor = "#333"
  // Sombracelha
  const browY = eyeY - 40  // posição vertical (acima dos olhos)
  const browWidth = 80     // distância horizontal total
  const browHeight = 30    // altura da curva
  const browColor = hairColor // mesma cor do cabelo
  // Boca
  const mouthType = key.next16() % 3 // Tamanho da aleatoriedade
  // Roupa
  const shirtColors = ["#4682B4", "#9370DB", "#2E8B57", "#FF6347", "#FFD700"]
  const shirtColor = shirtColors[key.next16() % shirtColors.length]
  const shirtOffsetY = -120
  //Acessórios
  const accessoryChance = key.next() % 4 // Tamanho da aleatoriedade
    //Óculos
  const frameColor = "#222"
  const eyeglassY = eyeY
  const size = 60
  
  

  // ======================  
  // Paint
  // ======================  
  
  // Fundo (círculo principal)
  backLayer.circle(900).center(cx, cy).fill(bgColor)

  // ======================
  // PELE / ROSTO
  // ======================
  let face = bodyLayer.circle(baseSize).center(cx, cy - 80).fill(skinColor);
  
  // ======================
  // CABELO
  // ======================
  if (hairStyle === 0 && accessoryChance !== 1) {
    // Cabelo Curto
    faceLayer.path(`M${cx - 200},${cy - 210} 
               Q${cx},${cy - 300} ${cx + 200},${cy - 210} 
               L${cx + 200},${cy - 100} 
               Q${cx},${cy - 250} ${cx - 200},${cy - 100} Z`)
      .fill(hairColor);
    face.clipWith(bodyLayer.rect(baseSize, baseSize).move(cx - baseSize/2, cy - 180));
    console.log("Curto")
  } else if (hairStyle === 1 && accessoryChance !== 1) {
    // Cabelo longo
    bodyLayer.ellipse(450, 500).center(cx, cy - 100).fill(hairColor).back();
    bodyLayer.path(`M${cx - 200},${cy - 140} 
                Q${cx},${cy - 500} ${cx + 200},${cy - 180} 
                Z`).fill(hairColor);
    console.log("Longo")
  } else if (hairStyle === 2 && accessoryChance !== 1) {
    // Cascão
    faceLayer.path(`M${cx - 180},${cy - 140} 
               Q${cx},${cy - 260} ${cx + 180},${cy - 140} 
               Z`).fill(hairColor);
               console.log("Cascão")
  } else if (hairStyle === 3 && accessoryChance !== 1) {
    // Topete
    faceLayer.path(`M${cx - 180},${cy - 180} 
               Q${cx},${cy - 400} ${cx + 180},${cy - 180} 
               Z`).fill(hairColor);
    face.clipWith(bodyLayer.rect(baseSize, baseSize).move(cx - baseSize/2, cy - 180));
    console.log("Topete")
  } else {
    // Careca
    // nada é desenhado
    console.log("Careca")
  }

  // ======================
  // OLHOS
  // ======================
  faceLayer.circle(50).center(cx - eyeSpacing, eyeY).fill(eyeWhite)
  faceLayer.circle(20).center(cx - eyeSpacing, eyeY).fill(eyeColor)
  faceLayer.circle(50).center(cx + eyeSpacing, eyeY).fill(eyeWhite)
  faceLayer.circle(20).center(cx + eyeSpacing, eyeY).fill(eyeColor)

  // ======================
  // SOBRANCELHAS
  // ======================
  
  // Sobrancelha esquerda
  faceLayer.path(`
    M${cx - eyeSpacing - browWidth / 2},${browY}
    Q${cx - eyeSpacing},${browY - browHeight}
    ${cx - eyeSpacing + browWidth / 2},${browY}
  `).stroke({ color: browColor, width: 8, linecap: "round" }).fill("none")

  // Sobrancelha direita
  faceLayer.path(`
    M${cx + eyeSpacing - browWidth / 2},${browY}
    Q${cx + eyeSpacing},${browY - browHeight}
    ${cx + eyeSpacing + browWidth / 2},${browY}
  `).stroke({ color: browColor, width: 8, linecap: "round" }).fill("none")

  // ======================
  // BOCA
  // ======================
  if (mouthType === 0) {
    // sorriso
    faceLayer.path(`M${cx - 80},${cy + 40} Q${cx},${cy + 90} ${cx + 80},${cy + 40}`)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
      .fill("none")
  } else if (mouthType === 1) {
    // neutra
    faceLayer.line(cx - 60, cy + 50, cx + 60, cy + 50)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
  } else {
    // triste
    faceLayer.path(`M${cx - 80},${cy + 70} Q${cx},${cy + 40} ${cx + 80},${cy + 70}`)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
      .fill("none")
  }

  // ======================
  // ROUPA
  // ======================
  bodyLayer.path(`M${cx - 120},${cy + 200 + shirtOffsetY} 
  Q${cx},${cy + 280 + shirtOffsetY} ${cx + 120},${cy + 200 + shirtOffsetY} 
  L${cx + 250},${cy + 450 + shirtOffsetY} 
  L${cx - 250},${cy + 450 + shirtOffsetY} Z`)
  .fill(shirtColor)

  // ======================
  // ACESSÓRIO (opcional)
  // ======================
  if (accessoryChance === 0) {
    // Óculos
    accessory.rect(size, 40)
      .center(cx - eyeSpacing, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
      .fill("none")
    accessory.rect(size, 40)
      .center(cx + eyeSpacing, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
      .fill("none")
    accessory.line(cx - eyeSpacing + size / 2, eyeglassY, cx + eyeSpacing - size / 2, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
  } else if (accessoryChance === 1) {
    // Chapéu
    accessory.rect(500, 50).center(cx, cy - 180).fill(hairColor)
    accessory.rect(250, 70).center(cx, cy - 240).fill(hairColor)
    face.clipWith(bodyLayer.rect(baseSize, baseSize).move(cx - baseSize/2, cy - 180));
    console.log("Chapeu")
  }
}

export default widget
