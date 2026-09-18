const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

const images = [];

for (let i = 0; i < 8; i++) {
  const url = `https://picsum.photos/id/${imgStart + i}/${dimension}/${dimension}`;
  images.push(url);
}

console.log(images);