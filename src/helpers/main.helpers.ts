import { createCanvas, loadImage } from "canvas";
import path from "path";
import fs from "fs";
import { deleteImage, fetchImage, generateRandomString } from "./file.helpers";
import { loadFonts } from "./font.hellper";
import { getFile } from "../services/firebase.service";
const tempDirectory = path.resolve(__dirname, "../tmp/");

export const generateImage = async (data: any) => {
  loadFonts();
  const bg = await getFile(data.bg);
  const localFile = await fetchImage("bg_", bg);

  const canvasWidth = data.size.width;
  const canvasHeight = data.size.height;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  const image = await loadImage(path.resolve(tempDirectory, localFile));
  //
  const scaleX = canvasWidth / image.width;
  const scaleY = canvasHeight / image.height;

  // Use the larger scaling factor to ensure the image fully covers the canvas
  const scale = Math.max(scaleX, scaleY);

  // Calculate the new dimensions for the image
  const newWidth = image.width * scale;
  const newHeight = image.height * scale;

  // Calculate the position to center the image on the canvas
  const x = (canvasWidth - newWidth) / 2;
  const y = (canvasHeight - newHeight) / 2;

  // Clear the canvas and draw the scaled image
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, x, y, newWidth, newHeight);
  //
  data.items.forEach((item: any) => {
    ctx.font = `${item.fontSize}px ${item.font}`;
    ctx.fillStyle = item.color;
    console.log(item.position.x);
    ctx.fillText(item.content, item.position.x, item.position.y + 200);
  });
  //
  const result = "result_" + generateRandomString(10) + ".png";
  const out = fs.createWriteStream(path.resolve(tempDirectory, result));
  const stream = canvas.createPNGStream();
  deleteImage(localFile);
  return new Promise((resolve, reject) => {
    out.on("finish", () => {
      resolve(result);
    });
    out.on("error", reject);
    stream.pipe(out);
  });
};
