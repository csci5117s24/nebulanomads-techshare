# How to Set up Simple File Upload through S3 Buckets with React

insert why here


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
7. Finally, we need access keys, so we can upload files to our bucket from React.
    * Click your account icon and click "Security credentials"
    ![alt text](/s3gallery/bucket_setup_imgs/image5.png)
    * Scroll down and find “Create access key”. Walk through the steps and make sure not to lose your access key. 
    ![alt text](/s3gallery/bucket_setup_imgs/image6.png)
    * If you have other people that will also develop your website you may want to checkout AWS IAM. More info on that [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html?icmpid=docs_iam_console)