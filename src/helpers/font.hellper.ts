import { registerFont } from "canvas";
import path from "path";
const assetsDirectory = path.resolve(__dirname, "../assets/");
export const loadFonts = () => {
  registerFont(path.resolve(assetsDirectory, "fonts/Baskerville.ttf"), {
    family: "Baskerville",
  });

  registerFont(path.resolve(assetsDirectory, "fonts/Helvetica.ttf"), {
    family: "Helvetica",
  });

  registerFont(
    path.resolve(assetsDirectory, "fonts/IngridDarling-Regular.ttf"),
    {
      family: "IngridDarling-Regular",
    }
  );

  registerFont(path.resolve(assetsDirectory, "fonts/Italianno-Regular.ttf"), {
    family: "Italianno-Regular",
  });
};
