# How to Set up Simple File Upload through S3 Buckets with React

## What are Amazon S3 Buckets
Amazon S3 provides object storage designed for storing and accessing vast amounts of data from any location. Some examples of data type storage that Amazon S3 offers is the storage of documents, images, videos, database backups, and numerous other data types, if you have something to store Amazon S3 is the place to store it. Offering simplicity, industry-leading durability, availability, performance, security, and virtually limitless scalability, S3 delivers these features at exceptionally low costs. With this in mind Amazon S3 has many uses. Creators can easily build applications that require cloud native storage. Amazon S3 is very affordable and highly scalable so users only pay for what they use, including even a free tier for a limited time. This allows developers to start small and grow their application as they go! Amazon S3 is very flexible allowing developers to store any type of data, along with any amount, letting the developer focus on the rest of their application rather than worrying about where and how to store their data!

## Why should you use AWS S3 Buckets as a file-storage solution
While there are many ways to store files when developing web applications Amazon S3 stands out above the rest. First and foremost Amazon S3 offers almost unlimited scalability, afterall it is the storage system used by Amazon itself, which we all know is one of the largest online presences today. Amazon S3 also offers industry-leading durability and availability, ensuring that your data is accessible whenever you need it. Amazon S3 was also built for performance, offering developers low latency access to data, no matter how large the request is, or how frequently users are making requests. It also gives developers peace of mind knowing that Amazon S3 offers great security features! These features include the encryption of data, control over who has access to this information, and finally the ability to monitor who is accessing their data, allowing developers to carefully watch for breaches and keep their data protected. With all of these amazing features combined with the fact that you can store almost any data type with Amazon S3 one would expect that it would be pricey, but in reality Amazon S3 offers competitive pricing and allows users to only pay for what they are using, keeping costs down and giving developers the freedom to design what they want while still being able to afford data storage. All in all Amazon S3 is a top of the line data storage solution that all developers should consider when they start building a web application!

