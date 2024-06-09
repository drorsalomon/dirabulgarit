const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_BUCKET_REGION;
const myBucket = process.env.AWS_BUCKET_NAME;

//Set s3 configurations
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

// Multer image upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const folderName = 'sunny-beach-villa-aria-images/';
      const fileName = Date.now().toString() + '-' + file.originalname; // Unique file name
      cb(null, folderName + fileName);
    },
  }),
});

const uploadImages = upload.array('images', 20);

exports.uploadImages = (req, res, next) => {
  uploadImages(req, res, function (err) {
    if (err) {
      return res.status(500).json({ message: 'Upload error', error: err });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    res.status(200).json({
      message: 'Upload successful',
      files: req.files.map((file) => ({
        url: file.location,
      })),
    });
  });
};
