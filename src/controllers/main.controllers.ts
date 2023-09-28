import { Request, Response } from "express";
import { generateImage } from "../helpers/main.helpers";
import { deleteImage } from "../helpers/file.helpers";
import { uploadFileToFirebase } from "../services/firebase.service";

export const imageGenerationHandler = async (req: Request, res: Response) => {
  try {
    console.log(JSON.parse(req.body.data).items);
    const result = (await generateImage(
      JSON.parse(req.body.data),
      req.file?.filename!
    )) as string;
    const firebaseUrl = await uploadFileToFirebase(result);
    deleteImage(req.file?.filename!);
    deleteImage(result);
    return res.status(200).json({
      url: firebaseUrl,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