## AWS S3 vs competitors
|  | AWS S3 | Microsoft Azure Blob Storage | Google Cloud Storage | IBM Cloud Object Storage | DigitalOcean Spaces | Backblaze B2 Cloud Storage | Personal proprietary data storage|
| --- | --- | --- | --- | --- | --- | --- | --- |
| Free storage | 5 GB for 12 months | 5 GB for 12 months | 5 GB for 12 months + $300 credit | 25 GB per month + $200 credit | None | First 10 GB is free | None |
| Pricing | [Tiered pricing](https://aws.amazon.com/s3/pricing/) based on usage | [Tiered pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/#pricing) based on usage | [Tiered pricing](https://cloud.ibm.com/objectstorage/create#pricing) based on usage | Tiered pricing based on usage | $5 per month for first 250 GiB  | $6/TB/Month + pricing based on API Calls | Depends |
| Frequent/Hot Tier  | $0.023 for the first 50 gb | $0.019 for the first 50 gb | $0.0218 for the first 50 gb |  |   |  |  |
## How to set up a S3 Bucket
1. Create an AWS Amazon account [here](https://aws.amazon.com/console/)
2. Search up S3 Buckets 
    ![alt text](/s3gallery/bucket_setup_imgs/image7.png)
3. Click on create a bucket 
    ![alt text](/s3gallery/bucket_setup_imgs/image4.png)
4. Choose a bucket name and region
    * Bucket names are globally unique! So, you have to use a name no one else has used before.
    * Region is the physical location you want your data to be stored in
    ![alt text](/s3gallery/bucket_setup_imgs/image8.png)
5. That is all we need for now, so scroll all the way down and create the bucket
6. Now, we need to enable cross-origin resource sharing (CORS), so we can use react. More info on that [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)
    * In your bucket click the "Permissions" tab 
    ![alt text](/s3gallery/bucket_setup_imgs/image3.png)
    * Scroll down to the CORS settings and add the following code. Save the changes.
        ```javascript
        [
            {
            "AllowedHeaders": [
                "*"
            ],
            "AllowedMethods": [
                "GET",
                "PUT",
                "POST",
                "HEAD",
                "DELETE"
            ],
            "AllowedOrigins": [
                "*"
            ],
            "ExposeHeaders": [],
            "MaxAgeSeconds": 3000
            }
        ]
        ```
        ![alt text](/s3gallery/bucket_setup_imgs/image2.png)
7. Finally, we need access keys, so we can upload files to our bucket from React. For the purpose of this demo, creating a key for the root user works. However, [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_add-key.html) is more info for best practices.
    * Click your account icon and click "Security credentials"
    ![alt text](/s3gallery/bucket_setup_imgs/image5.png)
    * Scroll down and find “Create access key”. Walk through the steps and make sure not to lose your access key. 
    ![alt text](/s3gallery/bucket_setup_imgs/image6.png)
    * If you have other people that will also develop your website you may want to checkout AWS IAM. More info on that [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html?icmpid=docs_iam_console)

## Using Amazon S3 Buckets with React
This tutorial will go over how to setup up a simple React applicaiton that uses Amazon S3 Buckets to store files. The first example will go over how to upload a single image and then access that image by using a pre-signed url. A pre-signed URL for an Amazon S3 object is a URL that Amazon will generate, when provided the correct access keys to the bucket that is being accessed, and provide access to a specific item in that bucket to anyone. With a pre-signed URL, anyone who has the URL can download the object for a limited time, without needing AWS credentials or permissions.

## Installation

### Install NodeJS and NPM
Node.js is a JavaScript runtime environment for server-side development, offering an event-driven architecture and asynchronous I/O. NPM complements Node.js by serving as its package manager, facilitating dependency management and access to a vast ecosystem of reusable code modules. You can install these [here](https://nodejs.org/en/download)

### Install Amazon SDK
The aws-sdk is a comprehensive software development kit (SDK) provided by Amazon Web Services (AWS) for working with AWS services in various programming languages, including JavaScript for Node.js. It enables developers to interact with AWS services programmatically, allowing them to build applications that leverage AWS resources such as storage, databases, compute power, machine learning, and more. We will be using this to access our Amazon S3 Bucket!

```
    npm install aws-sdk
```

## Setup

### .env File
Before starting developing with Amazon S3 Buckets ensure that you have both your AWS Access Key and your AWS Secret Access Key stored in the .env file of your React applicaiton. This file should be in the root directory of your application and should never be shared with anyone who you don't want to have access to your buckets.

```
    REACT_APP_AWS_ACCESS_KEY_ID="Example"
    REACT_APP_AWS_SECRET_ACCESS_KEY="Example"
```
* Note - In React all .env variables must start with REACT_APP in order to be found.

###  package.json File Requirements
Ensure that your package.json file contains the aws-sdk and dotenv dependencies, these should be added automatically if you setup your React application correctly and installed the aws-sdk.

```
 "dependencies": {
    ...
    "aws-sdk": "^2.1591.0",
    "dotenv": "^16.4.5",
    ...
  }
```

### Configure Amazon S3 Buckets
In your App.js file ensure to import AWS from aws-sdk and to configure it using your Access Key and your Secret Access Key.

```javascript
    import AWS from 'aws-sdk';
    
    
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-east-2'
    });
```

Next initialize the Amazon S3 service object, this will be used to interact with your Amazon S3 Buckets.

```javascript
    const s3 = new AWS.S3();
```

## Example 1
This example is taken from the AwsSetup branch and will go over how to upload an image(this could be whatever type of file you are trying to upload) and then access this image from the bucket.

First initialize a couple of state variables along with a function to update this state variable, these will be used in the React Application below.

```javascript
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
```

Next create a helper function to set the file to be uploaded whenever a new file is added.

```javascript
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
```

Now create a helper function to handle uploading images to your Amazon S3 Bucket.

```javascript
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

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error('Error uploading file: ', err);
    } else {
      console.log('File uploaded successfully. URL: ', data.Location);

      const preSignedUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: 'super-simple-bucket-upload-tutorial',
        Key: selectedFile.name,
        Expires: 3600
      });
      console.log('Pre-signed URL for the uploaded image: ', preSignedUrl);
      setUploadedImageUrl(preSignedUrl);
    }
  });
};
```

This function first checks to see if there is a file selected and if not sends and alert to tell the user to select a file to upload. Next it sets the parameters that Amazon needs to store the file in the appropriate bucket. In this case make sure to replace "super-simple-bucket-upload-tutorial" with the name of your bucket. Finally it is time to upload your file. This is done with the s3.upload funciton. In this case we want to display the uploaded image on our web application once it's uploaded. To do this we use the s3.getSignedUrlPromise function to get a temporary url that gives the user access to the image. Once again ensure to replace "super-simple-bucket-upload-tutorial" with the name of your bucket and to set the expires to however many seconds you want that url to expire and no longer give the user access with that specific url. At the end of this funciton the uploaded image url is set for display in the return poriton of the App.js file.

Finally you need to put all of these funcitons to use in a React application, below is our example on how to utilize these functions to create a simple React application that allows a user to upload an image and then display that image on the screen for the user to see what they've uploaded.

```html
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
    </div>
  );
```

## Example 2
For Example 2, we are going to go through how to display the images from the bucket onto the webpage like a gallery, you can find the working code on the main branch of the repository, we have the following functions as async so that it doesn't hinder the entire page from loading.

We'll start by creating a function to fetch the images from the bucket within the App.js file
```javascript
async function fetchImagesFromS3() {
  try {
    const response = await s3.listObjects({ Bucket: "super-simple-bucket-upload-tutorial" }).promise();
    return response.Contents;
  } catch (err) {
    console.error(err);
    return [];
  }
}
```
This function waits for a response from the bucket, where the response is a list of the objects within the bucket.

We'll use this response in our Gallery function, however, we first need to be able to convert the response we got into a presigned url to allow us to display each image.
```javascript
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
```
It does this by taking the key of the image and runs it through s3's getSignedUrlPromise function to return the presigned url.

Now we can create the Gallery function which will return the html to the webpage.
```
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
```
In function App, we need to add some lines of code to add this functionality
```
  const [imageList, setImageList] = useState([]);
```
```
useEffect(() => {
    async function fetchImages() {
      const images = await fetchImagesFromS3();
      setImageList(images);
    }

    fetchImages();
  }, []);
```
At the bottom of the return just above the last /div add:
```
<Gallery images={imageList} />
```
