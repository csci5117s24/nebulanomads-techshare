import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//       </header>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

// Initialize AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: 'AKIAQFLLF6LJSAZ2M77O',
  secretAccessKey: 'qk48qn4CuQN5kvn0/ozQ5bFNHmIMaHJuVO3WWYSV',
  region: 'us-east-2'
});

const s3 = new AWS.S3();


async function fetchImagesFromS3() {
  try {
    const response = await s3.listObjects({ Bucket: "super-simple-bucket-upload-tutorial" }).promise();
    return response.Contents;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function Gallery({ images }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function loadImageUrls() {
      const urls = await Promise.all(images.map(async (image) => {
        return await getSignedUrl(image.Key);
      }));
      setImageUrls(urls);
    }
    loadImageUrls();
  }, [images]);

  return (
    <div className="gallery">
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
    </div>
  );
}


async function getSignedUrl(key) {
  try {
    const params = {
      Bucket: 'super-simple-bucket-upload-tutorial',
      Key: key,
      Expires: 3600, // URL expiration time in seconds (1 hour in this case)
    };

    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    return signedUrl;
  } catch (err) {
    console.error('Error generating signed URL: ', err);
    return '';
  }
}


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const params = {
      Bucket: 'super-simple-bucket-upload-tutorial',
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file: ', err);
      } else {
        console.log('File uploaded successfully. URL: ', data.Location);
        setUploadedImageUrl(data.Location);
      }
    });
  };

  useEffect(() => {
    async function fetchImages() {
      const images = await fetchImagesFromS3();
      setImageList(images);
    }

    fetchImages();
  }, []);

  return (
    <div className="App">
      <h1>Upload Image to Amazon S3 Bucket</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedImageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
        <div></div>
       <Gallery images={imageList} />
    </div>
  );
}

export default App;