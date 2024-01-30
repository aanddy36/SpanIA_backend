const { StatusCodes } = require("http-status-codes");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseUpload = async (req, res, next) => {
    let formats = ["image/jpeg", "image/png", "image/jpg"];
    try {
      if (!req.file || !formats.includes(req.file.mimetype)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "No file uploaded or invalid format" });
      }
      const fileBuffer = req.file.buffer;
      const fileName = `image_${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from("spania-pp")
        .upload(fileName, fileBuffer, {
          cacheControl: "3600",
          contentType: req.file.mimetype,
        });

      if (error) {
        console.log(error);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Error uploading file to Supabase Storage" });
      }

      req.myUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  next();
};

module.exports = supabaseUpload;
