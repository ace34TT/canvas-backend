import { Request, Response } from "express";
import { generateImage } from "../helpers/main.helpers";
import { deleteImage } from "../helpers/file.helpers";
import { uploadFileToFirebase } from "../services/firebase.service";

export const imageGenerationHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.body.data);

    const result = (await generateImage(req.body.data)) as string;
    const firebaseUrl = await uploadFileToFirebase(result);

    deleteImage(result);
    return res.status(200).json({
      url: firebaseUrl,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
